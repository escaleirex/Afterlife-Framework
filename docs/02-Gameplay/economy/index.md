# Economy System

## Purpose

Provide authoritative currency earn/spend as the primary progression fuel for map unlocks and power acquisition.

## Responsibilities

- Grant currency for tagged actions (damage ticks, kills, melee bonus, repairs, assists)
- Debit for purchases with validation
- Support multiple currencies if mode defines them (default one)
- Emit events for UI and analytics
- Prevent client forging

## Architecture

### Reward Matrix

Data table maps `RewardTag` → points. Weapons/perks can add multipliers via modifier stack.

### Purchase Pipeline

```
Request(item) → Validate(prereq, range, funds, sold-out) → Debit → Grant → Events
```

### Income Optimization

Early-round multi-hit rewards are intentional and data-driven—not bugs.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Combat/AI systems tag actions → Economy grants on server → PlayerState currency replicates → HUD listens.

## Networking

Currency is server PlayerState. Reject RPCs that claim grants.

## Events

`Economy.CurrencyChanged`, `Economy.PurchaseSucceeded`, `Economy.PurchaseRejected`, `Economy.RewardGranted`

## Extension Points

Extra currencies · shared team pools (mode) · tax mutators · double-points power-up multiplier hooks.

## Examples

Door costs 750; wall buy 1200; crate 950—values from map data assets, not code.

## Edge Cases

Simultaneous purchases · debt not allowed · disconnect mid-purchase · overflow clamps.

## Future Considerations

Economy debugger overlay for mappers.

## Implementation Specification

### Currencies

Default mode uses `afterlife.currency.points`. Modes MAY register additional currencies via registry. UI binds to primary unless overridden.

### Reward Grant Pipeline

```
Server gameplay action
 → RewardContext(tags, instigator, victim)
 → EconomySystem.Evaluate(RewardMatrix + modifiers)
 → Apply to PlayerState
 → Economy.RewardGranted + Economy.CurrencyChanged
```

Clients never submit positive grants.

### Purchase RPC

`Server_RequestPurchase(PurchaseRequest)` — server computes cost from data; client expected cost is informational only.

### Reject Reason Keys

`insufficient_funds`, `prerequisite_missing`, `out_of_range`, `sold_out`, `power_required`, `inventory_full`, `banned_by_mutator`, `already_owned`

## Related Documents

- [Doors](../doors/index.md)
- [Wall Buys](../wall-buys/index.md)
- [Authority](../../04-Multiplayer/authority.md)
