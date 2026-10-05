# Visual Assets, Citations, and Word Fidelity

Use this shared contract when criteria analysis, outline planning, visual/citation work, conversion, layout, or verification touches tables or figures. It defines records and checks, not another approval stage or an installed search, image, or Office capability. Apply only the part relevant to the current operation. A completed-assignment read-back or later-guide comparison remains narrow reading/analysis, not a trigger for new intake, visuals, formatting, or drafting. Preserve source identity and distinguish projected from observed outcomes; this contract does not claim a universal international standard.

## 1. Conditional visual decisions

For each applicable heading, decide whether a table or figure is **Not needed**, required by the actual rubric/brief, or has explanatory value because it clarifies a comparison, relationship, process, or evidence. A heading does not need a decorative visual. The 40–50% outline-depth guidance is not an asset quota. For a requested public illustration, find and inspect an existing image, download it when an authorized artifact workflow needs a local asset, and display it in the same chat message with its source citation. Do not create, generate, or code-draw a substitute unless the user requests or agrees after being asked. Silence is not agreement. Ask the user for project screenshots or internal numbers; inspect and cite public facts. Invent no hypothetical number without explicit permission for that specific gap.

When a visual is used, record a stable `asset_id`, type, purpose, intended
position, source/data, preparer, status, and any evidence or permission gap. For a
table, record its columns and supported cell content. For a figure, record its
caption, source/attribution and the relationship to the surrounding explanation.

The asset provenance class must be one of:

* **External theoretical figure** — obtained from an identified external source;
* **Original explanatory diagram** — authored for this deliverable from confirmed
  facts or inspected theory; cite its theoretical basis where applicable, without
  claiming it is a project screenshot;
* **Adapted figure** — changed from an identified source and labeled as adapted;
* **User project screenshot** — supplied or inspected from the user's project;
* **Authorized illustrative placeholder** — explicitly permitted hypothetical
  material, labeled at the point of use and never treated as project evidence.

Search discovery alone does not establish provenance, credibility, reuse permission, or support for a claim. Record the inspected source and license/reuse conditions; unknown licensing is not permission to copy. An existing public image is not a user's project screenshot. Label adaptations and drawings accurately, and do not assume redrawing a protected image removes reuse restrictions. Explain supported ideas independently instead of copying a protected composition.

Outline delivery must show the actual available preview and a reviewable
Markdown table structure with supported content, caption and source. If a preview
is unavailable because it cannot be displayed, attached, or inspected, disclose
that limitation and retain the asset as `requested`, `blocked`, or `unverified`;
do not imply that an unseen asset was approved. Missing required project evidence
keeps the affected work blocked unless the existing evidence contract records a
specifically authorized alternative.

Do not defer an available preview to drafting or replace it with specifications. Show a needed table or diagram in the same message; where no visual is needed, omit it rather than printing `Not needed` in the deliverable. For a requested public illustration, embed image markdown with a direct HTTPS image URL returning image bytes (for example, an inspected upload.wikimedia.org file), with the source citation underneath. A wiki File page, bare URL, source line without image markdown, local file path, or long base64 blob is not an image preview. Resolve rather than invent the upload URL. Do not create, generate, or code-draw a substitute without the user's request or agreement; identify an authorized drawing as a drawing, not a found image or project screenshot.

Apply the [visual evidence boundary](visual-evidence-boundary.md) before claiming what a screenshot proves. Visible pixels do not establish database state, runtime behavior, device identity, a CSS viewport, or criterion satisfaction. An unknown table value is unknown, not zero or an assumed improvement. Follow the evidence-before-outline prerequisite: blank cells cannot bypass missing mandatory inputs; do not fabricate values, URLs, citations, screenshots, or results.

Use supported ordinary chat or an available question tool for the specific missing
evidence after inspecting current inputs. Do not use a text-only question tool to
request an upload. Request an attachment through chat if the host supports uploads;
otherwise offer an accessible local path, pasted data or another supported input.
State exactly what each alternative cannot prove. Do not add approval cards for
routine sourced visuals or ask again for an existing scoped permission. Respect
host display/download restrictions; never bypass them through alternate tools.

Analysis approval and detailed-outline approval remain separate. Deliver the full
draft with its tables, figures, captions and citations in chat, ask for review, and
wait before the next section. Keep internal gate labels out of user-facing text.
An unseen required asset cannot be silently included in an approval; scope the
decision to what was visible, or obtain explicit acceptance of a limited alternative.

