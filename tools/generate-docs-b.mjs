/**
 * Afterlife Framework — Documentation Generator (part B: core + networking)
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
| Authoritative runtime | ${p.authority || "Server (subsystem / game state)"} |
| Configuration | ${p.config || "Data assets + Registries"} |
| Presentation | ${p.presentation || "Client UI / HUD listeners"} |
| Extension | ${p.extension || "Plugins, Content Packs, Map Overrides"} |

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

w("docs/core/event-bus.md", sys({
  title: "Event Bus",
  purpose: "Provide the single cross-system communication backbone for Afterlife Framework. All gameplay systems publish and subscribe through the Event Bus rather than hard references across module boundaries.",
  responsibilities: `- Define event identities, payloads, and delivery guarantees
- Support local (same process) and replicated (server → clients / targeted) delivery modes
- Provide ordered delivery within a channel where required
- Expose debugging/inspection hooks for Editor and PIE
- Enforce payload versioning and aliases for compatibility`,
  architecture: `### Components

| Component | Role |
|-----------|------|
| \`AfterlifeEventBusSubsystem\` | Primary API (World or GameInstance scoped as documented per event class) |
| \`EventId\` | Stable string/int hybrid identity (\`Round.Started\`) |
| \`EventEnvelope\` | Header: id, timestamp, channel, replication mode, schema version |
| \`IEventHandler<T>\` | Strongly typed subscriber |
| \`EventAliasTable\` | Maps deprecated ids → current ids |
| Channels | \`Gameplay\`, \`UI\`, \`Audio\`, \`Diagnostics\`, \`Hub\` |

### Delivery Modes

| Mode | Behavior |
|------|----------|
| Local | Same process, immediate or end-of-frame queued |
| Multicast Replicated | Server publishes; all relevant clients receive |
| Server Only | Never leaves server |
| Owner Client | Server → owning connection |
| Request | Client intent events validated server-side (prefer explicit RPCs for commands; events for facts) |

### Rules

1. **Facts vs Commands:** Event Bus carries facts (\`Door.Opened\`). Commands should be RPCs into owning systems that then emit facts.
2. **No payload pointers to transient actors without net GUIDs.**
3. **Handlers must be re-entrant safe** or defer work.
4. **Do not use Bus as a general RPC replacement** for predictive actions.`,
  authority: "Server emits authoritative gameplay facts; clients emit only local presentation events unless explicitly allowed",
  dataFlow: `\`\`\`
System A mutates authoritative state
  → publishes EventEnvelope(EventId, payload)
    → Bus dispatches to subscribers (AI, Audio, UI, Plugins)
    → if replicated: net serialize payload to clients
      → client Bus dispatches to local subscribers
\`\`\`

Subscription lifecycle binds to UObject/subsystem lifetime; handlers auto-detach on teardown.`,
  networking: `- Replicated events use a compact schema registry (event id hash + version)
- Large infrequent events may ride reliable channel; high-frequency must be avoided (prefer replicated properties)
- Clients must ignore replicated gameplay facts if they would mutate authority locally (listeners are presentation/prediction only unless documented)`,
  events: `Meta-events:

| Event | Payload | Notes |
|-------|---------|-------|
| \`EventBus.HandlerException\` | error info | Diagnostics |
| \`EventBus.UnknownEvent\` | id/version | Compatibility |

Gameplay events are owned by their systems (see each system doc).`,
  extensionPoints: `- Register custom \`EventId\` namespaces: \`mod.<author>.*\`
- Provide schema serializers for custom payloads
- Add aliases when renaming events
- Editor visualizer plugin hooks`,
  examples: `### C# sketch

\`\`\`csharp
eventBus.Subscribe<RoundStartedEvent>("Round.Started", OnRoundStarted);

eventBus.Publish(new RoundStartedEvent {
    RoundIndex = 5,
    EnemyCountTarget = 24
}, EventDelivery.MulticastReplicated);
\`\`\`

### Map plugin reaction

A map plugin listens to \`Power.Activated\` to unlock a shortcut door without the Power system knowing about that door type.`,
  edgeCases: `- Subscriber throws: isolated; meta-event emitted; match continues
- Unknown event version: alias/migrate or drop with log
- Publish during shutdown: rejected
- Extremely chatty events: fail automated perf budgets in CI
- Listen-server double dispatch: must not double-apply authoritative logic`,
  future: `- Record/replay event traces for theater mode
- Optional deterministic lockstep research channel
- Cross-server relay is out of scope`,
  related: `- [Registries](registries.md)
- [Networking Overview](../networking/overview.md)
- [Design Philosophy](../philosophy/design-philosophy.md)`
}));

w("docs/core/registries.md", sys({
  title: "Registries",
  purpose: "Provide stable, data-driven lookup of all content definitions (weapons, perks, enemies, modes, mutators, crates, etc.) so gameplay code never hardcodes content lists.",
  responsibilities: `- Register definitions from framework, mods, and maps
- Resolve by stable string ID
- Apply override layers (mode/mutator/map)
- Validate uniqueness and schema
- Expose enumeration for UI and tools`,
  architecture: `### Registry Types

Each content domain has a registry:

- \`WeaponRegistry\`
- \`PerkRegistry\`
- \`EnemyRegistry\`
- \`PowerUpRegistry\`
- \`ConsumableRegistry\`
- \`GameModeRegistry\`
- \`MutatorRegistry\`
- \`CharacterRegistry\`
- \`MusicEventRegistry\`
- ...extensible via Plugin System

### Definition Identity

\`\`\`
afterlife.weapon.starter_pistol
com.acme.weapon.rail_splitter
\`\`\`

IDs are immutable once published. Display names are localized separately.

### Override Model

\`\`\`
Base definition
  ← Mod patch (additive fields / replaced asset refs)
  ← Mutator patch
  ← Map patch
\`\`\`

Patches are JSON/data-asset deltas, not silent mutation of shared assets.`,
  dataFlow: `1. Dependency Loader loads packages in order
2. Each package contributes definitions to registries
3. Validators run (unique ids, required fields, soft refs resolve)
4. Session systems query registries only—never scan Content folders at runtime for gameplay decisions`,
  networking: `Registries themselves are not fully replicated as giant catalogs. Clients load the same resolved package set. Server validates that client content signature matches session signature (hash of package ids+versions). Mismatch → disconnect with actionable error.`,
  events: `| Event | When |
|-------|------|
| \`Registry.DomainReloaded\` | Hot reload in editor / rare runtime reload |
| \`Registry.ValidationFailed\` | Package rejected |`,
  extensionPoints: `- Plugins register new registry domains
- Content packs register definitions
- Map manifests patch definitions by id`,
  examples: `\`\`\`csharp
var weapon = weaponRegistry.Get("afterlife.weapon.starter_pistol");
foreach (var perk in perkRegistry.All) { /* populate Hub preview */ }
\`\`\``,
  edgeCases: `- Duplicate IDs across mods: hard fail with conflict report
- Missing dependency definition referenced by map: hard fail before match start
- Partial overrides removing required fields: validation fail
- Case sensitivity: IDs are case-sensitive; tools warn on near-misses`,
  future: `- Binary registry caches for faster cook
- Signed definition provenance for Hub trust UX`,
  related: `- [Asset Manager](asset-manager.md)
- [Dependency Loader](dependency-loader.md)
- [Plugin System](plugin-system.md)`
}));

