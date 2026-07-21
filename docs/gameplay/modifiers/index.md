# Modifier System

## Purpose

Provide a deterministic composition layer for perks, consumables, power-ups, and mutators affecting player/world stats.

## Responsibilities

- Register modifiers with channels
- Compute final values with documented op order
- Replicate active modifier ids when needed for UI
- Remove cleanly on expire/down policies

## Architecture

Channels examples: `MaxHealth`, `ReloadRate`, `MoveSpeed`, `DamageDealt`, `DamageTaken`, `CurrencyGain`, `WeaponSlots`.

Computation order per channel (default):

1. Base
2. Additive sum
3. Multiplicative product
4. Clamps

```csharp
final = Clamp((base + addSum) * mulProduct)
```

## Ownership

Server computes gameplay; clients may compute presentation estimates.

## Data Flow

Effect module adds modifier → sink recalculates → attributes update → events.

## Networking

Replicate modifier source ids for HUD icons; do not trust client math.

## Events

`Modifier.Added`, `Modifier.Removed`, `Modifier.Recomputed`

## Extension Points

New channels via RFC · temporary world modifiers (double points) as global channel.

## Examples

Tank perk +50 health add; Double Points ×2 currency gain; consumable ×1.25 move for 20s.

## Edge Cases

- Stacking identical sources (refresh vs stack policy)
- Removal order when multiple expire same frame
- Negative multipliers forbidden unless mutator explicitly allows

## Future Considerations

Visualizer in editor showing final stat breakdown.

## Related Documents

- [Perks](../perks/index.md)
- [Consumables](../consumables/index.md)
- [Power-Ups](../power-ups/index.md)
