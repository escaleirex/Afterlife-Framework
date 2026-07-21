# Event Bus

## Purpose

Provide the single cross-system communication backbone for Afterlife Framework. All gameplay systems publish and subscribe through the Event Bus rather than hard references across module boundaries.

## Responsibilities

- Define event identities, payloads, and delivery guarantees
- Support local (same process) and replicated (server → clients / targeted) delivery modes
- Provide ordered delivery within a channel where required
- Expose debugging/inspection hooks for Editor and PIE
- Enforce payload versioning and aliases for compatibility

## Architecture

### Components

| Component | Role |
|-----------|------|
| `AfterlifeEventBusSubsystem` | Primary API (World or GameInstance scoped as documented per event class) |
| `EventId` | Stable string/int hybrid identity (`Round.Started`) |
| `EventEnvelope` | Header: id, timestamp, channel, replication mode, schema version |
| `IEventHandler<T>` | Strongly typed subscriber |
| `EventAliasTable` | Maps deprecated ids → current ids |
| Channels | `Gameplay`, `UI`, `Audio`, `Diagnostics`, `Hub` |

### Delivery Modes

| Mode | Behavior |
|------|----------|
| Local | Same process, immediate or end-of-frame queued |
| Multicast Replicated | Server publishes; all relevant clients receive |
| Server Only | Never leaves server |
| Owner Client | Server → owning connection |
| Request | Client intent events validated server-side (prefer explicit RPCs for commands; events for facts) |

### Rules

1. **Facts vs Commands:** Event Bus carries facts (`Door.Opened`). Commands should be RPCs into owning systems that then emit facts.
2. **No payload pointers to transient actors without net GUIDs.**
3. **Handlers must be re-entrant safe** or defer work.
4. **Do not use Bus as a general RPC replacement** for predictive actions.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server emits authoritative gameplay facts; clients emit only local presentation events unless explicitly allowed |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

```
System A mutates authoritative state
  → publishes EventEnvelope(EventId, payload)
    → Bus dispatches to subscribers (AI, Audio, UI, Plugins)
    → if replicated: net serialize payload to clients
      → client Bus dispatches to local subscribers
```

Subscription lifecycle binds to UObject/subsystem lifetime; handlers auto-detach on teardown.

## Networking

- Replicated events use a compact schema registry (event id hash + version)
- Large infrequent events may ride reliable channel; high-frequency must be avoided (prefer replicated properties)
- Clients must ignore replicated gameplay facts if they would mutate authority locally (listeners are presentation/prediction only unless documented)

## Events

Meta-events:

| Event | Payload | Notes |
|-------|---------|-------|
| `EventBus.HandlerException` | error info | Diagnostics |
| `EventBus.UnknownEvent` | id/version | Compatibility |

Gameplay events are owned by their systems (see each system doc).

## Extension Points

- Register custom `EventId` namespaces: `mod.<author>.*`
- Provide schema serializers for custom payloads
- Add aliases when renaming events
- Editor visualizer plugin hooks

## Examples

### C# sketch

```csharp
eventBus.Subscribe<RoundStartedEvent>("Round.Started", OnRoundStarted);

eventBus.Publish(new RoundStartedEvent {
    RoundIndex = 5,
    EnemyCountTarget = 24
}, EventDelivery.MulticastReplicated);
```

### Map plugin reaction

A map plugin listens to `Power.Activated` to unlock a shortcut door without the Power system knowing about that door type.

## Edge Cases

- Subscriber throws: isolated; meta-event emitted; match continues
- Unknown event version: alias/migrate or drop with log
- Publish during shutdown: rejected
- Extremely chatty events: fail automated perf budgets in CI
- Listen-server double dispatch: must not double-apply authoritative logic

## Future Considerations

- Record/replay event traces for theater mode
- Optional deterministic lockstep research channel
- Cross-server relay is out of scope

## Implementation Specification

### Public API Surface (Conceptual C#)

```csharp
public interface IAfterlifeEventBus
{
    IDisposable Subscribe<T>(EventId id, Action<T> handler, EventSubscriptionOptions? options = null);
    IDisposable Subscribe<T>(EventId id, Func<T, ValueTask> handler, EventSubscriptionOptions? options = null);
    void Publish<T>(T payload, EventPublishOptions options);
    bool TryPublish<T>(T payload, EventPublishOptions options, out EventPublishError error);
}

public readonly record struct EventId(string Value)
{
    public static implicit operator EventId(string value) => new(value);
}

public sealed class EventPublishOptions
{
    public EventDelivery Delivery { get; init; } = EventDelivery.Local;
    public EventChannel Channel { get; init; } = EventChannel.Gameplay;
    public int SchemaVersion { get; init; } = 1;
    public bool EndOfFrame { get; init; }
}

public enum EventDelivery
{
    Local,
    ServerOnly,
    MulticastReplicated,
    OwnerClient,
}
```

### Ordering Guarantees

| Scope | Guarantee |
|-------|-----------|
| Same publisher, same frame, `EndOfFrame=false` | Handlers run synchronously in subscription order |
| `EndOfFrame=true` | FIFO within channel for that frame |
| Replicated | Arrival order not guaranteed across different events; do not encode causality solely via arrival |
| Causality needs | Include `sequence` or depend on replicated state properties |

### Payload Design Rules

1. Payloads must be blittable/net-serializable for replicated delivery.
2. Prefer stable definition IDs over display strings.
3. Prefer net GUIDs / actor IDs over raw pointers.
4. Include `schemaVersion` and keep additive field growth.
5. Size budget: replicated event payloads SHOULD stay under 256 bytes unless rare.

### Alias Example

```json
{
  "aliases": [
    { "from": "Round.Begin", "to": "Round.Started", "since": "0.2.0" }
  ]
}
```

### Debugging

Editor window lists last N envelopes with timestamps, delivery mode, and subscriber counts. PIE command: `Afterlife.EventBus.Dump`.

### Anti-Patterns

- Publishing every AI footstep
- Using Bus to request purchases (use RPC → system → fact event)
- Subscribing in `Tick` repeatedly without dispose

## Related Documents

- [Registries](registries.md)
- [Networking Overview](../../04-Multiplayer/overview.md)
- [Design Philosophy](../../00-Vision/philosophy/design-philosophy.md)
