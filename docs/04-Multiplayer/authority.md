# Authority Model

## Purpose

Define who is allowed to mutate which state.

## Responsibilities

- Classify state ownership
- Validate client intents
- Prevent client-side economy/inventory cheating vectors

## Architecture

### Authority Classes

| Class | Examples | Mutator |
|-------|----------|---------|
| ServerWorld | Round phase, power domains, doors, enemy actors | Server systems |
| ServerPlayer | Currency, perks, inventory, downs | Server systems |
| ClientIntent | Purchase request, ready toggle, reload input | Client → validated RPC |
| ClientCosmetic | Local settings, menu animations | Client |

### Validation Pattern

```
RPC_RequestPurchase(itemId)
server: canAfford? inRange? prerequisites? 
  yes → mutate → publish events → replicate
  no → reject reason to caller
```

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

All spend/earn paths funnel through Economy System on server.

## Networking

Never replicate “ask client how much money they have” as truth.

## Events

`Net.AuthorityViolation` diagnostics when clients send illegal intents repeatedly.

## Extension Points

Modes can add validators; cannot weaken core authority checks.

## Examples

Client predicts ammo HUD locally but server corrects on fire reconciliation.

## Edge Cases

Speed hack movement: use server movement authority / anti-cheat hooks as available; document limits honestly.

## Future Considerations

Server-side demo recording for adjudication.

## Related Documents

- [Multiplayer Doctrine](../../00-Vision/philosophy/multiplayer-doctrine.md)
- [Economy](../../02-Gameplay/economy/index.md)
