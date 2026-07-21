# Wall Buys

## Purpose

Offer deterministic weapon acquisition at fixed map locations for reliable progression.

## Responsibilities

- Display affordance + cost
- First purchase grants weapon; subsequent may grant ammo
- Respect inventory rules
- Optional power prerequisites

## Architecture

WallBuy actor references `WeaponDefinition` + costs. Ammo repurchase costs separate.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Interact → Economy purchase → Weapons grant/ammo → events.

## Networking

Server authority.

## Events

`WallBuy.Purchased`, `WallBuy.AmmoPurchased`, `WallBuy.Rejected`

## Extension Points

Shared wall buys · randomized daily wall (mutator) · class-locked buys (mode).

## Examples

SMG for 1000; ammo 500.

## Edge Cases

Owns upgraded variant · inventory full · weapon banned by mutator.

## Future Considerations

Validator ensures wall buy weapons exist in registry.

## Implementation Specification

First purchase grants weapon; subsequent grants ammo if owned (including upgraded variant policy). Costs from data. Mutator may ban weapon id → wall buy disabled.

## Related Documents

- [Weapons](../weapons/index.md)
- [Economy](../economy/index.md)
