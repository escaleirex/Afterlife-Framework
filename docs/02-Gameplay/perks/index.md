# Perks Framework

## Purpose

Provide purchasable persistent player modifiers with slot limits, loss-on-down rules, and machine actors—without hardcoded franchise perk identities.

## Responsibilities

- Register perk definitions + effect modules
- Enforce slot caps
- Handle purchase and soda-machine style interactions generically
- Apply/remove modifiers
- Support perk loss / keep rules via mode

## Architecture

`PerkDefinition` + `IPerkEffect`. Machines reference definition ids. Modifier stack integrates with health, reload, move, weapon slots, etc.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Buy → debit → add perk → apply effects → replicate perk bitset/ids → on down/bleedout apply loss policy.

## Networking

Server owns perk list. Clients display.

## Events

`Perk.Purchased`, `Perk.Removed`, `Perk.EffectApplied`, `Perk.SlotsChanged`

## Extension Points

New effects · slot-expand consumables · perk recycling machines · whitelists per map.

## Examples

Tank perk increases max health; Speed perk shortens reload; Stamina perk changes move costs.

## Edge Cases

Duplicate buy · slot full · power off · mutator bans · JIP.

## Future Considerations

Perk quality tiers as optional packs.

## Implementation Specification

### PerkDefinition

| Field | Purpose |
|-------|---------|
| `Id` | Stable id |
| `Cost` | Currency |
| `SlotCost` | Usually 1 |
| `RequiredPowerDomains` | list |
| `EffectModules` | list |
| `LoseOnDown` | default true |
| `LoseOnBleedout` | default true |
| `Icon` | UI |

### Effect Module Examples (Generic)

- `ModifyMaxHealth`
- `ModifyReloadRate`
- `ModifyMoveSpeed`
- `ModifyWeaponSlotCount`
- `ModifyDamageOutput`

### Machine Actor

Interact → purchase pipeline shared with wall buys. One machine per definition typical; maps may place multiple.

### Modifier Stack

Effects register with `ModifierSystem` using channels so consumables and perks compose deterministically (define multiply vs add order in docs per channel).

## Related Documents

- [Power](../power/index.md)
- [Consumables](../consumables/index.md)
- [Characters](../characters/index.md)
