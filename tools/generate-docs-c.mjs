/**
 * Afterlife Framework — Documentation Generator (part C: philosophy + gameplay)
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

function gameplaySys(name, title, extras) {
  w(`docs/gameplay/${name}/index.md`, sys({
    title,
    purpose: extras.purpose,
    responsibilities: extras.responsibilities,
    architecture: extras.architecture,
    authority: extras.authority,
    config: extras.config,
    presentation: extras.presentation,
    extension: extras.extension,
    dataFlow: extras.dataFlow,
    networking: extras.networking,
    events: extras.events,
    extensionPoints: extras.extensionPoints,
    examples: extras.examples,
    edgeCases: extras.edgeCases,
    future: extras.future,
    related: extras.related,
  }));
}

// Philosophy + index (ensure exist)
w("docs/index.md", `# Afterlife Framework Documentation

> **Single source of truth.** If code and docs disagree, update code to match docs—or amend docs via RFC.

Welcome to the official documentation for **Afterlife Framework**, an open-source Unreal Engine 5 (UnrealSharp / C#) engine for round-based survival experiences.

---

## How to Read These Docs

1. **New contributors** → [Getting Started](getting-started/overview.md) → [Design Philosophy](philosophy/design-philosophy.md)
2. **Gameplay programmers** → [Architecture Overview](architecture/overview.md) → [Event Bus](core/event-bus.md) → [Gameplay Index](gameplay/index.md)
3. **Network engineers** → [Networking Overview](networking/overview.md)
4. **Mappers** → [Mapping Guide](mapping/index.md)
5. **Modders** → [Modding Guide](modding/index.md)
6. **UI engineers** → [UI Index](ui/index.md) → [Lobby](lobby/index.md) → [Afterlife Hub](hub/index.md)
7. **Feature proposers** → [RFC Process](rfc/process.md)

## Documentation Map

### Philosophy
- [Design Philosophy](philosophy/design-philosophy.md)
- [Discovery Philosophy](philosophy/discovery-philosophy.md)
- [Gameplay Philosophy](philosophy/gameplay-philosophy.md)
- [Compatibility Promise](philosophy/compatibility.md)
- [Multiplayer Doctrine](philosophy/multiplayer-doctrine.md)
- [Modding Doctrine](philosophy/modding-doctrine.md)

### Core
- [Event Bus](core/event-bus.md) · [Registries](core/registries.md) · [Asset Manager](core/asset-manager.md) · [Dependency Loader](core/dependency-loader.md) · [Save System](core/save-system.md) · [Plugin System](core/plugin-system.md) · [Session Lifecycle](core/session-lifecycle.md) · [Time & Tick](core/time-and-tick.md)

### Gameplay
- [Gameplay Index](gameplay/index.md)

### Frontend
- [UI](ui/index.md) · [Lobby](lobby/index.md) · [Hub](hub/index.md)

### Creators
- [Mapping](mapping/index.md) · [Modding](modding/index.md) · [Plugins](plugins/index.md)

### Quality & Process
- [Code Style](standards/code-style.md) · [Testing](testing/index.md) · [Performance](performance/index.md) · [CI/CD](devops/ci-cd.md) · [RFC](rfc/process.md) · [Roadmap](../ROADMAP.md)

## Document Contract

Every system document includes: Purpose · Responsibilities · Architecture · Ownership · Data Flow · Networking · Events · Extension Points · Examples · Edge Cases · Future Considerations

## Version

Documentation baseline: **0.1.0-docs**
`);

w("docs/philosophy/design-philosophy.md", `# Design Philosophy

## Purpose

Define the non-negotiable design laws of Afterlife Framework: a professional open-source gameplay **engine**, not a shipped commercial game clone.

## Core Statement

> Afterlife Framework is an engine. Maps provide content. The framework provides gameplay. Everything is modular, data-driven, event-connected, multiplayer-authoritative, and backwards-compatible.

## Laws

1. **Engine, not game** — no proprietary IP in core; generic vocabulary only.
2. **Maps contain almost no gameplay code** — systems + data + plugins.
3. **Composition over inheritance** — strategies, components, modifiers.
4. **Data-driven by default** — tunables in assets, not magic numbers.
5. **Event Bus communication** across system boundaries.
6. **Everything replaceable** without forking core.
7. **No hardcoded content identity** in engine code.
8. **Readable code over clever code**.
9. **Documentation over assumptions**.
10. **Community first, open-source forever**.

## Decision Test

Mapper-usable without gameplay code? Mod-replaceable? Dedicated-server safe? No forced objectives? No proprietary IP? Documented? Tested? Compatible with older maps?

## Related Documents

- [Discovery Philosophy](discovery-philosophy.md)
- [Gameplay Philosophy](gameplay-philosophy.md)
- [Compatibility](compatibility.md)
- [Multiplayer Doctrine](multiplayer-doctrine.md)
- [Modding Doctrine](modding-doctrine.md)
`);

w("docs/philosophy/discovery-philosophy.md", `# Discovery Philosophy

## Purpose

Preserve classic round-based survival identity: players experiment and discover; the engine does not checklist them.

## Non-Negotiable Rule

Core must not include built-in **Main Quest**, **Side Quest**, **Objective**, or **Mission** types.

## Core Alternatives

Interactions · Event Bus · generic \`WorldFlag\` / \`UnlockToken\` · optional map hint plugins · dialogue triggers · environmental storytelling.

## Optional Map Systems

Maps may add hint/objective/quest-like graphs as content, mods, or opt-in mode modules—never mandatory core ontology.

See [Quest Framework (Opt-In)](../gameplay/quest-framework/index.md).

## Related Documents

- [Design Philosophy](design-philosophy.md)
- [HUD](../ui/hud.md)
`);

w("docs/philosophy/gameplay-philosophy.md", `# Gameplay Philosophy

## Purpose

Define systemic pillars for round-based survival while remaining generic enough to express WaW→BO3 *styles* and new inventions.

## Survival Loop

Spawn → Kill → Earn currency → Unlock map → Gain power → Endure escalation → Fail → Rematch.

## Pillars

Round progression · Economy as progression · Map-as-puzzle · Risk/reward · Scarcity · Movement primacy · Horde as fluid pressure · Predictable randomness · Power curve with late soft-fall · Emergent co-op roles · Simplicity under complexity.

## Forbidden

Proprietary names in core · Required Main Quest · Client-owned scoring · Singleplayer-only default branches.

## Related Documents

- [Rounds](../gameplay/rounds/index.md)
- [Economy](../gameplay/economy/index.md)
- [AI](../gameplay/ai/index.md)
`);

w("docs/philosophy/compatibility.md", `# Compatibility Promise

## Promise

The framework should **never intentionally break map compatibility**. Maps from years ago should keep working whenever possible. Breaks from undocumented API misuse are mapper responsibility; silent breaks of documented APIs are framework responsibility.

## Tiers

Undocumented internals (free) · Public C# APIs (SemVer) · Data schemas (additive + migrations) · Manifests (versioned) · Saves (migrations mandatory) · Net protocol (negotiate/refuse cleanly).

## Deprecation

Obsolete → docs + diagnostics → dual-path window → remove only in major with RFC + CHANGELOG.

## Related Documents

- [Save System](../core/save-system.md)
- [Roadmap](../../ROADMAP.md)
`);

w("docs/philosophy/multiplayer-doctrine.md", `# Multiplayer Doctrine

Never assume singleplayer. Server authority for gameplay truth. Clients predict presentation only. Dedicated servers required. Late join policy explicit per mode. Server RNG for fairness. Bandwidth is a design constraint.

## Related Documents

- [Networking Overview](../networking/overview.md)
- [Authority](../networking/authority.md)
`);

w("docs/philosophy/modding-doctrine.md", `# Modding Doctrine

Support Global Mods, Content Packs, Embedded Mods, Map Dependencies, Plugin Dependencies, simultaneous mods, versioning, automatic dependency resolution, one-click install.

Players should never manually install dependencies. Maps may require or recommend mods. Hub resolves graphs.

## Related Documents

- [Modding Guide](../modding/index.md)
- [Dependency Loader](../core/dependency-loader.md)
- [Hub](../hub/index.md)
`);

w("docs/gameplay/index.md", `# Gameplay Systems Index

Gameplay lives in reusable, data-driven, event-connected systems. Maps wire content; systems provide behavior.

## Systems

| System | Doc |
|--------|-----|
| Rounds | [rounds/index.md](rounds/index.md) |
| Economy | [economy/index.md](economy/index.md) |
| Spawn Director | [spawn-director/index.md](spawn-director/index.md) |
| AI | [ai/index.md](ai/index.md) |
| Barriers | [barriers/index.md](barriers/index.md) |
| Doors | [doors/index.md](doors/index.md) |
| Power | [power/index.md](power/index.md) |
| Weapons | [weapons/index.md](weapons/index.md) |
| Wall Buys | [wall-buys/index.md](wall-buys/index.md) |
| Mystery Box / Random Crate | [mystery-box/index.md](mystery-box/index.md) |
| Pack-a-Punch / Upgrade Station | [pack-a-punch/index.md](pack-a-punch/index.md) |
| Perks | [perks/index.md](perks/index.md) |
| Power-Ups | [power-ups/index.md](power-ups/index.md) |
| Consumables | [consumables/index.md](consumables/index.md) |
| Buildables | [buildables/index.md](buildables/index.md) |
| Traps | [traps/index.md](traps/index.md) |
| Wonder Weapons | [wonder-weapons/index.md](wonder-weapons/index.md) |
| Bosses | [bosses/index.md](bosses/index.md) |
| Characters | [characters/index.md](characters/index.md) |
| Dialogue | [dialogue/index.md](dialogue/index.md) |
| Cutscenes | [cutscenes/index.md](cutscenes/index.md) |
| Challenges | [challenges/index.md](challenges/index.md) |
| Progression | [progression/index.md](progression/index.md) |
| Game Modes | [game-modes/index.md](game-modes/index.md) |
| Music | [music/index.md](music/index.md) |
| Quest Framework (Opt-In) | [quest-framework/index.md](quest-framework/index.md) |

## Implementation Order (Phase 2)

Follow [ROADMAP](../../ROADMAP.md). Typical vertical slice: Rounds + Spawn + AI + Economy + Doors + Weapons + Wall Buys, then Power, Perks, Crate, Upgrade Station, Power-Ups.
`);

// Gameplay systems
gameplaySys("rounds", "Round System", {
  purpose: "Drive the heartbeat of survival matches: round index, phases, intermissions, and scaling hooks consumed by directors and UI.",
  responsibilities: `- Advance round phases: Intermission → Spawning → Active → RoundEnd
- Expose round index and scaling parameters
- Integrate with Spawn Director targets
- Support mode overrides (endless, timed, sudden-death mutators)
- Never decide map “objectives”`,
  architecture: `### Phases

\`\`\`
MatchStart → RoundIntro(optional) → Intermission → Spawning → Active
  → (all required enemies cleared OR mode rule) → RoundEnd → next Intermission
\`\`\`

### Scaling

Data curves supply health multipliers, speed tiers, count targets, and spawn interval modifiers. \`IRoundScalingStrategy\` can replace defaults.

### Clear Conditions

Default: eliminate allocated enemies for the round (including those still spawning). Modes may redefine clear conditions without renaming this system into a quest system.`,
  dataFlow: `GameMode StartMatch → RoundDirector.StartRound(1) → publish Round.Started → Spawn Director requests budget → enemies die → budget satisfied → Round.Ended → intermission timers → next round.`,
  networking: `Round index, phase, and end timestamps replicate on GameState. Clients never advance rounds locally.`,
  events: `| Event | Payload highlights |
|-------|-------------------|
| \`Round.Started\` | index, targetCount, scaling snapshot |
| \`Round.PhaseChanged\` | phase |
| \`Round.Ended\` | index, duration |
| \`Round.IntermissionStarted\` | duration |`,
  extensionPoints: `Custom scaling strategies · custom clear condition strategies · mutators that skip intermission · map hooks on events only.`,
  examples: `Classic curve: slow early rounds for economy teaching; aggressive mid-game; extreme late counts with specialty spawn mixes via Spawn Director.`,
  edgeCases: `Last enemy stuck in unreachable geo: timeout + teleport/despawn policy configurable · host pause not freezing dedicated server · round end during power-up: power-up continues unless mode says otherwise.`,
  future: `Round replay markers · adaptive scaling experimental strategies (opt-in).`,
  related: `- [Spawn Director](../spawn-director/index.md)
- [Gameplay Philosophy](../../philosophy/gameplay-philosophy.md)
- [Game Modes](../game-modes/index.md)`
});

gameplaySys("economy", "Economy System", {
  purpose: "Provide authoritative currency earn/spend as the primary progression fuel for map unlocks and power acquisition.",
  responsibilities: `- Grant currency for tagged actions (damage ticks, kills, melee bonus, repairs, assists)
- Debit for purchases with validation
- Support multiple currencies if mode defines them (default one)
- Emit events for UI and analytics
- Prevent client forging`,
  architecture: `### Reward Matrix

Data table maps \`RewardTag\` → points. Weapons/perks can add multipliers via modifier stack.

### Purchase Pipeline

\`\`\`
Request(item) → Validate(prereq, range, funds, sold-out) → Debit → Grant → Events
\`\`\`

### Income Optimization

Early-round multi-hit rewards are intentional and data-driven—not bugs.`,
  dataFlow: `Combat/AI systems tag actions → Economy grants on server → PlayerState currency replicates → HUD listens.`,
  networking: `Currency is server PlayerState. Reject RPCs that claim grants.`,
  events: `\`Economy.CurrencyChanged\`, \`Economy.PurchaseSucceeded\`, \`Economy.PurchaseRejected\`, \`Economy.RewardGranted\``,
  extensionPoints: `Extra currencies · shared team pools (mode) · tax mutators · double-points power-up multiplier hooks.`,
  examples: `Door costs 750; wall buy 1200; crate 950—values from map data assets, not code.`,
  edgeCases: `Simultaneous purchases · debt not allowed · disconnect mid-purchase · overflow clamps.`,
  future: `Economy debugger overlay for mappers.`,
  related: `- [Doors](../doors/index.md)
- [Wall Buys](../wall-buys/index.md)
- [Authority](../../networking/authority.md)`
});

gameplaySys("spawn-director", "Spawn Director", {
  purpose: "Decide what enemies spawn, where, and when, under round budgets—using replaceable strategies.",
  responsibilities: `- Consume round spawn budgets
- Select spawn points / windows / zones
- Respect occupancy, player proximity rules, and throttle
- Mix enemy types via weighted tables
- Cooperate with AI and Barriers`,
  architecture: `\`ISpawnDirectorStrategy\` implementations: WindowBased, ZoneBased, ScriptedWave (still not quest), Hybrid.

Spawn points are map actors with tags/priorities. Director never hardcodes map names.`,
  dataFlow: `Round.Started → compute budget → tick spawn attempts → spawn enemy via registry definition → decrement budget → Round clear when active+pending zero.`,
  networking: `Spawns are server-only. Clients receive replicated enemy actors.`,
  events: `\`Spawn.EnemySpawned\`, \`Spawn.BudgetChanged\`, \`Spawn.PointBlocked\`, \`Spawn.StrategyChanged\``,
  extensionPoints: `Custom strategies · specialty spawners · boss intro spawn hooks · mutators altering weights.`,
  examples: `Early rounds prefer nearest windows; later rounds widen zone set after doors open (listens to Door.Opened / WorldFlags).`,
  edgeCases: `All points blocked · players camping spawn · max AI cap reached (queue) · map with zero points (fail validation).`,
  future: `ML-assisted directors only as opt-in plugins, never core requirement.`,
  related: `- [Rounds](../rounds/index.md)
- [AI](../ai/index.md)
- [Barriers](../barriers/index.md)`
});

gameplaySys("ai", "Enemy AI", {
  purpose: "Provide readable horde pressure via pathing, barrier interaction, vaulting, and target selection—simple individually, dangerous collectively.",
  responsibilities: `- Target selection / retarget rules
- Navigation to players
- Barrier attack / traverse
- Vault/climb abilities as components
- Perception throttling for performance
- Death reporting to Economy/Rounds`,
  architecture: `Enemy = definition + pawn + modular behavior components. Avoid deep inheritance. Crowd is fluid: block routes, overflow windows, pressure training loops.

Specials are definitions with extra components—not hardcoded classes per IP enemy.`,
  dataFlow: `Spawn → AI controller possesses → target player → path → interact barrier or attack → on death publish Enemy.Killed.`,
  networking: `Server simulates AI. Clients animate from replicated movement/state.`,
  events: `\`Enemy.Spawned\`, \`Enemy.Killed\`, \`Enemy.Damaged\`, \`Barrier.Attacked\`, \`Enemy.SpecialStateChanged\``,
  extensionPoints: `Behavior components · target scoring strategies · animset swaps · crowd density policies.`,
  examples: `Basic walker; runner speed tier from round scaling; lockers that only spawn after WorldFlag.`,
  edgeCases: `Navmesh missing · stuck detection · server hitch spikes · friendly fire policies.`,
  future: `Animation warping improvements · smarter traversal without breaking readability.`,
  related: `- [Spawn Director](../spawn-director/index.md)
- [Barriers](../barriers/index.md)
- [Performance](../../performance/index.md)`
});

gameplaySys("barriers", "Barriers / Windows", {
  purpose: "Model repairable entry points that enemies pressure and players can repair for economy and map control.",
  responsibilities: `- Track barrier board/health segments
- Allow player repair interactions
- Allow enemy attack to remove segments
- Notify Spawn Director of availability
- Award repair currency via Economy`,
  architecture: `Barrier actors with segment counts, repair channel, enemy attack socket. Optional one-way traverse when open.`,
  dataFlow: `Enemy attacks → segment removed → event → player holds repair → segments restored → Economy reward per segment.`,
  networking: `Segment state replicated. Repair progress server-authoritative.`,
  events: `\`Barrier.SegmentBroken\`, \`Barrier.Repaired\`, \`Barrier.FullyOpen\`, \`Barrier.FullyClosed\``,
  extensionPoints: `Electrified barriers · trap-linked barriers · mutators disabling repairs.`,
  examples: `Classic window line teaching early-round play.`,
  edgeCases: `Multiple repairers · enemy and player interact same frame · carpenter power-up mass repair.`,
  future: `Destructible geo barriers as plugin.`,
  related: `- [AI](../ai/index.md)
- [Power-Ups](../power-ups/index.md)
- [Economy](../economy/index.md)`
});

gameplaySys("doors", "Doors & Map Unlock Continuum", {
  purpose: "Gate map traversal and progression graph via purchasable or triggerable doors/debris clears without quest semantics.",
  responsibilities: `- Purchase validation via Economy
- Prerequisite WorldFlags (e.g., power)
- Replicate open state
- Expand spawn zones via events
- Support debris, debris-clear, and gate variants`,
  architecture: `\`DoorDefinition\` + actor. Costs and prerequisites are data. Opening sets WorldFlags and fires events; Spawn Director listens.`,
  dataFlow: `Hold interact → RPC → validate → debit → open → Door.Opened → directors/UI/audio react.`,
  networking: `Server authority on open. Clients play predicted interact anim only.`,
  events: `\`Door.Opened\`, \`Door.PurchaseRejected\`, \`WorldFlag.Changed\``,
  extensionPoints: `Key items as generic InventoryToken prerequisites · team-shared doors · timed gates.`,
  examples: `750 door expands playspace; power door requires Power.Activated flag.`,
  edgeCases: `Already open · insufficient funds · blocked by enemy collision policy · JIP snapshot.`,
  future: `Door graph validator in tools.`,
  related: `- [Power](../power/index.md)
- [Economy](../economy/index.md)
- [Mapping Guide](../../mapping/index.md)`
});

gameplaySys("power", "Power System", {
  purpose: "Model power domains that unlock machines and map systems without hardcoding a single switch fantasy.",
  responsibilities: `- Track global and local power domains
- Activate via interactions / buildables / round rules
- Gate perks, traps, upgrade stations, lights as content chooses
- Replicate domain states`,
  architecture: `\`PowerDomainId\` set on GameState. Actors declare required domains. Multiple domains allowed (brownouts, sector power).`,
  dataFlow: `Switch interact → server activates domain → Power.Activated → machines become purchasable.`,
  networking: `Domain bitfield/map replicated.`,
  events: `\`Power.Activated\`, \`Power.Deactivated\`, \`Power.Brownout\` (optional)`,
  extensionPoints: `Generators · buildable power · temporary power mutators.`,
  examples: `Single global domain for classic maps; multi-wing domains for complex maps.`,
  edgeCases: `Double activation · deactivation mid-perk purchase · domain dependencies.`,
  future: `Power graph visualization tool.`,
  related: `- [Perks](../perks/index.md)
- [Traps](../traps/index.md)
- [Pack-a-Punch](../pack-a-punch/index.md)`
});

gameplaySys("weapons", "Weapons Pipeline", {
  purpose: "Provide a modular weapon definition → inventory → firing → ammo → upgrade pipeline that content packs can extend.",
  responsibilities: `- Register weapon definitions
- Manage inventory slots
- Handle fire, reload, swap
- Support wall buys, crate grants, starting loadouts
- Integrate with upgrade station tiers
- Apply perk/consumable modifiers`,
  architecture: `Definition includes damage profiles, ammo, slots, rarity tags, upgrade paths. Components: Hitscan/Projectile, ADS, Melee. Wonder weapons are definitions with specialty modules—see Wonder Weapons doc.`,
  dataFlow: `Acquire → Inventory add → equip → input fire RPC/server validate → apply damage → Economy reward tags.`,
  networking: `Server validates shots. Clients predict FX/anims. Ammo truth on server.`,
  events: `\`Weapon.Acquired\`, \`Weapon.Removed\`, \`Weapon.Fired\`, \`Weapon.Reloaded\`, \`Weapon.Upgraded\``,
  extensionPoints: `New fire modes · attachment system · dual wield as plugin · pack tiers.`,
  examples: `Starter pistol wall-buyable; LMGs crate-weighted rare; pack adds ammo + damage + FX.`,
  edgeCases: `Weapon limit + mule perk · swap during pack · ammo overflow · late join inventory snapshot.`,
  future: `Weapon inspector for Hub previews.`,
  related: `- [Wall Buys](../wall-buys/index.md)
- [Mystery Box](../mystery-box/index.md)
- [Pack-a-Punch](../pack-a-punch/index.md)`
});

gameplaySys("wall-buys", "Wall Buys", {
  purpose: "Offer deterministic weapon acquisition at fixed map locations for reliable progression.",
  responsibilities: `- Display affordance + cost
- First purchase grants weapon; subsequent may grant ammo
- Respect inventory rules
- Optional power prerequisites`,
  architecture: `WallBuy actor references \`WeaponDefinition\` + costs. Ammo repurchase costs separate.`,
  dataFlow: `Interact → Economy purchase → Weapons grant/ammo → events.`,
  networking: `Server authority.`,
  events: `\`WallBuy.Purchased\`, \`WallBuy.AmmoPurchased\`, \`WallBuy.Rejected\``,
  extensionPoints: `Shared wall buys · randomized daily wall (mutator) · class-locked buys (mode).`,
  examples: `SMG for 1000; ammo 500.`,
  edgeCases: `Owns upgraded variant · inventory full · weapon banned by mutator.`,
  future: `Validator ensures wall buy weapons exist in registry.`,
  related: `- [Weapons](../weapons/index.md)
- [Economy](../economy/index.md)`
});

gameplaySys("mystery-box", "Random Weapon Crate (Mystery Box)", {
  purpose: "Provide risky random weapon acquisition with weights, relocation, and sale events—fully data-driven.",
  responsibilities: `- Weighted rolls from tables
- Charge currency
- Teddy/relocation equivalent as generic \`CrateMoveToken\`
- Fire sale style cost overrides via power-ups/mutators
- Support multiple crates`,
  architecture: `\`CrateWeightStrategy\` + location actors. Roll is server RNG. Presentation cycle is cosmetic timing with authoritative result chosen up front (anti-cheat).`,
  dataFlow: `Pay → roll → present → player take/timeout → inventory grant → possible move token decrements → relocate.`,
  networking: `Server rolls. Clients play spin FX with result id.`,
  events: `\`Crate.RollStarted\`, \`Crate.ResultReady\`, \`Crate.Taken\`, \`Crate.Relocated\`, \`Crate.SaleChanged\``,
  extensionPoints: `Custom weight strategies · wonder weapon limited stock · map-specific tables.`,
  examples: `Fire Sale power-up reduces cost temporarily across crates.`,
  edgeCases: `Inventory full · disconnect mid-roll · simultaneous users (queue) · empty table after bans.`,
  future: `Pity timers as optional strategies (document fairness).`,
  related: `- [Weapons](../weapons/index.md)
- [Power-Ups](../power-ups/index.md)`
});

gameplaySys("pack-a-punch", "Upgrade Station (Pack-a-Punch)", {
  purpose: "Provide a generic weapon upgrade station framework for tiered power spikes with FX, rename, and effect modules.",
  responsibilities: `- Gate behind power/WorldFlags
- Accept weapon + currency
- Apply upgrade tier definition
- Support multi-tier packs if data defines
- Handle AAT-like attachment slots as optional modules`,
  architecture: `\`WeaponUpgradePath\` on weapon definition. Station actor validates, plays sequence, returns upgraded instance id. Effects are modifier modules, not hardcoded names.`,
  dataFlow: `Interact → validate → debit → begin upgrade sequence → replace weapon → Weapon.Upgraded.`,
  networking: `Server authority; sequence timing replicated as state enum.`,
  events: `\`UpgradeStation.Opened\`, \`UpgradeStation.UpgradeStarted\`, \`UpgradeStation.UpgradeCompleted\`, \`UpgradeStation.Rejected\``,
  extensionPoints: `Tier 2+ packs · elemental attachment re-rolls · map-unique camo sets.`,
  examples: `Pack increases damage and magazine; adds unique particle; optional element cycle module.`,
  edgeCases: `Already max tier · packing wonder weapon restricted · player downs mid-pack · station offline without power.`,
  future: `Co-op dual-pack animations as content only.`,
  related: `- [Weapons](../weapons/index.md)
- [Power](../power/index.md)`
});

gameplaySys("perks", "Perks Framework", {
  purpose: "Provide purchasable persistent player modifiers with slot limits, loss-on-down rules, and machine actors—without hardcoded franchise perk identities.",
  responsibilities: `- Register perk definitions + effect modules
- Enforce slot caps
- Handle purchase and soda-machine style interactions generically
- Apply/remove modifiers
- Support perk loss / keep rules via mode`,
  architecture: `\`PerkDefinition\` + \`IPerkEffect\`. Machines reference definition ids. Modifier stack integrates with health, reload, move, weapon slots, etc.`,
  dataFlow: `Buy → debit → add perk → apply effects → replicate perk bitset/ids → on down/bleedout apply loss policy.`,
  networking: `Server owns perk list. Clients display.`,
  events: `\`Perk.Purchased\`, \`Perk.Removed\`, \`Perk.EffectApplied\`, \`Perk.SlotsChanged\``,
  extensionPoints: `New effects · slot-expand consumables · perk recycling machines · whitelists per map.`,
  examples: `Tank perk increases max health; Speed perk shortens reload; Stamina perk changes move costs.`,
  edgeCases: `Duplicate buy · slot full · power off · mutator bans · JIP.`,
  future: `Perk quality tiers as optional packs.`,
  related: `- [Power](../power/index.md)
- [Consumables](../consumables/index.md)
- [Characters](../characters/index.md)`
});

gameplaySys("power-ups", "Power-Ups", {
  purpose: "Provide short-duration, match-wide or local temporary effects that alter priorities (max ammo, insta-kill, double points, carpenter, fire sale, nuke equivalents) as data-driven definitions.",
  responsibilities: `- Spawn drops from weighted tables on kills
- Activate on pickup with durations
- Stacking/refresh policies
- Integrate with Economy, Crates, Barriers, AI damage`,
  architecture: `\`PowerUpDefinition\` with effect modules and scope (instigator team / all players). Drop director listens to Enemy.Killed.`,
  dataFlow: `Kill → roll drop → spawn pickup → touch → activate → timers → expire event.`,
  networking: `Server spawns and activates. Replicate active effects list with expire timestamps.`,
  events: `\`PowerUp.Dropped\`, \`PowerUp.Activated\`, \`PowerUp.Expired\``,
  extensionPoints: `Custom effects · map-only drops · mutator drop rates.`,
  examples: `Double Points changes Economy multipliers for 30s; Carpenter restores barriers.`,
  edgeCases: `Multiple overlapping doubles · nuke during round end · pickup while downed.`,
  future: `Player-targeted power-ups as mode option.`,
  related: `- [Economy](../economy/index.md)
- [Barriers](../barriers/index.md)
- [Mystery Box](../mystery-box/index.md)`
});

gameplaySys("consumables", "Consumables Framework", {
  purpose: "Support limited-use player consumables (Gobblegum-like) without franchise naming—loadout selection in lobby, activation in match, rarity/economy optional.",
  responsibilities: `- Register consumable definitions
- Lobby loadout selection within mode rules
- In-match activation + charges
- Cooldowns and mutual exclusions
- Optional meta economy (Phase 4+) without pay-to-win in core defaults`,
  architecture: `\`ConsumableDefinition\` + activation modules. Inventory charges on PlayerState. Modes choose whether consumables exist.`,
  dataFlow: `Lobby select → match start grant charges → activate RPC → validate → apply → consume charge.`,
  networking: `Server validates activation.`,
  events: `\`Consumable.Selected\`, \`Consumable.Activated\`, \`Consumable.Denied\`, \`Consumable.ChargeChanged\``,
  extensionPoints: `New activation modules · shared team consumables · round-restricted uses.`,
  examples: `Instant revive token; temporary perk; ammo refill; crate bias bump.`,
  edgeCases: `Activate while interacting · zero charges · banned by map · desync lobby selection.`,
  future: `Hub cosmetic wrappers for consumable VFX only.`,
  related: `- [Lobby](../../lobby/index.md)
- [Perks](../perks/index.md)
- [Progression](../progression/index.md)`
});

gameplaySys("buildables", "Buildables", {
  purpose: "Support parts collection and crafting benches for map-unique tools, traps, or wonder weapon components—event-driven, not quest-forced.",
  responsibilities: `- Place parts in world with pickup rules
- Track per-player or shared progress
- Assemble at build tables
- Grant resulting item/actor`,
  architecture: `Parts are InventoryTokens or world pickups. \`BuildRecipe\` data maps parts → output. Discovery remains environmental; UI hints are optional map plugins.`,
  dataFlow: `Pickup part → token granted → table interact → if recipe complete → consume parts → spawn output.`,
  networking: `Server tracks tokens and builds.`,
  events: `\`Buildable.PartPicked\`, \`Buildable.Assembled\`, \`Buildable.RecipeProgress\``,
  extensionPoints: `Shared vs personal parts · damaged buildables · reverse engineer recipes.`,
  examples: `Build a trap piece; assemble a specialty weapon; craft a key item token.`,
  edgeCases: `Two players race same personal-part spawn · table without power · recipe disabled by mutator.`,
  future: `Buildables debugger showing part locations for authors only.`,
  related: `- [Wonder Weapons](../wonder-weapons/index.md)
- [Traps](../traps/index.md)
- [Discovery Philosophy](../../philosophy/discovery-philosophy.md)`
});

gameplaySys("traps", "Traps", {
  purpose: "Provide activatable damage/control devices gated by power and currency or triggers.",
  responsibilities: `- Activate/deactivate with costs and cooldowns
- Apply damage volumes / status effects
- Respect friendly fire policies
- Integrate with AI avoidance optional flags`,
  architecture: `Trap actors + definitions. Activation may be purchase, trigger plate, or automated.`,
  dataFlow: `Activate → debit if needed → enable volume → damage ticks → cooldown.`,
  networking: `Server authority on activation and damage.`,
  events: `\`Trap.Activated\`, \`Trap.Deactivated\`, \`Trap.CooldownReady\``,
  extensionPoints: `Player-built traps · escalating trap tiers · environmental hazards as traps.`,
  examples: `Electric floor for 1000 lasting 10s; fan trap on trigger.`,
  edgeCases: `Activate with enemies inside · power loss mid-trap · stacking traps.`,
  future: `Trap telemetry for balancing tools.`,
  related: `- [Power](../power/index.md)
- [AI](../ai/index.md)
- [Economy](../economy/index.md)`
});

gameplaySys("wonder-weapons", "Wonder Weapons Extension Points", {
  purpose: "Define how specialty weapons plug into the weapons pipeline without becoming hardcoded map scripts in core.",
  responsibilities: `- Provide specialty modules (beam, charge, alt-fire, unique ammo)
- Support limited stock via crate strategies
- Allow buildable acquisition paths
- Keep networking patterns consistent`,
  architecture: `Wonder weapons are still \`WeaponDefinition\`s with \`SpecialtyModules\`. Maps/mods supply modules; core supplies sockets/hooks.`,
  dataFlow: `Acquire via crate/build/wall → specialty module handles fire logic via server validation → events as weapons.`,
  networking: `Specialty projectiles replicated carefully with budgets.`,
  events: `Inherits weapon events + \`Wonder.SpecialtyStateChanged\``,
  extensionPoints: `Charge meters · alt modes · unique upgrade paths · boss-only effectiveness tags.`,
  examples: `Charge-shot rifle; zone denial weapon; chain damage module.`,
  edgeCases: `Pack restrictions · ammo type unique refill rules · performance of many VFX.`,
  future: `Authoring template pack in Phase 3 tools.`,
  related: `- [Weapons](../weapons/index.md)
- [Buildables](../buildables/index.md)
- [Mystery Box](../mystery-box/index.md)`
});

gameplaySys("bosses", "Boss Encounter Hooks", {
  purpose: "Provide hooks for boss encounters as gameplay events—not as Main Quest engines.",
  responsibilities: `- Boss pawn patterns
- Encounter state machine hooks
- Arena lock optional flags
- Reward tables on defeat
- Music/intensity integration`,
  architecture: `Bosses are enemy definitions with encounter controllers registered by map plugins. Core provides \`EncounterController\` base utilities and events. No \`MainQuestBoss\` type.`,
  dataFlow: `WorldFlag/trigger → encounter start → spawn boss → phases via controller → defeat → rewards/events.`,
  networking: `Server runs encounter controller.`,
  events: `\`Encounter.Started\`, \`Encounter.PhaseChanged\`, \`Encounter.Succeeded\`, \`Encounter.Failed\``,
  extensionPoints: `Multi-boss · optional failure (not match end) · repeatable encounters.`,
  examples: `Mid-map optional elite; late-round scripted tank enemy; map plugin cinematic intro (see Cutscenes).`,
  edgeCases: `Players leave arena · wipe policy · round overlapping encounter.`,
  future: `Encounter debugger.`,
  related: `- [Cutscenes](../cutscenes/index.md)
- [Music](../music/index.md)
- [Discovery Philosophy](../../philosophy/discovery-philosophy.md)`
});

gameplaySys("characters", "Character Systems", {
  purpose: "Support selectable characters with VO sets, presentation, and optional passive modifiers—without mandatory class roles.",
  responsibilities: `- Character registry
- Lobby selection
- Bind VO/dialogue personas
- Optional passive modifiers (mode-approved)
- Cosmetics separation from gameplay`,
  architecture: `\`CharacterDefinition\` references mesh, anim, VO board, optional modifier set. Default modes keep modifiers cosmetic-neutral unless enabled.`,
  dataFlow: `Lobby select → replicate character id → spawn presentation · dialogue system uses persona.`,
  networking: `Character id on PlayerState.`,
  events: `\`Character.Selected\`, \`Character.Changed\``,
  extensionPoints: `Map-forced character sets · unlock rules via progression · co-op unique lines.`,
  examples: `Four personas with unique quips on Power.Activated.`,
  edgeCases: `Missing character pack · duplicate unique characters if mode requires uniqueness.`,
  future: `Creator-uploaded characters via Hub with permission scopes.`,
  related: `- [Dialogue](../dialogue/index.md)
- [Lobby](../../lobby/index.md)
- [Progression](../progression/index.md)`
});

gameplaySys("dialogue", "Dialogue & VO Triggers", {
  purpose: "Play narrative and barks from events without objective UI.",
  responsibilities: `- Bind lines to Event Bus facts
- Priority/interrupt rules
- Co-op character line selection
- Localization hooks
- Subtitles optional`,
  architecture: `\`DialogueTrigger\` assets: event id + conditions + line set. Runtime Dialogue Director queues by priority.`,
  dataFlow: `Event → evaluate triggers → pick line → play audio → subtitles.`,
  networking: `Server may pick authoritative line id for sync; or each client local barks for non-critical. Document per trigger sync mode.`,
  events: `\`Dialogue.Started\`, \`Dialogue.Ended\`, \`Dialogue.Skipped\``,
  extensionPoints: `Branching conversations as optional map plugin (still not MissionSystem).`,
  examples: `First door open plays a one-time character remark.`,
  edgeCases: `Overlap spam · mute · missing VO asset · deaf accessibility (subs).`,
  future: `Radios / answerphones as world interactables.`,
  related: `- [Characters](../characters/index.md)
- [Audio](../../audio/index.md)
- [Discovery Philosophy](../../philosophy/discovery-philosophy.md)`
});

gameplaySys("cutscenes", "Cutscenes", {
  purpose: "Support optional cinematic sequences controlled by maps/plugins without forcing story completion systems.",
  responsibilities: `- Play/skip policies in multiplayer
- Input lock + camera
- Alignment with encounters
- Network timing`,
  architecture: `Level sequences / custom players wrapped by \`CutsceneDirector\`. Multiplayer default: short, skippable, non-blocking for dedicated servers unless mode requires sync.`,
  dataFlow: `Trigger → vote/skip policy → play → restore control → event.`,
  networking: `Synchronized start timestamp; lagging clients catch up or skip-to-end policy.`,
  events: `\`Cutscene.Started\`, \`Cutscene.Ended\`, \`Cutscene.Skipped\``,
  extensionPoints: `Pre/post encounter cinematics · Hub trailers are not cutscenes.`,
  examples: `Brief power-on flourish; boss entrance.`,
  edgeCases: `Player downed at start · dedicated server with no local player · skip disagreement.`,
  future: `Take viewer camera for streamers.`,
  related: `- [Bosses](../bosses/index.md)
- [Session Lifecycle](../../core/session-lifecycle.md)`
});

gameplaySys("challenges", "Challenge & Statistics Hooks", {
  purpose: "Track challenges and stats as meta layer—not as in-match objective trackers.",
  responsibilities: `- Listen to gameplay events for counters
- Persist via Save System
- Present in Profile UI
- Optional match-end summary`,
  architecture: `\`StatCounter\` and \`ChallengeDefinition\` evaluate event streams post-facto. They must not create HUD objective lists by default.`,
  dataFlow: `Events → counters → save · unlock cosmetics if mode allows.`,
  networking: `Server may validate anti-cheat sensitive unlocks; clients show UI.`,
  events: `\`Stats.CounterIncreased\`, \`Challenge.Completed\` (meta)`,
  extensionPoints: `Seasonal challenge packs via Hub · map-specific challenges as plugins.`,
  examples: `Lifetime headshots; high round personal best.`,
  edgeCases: `Offline progress merge · cheating inflation · modded matches flagged.`,
  future: `Leaderboards opt-in.`,
  related: `- [Progression](../progression/index.md)
- [Profile UI](../../ui/profile.md)
- [Discovery Philosophy](../../philosophy/discovery-philosophy.md)`
});

gameplaySys("progression", "Progression & Prestige", {
  purpose: "Optional meta-progression frameworks for modes that want XP/prestige—never required for core survival identity.",
  responsibilities: `- XP grant rules (mode)
- Prestige reset policies
- Unlock gates for cosmetics/consumable colors
- Keep match fairness defaults`,
  architecture: `Progression is a mode module. Core provides persistence hooks only. Pay-to-win unlocks are forbidden in first-party defaults.`,
  dataFlow: `Match end → compute XP → save profile → unlock checks.`,
  networking: `Server computes XP; client displays.`,
  events: `\`Progression.XPChanged\`, \`Progression.LevelUp\`, \`Progression.Prestiged\``,
  extensionPoints: `Battle-pass-like tracks as optional plugins with ethical constraints documented.`,
  examples: `Cosmetic camo at level 10; prestige resets level for badge.`,
  edgeCases: `XP in mutator spam matches · party XP share · offline cap.`,
  future: `Cross-mode profile unification.`,
  related: `- [Save System](../../core/save-system.md)
- [Consumables](../consumables/index.md)
- [Game Modes](../game-modes/index.md)`
});

gameplaySys("game-modes", "Game Modes & Mutators", {
  purpose: "Compose rulesets and modular mutators that remix systems without forking maps.",
  responsibilities: `- Register modes
- Apply mutator stacks
- Advertise lobby capabilities
- Define fail/win policies (survival fail = game over; modes may add alternatives)
- Override strategies safely`,
  architecture: `Mode definition references default strategies + allowed mutators + HUD profile + late join policy. Mutators are small patches (economy rates, friendly fire, truncated perk slots).`,
  dataFlow: `Lobby selects mode+mutators → session lock → systems configure → match.`,
  networking: `Mode/mutator ids in GameState; all peers must have packages.`,
  events: `\`Mode.Configured\`, \`Mutator.Applied\`, \`Match.GameOver\`, \`Match.Victory\` (only if mode defines victory—optional)`,
  extensionPoints: `Custom modes as plugins · ranked playlist definitions (Phase 4+).`,
  examples: `Classic Survival; Hardcore (lower health); Guns Only crate table; Friendly Fire On.`,
  edgeCases: `Conflicting mutators · map disallows mode · missing capability.`,
  future: `Mode marketplace via Hub.`,
  related: `- [Lobby](../../lobby/index.md)
- [Composition Model](../../architecture/composition-model.md)`
});

gameplaySys("music", "Music Director", {
  purpose: "Drive adaptive music based on round intensity, encounters, and events—not a forced soundtrack quest.",
  responsibilities: `- Layer stems by intensity
- React to round/power/encounter events
- Respect user music volume / mute
- Support map soundtrack packs`,
  architecture: `\`MusicDirector\` listens to Event Bus and selects states: Explore, Tension, Horde, Encounter, Intermission, GameOver.`,
  dataFlow: `Event → state evaluate → crossfade stems.`,
  networking: `Local audio; optional sync for shared cutscenes.`,
  events: `\`Music.StateChanged\`, \`Music.StingerPlayed\``,
  extensionPoints: `Map packs · dynamic remix plugins · silent horror modes.`,
  examples: `Round 20+ raises intensity tier; Power.Activated plays stinger once.`,
  edgeCases: `Overlap stingers · Hub music vs in-match · streaming latency.`,
  future: `Vertical remixing tools.`,
  related: `- [Audio](../../audio/index.md)
- [Rounds](../rounds/index.md)
- [Bosses](../bosses/index.md)`
});

gameplaySys("quest-framework", "Quest Framework (Opt-In)", {
  purpose: "Document an **optional** plugin layer for maps that want hint/objective graphs—explicitly outside core ontology.",
  responsibilities: `- Provide opt-in module not loaded by default
- Allow maps to enable via capability \`optional_objectives\`
- Ensure core HUD has zero dependency on it
- Prevent naming collisions with forbidden core types where possible by living in \`Afterlife.Optional.Objectives\` namespace`,
  architecture: `Optional plugin ships graph assets: nodes, hints, rewards. It subscribes to WorldFlags/events. It must never be referenced by core systems.`,
  dataFlow: `Map enables plugin → graph runs → UI extension shows hints → completion sets flags/rewards.`,
  networking: `If enabled, server runs graph authority.`,
  events: `Namespaced \`OptionalObjectives.*\` only.`,
  extensionPoints: `Custom nodes · multiplayer step sync · spoiler-safe progressive hints.`,
  examples: `A complex map offers an optional side path tracker for players who want it; players can disable the widget.`,
  edgeCases: `Plugin missing → map still playable · users who hate trackers can hide UI.`,
  future: `Community hint packs separate from map packages.`,
  related: `- [Discovery Philosophy](../../philosophy/discovery-philosophy.md)
- [HUD](../../ui/hud.md)
- [Plugin System](../../core/plugin-system.md)`
});

console.log(`Wrote ${written.length} files`);
