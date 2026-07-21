# Dialogue & VO Triggers

## Purpose

Play narrative and barks from events without objective UI.

## Responsibilities

- Bind lines to Event Bus facts
- Priority/interrupt rules
- Co-op character line selection
- Localization hooks
- Subtitles optional

## Architecture

`DialogueTrigger` assets: event id + conditions + line set. Runtime Dialogue Director queues by priority.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Event → evaluate triggers → pick line → play audio → subtitles.

## Networking

Server may pick authoritative line id for sync; or each client local barks for non-critical. Document per trigger sync mode.

## Events

`Dialogue.Started`, `Dialogue.Ended`, `Dialogue.Skipped`

## Extension Points

Branching conversations as optional map plugin (still not MissionSystem).

## Examples

First door open plays a one-time character remark.

## Edge Cases

Overlap spam · mute · missing VO asset · deaf accessibility (subs).

## Future Considerations

Radios / answerphones as world interactables.

## Implementation Specification

Triggers bind EventId + conditions + line set + priority + sync mode (local vs authoritative line id). DialogueDirector queues and interrupts by priority. Subtitles pull localization keys.

## Related Documents

- [Characters](../characters/index.md)
- [Audio](../../audio/index.md)
- [Discovery Philosophy](../../philosophy/discovery-philosophy.md)