w("docs/core/asset-manager.md", sys({
  title: "Asset Manager",
  purpose: "Centralize asynchronous loading, soft references, memory budgets, and streaming policies for Afterlife content.",
  responsibilities: `- Load primary assets by ID / soft path
- Maintain memory budgets per category (UI, weapons, enemies, audio)
- Coordinate prefetch for upcoming rounds / Hub previews
- Integrate with Unreal Primary Asset system
- Provide progress callbacks for loading screens`,
  architecture: `### Categories

| Category | Examples | Budget owner |
|----------|----------|--------------|
| Core | Framework essentials | Always resident |
| MapEssential | Spawn, HUD, doors | Loaded with map |
| Combat | Weapons, FX | Streaming + LRU |
| Enemy | Meshes, anims | Director-driven prefetch |
| UI | Menus, Hub | Mode-based |
| Audio | Stems, VO | Music director |

### APIs (conceptual)

- \`LoadAsync<T>(PrimaryAssetId)\`
- \`Hold(handle)\` / \`Release(handle)\`
- \`Prefetch(ids, priority)\`
- \`GetLoadProgress(token)\``,
  dataFlow: `Match start → resolve required package assets → load MapEssential → show loading screen progress → hand off to GameMode → directors prefetch combat/enemy assets based on round curves.`,
  networking: `Asset Manager is local. Content signature mismatch is a session problem (see Registries), not an Asset Manager replication feature.`,
  events: `| Event | Meaning |
|-------|---------|
| \`Assets.LoadStarted\` | Bundle began |
| \`Assets.LoadProgress\` | 0..1 |
| \`Assets.LoadCompleted\` | Ready |
| \`Assets.LoadFailed\` | Hard failure |`,
  extensionPoints: `- Custom budget policies per platform
- Mod-provided primary asset rules
- Prefetch strategies registered by directors`,
  examples: `Loading screen binds to \`Assets.LoadProgress\`. Mystery crate prefetches weighted weapon meshes when power turns on.`,
  edgeCases: `- Load fail on required asset: abort match start with package id
- Soft ref null after mod uninstall: Dependency Loader should have blocked; still fail safe
- Memory pressure: evict LRU Combat/UI first, never Core mid-match without policy`,
  future: `- Platform-specific cook rules
- Hub CDN streaming for large optional trailers (UI only)`,
  related: `- [Registries](registries.md)
- [Loading Screen](../ui/loading-screen.md)
- [Performance](../performance/index.md)`
}));

