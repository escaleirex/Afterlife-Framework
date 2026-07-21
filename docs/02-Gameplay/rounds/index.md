# Round System

## Purpose

Drive the heartbeat of survival matches: round index, phases, intermissions, and scaling hooks consumed by directors and UI.

## Responsibilities

- Advance round phases: Intermission → Spawning → Active → RoundEnd
- Expose round index and scaling parameters
- Integrate with Spawn Director targets
- Support mode overrides (endless, timed, sudden-death mutators)
- Never decide map “objectives”

## Architecture

### Phases

```
MatchStart → RoundIntro(optional) → Intermission → Spawning → Active
  → (all required enemies cleared OR mode rule) → RoundEnd → next Intermission
```

### Scaling

Data curves supply health multipliers, speed tiers, count targets, and spawn interval modifiers. `IRoundScalingStrategy` can replace defaults.

### Clear Conditions

Default: eliminate allocated enemies for the round (including those still spawning). Modes may redefine clear conditions without renaming this system into a quest system.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

GameMode StartMatch → RoundDirector.StartRound(1) → publish Round.Started → Spawn Director requests budget → enemies die → budget satisfied → Round.Ended → intermission timers → next round.

## Networking

Round index, phase, and end timestamps replicate on GameState. Clients never advance rounds locally.

## Events

| Event | Payload highlights |
|-------|-------------------|
| `Round.Started` | index, targetCount, scaling snapshot |
| `Round.PhaseChanged` | phase |
| `Round.Ended` | index, duration |
| `Round.IntermissionStarted` | duration |

## Extension Points

Custom scaling strategies · custom clear condition strategies · mutators that skip intermission · map hooks on events only.

## Examples

Classic curve: slow early rounds for economy teaching; aggressive mid-game; extreme late counts with specialty spawn mixes via Spawn Director.

## Edge Cases

Last enemy stuck in unreachable geo: timeout + teleport/despawn policy configurable · host pause not freezing dedicated server · round end during power-up: power-up continues unless mode says otherwise.

## Future Considerations

Round replay markers · adaptive scaling experimental strategies (opt-in).

## Implementation Specification

### State Machine

```
[*] → Inactive
Inactive → RoundIntro : StartMatch
RoundIntro → Intermission : IntroDone/Skip
Intermission → Spawning : TimerElapsed
Spawning → Active : InitialBurstDone
Active → RoundEnd : ClearConditionMet
RoundEnd → Intermission : NextRound
Active → MatchGameOver : ModeFailCondition
```

### GameState Fields (Replicated)

| Field | Type | Notes |
|-------|------|-------|
| `RoundIndex` | int | 1-based |
| `RoundPhase` | enum | |
| `RoundEnemyTarget` | int | budget |
| `RoundEnemyRemaining` | int | active+pending |
| `IntermissionEndsAt` | server time | |

### Scaling Snapshot

On `Round.Started`, publish immutable snapshot:

```csharp
public sealed class RoundScalingSnapshot
{
    public int RoundIndex { get; init; }
    public float HealthMultiplier { get; init; }
    public float SpeedTier { get; init; }
    public int SpawnCountTarget { get; init; }
    public float SpawnIntervalMultiplier { get; init; }
}
```

Curves are `CurveFloat` / data tables keyed by round index. Extrapolate beyond authored keys with documented policy (clamp vs continue slope).

### Clear Condition Interface

```csharp
public interface IRoundClearCondition
{
    bool IsRoundClear(RoundDirectorContext ctx);
}
```

Default: `RemainingAllocatedEnemies == 0`.

### Mode Fail Condition

Classic survival: all players in permanent fail state (bleedout exhausted / no revives). Modes may redefine without creating a quest system.

### Mapper Configuration

Maps SHOULD prefer mode defaults. Optional `RoundDirectorSettings` data asset on map:

- Intermission duration
- Intro enabled
- Max round cap (0 = infinite)
- Scaling curve override

### Telemetry

Counters: round reach histogram, average round duration, stuck-last-enemy triggers.

## Related Documents

- [Spawn Director](../spawn-director/index.md)
- [Gameplay Philosophy](../../00-Vision/philosophy/gameplay-philosophy.md)
- [Game Modes](../game-modes/index.md)
