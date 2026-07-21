/**
 * Expand critical docs with deeper implementation detail.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function append(rel, extra) {
  const full = path.join(ROOT, rel);
  const cur = fs.readFileSync(full, "utf8").replace(/\s+$/, "");
  if (cur.includes("## Implementation Specification")) {
    console.log("skip (already expanded)", rel);
    return;
  }
  // Insert before Related Documents if present
  const marker = "## Related Documents";
  let next;
  if (cur.includes(marker)) {
    next = cur.replace(marker, extra.trim() + "\n\n" + marker);
  } else {
    next = cur + "\n\n" + extra.trim() + "\n";
  }
  fs.writeFileSync(full, next + "\n", "utf8");
  console.log("expanded", rel);
}

append("docs/core/event-bus.md", `
## Implementation Specification

### Public API Surface (Conceptual C#)

\`\`\`csharp
public interface IAfterlifeEventBus
{
    IDisposable Subscribe<T>(EventId id, Action<T> handler, EventSubscriptionOptions? options = null);
    IDisposable Subscribe<T>(EventId id, Func<T, ValueTask> handler, EventSubscriptionOptions? options = null);
    void Publish<T>(T payload, EventPublishOptions options);
    bool TryPublish<T>(T payload, EventPublishOptions options, out EventPublishError error);
}

public readonly record struct EventId(string Value)
{
    public static implicit operator EventId(string value) => new(value);
}

public sealed class EventPublishOptions
{
    public EventDelivery Delivery { get; init; } = EventDelivery.Local;
    public EventChannel Channel { get; init; } = EventChannel.Gameplay;
    public int SchemaVersion { get; init; } = 1;
    public bool EndOfFrame { get; init; }
}

public enum EventDelivery
{
    Local,
    ServerOnly,
    MulticastReplicated,
    OwnerClient,
}
\`\`\`

### Ordering Guarantees

| Scope | Guarantee |
|-------|-----------|
| Same publisher, same frame, \`EndOfFrame=false\` | Handlers run synchronously in subscription order |
| \`EndOfFrame=true\` | FIFO within channel for that frame |
| Replicated | Arrival order not guaranteed across different events; do not encode causality solely via arrival |
| Causality needs | Include \`sequence\` or depend on replicated state properties |

### Payload Design Rules

1. Payloads must be blittable/net-serializable for replicated delivery.
2. Prefer stable definition IDs over display strings.
3. Prefer net GUIDs / actor IDs over raw pointers.
4. Include \`schemaVersion\` and keep additive field growth.
5. Size budget: replicated event payloads SHOULD stay under 256 bytes unless rare.

### Alias Example

\`\`\`json
{
  "aliases": [
    { "from": "Round.Begin", "to": "Round.Started", "since": "0.2.0" }
  ]
}
\`\`\`

### Debugging

Editor window lists last N envelopes with timestamps, delivery mode, and subscriber counts. PIE command: \`Afterlife.EventBus.Dump\`.

### Anti-Patterns

- Publishing every AI footstep
- Using Bus to request purchases (use RPC → system → fact event)
- Subscribing in \`Tick\` repeatedly without dispose
`);

append("docs/gameplay/rounds/index.md", `
## Implementation Specification

### State Machine

\`\`\`
[*] → Inactive
Inactive → RoundIntro : StartMatch
RoundIntro → Intermission : IntroDone/Skip
Intermission → Spawning : TimerElapsed
Spawning → Active : InitialBurstDone
Active → RoundEnd : ClearConditionMet
RoundEnd → Intermission : NextRound
Active → MatchGameOver : ModeFailCondition
\`\`\`

### GameState Fields (Replicated)

| Field | Type | Notes |
|-------|------|-------|
| \`RoundIndex\` | int | 1-based |
| \`RoundPhase\` | enum | |
| \`RoundEnemyTarget\` | int | budget |
| \`RoundEnemyRemaining\` | int | active+pending |
| \`IntermissionEndsAt\` | server time | |

### Scaling Snapshot

On \`Round.Started\`, publish immutable snapshot:

\`\`\`csharp
public sealed class RoundScalingSnapshot
{
    public int RoundIndex { get; init; }
    public float HealthMultiplier { get; init; }
    public float SpeedTier { get; init; }
    public int SpawnCountTarget { get; init; }
    public float SpawnIntervalMultiplier { get; init; }
}
\`\`\`

Curves are \`CurveFloat\` / data tables keyed by round index. Extrapolate beyond authored keys with documented policy (clamp vs continue slope).

### Clear Condition Interface

\`\`\`csharp
public interface IRoundClearCondition
{
    bool IsRoundClear(RoundDirectorContext ctx);
}
\`\`\`

Default: \`RemainingAllocatedEnemies == 0\`.

### Mode Fail Condition

Classic survival: all players in permanent fail state (bleedout exhausted / no revives). Modes may redefine without creating a quest system.

### Mapper Configuration

Maps SHOULD prefer mode defaults. Optional \`RoundDirectorSettings\` data asset on map:

- Intermission duration
- Intro enabled
- Max round cap (0 = infinite)
- Scaling curve override

### Telemetry

Counters: round reach histogram, average round duration, stuck-last-enemy triggers.
`);

append("docs/gameplay/spawn-director/index.md", `
## Implementation Specification

### Budget Model

\`\`\`
Budget = BaseCount(round) * PlayerCountScalar(players) * MutatorScalar
\`\`\`

PlayerCountScalar SHOULD be sublinear (e.g., 1.0, 1.5, 1.9, 2.2) and data-driven.

### Spawn Attempt Loop (Server)

Every \`SpawnInterval\`:

1. If \`Pending + Alive >= Cap\` → wait
2. If \`BudgetRemaining <= 0\` → stop spawning
3. Select enemy definition from weighted table for this round
4. Select spawn point via strategy
5. If none legal → log \`Spawn.PointBlocked\` and retry with backoff
6. Spawn → decrement budget → publish \`Spawn.EnemySpawned\`

### Spawn Point Legality Checks

- Not occupied beyond threshold
- Not visible to players if strategy forbids (optional)
- Zone unlocked (WorldFlags / door groups)
- Barrier state compatible (window spawns need barrier actor)
- Navmesh projected point valid

### Strategy Interface

\`\`\`csharp
public interface ISpawnDirectorStrategy
{
    bool TrySelectSpawn(in SpawnSelectRequest request, out SpawnSelectResult result);
    void OnWorldFlagChanged(WorldFlagId flag, bool value);
}
\`\`\`

### Enemy Cap

Soft cap prevents performance collapse. Excess budget remains queued. Round cannot clear while budget queued unless timeout policy converts queue to force-spawn at farthest points.

### Map Authoring Tags

Spawn points: \`Spawn.Window\`, \`Spawn.Zone.Courtyard\`, \`Spawn.Special.OnlyAfterPower\`.
`);

append("docs/gameplay/ai/index.md", `
## Implementation Specification

### Target Scoring (Default)

Score players by:

- Distance (inverse)
- Line-of-sight bonus
- Downed penalty or bonus (mode)
- Noise events recent (guns) optional

Retarget interval throttled (e.g., 0.5–1.0s) for CPU.

### Barrier Interaction

When path blocked by barrier:

1. Move to attack socket
2. Play attack → damage segment
3. When open, traverse

### Stuck Recovery

If displacement < epsilon for N seconds: repath → random offset → last resort teleport to valid spawn behind player group (rare; telemetry flagged).

### Damage Pipeline

\`\`\`
Weapon hit → Armor/modifiers → Health → Death
Death → Anim → Corpse policy → Enemy.Killed(tags)
\`\`\`

Economy listens to tags (\`headshot\`, \`melee\`, \`trap\`).

### Performance Controls

- Animation budget LOD by distance
- Perception group updates
- Avoid allocations in AI tick path
- Pool enemy pawns when mode allows

### Specialty Enemies

Compose via components: \`TelegraphComponent\`, \`ArmorPlateComponent\`, \`SummonOnDeathComponent\`. Register definitions; do not hardcode class names for content identity in core.
`);

append("docs/gameplay/weapons/index.md", `
## Implementation Specification

### WeaponDefinition (Fields)

| Field | Purpose |
|-------|---------|
| \`Id\` | Stable registry id |
| \`Slot\` | Primary/Secondary/Melee/Equipment |
| \`DamageProfile\` | Distances, body multipliers |
| \`FireMode\` | Auto/Semi/Burst/Charge |
| \`Ammo\` | Mag, reserve, type id |
| \`Reload\` | Times, bipod rules |
| \`UpgradePathId\` | Optional |
| \`CrateTags\` | Weight table tags |
| \`WallBuyEligible\` | bool |
| \`Modules\` | Specialty modules |

### Inventory Rules

Default classic: 2 weapon slots + melee. Perk/mutator may expand. Acquiring third weapon replaces current according to policy.

### Server Fire Validation

- Rate limit vs fire interval + tolerance
- Ammo presence
- Origin sanity vs player capsule
- Hitscan: server trace; client FX predicted

### Upgrade Integration

Upgrade station replaces definition id with upgraded id (or increments tier) preserving ammo ratio policy.

### Ammo Types

Standard + specialty. Max ammo power-up refills by policy tags.
`);

append("docs/gameplay/perks/index.md", `
## Implementation Specification

### PerkDefinition

| Field | Purpose |
|-------|---------|
| \`Id\` | Stable id |
| \`Cost\` | Currency |
| \`SlotCost\` | Usually 1 |
| \`RequiredPowerDomains\` | list |
| \`EffectModules\` | list |
| \`LoseOnDown\` | default true |
| \`LoseOnBleedout\` | default true |
| \`Icon\` | UI |

### Effect Module Examples (Generic)

- \`ModifyMaxHealth\`
- \`ModifyReloadRate\`
- \`ModifyMoveSpeed\`
- \`ModifyWeaponSlotCount\`
- \`ModifyDamageOutput\`

### Machine Actor

Interact → purchase pipeline shared with wall buys. One machine per definition typical; maps may place multiple.

### Modifier Stack

Effects register with \`ModifierSystem\` using channels so consumables and perks compose deterministically (define multiply vs add order in docs per channel).
`);

append("docs/hub/index.md", `
## Implementation Specification

### Client Subsystems

| Subsystem | Role |
|-----------|------|
| \`HubCatalogClient\` | Search/details |
| \`HubDownloadManager\` | Resumable downloads |
| \`HubLibraryIndex\` | Local installed packages |
| \`HubUpdateScanner\` | Version compare |
| \`HubAuthClient\` | Optional login |

### Install Transaction

1. Build target graph
2. Snapshot disk state
3. Download to staging
4. Verify hashes
5. Atomic move into library
6. Update index
7. On failure, roll back staging

### Library Layout (Conceptual)

\`\`\`
Saved/AfterlifeHub/Library/
  com.acme.maps.rail/1.4.2/...
  com.acme.perkpack/2.1.0/...
Saved/AfterlifeHub/Index.json
\`\`\`

### Map Selection Integration

Map Selection reads \`Index.json\` and shows all map-type packages with compatible \`frameworkRange\`.

### Moderation Hooks

Report package → send package id/version + reason. Client does not need to ship evidence binaries by default.
`);

append("docs/lobby/index.md", `
## Implementation Specification

### LobbyState (Replicated)

| Field | Notes |
|-------|-------|
| \`MapId\` | |
| \`ModeId\` | |
| \`DifficultyId\` | optional |
| \`MutatorIds\` | ordered |
| \`EnabledModIds\` | required locked |
| \`MapSettings\` | key/value validated |
| \`Players[]\` | character, ready, consumables loadout |
| \`LockfileHash\` | |

### Start Rejection Reasons

- Not all ready
- Lockfile mismatch
- Invalid mutator combo
- Missing required mod
- Mode not allowed by map
- Server package verify fail

### UI Adaptation Algorithm

\`\`\`
for panel in allPanels:
  if panel.capability not in map.capabilities: hide
  else show and bind allowed options
\`\`\`

Server still validates.
`);

append("docs/mapping/index.md", `
## Implementation Specification Checklist

### Minimum Viable Survival Map

- [ ] 4 player starts
- [ ] Navmesh bound to playable area
- [ ] 8+ spawn points / windows with barriers
- [ ] 2+ purchasable doors expanding zones
- [ ] 1 power activator + 1 power domain
- [ ] 3 wall buys
- [ ] 1 crate location (optional but recommended)
- [ ] 4 perk machines (or fewer for minimal maps)
- [ ] 1 upgrade station gated by power
- [ ] MapManifest with id/version/capabilities
- [ ] Dedicated server PIE test with 2 clients

### Recommended Event Hooks (Map Plugin Optional)

Listen only; do not fork directors:

- \`Door.Opened\` → unlock spawn group tags
- \`Power.Activated\` → enable machines FX
- \`Round.Started\` → local ambience

### Greybox First

Blockout routes and economy gates before art. Validate spawn flow by round 10.
`);

append("docs/networking/overview.md", `
## Implementation Specification

### Session Content Agreement

Before \`Lobby → Loading\`:

1. Host/server computes lockfile from map+mods+mode
2. Lockfile hash sent to clients
3. Clients ensure packages present (Hub install if needed)
4. Clients acknowledge hash
5. Mismatch → disconnect with package diff

### RPC Naming

\`Server_Request*\` for intents · \`Client_Notify*\` for rejects/toasts · avoid ambiguous \`Net_\`

### Security Baseline

- Validate distances for interacts
- Rate-limit purchase RPCs
- Ignore client-supplied prices
- Clamp damage events server-side
`);

// Root extras
fs.writeFileSync(path.join(ROOT, ".gitignore"), `# Unreal
Binaries/
DerivedDataCache/
Intermediate/
Saved/
Build/
*.VC.db
*.opensdf
*.sdf
*.sln.docstates
*.suo
*.xcodeproj
*.xcworkspace
.idea/
.vs/
*.user
*.userprefs

# OS
.DS_Store
Thumbs.db
Desktop.ini

# Node tools
node_modules/

# Secrets
.env
.env.*
*.pem
secrets/
`, "utf8");

fs.writeFileSync(path.join(ROOT, "CODE_OF_CONDUCT.md"), `# Code of Conduct

See [docs/reference/code-of-conduct.md](docs/reference/code-of-conduct.md).
`, "utf8");

fs.writeFileSync(path.join(ROOT, "AGENTS.md"), `# Agent Guide (Cursor / Automation)

This repository is documentation-first. Agents must follow \`.cursor/rules/\`.

## Quick Mandates

1. Read \`docs/index.md\` before architectural decisions.
2. Obey \`ROADMAP.md\` phase gates.
3. Do not invent systems not documented—RFC first.
4. No core quest/objective ontology.
5. No proprietary IP in core.
6. Event Bus + Registries + server authority are mandatory patterns.
7. Update docs + \`CHANGELOG.md\` with behavior changes.
8. Prefer extensibility for mappers and modders.

## Key Entry Points

| Topic | Doc |
|-------|-----|
| Philosophy | \`docs/philosophy/design-philosophy.md\` |
| Architecture | \`docs/architecture/overview.md\` |
| Event Bus | \`docs/core/event-bus.md\` |
| Gameplay | \`docs/gameplay/index.md\` |
| Hub | \`docs/hub/index.md\` |
| RFC | \`docs/rfc/process.md\` |
`, "utf8");

console.log("expansion complete");