w("docs/core/dependency-loader.md", sys({
  title: "Dependency Loader",
  purpose: "Resolve, fetch (via Hub), verify, and order-load all packages required for a map session so players never manually install dependencies.",
  responsibilities: `- Read map/mod manifests
- Build dependency graph (required + recommended policies)
- Detect conflicts and cycles
- Compute load order
- Verify versions against framework range
- Integrate with Afterlife Hub install actions
- Produce actionable error reports`,
  architecture: `### Package Manifest (simplified)

\`\`\`json
{
  "id": "com.acme.maps.rail",
  "version": "1.4.2",
  "frameworkRange": ">=0.9.0 <2.0.0",
  "requires": [
    { "id": "com.acme.perkpack", "range": "^2.1.0" }
  ],
  "recommends": [
    { "id": "com.acme.qol", "range": ">=1.0.0" }
  ],
  "conflicts": [
    { "id": "com.other.old_economy", "range": "*" }
  ],
  "embeds": ["com.acme.maps.rail.embedded_vo"]
}
\`\`\`

### Resolution Algorithm

1. Seed with map + enabled global mods + lobby selections
2. Recursively add required deps
3. Optionally add recommended (policy: install-with-map vs prompt)
4. Fail on cycles / unsatisfiable ranges / conflicts
5. Produce pinned lockfile for the session
6. Ensure packages present locally; if not, Hub fetch
7. Verify signatures/hashes
8. Load plugins in order; register definitions`,
  dataFlow: `Map Selection / Hub Install → Resolver → (Hub Download)* → Verify → Plugin load order → Registries populate → Session signature hash → Server + clients compare.`,
  networking: `All peers must share the same pinned lockfile hash before match start. Server is authoritative on the pin. Clients missing packages are sent to install flow; they do not “almost join.”`,
  events: `| Event | Meaning |
|-------|---------|
| \`Deps.ResolveStarted\` | Begin |
| \`Deps.ResolveSucceeded\` | Lockfile ready |
| \`Deps.ResolveFailed\` | Errors |
| \`Deps.DownloadProgress\` | Hub fetch |
| \`Deps.LoadOrderReady\` | Plugins may start |`,
  extensionPoints: `- Custom repositories (self-hosted Hub mirrors)
- Studio policies for recommended deps
- Conflict mediators for known pairs`,
  examples: `Installing a Collection expands to many maps/mods; resolver installs the union of dependencies once, then validates each map on play.`,
  edgeCases: `- Two mods need different major versions of the same dep: fail with explanation
- Embedded mod collides with global mod id: fail
- Offline mode with missing deps: fail offline-safe message
- Yanked Hub package: fail with replacement suggestion if provided`,
  future: `- Binary lockfile format
- Peer-to-peer LAN share for packages in trusted lobbies (optional)`,
  related: `- [Plugin System](plugin-system.md)
- [Modding Guide](../modding/index.md)
- [Afterlife Hub](../hub/index.md)`
}));

