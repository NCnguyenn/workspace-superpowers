#!/usr/bin/env python3
"""A deliberately small, exact, non-CAS arithmetic evaluator.

Reads one JSON request from stdin and writes one JSON response to stdout.
"""
import ast
import json
import math
import platform
import re
import sys
from fractions import Fraction

VERSION = "evaluate_math/1.2.0"
REQUEST_FIELDS = {"operation", "expression", "values", "expected", "assumptions"}
LIMITS = {
    "request_bytes": 65536,
    "json_depth": 16,
    "input_characters": 4096,
    "ast_nodes": 128,
    "literal_digits": 512,
    "value_entries": 32,
    "absolute_exponent": 1000,
    "factorial_argument": 1000,
    "comb_argument": 10000,
    "result_digits": 4096,
    "assumption_entries": 32,
    "assumption_characters": 1024,
}
MAX_RESULT_INTEGER = 10 ** LIMITS["result_digits"]
MAX_RESULT_BITS = MAX_RESULT_INTEGER.bit_length()
DECIMAL = re.compile(r"(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?$")
RATIONAL = re.compile(r"[+-]?(?:0|[1-9][0-9]*)/(?:0|[1-9][0-9]*)$")
NAME = re.compile(r"[A-Za-z_][A-Za-z0-9_]*$")


class EvaluationError(Exception):
    pass


def exact_string(value):
    return str(value.numerator) if value.denominator == 1 else f"{value.numerator}/{value.denominator}"


def checked(value):
    # Compare integers before decimal conversion (which Python itself bounds).
    if abs(value.numerator) >= MAX_RESULT_INTEGER or value.denominator >= MAX_RESULT_INTEGER:
        raise EvaluationError("result exceeds configured digit limit")
    return value


def parse_exact(value, label="value"):
    if isinstance(value, bool) or value is None:
        raise EvaluationError(f"{label} must be an integer, decimal, or rational string")
    if isinstance(value, int):
        if abs(value) >= 10 ** LIMITS["literal_digits"]:
            raise EvaluationError(f"{label} exceeds literal digit limit")
        text = str(value)
    elif isinstance(value, str):
        text = value.strip()
    else:
        raise EvaluationError(f"{label} must be an integer, decimal, or rational string")
    if len(re.sub(r"[^0-9]", "", text)) > LIMITS["literal_digits"]:
        raise EvaluationError(f"{label} exceeds literal digit limit")
    try:
        if RATIONAL.fullmatch(text):
            numerator, denominator = text.split("/")
            if int(denominator) == 0:
                raise EvaluationError(f"{label} has a zero denominator")
            return checked(Fraction(int(numerator), int(denominator)))
        if re.fullmatch(r"[+-]?" + DECIMAL.pattern, text):
            # Fraction expands powers of ten. Bound the scale before invoking it.
            mantissa, _, exponent_text = text.lower().partition("e")
            exponent = int(exponent_text) if exponent_text else 0
            decimal_places = len(mantissa.partition(".")[2])
            if abs(exponent) + decimal_places > LIMITS["result_digits"]:
                raise EvaluationError(f"{label} decimal scale exceeds configured limit")
            return checked(Fraction(text))
    except ValueError as error:
        raise EvaluationError(f"invalid {label}") from error
    raise EvaluationError(f"invalid {label}; use an integer, decimal, or rational string")


