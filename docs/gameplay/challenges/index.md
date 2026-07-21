# Challenge & Statistics Hooks

## Purpose

Track challenges and stats as meta layer—not as in-match objective trackers.

## Responsibilities

- Listen to gameplay events for counters
- Persist via Save System
- Present in Profile UI
- Optional match-end summary

## Architecture

`StatCounter` and `ChallengeDefinition` evaluate event streams post-facto. They must not create HUD objective lists by default.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Events → counters → save · unlock cosmetics if mode allows.

## Networking

Server may validate anti-cheat sensitive unlocks; clients show UI.

## Events

`Stats.CounterIncreased`, `Challenge.Completed` (meta)

## Extension Points

Seasonal challenge packs via Hub · map-specific challenges as plugins.

## Examples

Lifetime headshots; high round personal best.

## Edge Cases

Offline progress merge · cheating inflation · modded matches flagged.

## Future Considerations

Leaderboards opt-in.

## Implementation Specification

Stat counters subscribe to Event Bus offline from HUD objectives. Challenge completion writes Save System and may unlock cosmetics. Match-end summary is optional UI, not an objective tracker.

## Related Documents

- [Progression](../progression/index.md)
- [Profile UI](../../ui/profile.md)
- [Discovery Philosophy](../../philosophy/discovery-philosophy.md)
