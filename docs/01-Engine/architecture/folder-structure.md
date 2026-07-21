# Folder Structure

## Purpose

Define the canonical repository layout for Afterlife Framework as a professional engine project.

## Repository Root

\`\`\`
Afterlife-Framework/
├── .github/                 # Issues, PR template, workflows, Projects notes
├── .cursor/rules/           # Agent discipline (constitution, architecture, …)
├── docs/                    # Official documentation (source of truth)
│   ├── 00-Vision/           # Constitution, philosophy, getting started
│   ├── 01-Engine/           # Architecture + core services
│   ├── 02-Gameplay/         # Gameplay system specs
│   ├── 03-Maps/             # Mapping guide
│   ├── 04-Multiplayer/      # Networking
│   ├── 05-Modding/          # Mods, Hub, plugins
│   ├── 06-UI/               # Frontend + lobby
│   ├── 07-Coding/           # Standards, testing, CI
│   ├── RFC/                 # RFC process docs
│   ├── Roadmap.md           # Pointer to root ROADMAP.md
│   └── index.md
├── rfcs/                    # Numbered RFC proposals
├── Engine/                  # Framework runtime modules (Phase 1+)
├── Game/                    # Thin game host consuming Engine
├── Plugins/                 # First-party UE/UnrealSharp plugins
├── Samples/                 # Official sample maps/mods
├── Templates/               # Creator starter templates
├── Tests/                   # Automated tests
├── Tools/                   # Creator/dev tooling (consolidating)
├── tools/                   # Docs-era generators (migrate into Tools/)
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── LICENSE
├── ROADMAP.md
├── SECURITY.md
└── AGENTS.md
\`\`\`

## Documentation Numbering

Numbered sections mirror a professional engine manual. Start at \`00-Vision\` (Constitution) before any other section.

## Runtime Modules (Future)

\`\`\`
Engine/
  Afterlife.Core/
  Afterlife.Net/
  Afterlife.Gameplay/
  Afterlife.UI/
  Afterlife.Hub/
  Afterlife.Editor/
\`\`\`

## Rules

1. Do not put map gameplay systems inside \`Samples/\` as forks of Engine.
2. Community content ships via Afterlife Hub packages, not by committing random maps to \`main\`.
3. \`Game/\` stays thin.

## Related Documents

- [Architecture Overview](overview.md)
- [Constitution](../../00-Vision/Afterlife-Framework-Constitution.md)
- [GitHub Projects](../../../.github/PROJECTS.md)
