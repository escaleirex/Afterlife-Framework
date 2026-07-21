# Upgrade Station (Pack-a-Punch)

## Purpose

Provide a generic weapon upgrade station framework for tiered power spikes with FX, rename, and effect modules.

## Responsibilities

- Gate behind power/WorldFlags
- Accept weapon + currency
- Apply upgrade tier definition
- Support multi-tier packs if data defines
- Handle AAT-like attachment slots as optional modules

## Architecture

`WeaponUpgradePath` on weapon definition. Station actor validates, plays sequence, returns upgraded instance id. Effects are modifier modules, not hardcoded names.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Interact → validate → debit → begin upgrade sequence → replace weapon → Weapon.Upgraded.

## Networking

Server authority; sequence timing replicated as state enum.

## Events

`UpgradeStation.Opened`, `UpgradeStation.UpgradeStarted`, `UpgradeStation.UpgradeCompleted`, `UpgradeStation.Rejected`

## Extension Points

Tier 2+ packs · elemental attachment re-rolls · map-unique camo sets.

## Examples

Pack increases damage and magazine; adds unique particle; optional element cycle module.

## Edge Cases

Already max tier · packing wonder weapon restricted · player downs mid-pack · station offline without power.

## Future Considerations

Co-op dual-pack animations as content only.

## Implementation Specification

### States

`Locked → Available → InUse → Available`

Validate power/funds/path → debit → exclusive InUse → replace weapon tier/def → `Weapon.Upgraded`. Optional elemental attachment re-roll module is separate cost + RNG.

## Related Documents

- [Weapons](../weapons/index.md)
- [Power](../power/index.md)
