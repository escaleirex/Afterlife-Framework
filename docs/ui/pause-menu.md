# Pause Menu

## Purpose

In-match escape menu for settings access, players list, leave match—respecting multiplayer pause policy.

## Responsibilities

- Open/close on input
- Leave match confirmation
- Settings overlay
- Do not grant gameplay advantage (no full world freeze on dedicated)

## Architecture

Pause widget; MatchTime continues on dedicated servers. Solo offline may pause simulation per mode.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server where applicable; otherwise local UI |
| Configuration | Data assets + widget trees |
| Presentation | Client UI |
| Extension | UI extension points / plugins |

## Data Flow

Esc → pause UI → resume/leave.

## Networking

Leave sends disconnect; pause is local UI.

## Events

`UI.PauseOpened`, `UI.PauseClosed`, `Session.LeaveRequested`

## Extension Points

Vote skip cutscene buttons · mutator info panel.

## Examples

Adjust volume mid-match; leave to Main Menu.

## Edge Cases

Opening during cutscene · host leave on listen server.

## Future Considerations

Report player shortcut to Hub moderation.

## Related Documents

- [Time and Tick](../core/time-and-tick.md)
- [Settings](settings.md)