w("docs/core/save-system.md", sys({
  title: "Save System",
  purpose: "Persist player profiles, statistics, settings, Hub install state, and optional mode meta-progression with migrations and multiplayer-safe assumptions.",
  responsibilities: `- Define versioned save schemas
- Migrate old saves forward
- Separate local settings from cloud/profile data
- Never trust client saves for match authority
- Provide export/import for backup`,
  architecture: `### Save Domains

| Domain | Contents | Sync |
|--------|----------|------|
| \`settings\` | Graphics, audio, binds | Local |
| \`profile\` | Identity, cosmetics unlocks (mode-defined) | Local + optional online |
| \`stats\` | Lifetime stats | Local + optional online |
| \`hub\` | Installed packages, pins, cache index | Local |
| \`mode_meta\` | Prestige-like data if mode enables | Local + optional online |

Match runtime state is **not** a player save (unless a mode explicitly implements reconnection snapshots—separate system).

### Schema Versioning

Each domain has \`schemaVersion\`. Migrations are pure functions registered in order.`,
  dataFlow: `Boot → load settings → load profile → Hub index → menu.  
Online login (Phase 4+) → merge policy (server wins conflicts for inventory-like data).`,
  networking: `Saves do not grant currency mid-match. Server may request profile cosmetics ids; still validates against owned definitions.`,
  events: `| Event | Meaning |
|-------|---------|
| \`Save.Loaded\` | Domain loaded |
| \`Save.Migrated\` | From→to version |
| \`Save.Failed\` | Corruption / IO |
| \`Save.Committed\` | Flush ok |`,
  extensionPoints: `- Modes register \`mode_meta\` schemas
- Mods add namespaced save keys under mod id
- Cloud providers plug into sync interface`,
  examples: `Migrating \`stats\` from v3→v4 renames a field and fills default for new high-round histogram buckets.`,
  edgeCases: `- Corrupt file: quarantine + fresh default + user prompt
- Partial write: atomic temp+replace
- Mod removed leaving orphan keys: keep orphan unless wipe policy opted`,
  future: `- Cross-device sync
- Theater bookmarks`,
  related: `- [Compatibility](../philosophy/compatibility.md)
- [Progression](../gameplay/progression/index.md)
- [Profile UI](../ui/profile.md)`
}));

