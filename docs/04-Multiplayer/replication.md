# Replication

## Purpose

Specify how state and events replicate efficiently.

## Responsibilities

- Replicate GameState/PlayerState fields
- Define relevancy for enemies and interactables
- Provide guidelines for RPCs vs properties vs Bus events

## Architecture

### Prefer Properties When

State is persistent and continuously relevant (currency, round index, door open).

### Prefer RPCs When

Rare commands/responses (purchase reject reason, ready toggle).

### Prefer Bus Events When

Many systems must react to a fact without becoming coupled to the publisher.

### Relevancy

Enemies far from all players may reduce update rate. Interactables replicate state; not per-frame transforms if static.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Server mutation → net driver → client receive → local listeners/UI.

## Networking

Self-describing. Quantize where possible. Avoid strings on hot paths; use IDs.

## Events

See Event Bus replication modes.

## Extension Points

Custom replicators for specialty enemies via plugin with budget review.

## Examples

Door replicates `bIsOpen` + `OpenAlpha` if animated; currency replicates as int.

## Edge Cases

Late join needs full snapshot—see Late Join doc.

## Future Considerations

Replication graph tuning presets per map size.

## Related Documents

- [Event Bus](../../01-Engine/core/event-bus.md)
- [Bandwidth Budgets](bandwidth-budgets.md)
