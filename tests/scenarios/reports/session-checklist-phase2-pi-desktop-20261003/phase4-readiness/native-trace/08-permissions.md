# UNAVAILABLE — Gate 8: permissions and enablement

Status: `UNAVAILABLE`  
Gate status: `BLOCKED`

No direct PI-Desktop 0.16.0 host evidence was captured for installed package identity, installed path, enabled state, effective project scope, or permission grants. [The manifest](../../../../../../adapters/pi/manifest.json) and [installation notes](../../../../../../adapters/pi/install.md) declare/request `agent.prompt.inject` and `agent.extension`, but explicitly say that build/package presence cannot grant host permissions.

The operator log's reported bootstrap smoke-check and package path are not independently inspected host permission evidence.

Required future artifact: redacted PI-Desktop UI/runtime record showing the package ID/version/path, enabled scope, both actual grants, host version, and correlation to the sessions used for SCL01–SCL10.
