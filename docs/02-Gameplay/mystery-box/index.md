# Random Weapon Crate (Mystery Box)

## Purpose

Provide risky random weapon acquisition with weights, relocation, and sale events—fully data-driven.

## Responsibilities

- Weighted rolls from tables
- Charge currency
- Teddy/relocation equivalent as generic `CrateMoveToken`
- Fire sale style cost overrides via power-ups/mutators
- Support multiple crates

## Architecture

`CrateWeightStrategy` + location actors. Roll is server RNG. Presentation cycle is cosmetic timing with authoritative result chosen up front (anti-cheat).

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Pay → roll → present → player take/timeout → inventory grant → possible move token decrements → relocate.

## Networking

Server rolls. Clients play spin FX with result id.

## Events

`Crate.RollStarted`, `Crate.ResultReady`, `Crate.Taken`, `Crate.Relocated`, `Crate.SaleChanged`

## Extension Points

Custom weight strategies · wonder weapon limited stock · map-specific tables.

## Examples

Fire Sale power-up reduces cost temporarily across crates.

## Edge Cases

Inventory full · disconnect mid-roll · simultaneous users (queue) · empty table after bans.

## Future Considerations

Pity timers as optional strategies (document fairness).

## Implementation Specification

### Roll

Filter weight table → apply stock limits → server RNG → store result before FX → present → take/timeout. Relocation uses generic `CrateMoveToken`. Fire Sale overrides cost via end timestamp. Crate locks to one roller.

## Related Documents

- [Weapons](../weapons/index.md)
- [Power-Ups](../power-ups/index.md)
