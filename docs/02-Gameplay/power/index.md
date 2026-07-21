# Power System

## Purpose

Model power domains that unlock machines and map systems without hardcoding a single switch fantasy.

## Responsibilities

- Track global and local power domains
- Activate via interactions / buildables / round rules
- Gate perks, traps, upgrade stations, lights as content chooses
- Replicate domain states

## Architecture

`PowerDomainId` set on GameState. Actors declare required domains. Multiple domains allowed (brownouts, sector power).

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Switch interact → server activates domain → Power.Activated → machines become purchasable.

## Networking

Domain bitfield/map replicated.

## Events

`Power.Activated`, `Power.Deactivated`, `Power.Brownout` (optional)

## Extension Points

Generators · buildable power · temporary power mutators.

## Examples

Single global domain for classic maps; multi-wing domains for complex maps.

## Edge Cases

Double activation · deactivation mid-perk purchase · domain dependencies.

## Future Considerations

Power graph visualization tool.

## Implementation Specification

### Domains

GameState stores `PowerDomainId → Off|On|Brownout`. Machines declare `RequiredDomains`. Activation via switch, buildable, or mode rules. Consumers fail interact with `power_required` until satisfied.

## Related Documents

- [Perks](../perks/index.md)
- [Traps](../traps/index.md)
- [Pack-a-Punch](../pack-a-punch/index.md)
