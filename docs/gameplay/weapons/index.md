# Weapons Pipeline

## Purpose

Provide a modular weapon definition → inventory → firing → ammo → upgrade pipeline that content packs can extend.

## Responsibilities

- Register weapon definitions
- Manage inventory slots
- Handle fire, reload, swap
- Support wall buys, crate grants, starting loadouts
- Integrate with upgrade station tiers
- Apply perk/consumable modifiers

## Architecture

Definition includes damage profiles, ammo, slots, rarity tags, upgrade paths. Components: Hitscan/Projectile, ADS, Melee. Wonder weapons are definitions with specialty modules—see Wonder Weapons doc.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Acquire → Inventory add → equip → input fire RPC/server validate → apply damage → Economy reward tags.

## Networking

Server validates shots. Clients predict FX/anims. Ammo truth on server.

## Events

`Weapon.Acquired`, `Weapon.Removed`, `Weapon.Fired`, `Weapon.Reloaded`, `Weapon.Upgraded`

## Extension Points

New fire modes · attachment system · dual wield as plugin · pack tiers.

## Examples

Starter pistol wall-buyable; LMGs crate-weighted rare; pack adds ammo + damage + FX.

## Edge Cases

Weapon limit + mule perk · swap during pack · ammo overflow · late join inventory snapshot.

## Future Considerations

Weapon inspector for Hub previews.

## Implementation Specification

### WeaponDefinition (Fields)

| Field | Purpose |
|-------|---------|
| `Id` | Stable registry id |
| `Slot` | Primary/Secondary/Melee/Equipment |
| `DamageProfile` | Distances, body multipliers |
| `FireMode` | Auto/Semi/Burst/Charge |
| `Ammo` | Mag, reserve, type id |
| `Reload` | Times, bipod rules |
| `UpgradePathId` | Optional |
| `CrateTags` | Weight table tags |
| `WallBuyEligible` | bool |
| `Modules` | Specialty modules |

### Inventory Rules

Default classic: 2 weapon slots + melee. Perk/mutator may expand. Acquiring third weapon replaces current according to policy.

### Server Fire Validation

- Rate limit vs fire interval + tolerance
- Ammo presence
- Origin sanity vs player capsule
- Hitscan: server trace; client FX predicted

### Upgrade Integration

Upgrade station replaces definition id with upgraded id (or increments tier) preserving ammo ratio policy.

### Ammo Types

Standard + specialty. Max ammo power-up refills by policy tags.

## Related Documents

- [Wall Buys](../wall-buys/index.md)
- [Mystery Box](../mystery-box/index.md)
- [Pack-a-Punch](../pack-a-punch/index.md)
