# Doors & Map Unlock Continuum

## Purpose

Gate map traversal and progression graph via purchasable or triggerable doors/debris clears without quest semantics.

## Responsibilities

- Purchase validation via Economy
- Prerequisite WorldFlags (e.g., power)
- Replicate open state
- Expand spawn zones via events
- Support debris, debris-clear, and gate variants

## Architecture

`DoorDefinition` + actor. Costs and prerequisites are data. Opening sets WorldFlags and fires events; Spawn Director listens.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Hold interact → RPC → validate → debit → open → Door.Opened → directors/UI/audio react.

## Networking

Server authority on open. Clients play predicted interact anim only.

## Events

`Door.Opened`, `Door.PurchaseRejected`, `WorldFlag.Changed`

## Extension Points

Key items as generic InventoryToken prerequisites · team-shared doors · timed gates.

## Examples

750 door expands playspace; power door requires Power.Activated flag.

## Edge Cases

Already open · insufficient funds · blocked by enemy collision policy · JIP snapshot.

## Future Considerations

Door graph validator in tools.

## Implementation Specification

### Components

PurchaseInteract · PrerequisiteGate · DoorMover · SpawnGroupUnlocker

### Open Sequence

Validate → prerequisites → debit → `bIsOpen` → collision keyframe → WorldFlags → `Door.Opened`

### Debris

Door subtype with cleared mesh state; same pipeline.

## Related Documents

- [Power](../power/index.md)
- [Economy](../economy/index.md)
- [Mapping Guide](../../03-Maps/index.md)
