# Architecture Overview

## Purpose

Describe the layered architecture of Afterlife Framework so implementers share one mental model.

## Layer Diagram

```
┌──────────────────────────────────────────────────────────┐
│ Presentation (UI, HUD, Hub Client, Lobby)                │
├──────────────────────────────────────────────────────────┤
│ Gameplay Systems (Rounds, AI, Weapons, Perks, ...)       │
├──────────────────────────────────────────────────────────┤
│ Session & Mode Composition (GameMode, Mutators)          │
├──────────────────────────────────────────────────────────┤
│ Core Services (EventBus, Registries, Assets, Saves,      │
│               DependencyLoader, Plugins)                 │
├──────────────────────────────────────────────────────────┤
│ Networking (Replication, RPCs, Dedicated Server Host)    │
├──────────────────────────────────────────────────────────┤
│ Unreal Engine 5 + UnrealSharp Runtime                    │
└──────────────────────────────────────────────────────────┘
```

## Key Ideas

1. **Maps are content**, not code hosts for core logic.
2. **Systems are services** registered at session start.
3. **Definitions are data** looked up through Registries.
4. **Signals are events** on the Event Bus.
5. **Truth is server-owned**.

## Runtime Objects (Conceptual)

| Object | Responsibility |
|--------|----------------|
| `AfterlifeGameInstance` | Cross-map services: Hub client, profile, asset manager |
| `AfterlifeGameMode` | Mode composition, match start policies |
| `AfterlifeGameState` | Replicated match truth (round, power, world flags) |
| `AfterlifePlayerState` | Replicated per-player truth (currency, perks, stats) |
| `AfterlifePlayerController` | Input, UI routing, server RPCs |
| Subsystems | Long-lived services (EventBus, Registries, Directors) |

Exact C# type names must follow [Naming Conventions](naming-conventions.md).

## Request Path Example (Buy Door)

```
Client input → PlayerController RPC → Server DoorSystem validates
→ Economy debit → Door state open → WorldFlag set
→ EventBus: DoorOpened → Music/AI/UI listeners react
→ Replicate door + currency
```

## Non-Goals of This Document

Detailed per-system design lives in `docs/core/*` and `docs/gameplay/*`.

## Related Documents

- [Module Boundaries](module-boundaries.md)
- [Composition Model](composition-model.md)
- [Folder Structure](folder-structure.md)
- [Event Bus](../core/event-bus.md)
