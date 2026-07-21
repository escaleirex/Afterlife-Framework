# Boss Encounter Hooks

## Purpose

Provide hooks for boss encounters as gameplay events—not as Main Quest engines.

## Responsibilities

- Boss pawn patterns
- Encounter state machine hooks
- Arena lock optional flags
- Reward tables on defeat
- Music/intensity integration

## Architecture

Bosses are enemy definitions with encounter controllers registered by map plugins. Core provides `EncounterController` base utilities and events. No `MainQuestBoss` type.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

WorldFlag/trigger → encounter start → spawn boss → phases via controller → defeat → rewards/events.

## Networking

Server runs encounter controller.

## Events

`Encounter.Started`, `Encounter.PhaseChanged`, `Encounter.Succeeded`, `Encounter.Failed`

## Extension Points

Multi-boss · optional failure (not match end) · repeatable encounters.

## Examples

Mid-map optional elite; late-round scripted tank enemy; map plugin cinematic intro (see Cutscenes).

## Edge Cases

Players leave arena · wipe policy · round overlapping encounter.

## Future Considerations

Encounter debugger.

## Implementation Specification

EncounterController: `Idle → Starting → InProgress → Succeeded/Failed`. Prefer soft-fail (match continues) unless mode opts into hard-fail. Rewards via Economy/weapon grant helpers—not quest completion APIs.

## Related Documents

- [Cutscenes](../cutscenes/index.md)
- [Music](../music/index.md)
- [Discovery Philosophy](../../00-Vision/philosophy/discovery-philosophy.md)
