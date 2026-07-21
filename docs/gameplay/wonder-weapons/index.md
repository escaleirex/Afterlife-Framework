# Wonder Weapons Extension Points

## Purpose

Define how specialty weapons plug into the weapons pipeline without becoming hardcoded map scripts in core.

## Responsibilities

- Provide specialty modules (beam, charge, alt-fire, unique ammo)
- Support limited stock via crate strategies
- Allow buildable acquisition paths
- Keep networking patterns consistent

## Architecture

Wonder weapons are still `WeaponDefinition`s with `SpecialtyModules`. Maps/mods supply modules; core supplies sockets/hooks.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Acquire via crate/build/wall → specialty module handles fire logic via server validation → events as weapons.

## Networking

Specialty projectiles replicated carefully with budgets.

## Events

Inherits weapon events + `Wonder.SpecialtyStateChanged`

## Extension Points

Charge meters · alt modes · unique upgrade paths · boss-only effectiveness tags.

## Examples

Charge-shot rifle; zone denial weapon; chain damage module.

## Edge Cases

Pack restrictions · ammo type unique refill rules · performance of many VFX.

## Future Considerations

Authoring template pack in Phase 3 tools.

## Implementation Specification

Specialty modules attach to `WeaponDefinition.Modules`. Prefer projectile pooling and budget review for exotic FX. Limited stock enforced by crate strategy + registry counters on GameState.

## Related Documents

- [Weapons](../weapons/index.md)
- [Buildables](../buildables/index.md)
- [Mystery Box](../mystery-box/index.md)