Recommended asset statuses are `not_needed`, `proposed`, `requested`, `available`,
`verified`, `blocked`, `unverified`, and `illustrative_authorized`. Status is not
approval: a proposed asset or proposed source remains a proposal until the
relevant user decision and evidence checks are recorded.

## 2. Citation and source states

Keep source states separate:

* a **proposed source** is a candidate shown in an analysis or outline;
* a **verified source** has checked bibliographic metadata, provenance and
  claim–source support;
* an **actually cited source** appears in the delivered body or in an attribution
  for a figure/table.

The final References list contains only sources actually cited or attributed in
that deliverable scope. Audit both directions: every body/figure/table citation
has a matching verified entry, and every final entry is used. Do not invent
authors, dates, titles, pages, publishers, URLs, DOIs or licenses. Preserve an
existing or required citation style; Harvard is only the fallback when citations
are required and no style is established.

An outline can list candidates under Proposed sources with their checked/unchecked
status and intended claims. Its own References list still covers only citations
actually used in that outline, including attributions. Missing metadata is recorded
as unverified rather than guessed; a catalog record may verify metadata without
verifying the claim or quoted page. Keep dependent claims incomplete when support
is absent.

## 3. Asset identity within existing records

Reuse the evidence register, outline row or adopted work record. Keep only the
needed asset ID, source locator/revision, preview and approval locator/scope, and
target heading/paragraph/caption location. Store table content or a locator to its
approved cells, units and notes. Do not require new tracking files for isolated
exports or maintain a parallel asset register.

Use hashes when useful for byte-preserved assets. A changed image hash is a cue to
check a transformation, not automatic proof of a wrong image: record source and
output identity plus approved resizing/cropping/re-encoding, and compare the visible
content. Unauthorized cropping or altered labels fails fidelity. Compare table
semantics and row/column order rather than Markdown whitespace. Material changes
invalidate only affected approvals/checks, not unrelated work.

## 4. Word fidelity

When revising or exporting DOCX content, preserve selected table text, figures, captions, sources, asset IDs, order, and intended position relative to explanations. Use native Word tables and embedded inline images on routes that require them. Record whether the selected revision is working or approved. Exporting a working revision does not require new content approval and does not confer approval. Keep internal asset IDs in records rather than printing them into the report. Inspect the latest adopted source/template; preserve unrelated fields, formatting, and native Word equations. Where an existing template requires positioned figures, disclose a conflict with an inline-only route instead of silently changing wrapping.

Structural verification must inspect the actual DOCX package for:

* `w:tbl`, table cell text, header formatting and required borders/shading;
* image relationships and media parts;
* `wp:inline` drawings and their relationship IDs;
* captions and source attribution;
* paragraph/asset ordering and placement against the approved/requested relative
  position (after the explanatory paragraph only when that position is specified);
* template styles, fonts, margins, spacing and page settings when required.

Template, rubric and explicit user formatting requirements take precedence over
suggested defaults. Preserve established formatting when no change is requested;
do not silently impose Times New Roman, Calibri, spacing, borders, shading or a
caption style. Material conflicts are reported rather than guessed.

XML checks do not prove visual layout. Reopen and render the output when the host
supports it, then inspect clipping, overflow, pagination and readable captions.
Converter success alone, a matching element count, or a hand-authored fixture is
not full document verification.

Compare cell text/order, merges and units with the selected table. Resolve each
image relationship to actual embedded media; an external link alone does not pass.
Compare media content (and any permitted transformation), crop and dimensions with
the selected figure, then caption/source and its paragraph-relative location.
Matching counts alone cannot detect swapped assets or changed values. Check effective
formatting, including inherited styles and direct overrides, against the template.

## 5. Evidence layers and host limits

Keep these evidence classes separate:

1. source/package contract checks;
2. actual DOCX structural checks;
3. rendered DOCX/layout checks;
4. native PI-Desktop Skill/tool traces and host acceptance.

An unavailable display, attachment, embedding, inspection or rendering capability
must be recorded as unavailable, unverified or blocked with a safe fallback. It
must not be replaced by a guessed URL, fabricated screenshot, or claim of native
PI-Desktop acceptance.

Report the exact target revision and scope checked. If embedding is unavailable,
retain the requested content and offer a supported limited handoff without claiming a
complete DOCX. If inspection or rendering is unavailable, disclose the unchecked
properties; structural success never implies rendered success. Keep native
acceptance PENDING until attempted on PI, or BLOCKED with the actual capability
failure and the evidence needed to resolve it. Independent supported work proceeds.
