# Performance

## Purpose

Establish performance budgets and profiling expectations.

## Targets (Initial)

| Area | Target |
|------|--------|
| 4-player dedicated, mid map | Stable gameplay on mid-tier CPU |
| AI cap | Soft cap with director queue |
| Frame | Platform-specific; document in Phase 2 RFC |
| Hitching | No GC spikes from gameplay alloc churn in hot paths |

## Rules

1. Profile before clever optimization.
2. Budget enemies first.
3. Avoid per-frame managed allocations in tick.
4. Event Bus is not for high-frequency transform spam.

## Related Documents

- [Bandwidth Budgets](../networking/bandwidth-budgets.md)
- [AI](../gameplay/ai/index.md)