w("docs/core/plugin-system.md", sys({
  title: "Plugin System",
  purpose: "Load code and content plugins with version gates, permissions, and deterministic order for maps and mods.",
  responsibilities: `- Discover plugins from package layouts
- Enforce frameworkRange
- Apply permission scopes
- Call lifecycle hooks: Construct → Register → Start → Stop → Unload
- Isolate failures where possible`,
  architecture: `### Plugin Kinds

| Kind | Code? | Content? |
|------|-------|----------|
| Content-only | No | Yes |
| Managed plugin (C#) | Yes | Optional |
| Embedded map plugin | Optional | Yes |

### Lifecycle

\`\`\`
Resolve → Load assembly/assets → Register (registries, strategies, UI extenders)
→ Start (session) → Stop → Unload
\`\`\`

### Permissions (examples)

- \`gameplay.register_definitions\`
- \`gameplay.register_strategy\`
- \`ui.extend_hud\`
- \`ui.extend_lobby\`
- \`net.custom_rpc\` (restricted)
- \`io.local_files\` (restricted)`,
  dataFlow: `Dependency Loader provides ordered plugin list → Plugin System loads → Registries fill → strategies replace defaults → match starts.`,
  networking: `Server and clients load the same plugins. Custom RPCs require registration and bandwidth review. Unauthorized net messages dropped.`,
  events: `| Event | Meaning |
|-------|---------|
| \`Plugin.Loaded\` | Success |
| \`Plugin.Failed\` | Error |
| \`Plugin.PermissionDenied\` | Scope block |`,
  extensionPoints: `- New permission scopes via RFC
- Editor-only plugins
- Hot reload in editor (not shipping)`,
  examples: `A perk pack plugin registers 8 \`PerkDefinition\`s and a HUD icon provider. A map embedded plugin registers a unique crate weight strategy only while that map runs.`,
  edgeCases: `- Plugin throws in Register: package failed; match start aborted if required
- Version mismatch: refuse load
- Two strategies claim same slot: conflict per manifest rules`,
  future: `- Sandboxing research
- Signed plugins with trust tiers in Hub`,
  related: `- [Dependency Loader](dependency-loader.md)
- [Modding](../modding/index.md)
- [RFC Process](../rfc/process.md)`
}));

w("docs/core/session-lifecycle.md", sys({
  title: "Session Lifecycle",
  purpose: "Define the end-to-end lifecycle from Main Menu to Match teardown so all systems agree on phase names.",
  responsibilities: `- Define phases and legal transitions
- Coordinate Dependency Loader, Asset Manager, Lobby, and GameMode
- Emit lifecycle events`,
  architecture: `### Phases

\`\`\`
Bootstrap
 → MainMenu
 → HubBrowsing (optional)
 → MapSelected
 → DependencyResolve
 → Lobby
 → Loading
 → MatchCountdown (optional)
 → InMatch
 → PostMatch
 → Teardown
 → MainMenu
\`\`\`

### Illegal Transitions

Examples: \`InMatch → HubBrowsing\` without teardown; \`Lobby → InMatch\` without identical lockfile hash.`,
  dataFlow: `UI navigates → SessionDirector validates → systems prepare → GameMode StartMatch → Round Director takes over pacing.`,
  networking: `Server drives phase. Clients mirror. Disconnect mid-Lobby returns to Map Selection / Main Menu per flow charts in UI docs.`,
  events: `\`Session.PhaseChanged\`, \`Session.MatchStarting\`, \`Session.MatchEnded\`, \`Session.Error\``,
  extensionPoints: `Modes may insert optional phases (e.g., character intro) via mode hooks—not by inventing core quest phases.`,
  examples: `Collection install from Hub → Map appears in Map Selection → Lobby adapts capabilities → Loading → InMatch.`,
  edgeCases: `Host migration is not required for dedicated-first design; listen-server host loss ends session cleanly unless a future RFC defines migration.`,
  future: `Reconnect tokens for crash recovery (mode opt-in).`,
  related: `- [Lobby](../lobby/index.md)
- [UI Index](../ui/index.md)
- [Rounds](../gameplay/rounds/index.md)`
}));

w("docs/core/time-and-tick.md", sys({
  title: "Time and Tick Model",
  purpose: "Standardize how gameplay time, pauses, and ticking work under multiplayer constraints.",
  responsibilities: `- Distinguish real time vs match time
- Define pause policies (solo vs multi)
- Provide timers that respect authority
- Avoid per-frame expensive work on Bus`,
  architecture: `| Clock | Use |
|-------|-----|
| RealTime | UI animations, Hub downloads |
| MatchTime | Round timers, power-up durations |
| ServerWorldTime | Replicated timing reference |

Pause in multiplayer does **not** freeze server by default. Modes may offer cooperative pause only with explicit unanimous policy.`,
  dataFlow: `Systems request \`MatchTimer\` from server timer service; clients display estimates from replicated end timestamps.`,
  networking: `Duration state replicates end time, not per-tick countdowns.`,
  events: `\`Timer.Started\`, \`Timer.Expired\`, \`Match.PausePolicyChanged\``,
  extensionPoints: `Custom clocks for cinematic plugins (local only).`,
  examples: `Power-up lasting 30s stores \`ExpireAtServerTime\`; HUD binds remaining = expire - now.`,
  edgeCases: `Client hitch must not extend authoritative durations.`,
  future: `Replay scrubbing clocks.`,
  related: `- [Networking](../networking/overview.md)
- [Performance](../performance/index.md)`
}));

