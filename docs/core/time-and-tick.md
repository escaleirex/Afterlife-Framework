# Time and Tick Model

## Purpose

Standardize how gameplay time, pauses, and ticking work under multiplayer constraints.

## Responsibilities

- Distinguish real time vs match time
- Define pause policies (solo vs multi)
- Provide timers that respect authority
- Avoid per-frame expensive work on Bus

## Architecture

| Clock | Use |
|-------|-----|
| RealTime | UI animations, Hub downloads |
| MatchTime | Round timers, power-up durations |
| ServerWorldTime | Replicated timing reference |

Pause in multiplayer does **not** freeze server by default. Modes may offer cooperative pause only with explicit unanimous policy.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Systems request `MatchTimer` from server timer service; clients display estimates from replicated end timestamps.

## Networking

Duration state replicates end time, not per-tick countdowns.

## Events

`Timer.Started`, `Timer.Expired`, `Match.PausePolicyChanged`

## Extension Points

Custom clocks for cinematic plugins (local only).

## Examples

Power-up lasting 30s stores `ExpireAtServerTime`; HUD binds remaining = expire - now.

## Edge Cases

Client hitch must not extend authoritative durations.

## Future Considerations

Replay scrubbing clocks.

## Related Documents

- [Networking](../networking/overview.md)
- [Performance](../performance/index.md)
