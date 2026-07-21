/**
 * Create professional runtime folder scaffolds + .github + cursor rules.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
function w(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + "\n", "utf8");
  console.log("wrote", rel);
}

// Runtime scaffolds
const scaffolds = {
  "Engine/README.md": `# Engine

Framework runtime modules (UnrealSharp C# + native bridges).

**Phase 1+.** Do not place map-specific content here.

Planned modules (see \`docs/01-Engine/\`):

- \`Afterlife.Core\` — Event Bus, Registries, Assets, Saves, Plugins
- \`Afterlife.Net\` — Networking helpers
- \`Afterlife.Gameplay\` — Gameplay systems
- \`Afterlife.UI\` — Frontend
- \`Afterlife.Hub\` — Hub client

Constitution: maps own content; **this folder owns behavior**.
`,
  "Game/README.md": `# Game

Shipping / sample game host project that consumes the Engine.

Not the framework itself. Keep thin: boot, default mode wiring, sample content references.

Primary sample experiences live under \`Samples/\`.
`,
  "Plugins/README.md": `# Plugins

First-party Unreal / UnrealSharp plugins shipped with Afterlife Framework.

Third-party and community plugins are distributed via **Afterlife Hub**, not by forking this folder.
`,
  "Samples/README.md": `# Samples

Official sample maps, mods, and content packs that demonstrate framework APIs.

Samples must:

- Use documented public APIs only
- Avoid proprietary IP
- Remain playable across minor framework versions when possible
`,
  "Templates/README.md": `# Templates

Starter templates for creators:

- Empty survival map
- Weapon definition pack
- Perk pack
- Game mode / mutator
- Mod package manifest

Phase 3 Tools will generate packages from these templates.
`,
  "Tests/README.md": `# Tests

Automated tests:

- Unit (\`Tests/Unit\`)
- Integration (\`Tests/Integration\`)
- Networked smoke (\`Tests/NetSmoke\`)

Behavioral changes require tests or an explicit test plan. See \`docs/07-Coding/testing/\`.
`,
  "Tools/README.md": `# Tools

Developer and creator tooling:

- Documentation generators / validators
- Map validators (Phase 3)
- Package builders (\`.afmap\`, \`.afmod\`, \`.afcollection\`)
- CI helpers

Existing Node helpers currently live under \`tools/\` (lowercase) during the docs era and will consolidate here as runtime tooling matures.
`,
};

for (const [rel, body] of Object.entries(scaffolds)) w(rel, body);

// .gitkeep for empty future trees
["Engine", "Game", "Plugins", "Samples", "Templates", "Tests"].forEach((d) => {
  w(`${d}/.gitkeep`, "");
});

// GitHub
w(
  ".github/pull_request_template.md",
  `## Summary

-

## Constitution check

- [ ] Does **not** violate [Constitution](../docs/00-Vision/Afterlife-Framework-Constitution.md)
- [ ] Extensible / replaceable / data-driven where applicable
- [ ] No forced objectives in core
- [ ] Server-authoritative if gameplay state touched

## RFC

- [ ] N/A
- [ ] RFC #### accepted — link:

## Docs

- [ ] Docs updated under \`docs/\`
- [ ] \`CHANGELOG.md\` updated (\`[Unreleased]\`)

## Tests

- [ ] Unit
- [ ] Integration / networked (if applicable)
- [ ] Manual test plan:

## Compatibility

- [ ] No intentional break
- [ ] Migration notes (if any):

## Checklist

- [ ] Follows roadmap phase (\`ROADMAP.md\`)
- [ ] No proprietary IP in core
- [ ] No Event Bus bypass for cross-system communication
`
);

w(
  ".github/ISSUE_TEMPLATE/config.yml",
  `blank_issues_enabled: false
contact_links:
  - name: Documentation
    url: https://github.com/escaleirex/Afterlife-Framework/blob/main/docs/index.md
    about: Read the docs and Constitution before opening issues.
  - name: RFC Process
    url: https://github.com/escaleirex/Afterlife-Framework/blob/main/docs/RFC/process.md
    about: Major features start as RFCs, not drive-by PRs.
`
);

w(
  ".github/ISSUE_TEMPLATE/feature.yml",
  `name: Feature / System
description: Propose a framework feature or gameplay system (usually needs an RFC)
title: "[Feature]: "
labels: ["type:feature", "needs-triage"]
body:
  - type: markdown
    attributes:
      value: |
        Read the [Constitution](../docs/00-Vision/Afterlife-Framework-Constitution.md) first.
        Major gameplay features require an RFC before implementation.
  - type: textarea
    id: problem
    attributes:
      label: Problem
      description: What problem does this solve for creators?
    validations:
      required: true
  - type: textarea
    id: proposal
    attributes:
      label: Proposal
      description: High-level approach (link docs/RFC if any)
    validations:
      required: true
  - type: dropdown
    id: phase
    attributes:
      label: Roadmap phase
      options:
        - Phase 1 — Engine
        - Phase 2 — Gameplay
        - Phase 3 — Tools
        - Phase 4 — Online Ecosystem
        - Phase 5 — Public Release
        - Phase 6+ — Expansion
        - Unsure
    validations:
      required: true
  - type: checkboxes
    id: constitution
    attributes:
      label: Constitution
      options:
        - label: This does not force objectives/quests in core
          required: true
        - label: This remains modular / replaceable / data-driven
          required: true
        - label: This respects multiplayer server authority
          required: true
`
);

w(
  ".github/ISSUE_TEMPLATE/bug.yml",
  `name: Bug report
description: Report incorrect behavior against documented specs
title: "[Bug]: "
labels: ["type:bug", "needs-triage"]
body:
  - type: textarea
    id: expected
    attributes:
      label: Expected (per docs)
      description: Link the owning doc section if possible
    validations:
      required: true
  - type: textarea
    id: actual
    attributes:
      label: Actual
    validations:
      required: true
  - type: textarea
    id: repro
    attributes:
      label: Reproduction
      description: Dedicated server? Player count? Map/mod versions?
    validations:
      required: true
  - type: input
    id: version
    attributes:
      label: Framework / package versions
`
);

w(
  ".github/ISSUE_TEMPLATE/rfc.yml",
  `name: RFC tracking
description: Track an RFC through review and implementation
title: "[RFC]: "
labels: ["type:rfc", "needs-triage"]
body:
  - type: input
    id: rfc
    attributes:
      label: RFC path
      description: e.g. rfcs/0002-event-bus.md
    validations:
      required: true
  - type: input
    id: docs
    attributes:
      label: Related docs
      description: Paths under docs/
  - type: dropdown
    id: status
    attributes:
      label: RFC status
      options: [Draft, Review, Accepted, Implemented, Rejected, Deferred, Superseded]
    validations:
      required: true
  - type: textarea
    id: notes
    attributes:
      label: Discussion notes
`
);

w(
  ".github/ISSUE_TEMPLATE/docs.yml",
  `name: Documentation
description: Docs gap, clarification, or correction
title: "[Docs]: "
labels: ["type:docs", "needs-triage"]
body:
  - type: input
    id: path
    attributes:
      label: Doc path
    validations:
      required: true
  - type: textarea
    id: change
    attributes:
      label: What should change?
    validations:
      required: true
`
);

w(
  ".github/workflows/docs.yml",
  `name: Docs

on:
  push:
    branches: [main]
    paths:
      - "docs/**"
      - "rfcs/**"
      - "README.md"
      - "ROADMAP.md"
      - "CHANGELOG.md"
      - ".github/workflows/docs.yml"
  pull_request:
    paths:
      - "docs/**"
      - "rfcs/**"
      - "README.md"
      - "ROADMAP.md"
      - "CHANGELOG.md"

jobs:
  markdown-lint-links:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check Constitution exists
        run: test -f docs/00-Vision/Afterlife-Framework-Constitution.md || test -f docs/00-vision/Afterlife-Framework-Constitution.md
      - name: Check required foundation files
        run: |
          test -f README.md
          test -f ROADMAP.md
          test -f CONTRIBUTING.md
          test -f CHANGELOG.md
          test -f docs/index.md
          test -f docs/RFC/process.md -o -f docs/rfc/process.md
`
);

w(
  ".github/workflows/ci-placeholder.yml",
  `name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  foundation-gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Refuse empty Engine without docs era note
        run: |
          echo "Runtime CI lands with Phase 1 Engine."
          echo "Docs-era gate: required project files present."
          test -f docs/index.md
          test -f .cursor/rules/constitution.mdc -o -f .cursor/rules/00a-constitution.mdc
`
);

w(
  ".github/FUNDING.yml",
  `# Optional — enable when ready
# github: [escaleirex]
# custom: []
`
);

w(
  ".github/PROJECTS.md",
  `# GitHub Projects Board

Use **GitHub Projects** (not a giant TODO markdown file) as the engineering board.

## Recommended columns

\`\`\`
Backlog → RFC Writing → Ready → In Progress → Review → Testing → Done
\`\`\`

## Rules

1. Every major gameplay/engine feature starts as a **GitHub Issue**.
2. Issues that need design move to **RFC Writing** and link \`rfcs/XXXX-*.md\`.
3. Implementation only after RFC **Accepted** (when RFC-required).
4. Issues link related docs under \`docs/\`.
5. PRs reference issues (\`Closes #N\`) and RFCs.

## Seed systems (create as issues)

| Issue theme | Docs |
|-------------|------|
| Event Bus | \`docs/01-Engine/core/event-bus.md\` |
| Registries | \`docs/01-Engine/core/registries.md\` |
| Round Director | \`docs/02-Gameplay/rounds/\` |
| Spawn / AI Director | \`docs/02-Gameplay/spawn-director/\`, \`ai/\` |
| Weapon Registry | \`docs/02-Gameplay/weapons/\` |
| Perk System | \`docs/02-Gameplay/perks/\` |
| Consumables | \`docs/02-Gameplay/consumables/\` |
| Upgrade Station | \`docs/02-Gameplay/pack-a-punch/\` |
| Random Weapon Crate | \`docs/02-Gameplay/mystery-box/\` |
| Afterlife Hub | \`docs/05-Modding/hub/\` |

Create the Project in the GitHub UI: **Projects → New project → Board**, then add these columns and issues.
`
);

console.log("scaffolds + github done");
