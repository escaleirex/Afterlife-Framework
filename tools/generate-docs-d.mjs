/**
 * Afterlife Framework — Documentation Generator (part D: UI, Hub, Lobby, mapping, modding, standards, rfc, cursor)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const written = [];
function w(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, String(content).replace(/\s+$/, "") + "\n", "utf8");
  written.push(rel);
}
function sys(p) {
  return `# ${p.title}

## Purpose

${p.purpose}

## Responsibilities

${p.responsibilities}

## Architecture

${p.architecture}

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | ${p.authority || "Server where applicable; otherwise local UI"} |
| Configuration | ${p.config || "Data assets + widget trees"} |
| Presentation | ${p.presentation || "Client UI"} |
| Extension | ${p.extension || "UI extension points / plugins"} |

## Data Flow

${p.dataFlow}

## Networking

${p.networking}

## Events

${p.events}

## Extension Points

${p.extensionPoints}

## Examples

${p.examples}

## Edge Cases

${p.edgeCases}

## Future Considerations

${p.future}

## Related Documents

${p.related}
`;
}

w("docs/ui/index.md", `# UI / Frontend Index

## Purpose

Document the entire frontend surface of Afterlife Framework.

## Screens

| Screen | Doc |
|--------|-----|
| Main Menu | [main-menu.md](main-menu.md) |
| Play | [play.md](play.md) |
| Map Selection | [map-selection.md](map-selection.md) |
| Profile | [profile.md](profile.md) |
| Settings | [settings.md](settings.md) |
| Loading Screen | [loading-screen.md](loading-screen.md) |
| HUD | [hud.md](hud.md) |
| Pause Menu | [pause-menu.md](pause-menu.md) |

Also: [Lobby](../lobby/index.md) · [Afterlife Hub](../hub/index.md)

## Frontend Principles

1. UI never owns gameplay truth.
2. Navigation is data-driven from session phase.
3. Hub is in-game, not an external browser requirement.
4. No core quest tracker.
5. Accessibility: scalable text, subtitles, colorblind-safe affordances.
`);

w("docs/ui/main-menu.md", sys({
  title: "Main Menu",
  purpose: "Primary entry navigation: Play, Profile, Afterlife Hub, Settings, Quit.",
  responsibilities: `- Route to major flows
- Show framework/version and content signature status
- Surface update prompts for Hub packages
- Quit cleanly`,
  architecture: `WBP_MainMenu with buttons bound to SessionDirector intents. Background is presentation-only (level or scene). Branding uses Afterlife Framework identity—not third-party IP.`,
  dataFlow: `Boot → Save load → MainMenu → user selects route.`,
  networking: `Local. Online login status badge may appear in Phase 4+.`,
  events: `\`UI.MainMenuOpened\`, \`UI.Navigate\``,
  extensionPoints: `Mods may add menu tiles via \`ui.extend_main_menu\` permission with review.`,
  examples: `Play → Map Selection; Hub → browse community; Profile → stats.`,
  edgeCases: `Corrupt save → safe mode settings · missing default map list.`,
  future: `News ticker from Hub (non-intrusive).`,
  related: `- [Play](play.md)
- [Hub](../hub/index.md)
- [Session Lifecycle](../core/session-lifecycle.md)`
}));

w("docs/ui/play.md", sys({
  title: "Play Flow",
  purpose: "Bridge Main Menu to Map Selection / continue / host-join choices.",
  responsibilities: `- Host vs Join entry
- Recent maps
- Quick play optional (playlist later)
- Dedicated server connect dialog`,
  architecture: `Play hub panel; does not replace Map Selection. Join uses IP/code or server browser (Phase 4).`,
  dataFlow: `Play → choose Host/Join → Map Selection or Connect → Lobby.`,
  networking: `Connect attempts validated; content signature checked before lobby.`,
  events: `\`UI.PlayHost\`, \`UI.PlayJoin\`, \`UI.ConnectFailed\``,
  extensionPoints: `Playlist plugins.`,
  examples: `Host → pick map → lobby; Join → enter code → sync packages → lobby.`,
  edgeCases: `Version mismatch · missing deps → redirect to Hub install.`,
  future: `Friends list invite.`,
  related: `- [Map Selection](map-selection.md)
- [Lobby](../lobby/index.md)`
}));

w("docs/ui/map-selection.md", sys({
  title: "Map Selection",
  purpose: "List installed maps (including Hub-installed) and show metadata, requirements, and launch into Lobby.",
  responsibilities: `- Enumerate local + Hub-installed maps
- Show required/recommended mods
- Filter/search/sort
- Launch dependency resolve then Lobby
- Deep-link to Hub for missing content`,
  architecture: `Reads Hub local index + map manifests. Cards show screenshots, creators, framework range, capabilities.`,
  dataFlow: `Open → scan index → user selects → DependencyLoader.resolve → Lobby.`,
  networking: `Host selection becomes session map id.`,
  events: `\`UI.MapSelected\`, \`UI.MapMissingDeps\``,
  extensionPoints: `Custom filters · curated shelves.`,
  examples: `Installed maps appear automatically after Hub install—no manual folder copy.`,
  edgeCases: `Broken manifest · incompatible framework · empty library CTA to Hub.`,
  future: `Collections view.`,
  related: `- [Hub](../hub/index.md)
- [Dependency Loader](../core/dependency-loader.md)`
}));

w("docs/ui/profile.md", sys({
  title: "Profile",
  purpose: "Present player identity, statistics, cosmetics, and prestige/meta (if enabled).",
  responsibilities: `- Show stats from Save System
- Manage display name / avatar (policy)
- Cosmetics inventory
- Challenge list (meta, not in-match objectives)`,
  architecture: `Profile view-model reads save domains; online sync merges in Phase 4+.`,
  dataFlow: `Open Profile → load stats → render · edits save locally.`,
  networking: `Cosmetic ownership validated online when applicable.`,
  events: `\`UI.ProfileOpened\`, \`Save.Committed\``,
  extensionPoints: `Mode-specific stat tabs.`,
  examples: `High rounds per map; lifetime kills; prestige badge.`,
  edgeCases: `Offline vs online mismatch · private profiles.`,
  future: `Creator profile linking to Hub.`,
  related: `- [Save System](../core/save-system.md)
- [Progression](../gameplay/progression/index.md)`
}));

w("docs/ui/settings.md", sys({
  title: "Settings",
  purpose: "Graphics, audio, controls, accessibility, gameplay assists, network options.",
  responsibilities: `- Persist settings domain
- Apply engine scalability
- Key rebinding
- Subtitles and colorblind options
- Privacy toggles`,
  architecture: `Tabbed settings; changes apply immediately where safe; some require restart.`,
  dataFlow: `Change → validate → save → apply.`,
  networking: `Network settings affect client connection preferences only.`,
  events: `\`Settings.Changed\``,
  extensionPoints: `Mod settings pages under namespaced tabs.`,
  examples: `Disable screen shake; increase FOV; subtitle size.`,
  edgeCases: `Invalid resolution · conflicting binds · corrupted settings file.`,
  future: `Cloud settings sync.`,
  related: `- [Save System](../core/save-system.md)
- [Audio](../audio/index.md)`
}));

w("docs/ui/loading-screen.md", sys({
  title: "Loading Screen",
  purpose: "Show map art, tips (non-objective), and Asset Manager progress while packages load.",
  responsibilities: `- Progress bar from Assets.LoadProgress
- Optional tip rotation from map manifest
- Cancel returns to Map Selection when allowed
- Show dependency download progress if Hub fetch mid-flow`,
  architecture: `Widget bound to load token; map provides background image + tips.`,
  dataFlow: `Session Loading phase → show → Assets complete → fade to match/lobby countdown.`,
  networking: `Each client loads locally; server waits for ready flags.`,
  events: `\`UI.LoadingShown\`, \`Assets.LoadProgress\``,
  extensionPoints: `Custom loading widgets per map.`,
  examples: `Tips teach economy without quest language.`,
  edgeCases: `Stuck load → timeout error with package ids · cancel mid-download.`,
  future: `Streaming install while loading.`,
  related: `- [Asset Manager](../core/asset-manager.md)
- [Session Lifecycle](../core/session-lifecycle.md)`
}));

w("docs/ui/hud.md", sys({
  title: "HUD",
  purpose: "In-match heads-up display for currency, ammo, round, perks, consumables, teammate status—without core objective trackers.",
  responsibilities: `- Bind to replicated PlayerState/GameState
- Show interact prompts
- Downed/revive UI
- Power-up banners
- Extensibility slots for maps/mods`,
  architecture: `WBP_HUD with slots: BottomLeft (perks), BottomRight (weapons/ammo), Top (round), Center (banners), Teammates. **No QuestTracker slot in core.** Optional Objectives plugin may inject a slot only when enabled.`,
  dataFlow: `Rep notifies / events → view model → widgets.`,
  networking: `HUD is client presentation of server truth.`,
  events: `\`UI.HUDReady\`, listens to Economy/Round/Perk/PowerUp events.`,
  extensionPoints: `\`ui.extend_hud\` for map widgets (compass, custom meters).`,
  examples: `Currency updates on Economy.CurrencyChanged; round text on Round.Started.`,
  edgeCases: `Spectator HUD · split screen (if supported later) · safe zones.`,
  future: `HUD profiles per mode.`,
  related: `- [Discovery Philosophy](../philosophy/discovery-philosophy.md)
- [Lobby](../lobby/index.md)`
}));

w("docs/ui/pause-menu.md", sys({
  title: "Pause Menu",
  purpose: "In-match escape menu for settings access, players list, leave match—respecting multiplayer pause policy.",
  responsibilities: `- Open/close on input
- Leave match confirmation
- Settings overlay
- Do not grant gameplay advantage (no full world freeze on dedicated)`,
  architecture: `Pause widget; MatchTime continues on dedicated servers. Solo offline may pause simulation per mode.`,
  dataFlow: `Esc → pause UI → resume/leave.`,
  networking: `Leave sends disconnect; pause is local UI.`,
  events: `\`UI.PauseOpened\`, \`UI.PauseClosed\`, \`Session.LeaveRequested\``,
  extensionPoints: `Vote skip cutscene buttons · mutator info panel.`,
  examples: `Adjust volume mid-match; leave to Main Menu.`,
  edgeCases: `Opening during cutscene · host leave on listen server.`,
  future: `Report player shortcut to Hub moderation.`,
  related: `- [Time and Tick](../core/time-and-tick.md)
- [Settings](settings.md)`
}));

// Lobby
w("docs/lobby/index.md", `# Lobby

## Purpose

After map selection, players enter a Lobby to configure the session before match start. The Lobby **dynamically adapts** to what the map supports via capabilities.

## Panels

| Panel | Shown when capability |
|-------|------------------------|
| Game Mode | always (filtered by map allowlist) |
| Difficulty | \`difficulty\` |
| Consumables | \`consumables\` |
| Loadouts | \`loadouts\` |
| Mods | always (enabled set + required locked) |
| Mutators | \`mutators\` |
| Map Settings | \`map_settings\` |
| Character Selection | \`character_select\` |
| Players / Ready | always |
| Start | host/server only |

## Ready / Start Rules

- All human players Ready (mode configurable)
- Dependency lockfile identical
- Host presses Start → Loading → Match

## Data Flow

\`\`\`
MapSelected → Resolve deps → Enter Lobby → Configure → Ready → StartMatch
\`\`\`

## Networking

Lobby state replicates on a LobbyState object. Server validates illegal combinations (banned mutator + mode).

## Events

\`Lobby.Entered\`, \`Lobby.SettingChanged\`, \`Lobby.ReadyChanged\`, \`Lobby.StartAccepted\`, \`Lobby.StartRejected\`

## Extension Points

Maps/mods register custom lobby panels with \`ui.extend_lobby\`.

## Edge Cases

- Player joins mid-lobby → receive full state
- Required mod disabled → cannot ready
- Host migration not required on dedicated

## Related Documents

- [Map Selection](../ui/map-selection.md)
- [Game Modes](../gameplay/game-modes/index.md)
- [Composition Model](../architecture/composition-model.md)
`);

w("docs/lobby/dynamic-adaptation.md", `# Lobby Dynamic Adaptation

## Purpose

Specify how lobby UI hides/shows and validates options from map manifests.

## Capability Negotiation

\`\`\`json
{
  "capabilities": ["consumables", "character_select", "mutators", "difficulty"],
  "allowedModes": ["afterlife.mode.classic_survival"],
  "allowedMutators": ["*", "-com.acme.mutator.chaos_economy"],
  "maxPlayers": 4
}
\`\`\`

## Validation

Client UI filters for UX; server re-validates on Start. Never trust client-only filtering.

## Related Documents

- [Lobby Index](index.md)
- [Dependency Loader](../core/dependency-loader.md)
`);

// Hub
w("docs/hub/index.md", `# Afterlife Hub

## Purpose

Afterlife Hub is the **in-game content platform**. It replaces Steam Workshop for this ecosystem.

## Player Workflow

\`\`\`
Main Menu → Play → Map Selection → Browse Community → Afterlife Hub
\`\`\`

Installed maps automatically appear in Map Selection.

## Content Types

Maps · Mods · Weapons · Characters · Game Modes · Collections · Creators

## Features

Browse · Search · Updates · Reviews · Screenshots · Trailers · Versioning · Dependencies · One-click install

## Collections

Installing a Collection installs **every dependency automatically** via Dependency Loader + Hub downloads.

## Non-Goals

- Steam Workshop integration as the primary path
- Manual dependency hunting

## Related Documents

- [Browse & Install](browse-and-install.md)
- [Packages & Versioning](packages-and-versioning.md)
- [Creators & Reviews](creators-and-reviews.md)
- [Backend Contracts](backend-contracts.md)
- [Modding Doctrine](../philosophy/modding-doctrine.md)
`);

w("docs/hub/browse-and-install.md", sys({
  title: "Hub Browse and Install",
  purpose: "Define browsing, discovery, and one-click installation UX/flows.",
  responsibilities: `- Query catalog
- Show media and metadata
- Install/update/uninstall
- Resolve dependencies recursively
- Report progress and errors`,
  architecture: `Hub Client subsystem + WBP_Hub. Install pipeline: select → resolve graph → download → verify hash → register local index → ready for Map Selection.`,
  dataFlow: `Search → details → Install → Deps.DownloadProgress → complete → toast → library updated.`,
  networking: `HTTPS to Hub API; downloads resumable. Match netcode unrelated.`,
  events: `\`Hub.SearchResults\`, \`Hub.InstallStarted\`, \`Hub.InstallCompleted\`, \`Hub.InstallFailed\``,
  extensionPoints: `Mirror repositories · offline USB import tool.`,
  examples: `Install Collection “Classic Night Survivors” pulls 3 maps + 2 mods automatically.`,
  edgeCases: `Disk full · hash mismatch · yanked version · partial uninstall.`,
  future: `Delta updates.`,
  related: `- [Dependency Loader](../core/dependency-loader.md)
- [Map Selection](../ui/map-selection.md)`
}));

w("docs/hub/packages-and-versioning.md", `# Hub Packages and Versioning

## Purpose

Define package identity and version rules for Hub content.

## Identity

\`id\` + \`version\` + \`frameworkRange\` + content type + content hash.

## SemVer

Creators SHOULD use SemVer. Breaking content changes bump major. Framework refuses packages outside \`frameworkRange\`.

## Updates

Hub shows update badges. Updating a required dep of an installed map prompts compatibility check.

## Related Documents

- [Compatibility](../philosophy/compatibility.md)
- [Dependency Loader](../core/dependency-loader.md)
`);

w("docs/hub/creators-and-reviews.md", `# Creators and Reviews

## Purpose

Define creator profiles, reviews, screenshots, and trailers as Hub metadata—not gameplay systems.

## Rules

- Reviews require playtime threshold to reduce spam (configurable)
- Trailers are Hub media, not in-match cutscenes
- Report flows feed moderation

## Related Documents

- [Hub Index](index.md)
- [Backend Contracts](backend-contracts.md)
`);

w("docs/hub/backend-contracts.md", `# Hub Backend Contracts

## Purpose

Specify API surfaces so the Hub can be first-party hosted and preferably self-hostable for communities.

## Resources (conceptual)

\`GET /v1/search\` · \`GET /v1/packages/:id\` · \`GET /v1/packages/:id/versions\` · \`GET /v1/collections/:id\` · \`GET /v1/creators/:id\` · \`POST /v1/reviews\` · download URLs with signed tokens

## Auth

Optional login for reviews/uploads. Downloads of public packages may be anonymous with rate limits.

## Self-Host

Documented schema allows community mirrors. Clients can add mirror endpoints in settings.

## Related Documents

- [CI/CD](../devops/ci-cd.md)
- [Security notes](../reference/security.md)
`);

// Mapping & Modding
w("docs/mapping/index.md", `# Mapping Guide

## Purpose

Teach mappers how to build Afterlife maps with **almost no gameplay code**.

## Mapper Mindset

You place content and wire data. The framework provides systems. Prefer WorldFlags and events over custom quest scripts.

## Quick Start

1. Create map under \`/Game/Maps/YourMap\`
2. Add spawn points, barriers, doors, buys, power
3. Create \`MapManifest\` with id, capabilities, dependencies
4. Place Round/Spawn directors (or use defaults from GameMode)
5. Validate with map validator (Phase 3)
6. Package for Hub

## Core Actors to Place

Player starts · Enemy spawn points/windows · Barriers · Doors/debris · Wall buys · Crate locations · Perk machines · Power activators · Upgrade station · Player boundaries · Audio/music volumes

## What Not To Do

- Copy a RoundManager into the map Blueprint and fork it
- Hardcode objectives into core types
- Assume singleplayer-only testing is enough

## Related Documents

- [Map Manifest](map-manifest.md)
- [World Building](world-building.md)
- [Interactions](interactions.md)
- [Validation](validation.md)
- [Packaging](packaging.md)
- [Discovery Philosophy](../philosophy/discovery-philosophy.md)
`);

w("docs/mapping/map-manifest.md", `# Map Manifest

## Purpose

Define required metadata for every map package.

## Example

\`\`\`json
{
  "id": "com.acme.maps.abandoned_rail",
  "version": "1.0.0",
  "title": "Abandoned Rail",
  "frameworkRange": ">=1.0.0 <2.0.0",
  "maxPlayers": 4,
  "capabilities": ["consumables", "character_select", "mutators", "difficulty"],
  "allowedModes": ["afterlife.mode.classic_survival"],
  "requires": [{ "id": "com.acme.perkpack", "range": "^2.0.0" }],
  "recommends": [{ "id": "com.acme.qol", "range": ">=1.0.0" }],
  "entry": "/Game/Maps/AbandonedRail/AbandonedRail"
}
\`\`\`

## Related Documents

- [Dependency Loader](../core/dependency-loader.md)
- [Lobby](../lobby/index.md)
`);

w("docs/mapping/world-building.md", `# World Building

## Purpose

Guidance for spatial teaching, routes, training loops, and progression graphs.

## Principles

1. Teach with space: players should see valuable machines before they can afford them.
2. Design training routes intentionally.
3. Spawn pressure should respect opened zones.
4. Lighting/audio sell discovery without UI checklists.

## Progression Graph

Sketch doors → power → pack → high-round zones before art pass.

## Related Documents

- [Gameplay Philosophy](../philosophy/gameplay-philosophy.md)
- [Spawn Director](../gameplay/spawn-director/index.md)
`);

w("docs/mapping/interactions.md", `# Interactions

## Purpose

Standardize hold/tap interact channels used by doors, buys, machines, build tables.

## Rules

- Server validates all grants
- Prompts are UI-only
- One interact channel priority stack (closest + angle + affordance rank)

## Related Documents

- [Doors](../gameplay/doors/index.md)
- [HUD](../ui/hud.md)
`);

w("docs/mapping/validation.md", `# Map Validation

## Purpose

List ship-breaker checks tools must run.

## Checks

- At least one player start
- Spawn points exist
- Navmesh present
- Manifest valid
- Required registry ids resolve
- Power domains referenced exist
- No forbidden core quest types embedded

## Related Documents

- [Tools Roadmap Phase 3](../../ROADMAP.md)
`);

w("docs/mapping/packaging.md", `# Map Packaging

## Purpose

Package maps for Afterlife Hub upload.

## Steps

1. Cook/pak per platform rules
2. Include manifest + media (screenshots, trailer refs)
3. Declare dependencies
4. Upload via Hub creator tools
5. Verify clean install on empty profile

## Related Documents

- [Hub](../hub/index.md)
- [Mod Packaging](../modding/packaging.md)
`);

w("docs/modding/index.md", `# Modding Guide

## Purpose

Explain how to author Global Mods, Content Packs, Embedded Mods, and plugins.

## Mod Classes

See [Modding Doctrine](../philosophy/modding-doctrine.md).

## Authoring Loop

1. Create package id
2. Add definitions to registries (weapons/perks/etc.)
3. Optional C# plugin with permissions
4. Declare dependencies/conflicts
5. Test with multiple mods enabled
6. Package + Hub upload

## Related Documents

- [Content Packs](content-packs.md)
- [Embedded Mods](embedded-mods.md)
- [Packaging](packaging.md)
- [Conflicts & Load Order](conflicts-and-load-order.md)
- [Plugin Guide](../plugins/index.md)
`);

w("docs/modding/content-packs.md", `# Content Packs

## Purpose

Ship definitions and assets without necessarily shipping code.

## Typical Contents

Weapon definitions · Perk definitions · Enemy definitions · Mode defs · Cosmetics

## Related Documents

- [Registries](../core/registries.md)
`);

w("docs/modding/embedded-mods.md", `# Embedded Mods

## Purpose

Allow maps to ship required mini-mods inside their package.

## Rules

- Embedded ids must be unique
- Still declared in manifest \`embeds\`
- Prefer embedded for map-unique content; prefer shared mods for reusable packs

## Related Documents

- [Map Manifest](../mapping/map-manifest.md)
`);

w("docs/modding/packaging.md", `# Mod Packaging

## Purpose

Build Hub-ready mod packages with hashes and manifests.

## Related Documents

- [Hub Packages](../hub/packages-and-versioning.md)
- [Dependency Loader](../core/dependency-loader.md)
`);

w("docs/modding/conflicts-and-load-order.md", `# Conflicts and Load Order

## Purpose

Explain how multiple mods coexist.

## Rules

1. Explicit \`conflicts\` in manifests
2. Deterministic load order from resolver
3. Registry duplicate IDs are hard failures
4. Strategy slot conflicts resolved by manifest priority or fail

## Related Documents

- [Plugin System](../core/plugin-system.md)
`);

w("docs/plugins/index.md", `# Plugin Development Guide

## Purpose

Teach code plugin authors how to extend Afterlife safely.

## Lifecycle

Register definitions/strategies/UI extenders in \`Register\`; start match logic in \`Start\`; clean up in \`Stop\`.

## Permissions

Request least privilege. \`net.custom_rpc\` and \`io.local_files\` are restricted.

## Testing

Unit-test pure logic; PIE test with dedicated server flow.

## Related Documents

- [Plugin System](../core/plugin-system.md)
- [RFC Process](../rfc/process.md)
`);

// Audio / Animation / Performance / Standards / Testing / Devops / RFC / Reference
w("docs/audio/index.md", `# Audio

## Purpose

Define audio architecture: SFX, VO, UI, ambience, and integration with Music Director.

## Buses

Master · Music · SFX · VO · UI · Ambience

## Rules

- Gameplay cues triggered from events when cross-system
- Respect accessibility (visual indicators for critical audio cues where reasonable)
- No proprietary licensed music in core samples without rights

## Related Documents

- [Music Director](../gameplay/music/index.md)
- [Dialogue](../gameplay/dialogue/index.md)
`);

w("docs/animation/index.md", `# Animation

## Purpose

Guidelines for player, enemy, and interactable animation in a multiplayer-authoritative game.

## Rules

- Server leads locomotion truth; clients interpolate
- Vault/barrier anims driven by AI state enums
- Interact montages predicted locally, corrected on reject

## Related Documents

- [AI](../gameplay/ai/index.md)
- [Networking](../networking/overview.md)
`);

w("docs/performance/index.md", `# Performance

## Purpose

Establish performance budgets and profiling expectations.

## Targets (Initial)

| Area | Target |
|------|--------|
| 4-player dedicated, mid map | Stable gameplay on mid-tier CPU |
| AI cap | Soft cap with director queue |
| Frame | Platform-specific; document in Phase 2 RFC |
| Hitching | No GC spikes from gameplay alloc churn in hot paths |

## Rules

1. Profile before clever optimization.
2. Budget enemies first.
3. Avoid per-frame managed allocations in tick.
4. Event Bus is not for high-frequency transform spam.

## Related Documents

- [Bandwidth Budgets](../networking/bandwidth-budgets.md)
- [AI](../gameplay/ai/index.md)
`);

w("docs/standards/code-style.md", `# Code Style

## Purpose

Readable, consistent C# / docs style for Afterlife Framework.

## C#

- File-scoped namespaces when applicable
- Explicit access modifiers
- \`async\` only with clear ownership of tasks
- No undocumented public APIs
- Prefer expressive names over abbreviations
- Comments explain why, not what

## Formatting

EditorConfig + dotnet format in CI.

## Ban List

- Hardcoded proprietary IP strings in core
- \`goto\`
- Swallowing exceptions empty
- Client authority “just for now” TODOs without RFC

## Related Documents

- [Naming Conventions](../architecture/naming-conventions.md)
- [Contributing](../../CONTRIBUTING.md)
`);

w("docs/standards/documentation-style.md", `# Documentation Style

## Purpose

Keep docs implementation-ready and cohesive.

## Rules

1. Use the system doc contract sections.
2. Cross-link instead of duplicating.
3. Prefer precise MUST/SHOULD/MAY language for requirements.
4. Examples are generic—no proprietary perk/weapon names in core docs.
5. Update CHANGELOG when behavior docs change.

## Related Documents

- [Docs Index](../index.md)
`);

w("docs/testing/index.md", `# Testing

## Purpose

Define the testing strategy: unit, integration, networked smoke, validators.

## Layers

| Layer | What |
|-------|------|
| Unit | Curves, resolvers, economy math, weighting |
| Integration | Subsystem interactions in controlled world |
| Networked smoke | 2 clients + dedicated boot/join/round start |
| Content validation | Manifests, registry conflicts |
| UI smoke | Navigation Critical paths |

## Rule

Behavioral changes require tests or an explicit documented test plan in the PR.

## Related Documents

- [CI/CD](../devops/ci-cd.md)
- [Automation](../devops/automation.md)
`);

w("docs/testing/networked-testing.md", `# Networked Testing

## Purpose

How to test authority and replication.

## Minimum Cases

- Purchase door with 2 clients observing state
- Currency reject path
- Round advance only on server
- Content signature mismatch disconnect

## Related Documents

- [Authority](../networking/authority.md)
`);

w("docs/devops/ci-cd.md", `# CI/CD Suggestions

## Purpose

Recommend pipelines for documentation and future runtime.

## Docs Era

- Markdown lint
- Link checker
- Spell check on docs
- Changelog presence on PR

## Runtime Era

- Build editor + server targets
- Unit tests
- Headless smoke
- Artifact upload
- Version matrix (UE/UnrealSharp)

## Related Documents

- [Automation](automation.md)
- [Testing](../testing/index.md)
`);

w("docs/devops/automation.md", `# Automation

## Purpose

Automate validators, doc generation checks, package hashing, and release notes.

## Suggested Jobs

- \`validate-manifests\`
- \`check-doc-contract\` (required sections present)
- \`package-hash\`
- \`rfc-lint\`

## Related Documents

- [CI/CD](ci-cd.md)
- [Map Validation](../mapping/validation.md)
`);

w("docs/rfc/process.md", `# RFC Process

## Purpose

Every new gameplay feature must become an RFC before implementation.

## When Required

New gameplay subsystems · Event Bus contract changes · Replication ownership changes · Registry breaking changes · Hub protocol changes · Save format changes

## Lifecycle

\`\`\`
Draft → Community/Maintainer Review → Accepted | Rejected | Deferred → Implement → Archive
\`\`\`

## Steps

1. Copy \`rfcs/templates/0000-template.md\` to \`rfcs/XXXX-title.md\`
2. Fill all sections
3. Open PR labeled \`rfc\`
4. Discuss; revise
5. Maintainer marks Accepted
6. Implementation PRs reference \`RFC-XXXX\`
7. Docs + CHANGELOG updated with implementation

## Acceptance Criteria

Philosophy alignment · Multiplayer authority · Extensibility · Compatibility impact understood · Test plan · Doc plan

## Related Documents

- [Template](../../rfcs/templates/0000-template.md)
- [Contributing](../../CONTRIBUTING.md)
- [Roadmap](../../ROADMAP.md)
`);

w("docs/rfc/reading-rfcs.md", `# Reading RFCs

RFCs are historical design records. Accepted RFCs amend the source of truth docs upon implementation. If an RFC conflicts with shipped docs, shipped docs win until the RFC is implemented or updated.

## Statuses

Draft · Review · Accepted · Rejected · Deferred · Superseded · Implemented
`);

w("docs/reference/license-notes.md", `# License Notes

## Current License

This repository uses the **GNU General Public License v3.0** (\`LICENSE\`).

## Implications (Summary, not legal advice)

- Derivative works distributed must follow GPL-3.0 obligations
- Source must be made available when distributing binaries
- Compatible with strong copyleft community goals

## Alternatives Considered (Historical Note)

Some engine projects use MIT/Apache for broader proprietary embedding. Afterlife Framework currently chooses GPL-3.0 to keep improvements open. Any license change would require copyright holder approval and a dedicated RFC-level decision.

## Third-Party Assets

Creators must not upload proprietary IP to Hub. Hub ToS (future) will reinforce this.
`);

w("docs/reference/code-of-conduct.md", `# Code of Conduct

Be respectful. No harassment. No hate speech. Critique ideas, not people. Do not share proprietary leaked assets. Moderators may remove content and ban for violations.

Report issues privately to maintainers.
`);

w("docs/reference/security.md", `# Security

## Principles

- Server authority for gameplay
- Verify Hub package hashes
- Least-privilege plugin permissions
- No secret keys in repo
- Report vulnerabilities privately (see SECURITY.md)

## Plugin Risk

Treat third-party plugins as untrusted code. Prefer content-only packs when code is unnecessary.
`);

w("SECURITY.md", `# Security Policy

## Reporting

Please report security vulnerabilities privately to the maintainers (email/security contact TBD). Do not open public issues for active exploits.

## Scope

Hub download integrity · plugin loading · save corruption bugs · authority bypasses · dependency confusion in package ids
`);

w("rfcs/templates/0000-template.md", `# RFC-XXXX: Title

- **Status:** Draft
- **Author:** 
- **Created:** YYYY-MM-DD
- **Roadmap Phase:** 
- **Supersedes:** none

## Summary

One paragraph.

## Motivation

Why now? What problem?

## Discovery & Philosophy Impact

Does this introduce objectives/quests? If yes, it must be opt-in and non-core.

## Detailed Design

### Architecture
### Data model
### Networking / authority
### Events
### Extension points

## Drawbacks

## Alternatives

## Compatibility Impact

## Test Plan

## Documentation Plan

## Unresolved Questions
`);

w("rfcs/0001-documentation-foundation.md", `# RFC-0001: Documentation Foundation

- **Status:** Implemented
- **Author:** Founding Architect
- **Created:** 2026-07-21
- **Roadmap Phase:** Phase 1 (docs prelude)
- **Supersedes:** none

## Summary

Establish the documentation repository, philosophy, architecture contracts, RFC process, and Cursor rules as the single source of truth before runtime implementation.

## Motivation

Without a source of truth, contributors invent incompatible architectures and skip phases.

## Discovery & Philosophy Impact

None negative; discovery philosophy codified.

## Detailed Design

Ship docs tree under \`docs/\`, RFCs under \`rfcs/\`, rules under \`.cursor/rules/\`.

## Compatibility Impact

N/A (docs only).

## Test Plan

Manual review; markdown link checks in CI when added.

## Documentation Plan

This RFC is the documentation plan.

## Unresolved Questions

Exact UE5/UnrealSharp version pins at Phase 1 kickoff.
`);

console.log(`Wrote ${written.length} files`);
