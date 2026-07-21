# Folder Structure

## Purpose

Define the canonical repository and Unreal content layout.

## Repository Root

```
Afterlife-Framework/
├── .cursor/rules/           # Agent rules (mandatory)
├── .github/                 # CI workflows (when added)
├── docs/                    # Official documentation (source of truth)
├── rfcs/                    # RFC documents
├── tools/                   # Generators, validators, CI helpers
├── Source/                  # Native + managed modules (runtime era)
│   ├── Afterlife.Core/
│   ├── Afterlife.Net/
│   ├── Afterlife.Gameplay/
│   ├── Afterlife.UI/
│   ├── Afterlife.Hub/
│   └── Afterlife.Editor/
├── Plugins/                 # First-party UE plugins
├── Content/                 # UE content
│   ├── Afterlife/
│   │   ├── Core/
│   │   ├── Gameplay/
│   │   ├── UI/
│   │   ├── Audio/
│   │   └── Dev/
│   └── Maps/
├── Tests/
├── Samples/                 # Sample map + sample mod
├── CHANGELOG.md
├── CONTRIBUTING.md
├── ROADMAP.md
├── LICENSE
└── README.md
```

## C# Project Layout (Runtime Era)

```
Source/Afterlife.Gameplay/
  Rounds/
  Economy/
  AI/
  Weapons/
  Perks/
  Directors/
  Interactions/
```

## Content Naming Root

All first-party assets live under `/Game/Afterlife/...`.

Sample-only content lives under `/Game/Afterlife/Samples/...` and must not be required by core.

## Documentation Layout Rules

- One primary doc per system
- Deep topics get sibling files in the same folder
- Avoid duplicating full specs; cross-link instead

## Related Documents

- [Naming Conventions](naming-conventions.md)
- [Module Boundaries](module-boundaries.md)
