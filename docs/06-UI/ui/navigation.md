# UI Navigation Model

## Purpose

Define how frontend screens transition with Session phases.

## Graph

```
MainMenu ↔ Hub
MainMenu → Play → MapSelection → Lobby → Loading → InMatchHUD
InMatch → Pause → Settings(overlay)
PostMatch → MainMenu / MapSelection
```

## Rules

1. Navigation requests go through `UINavigationService` tied to `SessionDirector`.
2. Illegal transitions are rejected (e.g., Hub during InMatch).
3. Back stack exists for Hub browsing; cleared on match start.
4. Gamepad and keyboard/mouse first-class.

## Related Documents

- [Session Lifecycle](../../01-Engine/core/session-lifecycle.md)
- [UI Index](index.md)
