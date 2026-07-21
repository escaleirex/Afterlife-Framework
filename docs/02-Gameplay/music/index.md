# Music Director

## Purpose

Drive adaptive music based on round intensity, encounters, and events—not a forced soundtrack quest.

## Responsibilities

- Layer stems by intensity
- React to round/power/encounter events
- Respect user music volume / mute
- Support map soundtrack packs

## Architecture

`MusicDirector` listens to Event Bus and selects states: Explore, Tension, Horde, Encounter, Intermission, GameOver.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Event → state evaluate → crossfade stems.

## Networking

Local audio; optional sync for shared cutscenes.

## Events

`Music.StateChanged`, `Music.StingerPlayed`

## Extension Points

Map packs · dynamic remix plugins · silent horror modes.

## Examples

Round 20+ raises intensity tier; Power.Activated plays stinger once.

## Edge Cases

Overlap stingers · Hub music vs in-match · streaming latency.

## Future Considerations

Vertical remixing tools.

## Implementation Specification

State evaluation each relevant event; hysteresis prevents flapping. Stingers one-shot with cooldown. Map soundtrack packs register stem sets in MusicEventRegistry.

## Related Documents

- [Audio](../../01-Engine/audio/index.md)
- [Rounds](../rounds/index.md)
- [Bosses](../bosses/index.md)
