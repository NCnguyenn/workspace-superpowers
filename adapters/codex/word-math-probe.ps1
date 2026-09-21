[CmdletBinding()]
param(
    [string]$OutputDirectory,
    [switch]$SelfTest,
    [switch]$Worker,
    [ValidateRange(1, 600)]
    [int]$TimeoutSeconds = 60
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function New-CapabilityRecord([string]$State, [string]$Fidelity, [string]$Detail) {
    [ordered]@{ state = $State; fidelity = $Fidelity; detail = $Detail }
}

# This intentionally recognizes only the two simple fixture equations. Unknown
# structures fail closed; in particular, delimiter and script nodes cannot be
# reduced to their descendant text without changing mathematical meaning.
function Test-FixtureStructure($Node) {
    $mathNamespace = 'http://schemas.openxmlformats.org/officeDocument/2006/math'
    $wordNamespace = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
    $children = @($Node.ChildNodes | Where-Object { $_.NodeType -eq [System.Xml.XmlNodeType]::Element })
    if ($Node.NamespaceURI -eq $wordNamespace) {
        if ($Node.LocalName -eq 'rPr') {
            foreach ($child in $children) {
                if ($child.NamespaceURI -ne $wordNamespace -or $child.LocalName -notin @('rFonts', 'b', 'bCs', 'i', 'iCs', 'color', 'sz', 'szCs', 'lang')) { return $false }
                if (@($child.ChildNodes | Where-Object { $_.NodeType -eq [System.Xml.XmlNodeType]::Element }).Count -ne 0) { return $false }
            }
            return $true
        }
        return $false
    }
    if ($Node.NamespaceURI -ne $mathNamespace) { return $false }
    $allowedChildren = @{
        oMath = @('r', 'f'); f = @('fPr', 'num', 'den'); fPr = @('type', 'ctrlPr')
        num = @('argPr', 'r'); den = @('argPr', 'r'); r = @('rPr', 't')
        rPr = @('sty', 'nor'); ctrlPr = @('rPr'); argPr = @('argSz')
        t = @(); type = @(); sty = @(); nor = @(); argSz = @()
    }
    if (-not $allowedChildren.ContainsKey($Node.LocalName)) { return $false }
    if ($Node.LocalName -eq 'type' -and $Node.GetAttribute('val', $mathNamespace) -ne 'bar') { return $false }
    if ($Node.LocalName -eq 'f') {
        $semanticChildren = @($children | Where-Object { $_.LocalName -ne 'fPr' })
        if ($semanticChildren.Count -ne 2 -or $semanticChildren[0].LocalName -ne 'num' -or $semanticChildren[1].LocalName -ne 'den') { return $false }
    }
    foreach ($child in $children) {
        if ($child.LocalName -notin $allowedChildren[$Node.LocalName]) { return $false }
        if ($child.NamespaceURI -eq $wordNamespace -and ($Node.LocalName -notin @('r', 'ctrlPr') -or $child.LocalName -ne 'rPr')) { return $false }
        if (-not (Test-FixtureStructure $child)) { return $false }
    }
    return $true
}

function Get-DocxMathEvidence([string]$Path) {
    Add-Type -AssemblyName System.IO.Compression
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $archive = [System.IO.Compression.ZipFile]::OpenRead($Path)
    try {
        $entry = $archive.GetEntry('word/document.xml')
        if ($null -eq $entry) {
            return [ordered]@{ state = 'missing-document-xml'; oMathCount = 0; fractionCount = 0; hasOmml = $false }
        }
        $settings = New-Object System.Xml.XmlReaderSettings
        $settings.DtdProcessing = [System.Xml.DtdProcessing]::Prohibit
        $settings.XmlResolver = $null
        $stream = $entry.Open()
        $reader = [System.Xml.XmlReader]::Create($stream, $settings)
        try {
            $xml = New-Object System.Xml.XmlDocument
            $xml.XmlResolver = $null
            $xml.Load($reader)
            $namespaces = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
            $namespaces.AddNamespace('m', 'http://schemas.openxmlformats.org/officeDocument/2006/math')
            $mathNodes = $xml.SelectNodes('//m:oMath', $namespaces)
            $fractionNodes = $xml.SelectNodes('//m:oMath//m:f', $namespaces)
            $equations = @($mathNodes | ForEach-Object {
                $node = $_
                $fractions = @($node.SelectNodes('.//m:f', $namespaces) | ForEach-Object {
                    [ordered]@{
                        numerator = (($_.SelectNodes('./m:num//m:t', $namespaces) | ForEach-Object { $_.InnerText }) -join '')
                        denominator = (($_.SelectNodes('./m:den//m:t', $namespaces) | ForEach-Object { $_.InnerText }) -join '')
                    }
                })
                [ordered]@{
                    fractions = $fractions
                    unsupportedStructureCount = if (Test-FixtureStructure $node) { 0 } else { 1 }
                    firstElement = @($node.ChildNodes | Where-Object { $_.NodeType -eq [System.Xml.XmlNodeType]::Element } | Select-Object -First 1).LocalName
                    outsideFraction = (($node.SelectNodes('.//m:t[not(ancestor::m:f)]', $namespaces) | ForEach-Object { $_.InnerText }) -join '')
                    text = (($node.SelectNodes('.//m:t', $namespaces) | ForEach-Object { $_.InnerText }) -join '')
                }
            })
            return [ordered]@{ state = 'parsed'; oMathCount = $mathNodes.Count; fractionCount = $fractionNodes.Count; hasOmml = ($mathNodes.Count -gt 0); equations = $equations }
        }
        catch {
            return [ordered]@{ state = 'invalid-document-xml'; oMathCount = 0; fractionCount = 0; hasOmml = $false; error = $_.Exception.Message }
        }
        finally { $reader.Dispose(); $stream.Dispose() }
    }
    finally { $archive.Dispose() }
}

function Test-FixtureMeaning($Evidence, [string]$RightHandSide) {
    if ($Evidence.state -ne 'parsed' -or $Evidence.oMathCount -ne 2 -or $Evidence.fractionCount -ne 1) { return $false }
    $first = $Evidence.equations[0]
    $second = $Evidence.equations[1]
    if ($first.fractions.Count -ne 1 -or $second.fractions.Count -ne 0 -or
        $first.unsupportedStructureCount -ne 0 -or $second.unsupportedStructureCount -ne 0 -or
        $first.firstElement -ne 'f') { return $false }
    return (($first.fractions[0].numerator -replace '\s', '') -in @('x+1', '(x+1)') -and
        ($first.fractions[0].denominator -replace '\s', '') -eq '2' -and
        ($first.outsideFraction -replace '\s', '') -eq "=$RightHandSide" -and
        ($second.text -replace '\s', '') -eq 'y=4')
}

function New-ZipXmlFixture([string]$Path, [string]$Xml, [bool]$IncludeDocumentXml) {
    Add-Type -AssemblyName System.IO.Compression
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $archive = [System.IO.Compression.ZipFile]::Open($Path, [System.IO.Compression.ZipArchiveMode]::Create)
    try {
        if ($IncludeDocumentXml) {
            $entry = $archive.CreateEntry('word/document.xml')
            $writer = New-Object System.IO.StreamWriter($entry.Open())
            try { $writer.Write($Xml) } finally { $writer.Dispose() }
        }
    }
    finally { $archive.Dispose() }
}

function Test-EvidenceContract {
    $fixtureRoot = Join-Path ([IO.Path]::GetTempPath()) ("word-math-probe-selftest-" + [guid]::NewGuid().ToString('N'))
    New-Item -ItemType Directory -Path $fixtureRoot | Out-Null
    try {
        $alternatePrefix = Join-Path $fixtureRoot 'alternate-prefix.docx'
        $malformed = Join-Path $fixtureRoot 'malformed.docx'
        $missing = Join-Path $fixtureRoot 'missing-document-xml.docx'
        $validXml = '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:math="http://schemas.openxmlformats.org/officeDocument/2006/math"><w:body><math:oMath><math:f><math:num><math:r><math:t>x+1</math:t></math:r></math:num><math:den><math:r><math:t>2</math:t></math:r></math:den></math:f><math:r><math:t>=3</math:t></math:r></math:oMath><math:oMath><math:r><math:t>y=4</math:t></math:r></math:oMath></w:body></w:document>'
        New-ZipXmlFixture -Path $alternatePrefix -Xml $validXml -IncludeDocumentXml $true
        New-ZipXmlFixture -Path $malformed -Xml '<w:document' -IncludeDocumentXml $true
        New-ZipXmlFixture -Path $missing -Xml '' -IncludeDocumentXml $false
        $alternateEvidence = Get-DocxMathEvidence $alternatePrefix
        $malformedEvidence = Get-DocxMathEvidence $malformed
        $missingEvidence = Get-DocxMathEvidence $missing
        if (-not (Test-FixtureMeaning $alternateEvidence '3')) { throw 'Alternate namespace-prefix fixture meaning was not recognized.' }
        if (Test-FixtureMeaning $alternateEvidence '4') { throw 'Wrong right-hand-side was accepted.' }
        if ($malformedEvidence.state -ne 'invalid-document-xml') { throw 'Malformed document XML was not rejected.' }
        if ($missingEvidence.state -ne 'missing-document-xml') { throw 'Missing document XML was not reported.' }
        $negativeXml = @{
            'wrong-numerator' = $validXml.Replace('x+1', 'x+2')
            'wrong-denominator' = $validXml.Replace('<math:t>2</math:t>', '<math:t>5</math:t>')
            'changed-untouched-equation' = $validXml.Replace('y=4', 'y=9')
            'raw-latex' = $validXml.Replace('x+1', '$x+1$')
            'same-text-different-structure' = $validXml.Replace('<math:r><math:t>x+1</math:t></math:r>', '<math:sSup><math:e><math:r><math:t>x</math:t></math:r></math:e><math:sup><math:r><math:t>+1</math:t></math:r></math:sup></math:sSup>')
            'same-text-subscript' = $validXml.Replace('<math:r><math:t>y=4</math:t></math:r>', '<math:sSub><math:e><math:r><math:t>y</math:t></math:r></math:e><math:sub><math:r><math:t>=4</math:t></math:r></math:sub></math:sSub>')
            'absolute-value' = $validXml.Replace('<math:r><math:t>x+1</math:t></math:r>', '<math:d><math:dPr><math:begChr math:val="|"/><math:endChr math:val="|"/></math:dPr><math:e><math:r><math:t>x+1</math:t></math:r></math:e></math:d>')
            'prescript' = $validXml.Replace('<math:r><math:t>x+1</math:t></math:r>', '<math:sPre><math:sub/><math:sup><math:r><math:t>x</math:t></math:r></math:sup><math:e><math:r><math:t>+1</math:t></math:r></math:e></math:sPre>')
            'no-bar-fraction' = $validXml.Replace('<math:f>', '<math:f><math:fPr><math:type math:val="noBar"/></math:fPr>')
            'reordered-equation' = $validXml.Replace('<math:oMath><math:f>', '<math:oMath><math:r><math:t>=3</math:t></math:r><math:f>').Replace('</math:f><math:r><math:t>=3</math:t></math:r>', '</math:f>')
            'unknown-structure' = $validXml.Replace('<math:r><math:t>x+1</math:t></math:r>', '<math:futureStructure><math:r><math:t>x+1</math:t></math:r></math:futureStructure>')
            'no-omml' = '<document>$(x+1)/2=3$ y=4</document>'
            'dtd' = '<!DOCTYPE document [<!ENTITY value "x">]><document>&value;</document>'
        }
        foreach ($name in $negativeXml.Keys) {
            $path = Join-Path $fixtureRoot "$name.docx"
            New-ZipXmlFixture $path $negativeXml[$name] $true
            $evidence = Get-DocxMathEvidence $path
            if (Test-FixtureMeaning $evidence '3') { throw "Negative fixture was accepted: $name" }
            if ($name -eq 'dtd' -and $evidence.state -ne 'invalid-document-xml') { throw 'DTD was not rejected.' }
        }
    }
    finally {
        $resolvedFixtureRoot = [IO.Path]::GetFullPath($fixtureRoot)
        $resolvedTempRoot = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd('\') + '\'
        if (-not $resolvedFixtureRoot.StartsWith($resolvedTempRoot, [StringComparison]::OrdinalIgnoreCase) -or
            [IO.Path]::GetFileName($resolvedFixtureRoot) -notmatch '^word-math-probe-selftest-[a-f0-9]{32}$') { throw 'Unsafe fixture cleanup target.' }
        if (Test-Path -LiteralPath $resolvedFixtureRoot) { Remove-Item -LiteralPath $resolvedFixtureRoot -Recurse -Force }
    }
}

if ($SelfTest) {
    Test-EvidenceContract
    Write-Output 'SELFTEST: XML FIXTURES PASS'
    exit 0
}

if ([string]::IsNullOrWhiteSpace($OutputDirectory)) {
    $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
    $nonce = [guid]::NewGuid().ToString('N')
    $OutputDirectory = Join-Path $PSScriptRoot "..\..\tests\scenarios\reports\math-project-20260920\runtime\word-probe-$stamp-$nonce"
}

$OutputDirectory = [IO.Path]::GetFullPath($OutputDirectory)
if (-not $Worker) {
    if (Test-Path -LiteralPath $OutputDirectory) { throw "Refusing to overwrite existing output directory: $OutputDirectory" }
    New-Item -ItemType Directory -Path $OutputDirectory | Out-Null
    $stdoutPath = Join-Path $OutputDirectory 'worker-stdout.json'
    $stderrPath = Join-Path $OutputDirectory 'worker-stderr.txt'
    if ($PSCommandPath.Contains('"') -or $OutputDirectory.Contains('"')) { throw 'Unsupported quote in path.' }
    $workerArguments = '-NoProfile -ExecutionPolicy Bypass -File "' + $PSCommandPath + '" -Worker -OutputDirectory "' + $OutputDirectory.TrimEnd('\') + '"'
    $workerProcess = Start-Process -FilePath 'powershell.exe' -ArgumentList $workerArguments -WindowStyle Hidden -PassThru -RedirectStandardOutput $stdoutPath -RedirectStandardError $stderrPath
    if (-not $workerProcess.WaitForExit($TimeoutSeconds * 1000)) {
        # This is the PowerShell worker created above. Deliberately do not kill WINWORD.EXE or enumerate user processes.
        Stop-Process -Id $workerProcess.Id -Force
        $timeoutResult = [ordered]@{
            probe = 'bounded-word-native-equation-roundtrip'
            status = 'timed-out'
            outputDirectory = $OutputDirectory
            timeoutSeconds = $TimeoutSeconds
            error = 'The probe worker exceeded its bounded timeout and only that worker process was stopped.'
            limitations = @('No Word process was killed by the watchdog; a manual session check may be required if Word COM activation hung.')
        }
        $timeoutResult | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $OutputDirectory 'result.json') -Encoding utf8
        $timeoutResult | ConvertTo-Json -Depth 8
        exit 3
    }
    if (Test-Path -LiteralPath $stdoutPath) { Get-Content -Raw -LiteralPath $stdoutPath }
    $workerProcess.Refresh()
    if (-not (Test-Path -LiteralPath (Join-Path $OutputDirectory 'result.json'))) { throw "Worker exited without result.json; inspect $stderrPath" }
    $workerResult = Get-Content -Raw -LiteralPath (Join-Path $OutputDirectory 'result.json') | ConvertFrom-Json
    if ($workerResult.status -eq 'fixture-passed') { exit 0 }
    exit 2
}
if (-not (Test-Path -LiteralPath $OutputDirectory)) { New-Item -ItemType Directory -Path $OutputDirectory | Out-Null }

$result = [ordered]@{
    probe = 'bounded-word-native-equation-roundtrip'
    startedAt = (Get-Date).ToString('o')
    outputDirectory = $OutputDirectory
    environment = [ordered]@{
        powershell = $PSVersionTable.PSVersion.ToString()
        wordExecutable = 'C:\Program Files\Microsoft Office\root\Office16\WINWORD.EXE'
        wordVersion = $null
        wordBuild = $null
    }
    capabilities = [ordered]@{
        connectedCodexDocumentSession = New-CapabilityRecord 'unavailable' 'none' 'No connected Codex document session was supplied to this probe.'
        wordCom = New-CapabilityRecord 'not-run' 'none' 'Pending disposable Word COM probe.'
        nativeEquationCreate = New-CapabilityRecord 'not-run' 'none' 'Pending.'
        existingDocxEditSaveReopen = New-CapabilityRecord 'not-run' 'none' 'Pending.'
        ommlStructure = New-CapabilityRecord 'not-run' 'none' 'Pending.'
        semanticContentComparison = New-CapabilityRecord 'not-run' 'none' 'Pending.'
        pdfExport = New-CapabilityRecord 'not-run' 'none' 'Pending.'
        visualLayoutInspection = New-CapabilityRecord 'unavailable' 'none' 'PDF export alone is not a human or image-based layout inspection.'
        latexClipboardPath = New-CapabilityRecord 'unverified' 'none' 'Clipboard/LaTeX import was deliberately not assumed or exercised.'
    }
    evidence = [ordered]@{}
    limitations = @('A fixture proves only this disposable document path; it does not establish arbitrary-document coverage.', 'OMML and oMath counts are structural evidence, not proof that every mathematical meaning or layout is correct.')
}

$word = $null
$source = Join-Path $OutputDirectory 'source-native-equation.docx'
$edited = Join-Path $OutputDirectory 'edited-native-equation.docx'
$pdf = Join-Path $OutputDirectory 'edited-native-equation.pdf'
foreach ($ownedPath in @($source, $edited, $pdf, (Join-Path $OutputDirectory 'result.json'))) {
    if (Test-Path -LiteralPath $ownedPath) { throw "Refusing to overwrite existing fixture file: $ownedPath" }
}
try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = 0
    $word.AutomationSecurity = 3
    $result.environment.wordVersion = $word.Version
    try { $result.environment.wordBuild = $word.Build } catch { $result.environment.wordBuild = 'unavailable from Word COM object' }
    $result.capabilities.wordCom = New-CapabilityRecord 'verified' 'automation' 'Created a new hidden Word.Application COM instance owned by this probe.'

    $doc = $word.Documents.Add()
    try {
        $doc.Content.Text = "(x+1)/2=3`ry=4`r"
        $range = $doc.Paragraphs.Item(1).Range
        $range.End = $range.End - 1
        $null = $doc.OMaths.Add($range)
        $doc.OMaths.Item(1).BuildUp()
        $secondRange = $doc.Paragraphs.Item(2).Range
        $secondRange.End = $secondRange.End - 1
        $null = $doc.OMaths.Add($secondRange)
        $doc.OMaths.Item(2).BuildUp()
        $doc.SaveAs2($source, 16)
        $result.evidence.source = [ordered]@{ oMathCount = $doc.OMaths.Count; docx = (Get-DocxMathEvidence $source) }
    }
    finally { $doc.Close(0) }

    $doc = $word.Documents.Open($source, $false, $false)
    try {
        $beforeCount = $doc.OMaths.Count
        if ($beforeCount -ne 2) { throw "Reopened source document has $beforeCount native oMath objects; expected 2." }
        if (-not (Test-FixtureMeaning $result.evidence.source.docx '3')) { throw 'Source OMML equation content does not match the expected fixture.' }
        $sourceHash = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
        $equationRange = $doc.OMaths.Item(1).Range
        $lastCharacter = $doc.Range($equationRange.End - 1, $equationRange.End)
        if ($lastCharacter.Text -ne '3') { throw 'Expected editable right-hand-side character not found.' }
        $lastCharacter.Text = '4'
        $doc.SaveAs2($edited, 16)
        $result.evidence.editBeforeSave = [ordered]@{ oMathCount = $beforeCount; expectedRightHandSide = '3' }
        $result.evidence.editAfterSave = [ordered]@{ oMathCount = $doc.OMaths.Count; docx = (Get-DocxMathEvidence $edited) }
        try {
            $doc.SaveAs2($pdf, 17)
            $result.evidence.pdf = [ordered]@{ exists = (Test-Path -LiteralPath $pdf); bytes = if (Test-Path -LiteralPath $pdf) { (Get-Item $pdf).Length } else { 0 } }
        }
        catch {
            $result.evidence.pdf = [ordered]@{ exists = $false; bytes = 0; error = $_.Exception.Message }
        }
    }
    finally { $doc.Close(0) }

    $doc = $word.Documents.Open($edited, $false, $true)
    try {
        $reopenCount = $doc.OMaths.Count
        $reopenXml = Get-DocxMathEvidence $edited
        $result.evidence.reopen = [ordered]@{ oMathCount = $reopenCount; docx = $reopenXml }
        $structural = ($reopenCount -eq 2 -and $reopenXml.hasOmml -and $reopenXml.fractionCount -ge 1)
        $sourceUnchanged = ((Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash -eq $sourceHash)
        $result.evidence.originalSourceUnchanged = $sourceUnchanged
        $semantic = (Test-FixtureMeaning $reopenXml '4') -and $sourceUnchanged
        $createState = if ($result.evidence.source.oMathCount -ge 1) { 'verified' } else { 'failed' }
        $roundTripState = if ($structural) { 'verified' } else { 'failed' }
        $semanticState = if ($semantic) { 'verified' } else { 'failed' }
        $result.capabilities.nativeEquationCreate = New-CapabilityRecord -State $createState -Fidelity 'structural' -Detail 'Created two native oMath fixture equations, including a fraction, and saved them as DOCX.'
        $result.capabilities.existingDocxEditSaveReopen = New-CapabilityRecord -State $roundTripState -Fidelity 'structural' -Detail 'Reopened a disposable DOCX, edited its first equation, retained two native Equation objects, saved, and reopened it; content preservation is checked separately.'
        $result.capabilities.ommlStructure = New-CapabilityRecord -State $roundTripState -Fidelity 'structural' -Detail 'Both Word oMath collection and namespace-aware DOCX OMML fraction evidence were inspected after reopen.'
        $result.capabilities.semanticContentComparison = New-CapabilityRecord -State $semanticState -Fidelity 'limited-semantic' -Detail 'Compared OMML fraction numerator, denominator, right-hand-side, untouched second equation, and original source hash; limited to the known fixture.'
        $pdfOk = $result.evidence.pdf.exists -and $result.evidence.pdf.bytes -gt 0
        $pdfState = if ($pdfOk) { 'verified' } else { 'unavailable' }
        $pdfFidelity = if ($pdfOk) { 'render-output' } else { 'none' }
        $result.capabilities.pdfExport = New-CapabilityRecord -State $pdfState -Fidelity $pdfFidelity -Detail 'Word PDF export was attempted on the edited fixture; output existence is not visual layout inspection.'
    }
    finally { $doc.Close(0) }
}
catch {
    $result.error = $_.Exception.Message
    $failureState = if ($result.capabilities.wordCom.state -eq 'verified') { 'failed' } else { 'unavailable' }
    foreach ($name in @('wordCom', 'nativeEquationCreate', 'existingDocxEditSaveReopen', 'ommlStructure', 'semanticContentComparison', 'pdfExport')) {
        if ($result.capabilities[$name].state -eq 'not-run') { $result.capabilities[$name] = New-CapabilityRecord $failureState 'none' $_.Exception.Message }
    }
}
finally {
    if ($null -ne $word) { try { $word.Quit() } catch {} }
    [GC]::Collect(); [GC]::WaitForPendingFinalizers()
    $result.finishedAt = (Get-Date).ToString('o')
    $requiredStates = @('nativeEquationCreate', 'existingDocxEditSaveReopen', 'ommlStructure', 'semanticContentComparison', 'pdfExport') | ForEach-Object { $result.capabilities[$_].state }
    $result.status = if (@($requiredStates | Where-Object { $_ -ne 'verified' }).Count -eq 0) { 'fixture-passed' } elseif ($result.capabilities.wordCom.state -eq 'unavailable') { 'unavailable' } else { 'failed' }
    $result | ConvertTo-Json -Depth 15 | Set-Content -LiteralPath (Join-Path $OutputDirectory 'result.json') -Encoding utf8
}

$result | ConvertTo-Json -Depth 15
if ($result.status -eq 'fixture-passed') { exit 0 }
exit 2
