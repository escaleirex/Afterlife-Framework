/**
 * Afterlife Framework — Cursor rules generator
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, ".cursor", "rules");
fs.mkdirSync(DIR, { recursive: true });

function rule(name, description, body, globs) {
  const front = [
    "---",
    `description: ${description}`,
    "alwaysApply: " + (globs ? "false" : "true"),
  ];
  if (globs) front.push(`globs: ${globs}`);
  front.push("---", "", body.trim(), "");
  fs.writeFileSync(path.join(DIR, name), front.join("\n"), "utf8");
  console.log("wrote", name);
}

rule(
  "00-afterlife-core.mdc",
  "Core Afterlife Framework laws for all agent work",
  `
# Afterlife Framework — Core Agent Laws

You are working on **Afterlife Framework**, an open-source Unreal Engine 5 framework (C# / UnrealSharp) for round-based survival experiences.

You are NOT building a Call of Duty clone. You are building a generic, modular engine.

## Mandatory Behavior

1. **Read documentation first** before implementing or inventing anything. Start at \`docs/index.md\` and the owning system doc.
2. **Never skip roadmap phases.** Respect \`ROADMAP.md\`. Do not implement Phase N+1 features on \`main\` early.
3. **Never invent undocumented architecture.** If a needed system is missing, draft/update an RFC (\`docs/rfc/process.md\`) and docs first.
4. **Always update documentation** in the same change as behavior.
5. **Always update \`CHANGELOG.md\`** under \`[Unreleased]\` for user-facing / API / docs-baseline changes.
6. **Always write tests** (or an explicit test plan) for behavioral changes.
7. **Follow coding standards** in \`docs/standards/code-style.md\`.
8. **Never hardcode gameplay** content identity, balance numbers that belong in data, or proprietary IP names in core.
9. **Never bypass the Event Bus** for cross-system communication.
10. **Never duplicate systems** that already exist—extend via registries, strategies, plugins.
11. **Always favor extensibility**—maps/mods must replace behavior without forking core.
12. **Multiplayer first**—server authority; clients never own gameplay state.
13. **No core quest ontology**—no Main Quest / Side Quest / Objective / Mission systems in core.
14. **Compatibility**—never intentionally break map compatibility; prefer additive changes + migrations.

## Source of Truth

If code and docs disagree: fix code to match docs, OR amend docs via RFC when the design intentionally changes.
`
);

rule(
  "01-documentation-first.mdc",
  "Require docs-first workflow and doc contract",
  `
# Documentation First

Before coding a system:

1. Open the system document under \`docs/\`.
2. Confirm Purpose / Architecture / Networking / Events / Extension Points.
3. If the doc is missing or TBD for a required behavior, update the doc (and RFC if needed) before implementation.

When editing docs, keep the system doc contract sections intact.

Cross-link; do not fork duplicate specs.
`,
  "docs/**/*.md,rfcs/**/*.md,*.md"
);

rule(
  "02-event-bus-and-registries.mdc",
  "Enforce Event Bus and Registry usage",
  `
# Event Bus & Registries

- Cross-system facts go through the Event Bus (\`docs/core/event-bus.md\`).
- Content lookups go through Registries (\`docs/core/registries.md\`).
- Do not scan Content folders at runtime for gameplay decisions.
- Do not create a second parallel pub/sub “for convenience.”
- Prefer RPCs for commands; Bus for facts after authoritative mutation.
`
);

rule(
  "03-networking-authority.mdc",
  "Enforce multiplayer authority model",
  `
# Networking Authority

Read \`docs/philosophy/multiplayer-doctrine.md\` and \`docs/networking/authority.md\`.

Forbidden:

- Client-authoritative currency, inventory, rounds, doors, power, enemy health, RNG outcomes
- “Singleplayer shortcut” branches that skip validation

Required:

- Dedicated-server-safe design
- Validation of all purchase/activation intents on server
- Explicit late-join policy when relevant
`
);

rule(
  "04-gameplay-modularity.mdc",
  "Keep gameplay modular and data-driven",
  `
# Gameplay Modularity

- Prefer strategies/interfaces over hardcoded flows.
- Tunables live in data assets/tables.
- Maps should need almost no gameplay code.
- Use generic names: UpgradeStation, RandomWeaponCrate, Consumable, PerkDefinition.
- Sample content may be evocative but must not introduce proprietary IP into core.
`,
  "**/Gameplay/**/*.*,docs/gameplay/**/*.md"
);

rule(
  "05-discovery-no-objectives.mdc",
  "Forbid core objective/quest systems",
  `
# Discovery Philosophy Enforcement

Do NOT add to core:

- MainQuest, SideQuest, Objective, Mission types/managers/HUD trackers

Optional objective-like features belong in opt-in plugins/maps as documented in \`docs/gameplay/quest-framework/index.md\`.

Core HUD must not assume a quest tracker.
`
);

rule(
  "06-modding-and-hub.mdc",
  "Protect modding and Afterlife Hub workflows",
  `
# Modding & Hub

- Do not integrate Steam Workshop as the primary content path.
- Afterlife Hub is the content platform (\`docs/hub/index.md\`).
- Players must not need to manually install dependencies—use Dependency Loader.
- Preserve package manifests, version ranges, and lockfile hash agreement.
`,
  "docs/hub/**/*.md,docs/modding/**/*.md,**/Hub/**/*.*"
);

rule(
  "07-rfc-required.mdc",
  "Require RFCs for new gameplay features",
  `
# RFC Gate

New gameplay features and breaking public contracts require an RFC per \`docs/rfc/process.md\`.

Implementation PRs must reference \`RFC-XXXX\` when applicable.

Do not silently expand public API surface without docs.
`
);

rule(
  "08-testing-changelog.mdc",
  "Require tests and changelog updates",
  `
# Tests & Changelog

For behavioral changes:

1. Add/update automated tests OR document a precise manual/networked test plan in the PR.
2. Update \`CHANGELOG.md\` \`[Unreleased]\`.
3. Update owning docs.

Do not merge “temporary” untested authority bypasses.
`
);

rule(
  "09-naming-and-ip.mdc",
  "Naming conventions and IP safety",
  `
# Naming & IP Safety

Follow \`docs/architecture/naming-conventions.md\`.

Never add Activision/Treyarch/Call of Duty trademarked mode/perk/weapon/map names to core code, core content, or core docs examples.

Inspiration is allowed in prose philosophy docs as historical context only; implementation identifiers stay generic.
`
);

rule(
  "10-cursor-execution.mdc",
  "How Cursor agents should execute Afterlife tasks",
  `
# Execution Playbook

1. Identify roadmap phase for the task.
2. Read philosophy + owning system docs.
3. Search for existing systems to extend.
4. If new subsystem: RFC + docs first.
5. Implement minimally against the documented architecture.
6. Add tests.
7. Update docs + CHANGELOG.
8. Summarize with links to docs touched.

Prefer small, reviewable diffs that match the engine—not a game vertical slice that skips foundations.
`
);

console.log("Cursor rules done");