// Networking
w("docs/networking/overview.md", `# Networking Overview

## Purpose

Describe Afterlife Framework’s multiplayer-first networking model.

## Goals

- Dedicated server support for every gameplay system
- Server authority for all gameplay truth
- Predictable bandwidth usage
- Clean failure modes for version/content mismatch

## Building Blocks

| Building block | Use |
|----------------|-----|
| Replicated UObjects / properties | Persistent state (round, currency, doors) |
| RPCs | Commands and rare signals |
| Event Bus replicated facts | Cross-system notifications |
| Content signature | Package lockfile hash agreement |

## Topology

- Dedicated server (preferred)
- Listen server (supported)
- Offline/single process (same code paths; no special gameplay branch)

## Related Documents

- [Authority](authority.md)
- [Replication](replication.md)
- [Dedicated Servers](dedicated-servers.md)
- [Late Join](late-join.md)
- [Bandwidth Budgets](bandwidth-budgets.md)
`);

w("docs/networking/authority.md", sys({
  title: "Authority Model",
  purpose: "Define who is allowed to mutate which state.",
  responsibilities: `- Classify state ownership
- Validate client intents
- Prevent client-side economy/inventory cheating vectors`,
  architecture: `### Authority Classes

| Class | Examples | Mutator |
|-------|----------|---------|
| ServerWorld | Round phase, power domains, doors, enemy actors | Server systems |
| ServerPlayer | Currency, perks, inventory, downs | Server systems |
| ClientIntent | Purchase request, ready toggle, reload input | Client → validated RPC |
| ClientCosmetic | Local settings, menu animations | Client |

### Validation Pattern

\`\`\`
RPC_RequestPurchase(itemId)
server: canAfford? inRange? prerequisites? 
  yes → mutate → publish events → replicate
  no → reject reason to caller
\`\`\``,
  dataFlow: `All spend/earn paths funnel through Economy System on server.`,
  networking: `Never replicate “ask client how much money they have” as truth.`,
  events: `\`Net.AuthorityViolation\` diagnostics when clients send illegal intents repeatedly.`,
  extensionPoints: `Modes can add validators; cannot weaken core authority checks.`,
  examples: `Client predicts ammo HUD locally but server corrects on fire reconciliation.`,
  edgeCases: `Speed hack movement: use server movement authority / anti-cheat hooks as available; document limits honestly.`,
  future: `Server-side demo recording for adjudication.`,
  related: `- [Multiplayer Doctrine](../philosophy/multiplayer-doctrine.md)
- [Economy](../gameplay/economy/index.md)`
}));

w("docs/networking/replication.md", sys({
  title: "Replication",
  purpose: "Specify how state and events replicate efficiently.",
  responsibilities: `- Replicate GameState/PlayerState fields
- Define relevancy for enemies and interactables
- Provide guidelines for RPCs vs properties vs Bus events`,
  architecture: `### Prefer Properties When

State is persistent and continuously relevant (currency, round index, door open).

### Prefer RPCs When

Rare commands/responses (purchase reject reason, ready toggle).

### Prefer Bus Events When

Many systems must react to a fact without becoming coupled to the publisher.

### Relevancy

Enemies far from all players may reduce update rate. Interactables replicate state; not per-frame transforms if static.`,
  dataFlow: `Server mutation → net driver → client receive → local listeners/UI.`,
  networking: `Self-describing. Quantize where possible. Avoid strings on hot paths; use IDs.`,
  events: `See Event Bus replication modes.`,
  extensionPoints: `Custom replicators for specialty enemies via plugin with budget review.`,
  examples: `Door replicates \`bIsOpen\` + \`OpenAlpha\` if animated; currency replicates as int.`,
  edgeCases: `Late join needs full snapshot—see Late Join doc.`,
  future: `Replication graph tuning presets per map size.`,
  related: `- [Event Bus](../core/event-bus.md)
- [Bandwidth Budgets](bandwidth-budgets.md)`
}));