class Evaluator:
    def __init__(self, expression, values):
        self.expression = expression
        self.values = values
        try:
            self.tree = ast.parse(expression, mode="eval")
        except (SyntaxError, RecursionError, ValueError) as error:
            raise EvaluationError("expression has invalid syntax") from error
        if sum(1 for _ in ast.walk(self.tree)) > LIMITS["ast_nodes"]:
            raise EvaluationError("expression exceeds AST node limit")

    def integer(self, value, operation):
        if value.denominator != 1:
            raise EvaluationError(f"{operation} requires integer arguments")
        return value.numerator

    def visit(self, node):
        if isinstance(node, ast.Expression):
            return self.visit(node.body)
        if isinstance(node, ast.Constant):
            if isinstance(node.value, bool) or not isinstance(node.value, (int, float)):
                raise EvaluationError("only numeric literals are allowed")
            source = ast.get_source_segment(self.expression, node)
            return parse_exact(source, "numeric literal")
        if isinstance(node, ast.Name):
            if node.id not in self.values:
                raise EvaluationError(f"unknown variable: {node.id}")
            return self.values[node.id]
        if isinstance(node, ast.UnaryOp) and isinstance(node.op, (ast.UAdd, ast.USub)):
            value = self.visit(node.operand)
            return checked(value if isinstance(node.op, ast.UAdd) else -value)
        if isinstance(node, ast.BinOp):
            left, right = self.visit(node.left), self.visit(node.right)
            if isinstance(node.op, ast.Add): return checked(left + right)
            if isinstance(node.op, ast.Sub): return checked(left - right)
            if isinstance(node.op, ast.Mult): return checked(left * right)
            if isinstance(node.op, ast.Div):
                if right == 0: raise EvaluationError("division by zero")
                return checked(left / right)
            if isinstance(node.op, ast.Pow):
                exponent = self.integer(right, "exponentiation")
                if abs(exponent) > LIMITS["absolute_exponent"]:
                    raise EvaluationError("exponent exceeds configured limit")
                if left == 0 and exponent < 0: raise EvaluationError("zero cannot have a negative exponent")
                if left == 0 and exponent == 0: raise EvaluationError("zero to zero is indeterminate without a chosen convention")
                # A conservative lower bound avoids constructing enormous powers.
                # When this passes, each power is at most about 4400 decimal digits;
                # checked() enforces the exact 4096-digit limit without stringifying.
                for component in (abs(left.numerator), left.denominator):
                    if component > 1 and (component.bit_length() - 1) * abs(exponent) >= MAX_RESULT_BITS:
                        raise EvaluationError("result exceeds configured digit limit")
                return checked(left ** exponent)
            raise EvaluationError("operator is not allowed")
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and not node.keywords:
            args = [self.visit(argument) for argument in node.args]
            if node.func.id == "factorial" and len(args) == 1:
                n = self.integer(args[0], "factorial")
                if n < 0: raise EvaluationError("factorial requires a non-negative integer")
                if n > LIMITS["factorial_argument"]: raise EvaluationError("factorial argument exceeds configured limit")
                return checked(Fraction(math.factorial(n)))
            if node.func.id == "comb" and len(args) == 2:
                n, k = self.integer(args[0], "comb"), self.integer(args[1], "comb")
                if n < 0 or k < 0 or k > n: raise EvaluationError("comb requires non-negative integers with k <= n")
                if n > LIMITS["comb_argument"]: raise EvaluationError("comb argument exceeds configured limit")
                return checked(Fraction(math.comb(n, k)))
            if node.func.id == "gcd" and len(args) >= 2:
                integers = [self.integer(argument, "gcd") for argument in args]
                if any(argument < 0 for argument in integers):
                    raise EvaluationError("gcd requires non-negative integer arguments")
                return checked(Fraction(math.gcd(*integers)))
            raise EvaluationError("unknown or invalid function call")
        raise EvaluationError("expression contains a forbidden syntax construct")


def base_response(request):
    return {
        "availability": "available", "method": "bounded_exact_fraction_ast",
        "operation": request.get("operation"), "requested_expression": request.get("expression"),
        "inputs": {}, "assumptions": request.get("assumptions", []),
        "assumptions_checked": False,
        "domain": "exact rational arithmetic; factorial, comb and gcd require non-negative integers",
        "evidence": {"tool_version": VERSION, "python": platform.python_version(), "limits": LIMITS},
        "limitations": ["This is bounded exact arithmetic for supplied inputs, not a CAS, proof system, or symbolic theorem verifier.",
                        "It performs no physical-unit or dimension checking."],
    }


