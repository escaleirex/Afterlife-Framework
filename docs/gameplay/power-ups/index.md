# Power-Ups

## Purpose

Provide short-duration, match-wide or local temporary effects that alter priorities (max ammo, insta-kill, double points, carpenter, fire sale, nuke equivalents) as data-driven definitions.

## Responsibilities

- Spawn drops from weighted tables on kills
- Activate on pickup with durations
- Stacking/refresh policies
- Integrate with Economy, Crates, Barriers, AI damage

## Architecture

`PowerUpDefinition` with effect modules and scope (instigator team / all players). Drop director listens to Enemy.Killed.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Kill → roll drop → spawn pickup → touch → activate → timers → expire event.

## Networking

Server spawns and activates. Replicate active effects list with expire timestamps.

## Events

`PowerUp.Dropped`, `PowerUp.Activated`, `PowerUp.Expired`

## Extension Points

Custom effects · map-only drops · mutator drop rates.

## Examples

Double Points changes Economy multipliers for 30s; Carpenter restores barriers.

## Edge Cases

Multiple overlapping doubles · nuke during round end · pickup while downed.

## Future Considerations

Player-targeted power-ups as mode option.

## Implementation Specification

### Drop Director

On kill, roll drop chance with spacing limits. Scopes: Instigator / Team / Match. Modules: RefillAmmo, Nuke, CurrencyGainMultiplier, EnemyFragile, RepairAllBarriers, CrateCostOverride. Display names are content-defined.

## Related Documents

- [Economy](../economy/index.md)
- [Barriers](../barriers/index.md)
- [Mystery Box](../mystery-box/index.md)
