/**
 * Depth pass F: append implementation specs to remaining systems.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function append(rel, extra) {
  const full = path.join(ROOT, rel);
  if (!fs.existsSync(full)) {
    console.log("missing", rel);
    return;
  }
  const cur = fs.readFileSync(full, "utf8").replace(/\s+$/, "");
  if (cur.includes("## Implementation Specification")) {
    console.log("skip", rel);
    return;
  }
  const marker = "## Related Documents";
  const next = cur.includes(marker)
    ? cur.replace(marker, extra.trim() + "\n\n" + marker)
    : cur + "\n\n" + extra.trim();
  fs.writeFileSync(full, next + "\n", "utf8");
  console.log("expanded", rel);
}

append("docs/gameplay/economy/index.md", `
## Implementation Specification

### Currencies

Default mode uses \`afterlife.currency.points\`. Modes MAY register additional currencies via registry. UI binds to primary unless overridden.

### Reward Grant Pipeline

\`\`\`
Server gameplay action
 → RewardContext(tags, instigator, victim)
 → EconomySystem.Evaluate(RewardMatrix + modifiers)
 → Apply to PlayerState
 → Economy.RewardGranted + Economy.CurrencyChanged
\`\`\`

Clients never submit positive grants.

### Purchase RPC

\`Server_RequestPurchase(PurchaseRequest)\` — server computes cost from data; client expected cost is informational only.

### Reject Reason Keys

\`insufficient_funds\`, \`prerequisite_missing\`, \`out_of_range\`, \`sold_out\`, \`power_required\`, \`inventory_full\`, \`banned_by_mutator\`, \`already_owned\`
`);

append("docs/gameplay/doors/index.md", `
## Implementation Specification

### Components

PurchaseInteract · PrerequisiteGate · DoorMover · SpawnGroupUnlocker

### Open Sequence

Validate → prerequisites → debit → \`bIsOpen\` → collision keyframe → WorldFlags → \`Door.Opened\`

### Debris

Door subtype with cleared mesh state; same pipeline.
`);

append("docs/gameplay/power/index.md", `
## Implementation Specification

### Domains

GameState stores \`PowerDomainId → Off|On|Brownout\`. Machines declare \`RequiredDomains\`. Activation via switch, buildable, or mode rules. Consumers fail interact with \`power_required\` until satisfied.
`);

append("docs/gameplay/mystery-box/index.md", `
## Implementation Specification

### Roll

Filter weight table → apply stock limits → server RNG → store result before FX → present → take/timeout. Relocation uses generic \`CrateMoveToken\`. Fire Sale overrides cost via end timestamp. Crate locks to one roller.
`);

append("docs/gameplay/pack-a-punch/index.md", `
## Implementation Specification

### States

\`Locked → Available → InUse → Available\`

Validate power/funds/path → debit → exclusive InUse → replace weapon tier/def → \`Weapon.Upgraded\`. Optional elemental attachment re-roll module is separate cost + RNG.
`);

append("docs/gameplay/power-ups/index.md", `
## Implementation Specification

### Drop Director

On kill, roll drop chance with spacing limits. Scopes: Instigator / Team / Match. Modules: RefillAmmo, Nuke, CurrencyGainMultiplier, EnemyFragile, RepairAllBarriers, CrateCostOverride. Display names are content-defined.
`);

append("docs/gameplay/consumables/index.md", `
## Implementation Specification

Lobby selects up to N consumables → replicate in LobbyState → grant charges on match start → \`Server_ActivateConsumable\` validates charges/state/exclusions. First-party classic mode keeps power modest and fair.
`);

append("docs/gameplay/buildables/index.md", `
## Implementation Specification

Part spawn policies: once per match, per-player, or shared. Recipes map tokens → output actor/item. Tables show prompt progress only—no forced objective HUD.
`);

append("docs/gameplay/traps/index.md", `
## Implementation Specification

### Activation

Purchase or trigger → server enables damage volume for duration → cooldown. Friendly fire policy from mode. Power loss disables active traps optionally via domain listeners.
`);

append("docs/gameplay/wonder-weapons/index.md", `
## Implementation Specification

Specialty modules attach to \`WeaponDefinition.Modules\`. Prefer projectile pooling and budget review for exotic FX. Limited stock enforced by crate strategy + registry counters on GameState.
`);

append("docs/gameplay/bosses/index.md", `
## Implementation Specification

EncounterController: \`Idle → Starting → InProgress → Succeeded/Failed\`. Prefer soft-fail (match continues) unless mode opts into hard-fail. Rewards via Economy/weapon grant helpers—not quest completion APIs.
`);

append("docs/gameplay/characters/index.md", `
## Implementation Specification

Character id on PlayerState selects mesh/VO board. Passive modes SHOULD keep passives cosmetic-neutral. Unique character constraints are mode flags enforced in Lobby.
`);

append("docs/gameplay/dialogue/index.md", `
## Implementation Specification

Triggers bind EventId + conditions + line set + priority + sync mode (local vs authoritative line id). DialogueDirector queues and interrupts by priority. Subtitles pull localization keys.
`);

append("docs/gameplay/cutscenes/index.md", `
## Implementation Specification

CutsceneDirector supports sync start timestamps and skip policies: Any, Majority, HostOnly, None. Dedicated servers advance using timer without rendering. Keep cinematics short by default.
`);

append("docs/gameplay/challenges/index.md", `
## Implementation Specification

Stat counters subscribe to Event Bus offline from HUD objectives. Challenge completion writes Save System and may unlock cosmetics. Match-end summary is optional UI, not an objective tracker.
`);

append("docs/gameplay/progression/index.md", `
## Implementation Specification

XP computed server-side at PostMatch from event aggregates. Prestige resets level fields and increments prestige badge. Forbidden: pay-to-win power in first-party defaults.
`);

append("docs/gameplay/game-modes/index.md", `
## Implementation Specification

### Mode Definition Fields

Id · default strategies · allowed mutators · HUD profile · late join policy · fail condition · progression enabled · consumables enabled · max players

### Mutator Patches

Mutators are JSON/data patches applied after mode defaults and before map overrides. Conflicts fail lobby start with reason.
`);

append("docs/gameplay/music/index.md", `
## Implementation Specification

State evaluation each relevant event; hysteresis prevents flapping. Stingers one-shot with cooldown. Map soundtrack packs register stem sets in MusicEventRegistry.
`);

append("docs/gameplay/quest-framework/index.md", `
## Implementation Specification

Package id suggestion: \`afterlife.optional.objectives\`. Loaded only when map capability \`optional_objectives\` set AND player/host did not disable. Core assemblies must not reference its types. Graph nodes listen to WorldFlags/events and may extend HUD via permission \`ui.extend_hud\`.
`);

append("docs/gameplay/barriers/index.md", `
## Implementation Specification

Segments 0..Max. Enemy attack reduces; player repair increases with Economy reward per segment. Carpenter power-up sets all to Max. Spawn Director reads FullyOpen vs Closed for window legality.
`);

append("docs/gameplay/wall-buys/index.md", `
## Implementation Specification

First purchase grants weapon; subsequent grants ammo if owned (including upgraded variant policy). Costs from data. Mutator may ban weapon id → wall buy disabled.
`);

append("docs/core/registries.md", `
## Implementation Specification

### Lookup API

\`\`\`csharp
T Get<T>(string id);
bool TryGet<T>(string id, out T def);
IEnumerable<T> All<T>();
IEnumerable<T> Where<T>(Func<T,bool> pred);
\`\`\`

### Conflict Report Format

Include package A version, package B version, duplicate id, and suggested resolution (rename/remove).
`);

append("docs/core/dependency-loader.md", `
## Implementation Specification

### Solver

Use semver range intersection. Prefer highest version within range that satisfies all dependents. Emit lockfile:

\`\`\`json
{
  "framework": "1.2.0",
  "packages": [{"id": "com.acme.perkpack", "version": "2.1.3", "hash": "..."}]
}
\`\`\`

Hash algorithm: SHA-256 of package payload.
`);

append("docs/core/plugin-system.md", `
## Implementation Specification

### Hook Interface

\`\`\`csharp
public interface IAfterlifePlugin
{
    PluginManifest Manifest { get; }
    void Register(IPluginRegister context);
    void Start(IPluginRuntime runtime);
    void Stop();
}
\`\`\`

Failures in \`Register\` for required plugins abort session start.
`);

append("docs/core/save-system.md", `
## Implementation Specification

### Atomic Write

Write temp file → flush → replace. Keep \`*.bak\` last good. Migrations registered as \`ISaveMigration.FromVersion → ToVersion\`.
`);

append("docs/core/asset-manager.md", `
## Implementation Specification

### Handle Refcount

Prefetch increments hold count; systems release when round leaves need window. Leaks detected in editor with \`Afterlife.Assets.DumpHolds\`.
`);

append("docs/mapping/world-building.md", `
## Implementation Specification

### Route Budget

Ensure at least one training loop after power with width for 4 players + horde. Door costs should create meaningful early decisions without soft-locking economy (simulate rounds 1–10).
`);

append("docs/modding/content-packs.md", `
## Implementation Specification

Content packs ship \`manifest.json\` + \`Content/\` + optional \`Definitions/\`. No code. Register via registry contribution files listing primary asset ids.
`);

append("docs/hub/backend-contracts.md", `
## Implementation Specification

### Error Model

JSON errors: \`{ "code": "package_not_found", "message": "...", "details": {} }\`

### Rate Limits

Anonymous search soft limit; authenticated upload stricter quotas. Clients backoff on 429.
`);

append("docs/ui/hud.md", `
## Implementation Specification

### View Models

Bind to replicated fields via lightweight VMs. Avoid tick polling when rep notifies exist. Extension slots named: \`Slot.TopCenter\`, \`Slot.BottomLeft\`, \`Slot.BottomRight\`, \`Slot.Left\`, \`Slot.Right\`. Core does not ship \`Slot.Objectives\`.
`);

console.log("F complete");
