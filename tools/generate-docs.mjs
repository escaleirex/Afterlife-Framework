/**
 * Afterlife Framework — Documentation Generator (part A: foundation)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const written = [];

function w(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  const body = String(content).replace(/^\uFEFF?/, "").replace(/\s+$/, "") + "\n";
  fs.writeFileSync(full, body, "utf8");
  written.push(rel);
}

function sys({ title, purpose, responsibilities, architecture, authority, config, presentation, extension, dataFlow, networking, events, extensionPoints, examples, edgeCases, future, related }) {
  return `# ${title}

## Purpose

${purpose}

## Responsibilities

${responsibilities}

## Architecture

${architecture}

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | ${authority || "Server (subsystem / game state)"} |
| Configuration | ${config || "Data assets + Registries"} |
| Presentation | ${presentation || "Client UI / HUD listeners"} |
| Extension | ${extension || "Plugins, Content Packs, Map Overrides"} |

## Data Flow

${dataFlow}

## Networking

${networking}

## Events

${events}

## Extension Points

${extensionPoints}

## Examples

${examples}

## Edge Cases

${edgeCases}

## Future Considerations

${future}

## Related Documents

${related}
`;
}

// ---- Getting Started ----
w("docs/getting-started/overview.md", `# Getting Started Overview

## Purpose

Orient new contributors, mappers, and modders to Afterlife Framework without requiring prior Call of Duty knowledge.

## What You Are Building On

Afterlife Framework is an Unreal Engine 5 framework written primarily in **C# via UnrealSharp**. It provides reusable gameplay systems for round-based survival maps.

You are not expected to ship a commercial game inside this repository. You are expected to harden an engine other people will use for years.

## Choose Your Path

| Role | Start here | Then read |
|------|------------|-----------|
| Engine programmer | [Developer Setup](developer-setup.md) | [Architecture](../architecture/overview.md), [Event Bus](../core/event-bus.md) |
| Gameplay programmer | [Gameplay Index](../gameplay/index.md) | [Rounds](../gameplay/rounds/index.md), [Networking](../networking/overview.md) |
| Mapper | [Mapping Guide](../mapping/index.md) | [Discovery Philosophy](../philosophy/discovery-philosophy.md) |
| Modder | [Modding Guide](../modding/index.md) | [Registries](../core/registries.md), [Hub](../hub/index.md) |
| UI engineer | [UI Index](../ui/index.md) | [Lobby](../lobby/index.md) |

## Absolute Rules (Read Once)

1. Documentation is the source of truth.
2. Do not skip [roadmap](../../ROADMAP.md) phases.
3. Do not invent undocumented architecture.
4. Do not hardcode proprietary IP.
5. Do not add Main Quest / Objective ontology to core.
6. Do not put gameplay authority on clients.
7. Do not bypass the Event Bus for cross-system chatter.
8. Update CHANGELOG and docs in the same PR as behavior changes.

## First Week Checklist

- [ ] Read Design + Discovery + Multiplayer doctrines
- [ ] Skim architecture folder structure
- [ ] Read Event Bus + Registries
- [ ] Run developer setup
- [ ] Make a docs-only or test-only PR as a warm-up

## Related Documents

- [First Contribution](first-contribution.md)
- [Glossary](glossary.md)
- [Contributing](../../CONTRIBUTING.md)
`);

w("docs/getting-started/developer-setup.md", `# Developer Setup

## Purpose

Provide a reproducible environment for contributing to Afterlife Framework.

## Prerequisites

| Tool | Notes |
|------|-------|
| Unreal Engine 5.x | Version pinned in project \`README\` / CI matrix when runtime exists |
| Visual Studio / Rider | C# + C++ tooling as required by UnrealSharp |
| Git | Long paths enabled on Windows recommended |
| .NET SDK | Version required by UnrealSharp pin |
| Python optional | Tooling scripts may use Node instead |

Exact engine/UnrealSharp versions are declared in \`DocsVersionMatrix\` (see [CI/CD](../devops/ci-cd.md)) once runtime lands.

## Repository Bootstrap (Documentation Era)

Until Phase 1 runtime exists:

\`\`\`bash
git clone <repo-url> Afterlife-Framework
cd Afterlife-Framework
# edit docs; open PRs; draft RFCs under rfcs/
\`\`\`

## Repository Bootstrap (Runtime Era)

\`\`\`bash
git clone <repo-url> Afterlife-Framework
# Install UE5 version from version matrix
# Generate project files
# Build AfterlifeEditor
# Enable UnrealSharp plugin per UnrealSharp docs
# Build C# gameplay modules
\`\`\`

## Recommended IDE Settings

- EditorConfig enforced
- Format on save for C#
- Spell check for markdown
- Cursor rules loaded from \`.cursor/rules/\`

## Running Tests

See [Testing](../testing/index.md). Minimum local loop:

\`\`\`bash
# unit
dotnet test Tests/Afterlife.Unit

# networked smoke (runtime era)
# Afterlife.Server.exe -map=/Game/Dev/Smoke -dedicated
\`\`\`

## Common Setup Failures

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| C# types missing in UE | UnrealSharp not built | Rebuild plugin + generate |
| Replication not firing | Running as client-only PIE without server | Use dedicated or listen with 2+ processes |
| Docs links broken | Moved file without updates | Run markdown link check |

## Related Documents

- [UnrealSharp Conventions](../architecture/unrealsharp-conventions.md)
- [Folder Structure](../architecture/folder-structure.md)
- [CI/CD](../devops/ci-cd.md)
`);

w("docs/getting-started/first-contribution.md", `# First Contribution

## Purpose

Give new contributors a safe path to a merged PR.

## Recommended First PRs

1. Documentation clarification with concrete edge case
2. Glossary term addition
3. Test fixture for an accepted RFC
4. Link fixes / cross-reference improvements
5. Small bug fix with regression test (runtime era)

## Steps

1. Read [CONTRIBUTING](../../CONTRIBUTING.md)
2. Confirm work is allowed in current [ROADMAP](../../ROADMAP.md) phase
3. Search issues/RFCs for duplicates
4. Branch: \`docs/short-name\` or \`fix/issue-##-short-name\`
5. Make the change
6. Update CHANGELOG \`[Unreleased]\`
7. Open PR using the checklist in CONTRIBUTING

## What “Good” Looks Like

- Precise language
- Cross-links to owning system docs
- No proprietary IP leakage
- No new architecture invented in passing

## Related Documents

- [RFC Process](../rfc/process.md)
- [Code Style](../standards/code-style.md)
`);

w("docs/getting-started/glossary.md", `# Glossary

## Purpose

Normalize vocabulary across docs, code, Hub, and community.

| Term | Meaning |
|------|---------|
| **Afterlife Framework** | The engine/framework (this project) |
| **Afterlife Hub** | In-game content platform (not Steam Workshop) |
| **Map** | Playable content package with manifest |
| **Mod** | Additive package altering or extending content/systems |
| **Content Pack** | Mod subclass focused on assets/definitions |
| **Plugin** | Code module loaded by Plugin System |
| **Embedded Mod** | Mod packaged inside a map |
| **Collection** | Hub bundle installing many packages + deps |
| **Registry** | Authoritative lookup of definitions by stable ID |
| **Event Bus** | Cross-system pub/sub with optional replication |
| **Game Mode** | Ruleset composing systems + win/fail policies |
| **Mutator** | Modular rule modifier applied in lobby |
| **Round Director** | System advancing round phases and scaling |
| **Spawn Director** | System choosing what/where/when to spawn |
| **Economy** | Currency earn/spend rules |
| **Upgrade Station** | Generic Pack-a-Punch-like upgrade service |
| **Random Weapon Crate** | Generic Mystery Box-like acquisition |
| **Consumable** | Limited-use player item (Gobblegum-like, generic) |
| **Perk Definition** | Purchasable persistent modifier while alive/down rules apply |
| **World Flag** | Generic unlock/state bit without quest semantics |
| **Discovery** | Learning through play, not objective trackers |
| **Authority** | Server-owned truth for gameplay state |
| **Manifest** | JSON/YAML metadata for maps/mods/plugins |
| **RFC** | Request for Comments design proposal |
| **Capability** | Feature flag advertised by map/mode for lobby UI |

## Naming Rule

Prefer generic engine terms in core. Sample content may use evocative names that are still original IP.
`);

// ---- Architecture ----
w("docs/architecture/overview.md", `# Architecture Overview

## Purpose

Describe the layered architecture of Afterlife Framework so implementers share one mental model.

## Layer Diagram

\`\`\`
┌──────────────────────────────────────────────────────────┐
│ Presentation (UI, HUD, Hub Client, Lobby)                │
├──────────────────────────────────────────────────────────┤
│ Gameplay Systems (Rounds, AI, Weapons, Perks, ...)       │
├──────────────────────────────────────────────────────────┤
│ Session & Mode Composition (GameMode, Mutators)          │
├──────────────────────────────────────────────────────────┤
│ Core Services (EventBus, Registries, Assets, Saves,      │
│               DependencyLoader, Plugins)                 │
├──────────────────────────────────────────────────────────┤
│ Networking (Replication, RPCs, Dedicated Server Host)    │
├──────────────────────────────────────────────────────────┤
│ Unreal Engine 5 + UnrealSharp Runtime                    │
└──────────────────────────────────────────────────────────┘
\`\`\`

## Key Ideas

1. **Maps are content**, not code hosts for core logic.
2. **Systems are services** registered at session start.
3. **Definitions are data** looked up through Registries.
4. **Signals are events** on the Event Bus.
5. **Truth is server-owned**.

## Runtime Objects (Conceptual)

| Object | Responsibility |
|--------|----------------|
| \`AfterlifeGameInstance\` | Cross-map services: Hub client, profile, asset manager |
| \`AfterlifeGameMode\` | Mode composition, match start policies |
| \`AfterlifeGameState\` | Replicated match truth (round, power, world flags) |
| \`AfterlifePlayerState\` | Replicated per-player truth (currency, perks, stats) |
| \`AfterlifePlayerController\` | Input, UI routing, server RPCs |
| Subsystems | Long-lived services (EventBus, Registries, Directors) |

Exact C# type names must follow [Naming Conventions](naming-conventions.md).

## Request Path Example (Buy Door)

\`\`\`
Client input → PlayerController RPC → Server DoorSystem validates
→ Economy debit → Door state open → WorldFlag set
→ EventBus: DoorOpened → Music/AI/UI listeners react
→ Replicate door + currency
\`\`\`

## Non-Goals of This Document

Detailed per-system design lives in \`docs/core/*\` and \`docs/gameplay/*\`.

## Related Documents

- [Module Boundaries](module-boundaries.md)
- [Composition Model](composition-model.md)
- [Folder Structure](folder-structure.md)
- [Event Bus](../core/event-bus.md)
`);

w("docs/architecture/folder-structure.md", `# Folder Structure

## Purpose

Define the canonical repository and Unreal content layout.

## Repository Root

\`\`\`
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
\`\`\`

## C# Project Layout (Runtime Era)

\`\`\`
Source/Afterlife.Gameplay/
  Rounds/
  Economy/
  AI/
  Weapons/
  Perks/
  Directors/
  Interactions/
\`\`\`

## Content Naming Root

All first-party assets live under \`/Game/Afterlife/...\`.

Sample-only content lives under \`/Game/Afterlife/Samples/...\` and must not be required by core.

## Documentation Layout Rules

- One primary doc per system
- Deep topics get sibling files in the same folder
- Avoid duplicating full specs; cross-link instead

## Related Documents

- [Naming Conventions](naming-conventions.md)
- [Module Boundaries](module-boundaries.md)
`);

w("docs/architecture/naming-conventions.md", `# Naming Conventions

## Purpose

Keep identifiers predictable across C#, Blueprints, assets, Hub packages, and docs.

## General Rules

- English, PascalCase for types, camelCase for locals
- No proprietary IP names in core identifiers
- Prefer precise words: \`UpgradeStation\` not \`PaP\` in public APIs (aliases allowed in sample content)
- Stable IDs are lowercase dotted: \`afterlife.weapon.starter_pistol\`

## C# Types

| Kind | Pattern | Example |
|------|---------|---------|
| Subsystem | \`AfterlifeXSubsystem\` | \`AfterlifeEventBusSubsystem\` |
| Definition data | \`XDefinition\` | \`PerkDefinition\` |
| Component | \`XComponent\` | \`PerkInventoryComponent\` |
| Interface | \`IAfterlifeX\` | \`ISpawnDirectorStrategy\` |
| Event payload | \`XEvent\` / \`XMessage\` | \`RoundStartedEvent\` |
| Service | \`XService\` / \`XSystem\` | \`DoorSystem\` |

## Assets

\`\`\`
DA_Perk_ExampleTank
DT_RoundHealthCurve_Default
BP_WallBuyPoint
WBP_HUD_Currency
SFX_UI_PurchaseSuccess
\`\`\`

Prefixes: \`DA_\` data asset, \`DT_\` data table, \`BP_\` blueprint, \`WBP_\` widget, \`SFX_\`/\`MUSIC_\` audio.

## Hub Package IDs

\`\`\`
com.<creator>.<package>
\`\`\`

Example: \`com.acme.maps.abandoned_rail\`

## Events

\`Domain.Action\` style names:

\`\`\`
Round.Started
Round.Ended
Economy.CurrencyChanged
Door.Opened
Power.Activated
Enemy.Killed
\`\`\`

## Forbidden in Core Namespaces

\`MainQuest\`, \`SideQuest\`, \`MissionSystem\`, and proprietary franchise identifiers.

## Related Documents

- [Code Style](../standards/code-style.md)
- [Registries](../core/registries.md)
- [Event Bus](../core/event-bus.md)
`);

w("docs/architecture/module-boundaries.md", `# Module Boundaries

## Purpose

Prevent cyclic dependencies and god-modules.

## Allowed Dependency Direction

\`\`\`
UI → Gameplay → Core → Net abstractions → Engine
Hub Client → Core
Editor → everything (editor-only)
\`\`\`

Gameplay must not depend on UI widgets. UI listens to events / view models.

## Module Responsibilities

| Module | May contain | Must not contain |
|--------|-------------|------------------|
| Core | EventBus, Registries, Saves, Plugins, Assets | Weapon firing logic |
| Net | Replication helpers, server host utils | Perk effect math |
| Gameplay | Directors, AI, economy, interactions | Hub HTTP client |
| UI | Widgets, navigation | Authoritative state mutation |
| Hub | Storefront client, install orchestration | Round director |
| Editor | Validators, preview tools | Shipping-only hacks |

## Boundary Enforcement

- Architecture tests (runtime era) fail builds on illegal references
- RFCs required to introduce new top-level modules

## Related Documents

- [Architecture Overview](overview.md)
- [Composition Model](composition-model.md)
`);

w("docs/architecture/composition-model.md", `# Composition Model

## Purpose

Explain how modes, mutators, maps, and plugins compose at runtime.

## Composition Stack

\`\`\`
Framework Defaults
  + Game Mode definition
  + Mutators (lobby ordered)
  + Global Mods
  + Map Embedded Mods
  + Map Required Mods
  + Map Overrides (data)
\`\`\`

Later layers override earlier layers only through documented override channels (registry overrides, capability flags, strategy registration)—not by silent monkey-patching.

## Strategies

Systems expose strategy interfaces:

- \`ISpawnDirectorStrategy\`
- \`IRoundScalingStrategy\`
- \`ICrateWeightStrategy\`

Default implementations ship in framework. Maps/mods register replacements via Plugin System at load.

## Capabilities

Maps advertise capabilities consumed by Lobby UI:

\`\`\`json
{
  "capabilities": [
    "consumables",
    "character_select",
    "mutators",
    "difficulty"
  ]
}
\`\`\`

Unsupported panels hide rather than error.

## Related Documents

- [Game Modes](../gameplay/game-modes/index.md)
- [Lobby](../lobby/index.md)
- [Plugin System](../core/plugin-system.md)
`);

w("docs/architecture/unrealsharp-conventions.md", `# UnrealSharp Conventions

## Purpose

Standardize C# usage on UnrealSharp for Afterlife Framework.

## Principles

1. Prefer C# for gameplay systems and tools logic.
2. Use C++/Blueprints only where UnrealSharp cannot express a requirement cleanly.
3. Keep UObject boundaries explicit; do not fight the engine’s lifetime model.
4. Replication attributes and RPCs must be reviewed for bandwidth and authority.

## Patterns

### Subsystems

Long-lived services should be World or GameInstance subsystems depending on lifetime:

- Match-scoped: World subsystem
- Cross-map (Hub, profile): GameInstance subsystem

### Data Assets

Definitions are Unreal data assets mirrored by C# strongly typed wrappers where useful.

### Events vs Delegates

- Intra-system: C# events/delegates OK
- Inter-system: Event Bus mandatory

### Async Loading

All non-trivial asset loads go through [Asset Manager](../core/asset-manager.md). No ad-hoc \`LoadObject\` in tick paths.

## Testing

Pure logic (curves, weighting, dependency graphs) should be unit-testable without PIE.

## Related Documents

- [Code Style](../standards/code-style.md)
- [Networking](../networking/overview.md)
`);

console.log(`Wrote ${written.length} files`);
written.forEach((f) => console.log(" -", f));
