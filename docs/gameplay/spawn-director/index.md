# Spawn Director

## Purpose

Decide what enemies spawn, where, and when, under round budgets—using replaceable strategies.

## Responsibilities

- Consume round spawn budgets
- Select spawn points / windows / zones
- Respect occupancy, player proximity rules, and throttle
- Mix enemy types via weighted tables
- Cooperate with AI and Barriers

## Architecture

`ISpawnDirectorStrategy` implementations: WindowBased, ZoneBased, ScriptedWave (still not quest), Hybrid.

Spawn points are map actors with tags/priorities. Director never hardcodes map names.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Round.Started → compute budget → tick spawn attempts → spawn enemy via registry definition → decrement budget → Round clear when active+pending zero.

## Networking

Spawns are server-only. Clients receive replicated enemy actors.

## Events

`Spawn.EnemySpawned`, `Spawn.BudgetChanged`, `Spawn.PointBlocked`, `Spawn.StrategyChanged`

## Extension Points

Custom strategies · specialty spawners · boss intro spawn hooks · mutators altering weights.

## Examples

Early rounds prefer nearest windows; later rounds widen zone set after doors open (listens to Door.Opened / WorldFlags).

## Edge Cases

All points blocked · players camping spawn · max AI cap reached (queue) · map with zero points (fail validation).

## Future Considerations

ML-assisted directors only as opt-in plugins, never core requirement.

## Implementation Specification

### Budget Model

```
Budget = BaseCount(round) * PlayerCountScalar(players) * MutatorScalar
```

PlayerCountScalar SHOULD be sublinear (e.g., 1.0, 1.5, 1.9, 2.2) and data-driven.

### Spawn Attempt Loop (Server)

Every `SpawnInterval`:

1. If `Pending + Alive >= Cap` → wait
2. If `BudgetRemaining <= 0` → stop spawning
3. Select enemy definition from weighted table for this round
4. Select spawn point via strategy
5. If none legal → log `Spawn.PointBlocked` and retry with backoff
6. Spawn → decrement budget → publish `Spawn.EnemySpawned`

### Spawn Point Legality Checks

- Not occupied beyond threshold
- Not visible to players if strategy forbids (optional)
- Zone unlocked (WorldFlags / door groups)
- Barrier state compatible (window spawns need barrier actor)
- Navmesh projected point valid

### Strategy Interface

```csharp
public interface ISpawnDirectorStrategy
{
    bool TrySelectSpawn(in SpawnSelectRequest request, out SpawnSelectResult result);
    void OnWorldFlagChanged(WorldFlagId flag, bool value);
}
```

### Enemy Cap

Soft cap prevents performance collapse. Excess budget remains queued. Round cannot clear while budget queued unless timeout policy converts queue to force-spawn at farthest points.

### Map Authoring Tags

Spawn points: `Spawn.Window`, `Spawn.Zone.Courtyard`, `Spawn.Special.OnlyAfterPower`.

## Related Documents

- [Rounds](../rounds/index.md)
- [AI](../ai/index.md)
- [Barriers](../barriers/index.md)