def respond(request):
    if not isinstance(request, dict):
        return {"availability": "unavailable", "outcome": "unavailable", "diagnostic": "request must be a JSON object", "evidence": {"tool_version": VERSION, "limits": LIMITS}}
    response = base_response(request)
    unsupported_fields = sorted(set(request) - REQUEST_FIELDS)
    if unsupported_fields:
        response.update({"availability": "unavailable", "outcome": "unavailable", "diagnostic": "unsupported request field(s): " + ", ".join(unsupported_fields) + "; only exact rational arithmetic is implemented"})
        return response
    if request.get("operation") != "evaluate":
        response.update({"availability": "unavailable", "outcome": "unavailable", "diagnostic": "only operation 'evaluate' is implemented"})
        return response
    assumptions = request.get("assumptions", [])
    if (not isinstance(assumptions, list) or len(assumptions) > LIMITS["assumption_entries"]
            or any(not isinstance(item, str) or len(item) > LIMITS["assumption_characters"] for item in assumptions)):
        response.update({"outcome": "fail", "diagnostic": "assumptions must be a bounded list of strings; they are recorded, not verified"})
        return response
    expression = request.get("expression")
    if not isinstance(expression, str) or not expression.strip():
        response.update({"outcome": "fail", "diagnostic": "expression must be a non-empty string"})
        return response
    if len(expression) > LIMITS["input_characters"]:
        response.update({"outcome": "fail", "diagnostic": "expression exceeds input character limit"})
        return response
    if len(re.sub(r"[^0-9]", "", expression)) > LIMITS["literal_digits"]:
        response.update({"outcome": "fail", "diagnostic": "expression exceeds literal digit limit"})
        return response
    raw_values = request.get("values", {})
    if not isinstance(raw_values, dict) or len(raw_values) > LIMITS["value_entries"]:
        response.update({"outcome": "fail", "diagnostic": "values must be an object within the entry limit"})
        return response
    try:
        values = {}
        for name, value in raw_values.items():
            if not isinstance(name, str) or not NAME.fullmatch(name): raise EvaluationError("values contains an invalid variable name")
            if name in {"factorial", "comb", "gcd"}: raise EvaluationError("values cannot shadow a supported operation")
            values[name] = parse_exact(value, f"value {name}")
        response["inputs"] = {name: exact_string(value) for name, value in values.items()}
        evaluator = Evaluator(expression, values)
        result = evaluator.visit(evaluator.tree)
        response["executed_expression"] = expression
        response["result"] = {"exact": exact_string(result), "numerator": str(result.numerator), "denominator": str(result.denominator)}
        if "expected" not in request:
            response.update({"outcome": "inconclusive", "diagnostic": "calculation completed; no expected comparison was supplied"})
            return response
        expected = parse_exact(request["expected"], "expected")
        response["expected"] = exact_string(expected)
        response.update({"outcome": "pass" if result == expected else "fail", "comparison": "exact rational equality"})
        if result != expected: response["diagnostic"] = "computed result does not equal expected"
    except EvaluationError as error:
        response.update({"outcome": "fail", "diagnostic": str(error)})
    return response


def parse_request():
    raw = sys.stdin.buffer.read(LIMITS["request_bytes"] + 1)
    if len(raw) > LIMITS["request_bytes"]:
        raise EvaluationError("request exceeds byte limit")
    text = raw.decode("utf-8")
    # Count structural nesting before json.loads; ignore brackets inside strings.
    depth, in_string, escaped = 0, False, False
    for char in text:
        if in_string:
            if escaped: escaped = False
            elif char == "\\": escaped = True
            elif char == '"': in_string = False
        elif char == '"': in_string = True
        elif char in "[{":
            depth += 1
            if depth > LIMITS["json_depth"]: raise EvaluationError("request exceeds JSON depth limit")
        elif char in "]}": depth -= 1

    def parse_integer(text):
        if len(text.lstrip("-")) > LIMITS["literal_digits"]:
            raise EvaluationError("JSON integer exceeds literal digit limit")
        return int(text)

    def reject_constant(text):
        raise EvaluationError("non-finite JSON numbers are not allowed")

    def parse_finite_float(text):
        value = float(text)
        if not math.isfinite(value):
            raise EvaluationError("JSON floating-point number overflows; use an exact numeric string within the limits")
        return value

    return json.loads(text, parse_int=parse_integer, parse_float=parse_finite_float, parse_constant=reject_constant)


def main():
    try:
        request = parse_request()
        response = respond(request)
    except (json.JSONDecodeError, UnicodeDecodeError, EvaluationError, RecursionError) as error:
        response = {"availability": "unavailable", "outcome": "unavailable", "diagnostic": f"invalid request: {error}", "evidence": {"tool_version": VERSION, "limits": LIMITS}}
    print(json.dumps(response, sort_keys=True, separators=(",", ":"), allow_nan=False))
    if response["availability"] == "unavailable":
        return 2
    if response["outcome"] == "fail":
        return 1 if response.get("diagnostic") == "computed result does not equal expected" else 3
    return 0


if __name__ == "__main__":
    sys.exit(main())