w("docs/networking/dedicated-servers.md", sys({
  title: "Dedicated Servers",
  purpose: "Define how dedicated servers are built, configured, and operated.",
  responsibilities: `- Headless server target
- Config via command line + config files
- Map rotation / workshop-less package prep
- Health/logging metrics`,
  architecture: `### Launch (conceptual)

\`\`\`
AfterlifeServer.exe 
  -map=/Game/Maps/Example 
  -packagesLock=lock.json
  -port=7777
  -maxplayers=4
\`\`\`

### Responsibilities

Server loads packages, validates lockfile, runs GameMode, simulates AI, never renders (shipping).`,
  dataFlow: `Ops starts process → clients connect with matching framework+lockfile → match → logs/metrics → teardown.`,
  networking: `Authoritative simulation tick rate configurable; document defaults and max players assumptions.`,
  events: `\`Server.Ready\`, \`Server.PlayerConnected\`, \`Server.PlayerDisconnected\`, \`Server.OOMWarning\``,
  extensionPoints: `Server admin plugins with restricted permissions.`,
  examples: `Community host pins map collection lockfile and runs headless on VPS.`,
  edgeCases: `Missing GPU on server OK; missing CPU budget → degrade AI counts via director settings if mode allows.`,
  future: `Container images; orchestration samples.`,
  related: `- [Session Lifecycle](../core/session-lifecycle.md)
- [Performance](../performance/index.md)`
}));

w("docs/networking/late-join.md", sys({
  title: "Late Join and Spectate",
  purpose: "Define policies for joining after match start.",
  responsibilities: `- Mode-defined join policies
- Snapshot replication for join-in-progress
- Spectate camera rules`,
  architecture: `Policies: \`Reject\`, \`SpectateOnly\`, \`JoinInProgress\`. Default for classic survival: \`Reject\` or \`SpectateOnly\` (mode choice). JIP must replicate world flags, door states, inventories, round index, power domains.`,
  dataFlow: `Client connect → server policy → send snapshot → client Asset Manager ensures assets → spawn or spectate.`,
  networking: `Snapshot is reliable bundled state; not a storm of historical events.`,
  events: `\`Net.LateJoinRejected\`, \`Net.SpectateStarted\`, \`Net.JIPCompleted\``,
  extensionPoints: `Modes customize inventory seeding on JIP.`,
  examples: `Tournament mode rejects late join; casual friends mode allows spectate.`,
  edgeCases: `JIP during boss script plugin: wait for safe point or reject.`,
  future: `Reconnect to same slot after crash.`,
  related: `- [Game Modes](../gameplay/game-modes/index.md)
- [Replication](replication.md)`
}));

w("docs/networking/bandwidth-budgets.md", `# Bandwidth Budgets

## Purpose

Keep multiplayer playable on modest connections.

## Default Budgets (Targets)

| Category | Soft budget | Notes |
|----------|-------------|-------|
| Player state | Low | Currency, perks bitset, weapon ids |
| World state | Low-Med | Doors, power, round |
| Enemies | High | Largest cost; relevancy mandatory |
| FX cues | Med | Prefer local predict + rare multicast |
| UI/Hub | N/A in-match | Not active during match net budget |

Exact numbers are finalized in Phase 2 performance RFCs; this doc establishes the discipline.

## Rules

1. No replicated tick-by-tick strings.
2. No per-pellet multicast for hitscan (server validate, local FX).
3. Aggregate enemy movement updates.
4. Measure with net profiles in CI smoke when available.

## Related Documents

- [Replication](replication.md)
- [Performance](../performance/index.md)
`);

console.log(`Wrote ${written.length} files`);
