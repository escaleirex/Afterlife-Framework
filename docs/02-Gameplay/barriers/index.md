# Barriers / Windows

## Purpose

Model repairable entry points that enemies pressure and players can repair for economy and map control.

## Responsibilities

- Track barrier board/health segments
- Allow player repair interactions
- Allow enemy attack to remove segments
- Notify Spawn Director of availability
- Award repair currency via Economy

## Architecture

Barrier actors with segment counts, repair channel, enemy attack socket. Optional one-way traverse when open.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Enemy attacks → segment removed → event → player holds repair → segments restored → Economy reward per segment.

## Networking

Segment state replicated. Repair progress server-authoritative.

## Events

`Barrier.SegmentBroken`, `Barrier.Repaired`, `Barrier.FullyOpen`, `Barrier.FullyClosed`

## Extension Points

Electrified barriers · trap-linked barriers · mutators disabling repairs.

## Examples

Classic window line teaching early-round play.

## Edge Cases

Multiple repairers · enemy and player interact same frame · carpenter power-up mass repair.

## Future Considerations

Destructible geo barriers as plugin.

## Implementation Specification

Segments 0..Max. Enemy attack reduces; player repair increases with Economy reward per segment. Carpenter power-up sets all to Max. Spawn Director reads FullyOpen vs Closed for window legality.

## Related Documents

- [AI](../ai/index.md)
- [Power-Ups](../power-ups/index.md)
- [Economy](../economy/index.md)
