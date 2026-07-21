# Session Lifecycle

## Purpose

Define the end-to-end lifecycle from Main Menu to Match teardown so all systems agree on phase names.

## Responsibilities

- Define phases and legal transitions
- Coordinate Dependency Loader, Asset Manager, Lobby, and GameMode
- Emit lifecycle events

## Architecture

### Phases

```
Bootstrap
 → MainMenu
 → HubBrowsing (optional)
 → MapSelected
 → DependencyResolve
 → Lobby
 → Loading
 → MatchCountdown (optional)
 → InMatch
 → PostMatch
 → Teardown
 → MainMenu
```

### Illegal Transitions

Examples: `InMatch → HubBrowsing` without teardown; `Lobby → InMatch` without identical lockfile hash.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

UI navigates → SessionDirector validates → systems prepare → GameMode StartMatch → Round Director takes over pacing.

## Networking

Server drives phase. Clients mirror. Disconnect mid-Lobby returns to Map Selection / Main Menu per flow charts in UI docs.

## Events

`Session.PhaseChanged`, `Session.MatchStarting`, `Session.MatchEnded`, `Session.Error`

## Extension Points

Modes may insert optional phases (e.g., character intro) via mode hooks—not by inventing core quest phases.

## Examples

Collection install from Hub → Map appears in Map Selection → Lobby adapts capabilities → Loading → InMatch.

## Edge Cases

Host migration is not required for dedicated-first design; listen-server host loss ends session cleanly unless a future RFC defines migration.

## Future Considerations

Reconnect tokens for crash recovery (mode opt-in).

## Related Documents

- [Lobby](../../06-UI/lobby/index.md)
- [UI Index](../../06-UI/ui/index.md)
- [Rounds](../../02-Gameplay/rounds/index.md)
