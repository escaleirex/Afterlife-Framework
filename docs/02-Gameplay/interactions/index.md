# Interaction System

## Purpose

Unify world interactions (doors, machines, repairs, pickups, build tables) under one priority-aware, server-validated channel.

## Responsibilities

- Detect candidate interactables
- Rank by distance/angle/priority
- Show prompt via HUD
- Send hold/tap intents to server
- Cancel cleanly on interrupt

## Architecture

`IAfterlifeInteractable` interface on actors:

```csharp
bool CanInteract(AfterlifePlayerController pc, out InteractFailureReason reason);
InteractChannel GetChannel(); // Instant, Hold
float GetHoldDuration(AfterlifePlayerController pc);
void ServerExecuteInteract(AfterlifePlayerController pc);
```

Priority stack prevents barrier repair from stealing focus from a door when looking at both—use explicit ranks.

## Ownership

Server executes; client predicts prompts/animations only.

## Data Flow

Trace → rank → prompt UI → input → RPC → CanInteract → Execute → system events.

## Networking

Hold progress is server-authoritative. Client may show local progress bar estimated from server start ack.

## Events

`Interact.PromptChanged`, `Interact.HoldStarted`, `Interact.HoldCanceled`, `Interact.Executed`

## Extension Points

New interactable actors · custom failure reasons localized by maps.

## Examples

Door hold 0.0s tap; upgrade station hold 1.0s; barrier repair continuous.

## Edge Cases

- Player downed mid-hold
- Power turns off mid-purchase
- Two players interact same machine (queue or exclusive lock)

## Future Considerations

Controller sticky aim assist toward interactables as accessibility option.

## Related Documents

- [Mapping Interactions](../../03-Maps/interactions.md)
- [Doors](../doors/index.md)
- [HUD](../../06-UI/ui/hud.md)
