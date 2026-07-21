# Consumables Framework

## Purpose

Support limited-use player consumables (Gobblegum-like) without franchise naming—loadout selection in lobby, activation in match, rarity/economy optional.

## Responsibilities

- Register consumable definitions
- Lobby loadout selection within mode rules
- In-match activation + charges
- Cooldowns and mutual exclusions
- Optional meta economy (Phase 4+) without pay-to-win in core defaults

## Architecture

`ConsumableDefinition` + activation modules. Inventory charges on PlayerState. Modes choose whether consumables exist.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Lobby select → match start grant charges → activate RPC → validate → apply → consume charge.

## Networking

Server validates activation.

## Events

`Consumable.Selected`, `Consumable.Activated`, `Consumable.Denied`, `Consumable.ChargeChanged`

## Extension Points

New activation modules · shared team consumables · round-restricted uses.

## Examples

Instant revive token; temporary perk; ammo refill; crate bias bump.

## Edge Cases

Activate while interacting · zero charges · banned by map · desync lobby selection.

## Future Considerations

Hub cosmetic wrappers for consumable VFX only.

## Implementation Specification

Lobby selects up to N consumables → replicate in LobbyState → grant charges on match start → `Server_ActivateConsumable` validates charges/state/exclusions. First-party classic mode keeps power modest and fair.

## Related Documents

- [Lobby](../../06-UI/lobby/index.md)
- [Perks](../perks/index.md)
- [Progression](../progression/index.md)
