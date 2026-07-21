# Late Join and Spectate

## Purpose

Define policies for joining after match start.

## Responsibilities

- Mode-defined join policies
- Snapshot replication for join-in-progress
- Spectate camera rules

## Architecture

Policies: `Reject`, `SpectateOnly`, `JoinInProgress`. Default for classic survival: `Reject` or `SpectateOnly` (mode choice). JIP must replicate world flags, door states, inventories, round index, power domains.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Client connect → server policy → send snapshot → client Asset Manager ensures assets → spawn or spectate.

## Networking

Snapshot is reliable bundled state; not a storm of historical events.

## Events

`Net.LateJoinRejected`, `Net.SpectateStarted`, `Net.JIPCompleted`

## Extension Points

Modes customize inventory seeding on JIP.

## Examples

Tournament mode rejects late join; casual friends mode allows spectate.

## Edge Cases

JIP during boss script plugin: wait for safe point or reject.

## Future Considerations

Reconnect to same slot after crash.

## Related Documents

- [Game Modes](../gameplay/game-modes/index.md)
- [Replication](replication.md)
