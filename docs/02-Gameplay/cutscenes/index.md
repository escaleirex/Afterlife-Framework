# Cutscenes

## Purpose

Support optional cinematic sequences controlled by maps/plugins without forcing story completion systems.

## Responsibilities

- Play/skip policies in multiplayer
- Input lock + camera
- Alignment with encounters
- Network timing

## Architecture

Level sequences / custom players wrapped by `CutsceneDirector`. Multiplayer default: short, skippable, non-blocking for dedicated servers unless mode requires sync.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Trigger → vote/skip policy → play → restore control → event.

## Networking

Synchronized start timestamp; lagging clients catch up or skip-to-end policy.

## Events

`Cutscene.Started`, `Cutscene.Ended`, `Cutscene.Skipped`

## Extension Points

Pre/post encounter cinematics · Hub trailers are not cutscenes.

## Examples

Brief power-on flourish; boss entrance.

## Edge Cases

Player downed at start · dedicated server with no local player · skip disagreement.

## Future Considerations

Take viewer camera for streamers.

## Implementation Specification

CutsceneDirector supports sync start timestamps and skip policies: Any, Majority, HostOnly, None. Dedicated servers advance using timer without rendering. Keep cinematics short by default.

## Related Documents

- [Bosses](../bosses/index.md)
- [Session Lifecycle](../../01-Engine/core/session-lifecycle.md)
