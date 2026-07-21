/**
 * Replace cursor rules with professional named set from engine recommendation.
 * Keeps alwaysApply discipline; removes old numbered duplicates.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.cursor/rules");
fs.mkdirSync(DIR, { recursive: true });

// Remove old rules
for (const f of fs.readdirSync(DIR)) {
  if (f.endsWith(".mdc")) fs.unlinkSync(path.join(DIR, f));
}

function rule(name, description, alwaysApply, body, globs) {
  const lines = ["---", `description: ${description}`, `alwaysApply: ${alwaysApply ? "true" : "false"}`];
  if (globs) lines.push(`globs: ${globs}`);
  lines.push("---", "", body.trim(), "");
  fs.writeFileSync(path.join(DIR, name), lines.join("\n"), "utf8");
  console.log("wrote", name);
}

rule(
  "constitution.mdc",
  "Afterlife Framework Constitution — supreme project law",
  true,
  `# Constitution

Read and obey \`docs/00-Vision/Afterlife-Framework-Constitution.md\` before architectural or gameplay decisions.

If a change violates any Article, reject or redesign it.

Amendments require a rare RFC. Never bypass Articles for demos or speed.

Never add \`Co-authored-by: Cursor\` or any Cursor attribution trailer to commits.
`
);

rule(
  "roadmap.mdc",
  "Do not skip Afterlife Framework roadmap phases",
  true,
  `# Roadmap Discipline

Obey root \`ROADMAP.md\` / \`docs/Roadmap.md\`.

- Do not implement Phase N+1 work on main early
- Tools do not precede Engine; Hub does not precede Gameplay
- Docs-era foundation must exist before gameplay classes
`
);

rule(
  "documentation.mdc",
  "Documentation-first and docs contract",
  true,
  `# Documentation

1. Docs are source of truth (Constitution Article XIV).
2. Read \`docs/index.md\` and the owning section doc before coding.
3. Update docs + \`CHANGELOG.md\` in the same change as behavior.
4. Keep the system doc contract sections.
5. Cross-link; do not duplicate full specs.

Doc layout:

\`docs/00-Vision\` … \`docs/07-Coding\`, \`docs/RFC\`
`
);

rule(
  "architecture.mdc",
  "Engine architecture laws",
  true,
  `# Architecture

- Framework is an engine, not a game (Article I)
- Maps own content; framework owns behavior (Article II)
- Composition over inheritance
- Registries + Asset Manager + Dependency Loader + Plugin System
- Never invent undocumented architecture — RFC first
- Prefer extending existing systems over parallel duplicates

See \`docs/01-Engine/\`.
`
);

rule(
  "networking.mdc",
  "Multiplayer-first authority",
  true,
  `# Networking

- Multiplayer first; singleplayer emerges from the same paths
- Server authoritative; clients never own gameplay truth
- Dedicated servers required for gameplay systems
- Validate all spend/activate intents on server

See \`docs/04-Multiplayer/\`.
`
);

rule(
  "gameplay.mdc",
  "Gameplay modularity and discovery",
  true,
  `# Gameplay

- Discovery over instruction — no required objectives/quest arrows in core
- Optional objective plugins only (\`docs/02-Gameplay/quest-framework/\`)
- Every major system replaceable via strategies/registries
- Data-driven definitions; no hardcoded content lists
- Generic names in core (UpgradeStation, Consumable, RandomWeaponCrate)

See \`docs/02-Gameplay/\`.
`,
  "**/Gameplay/**/*,docs/02-Gameplay/**/*"
);

rule(
  "modding.mdc",
  "Modding and Afterlife Hub",
  true,
  `# Modding & Hub

- Modding is first-class
- Afterlife Hub is the content platform — not Steam Workshop lock-in
- Players must never manually install dependencies
- Support global mods, content packs, embedded mods, map requires/recommends

See \`docs/05-Modding/\`.
`,
  "docs/05-Modding/**/*,**/Hub/**/*,**/Modding/**/*"
);

rule(
  "coding.mdc",
  "Coding standards, tests, RFCs, commits",
  true,
  `# Coding

- Readability over cleverness
- Follow \`docs/07-Coding/standards/code-style.md\`
- Behavioral changes need tests or an explicit test plan
- Major features need RFC (\`docs/RFC/process.md\`)
- No proprietary IP names in core
- Never bypass Event Bus for cross-system facts
- Commit author is the human owner — never add Cursor as co-author
`
);

console.log("cursor rules replaced");
