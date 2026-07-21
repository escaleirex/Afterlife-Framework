# Bandwidth Budgets

## Purpose

Keep multiplayer playable on modest connections.

## Default Budgets (Targets)

| Category | Soft budget | Notes |
|----------|-------------|-------|
| Player state | Low | Currency, perks bitset, weapon ids |
| World state | Low-Med | Doors, power, round |
| Enemies | High | Largest cost; relevancy mandatory |
| FX cues | Med | Prefer local predict + rare multicast |
| UI/Hub | N/A in-match | Not active during match net budget |

Exact numbers are finalized in Phase 2 performance RFCs; this doc establishes the discipline.

## Rules

1. No replicated tick-by-tick strings.
2. No per-pellet multicast for hitscan (server validate, local FX).
3. Aggregate enemy movement updates.
4. Measure with net profiles in CI smoke when available.

## Related Documents

- [Replication](replication.md)
- [Performance](../../01-Engine/performance/index.md)
