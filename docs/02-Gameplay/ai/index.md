# Enemy AI

## Purpose

Provide readable horde pressure via pathing, barrier interaction, vaulting, and target selection—simple individually, dangerous collectively.

## Responsibilities

- Target selection / retarget rules
- Navigation to players
- Barrier attack / traverse
- Vault/climb abilities as components
- Perception throttling for performance
- Death reporting to Economy/Rounds

## Architecture

Enemy = definition + pawn + modular behavior components. Avoid deep inheritance. Crowd is fluid: block routes, overflow windows, pressure training loops.

Specials are definitions with extra components—not hardcoded classes per IP enemy.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Spawn → AI controller possesses → target player → path → interact barrier or attack → on death publish Enemy.Killed.

## Networking

Server simulates AI. Clients animate from replicated movement/state.

## Events

`Enemy.Spawned`, `Enemy.Killed`, `Enemy.Damaged`, `Barrier.Attacked`, `Enemy.SpecialStateChanged`

## Extension Points

Behavior components · target scoring strategies · animset swaps · crowd density policies.

## Examples

Basic walker; runner speed tier from round scaling; lockers that only spawn after WorldFlag.

## Edge Cases

Navmesh missing · stuck detection · server hitch spikes · friendly fire policies.

## Future Considerations

Animation warping improvements · smarter traversal without breaking readability.

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

```
Weapon hit → Armor/modifiers → Health → Death
Death → Anim → Corpse policy → Enemy.Killed(tags)
```

Economy listens to tags (`headshot`, `melee`, `trap`).

### Performance Controls

- Animation budget LOD by distance
- Perception group updates
- Avoid allocations in AI tick path
- Pool enemy pawns when mode allows

### Specialty Enemies

Compose via components: `TelegraphComponent`, `ArmorPlateComponent`, `SummonOnDeathComponent`. Register definitions; do not hardcode class names for content identity in core.

## Related Documents

- [Spawn Director](../spawn-director/index.md)
- [Barriers](../barriers/index.md)
- [Performance](../../01-Engine/performance/index.md)
