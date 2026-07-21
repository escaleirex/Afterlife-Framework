# Play Flow

## Purpose

Bridge Main Menu to Map Selection / continue / host-join choices.

## Responsibilities

- Host vs Join entry
- Recent maps
- Quick play optional (playlist later)
- Dedicated server connect dialog

## Architecture

Play hub panel; does not replace Map Selection. Join uses IP/code or server browser (Phase 4).

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server where applicable; otherwise local UI |
| Configuration | Data assets + widget trees |
| Presentation | Client UI |
| Extension | UI extension points / plugins |

## Data Flow

Play → choose Host/Join → Map Selection or Connect → Lobby.

## Networking

Connect attempts validated; content signature checked before lobby.

## Events

`UI.PlayHost`, `UI.PlayJoin`, `UI.ConnectFailed`

## Extension Points

Playlist plugins.

## Examples

Host → pick map → lobby; Join → enter code → sync packages → lobby.

## Edge Cases

Version mismatch · missing deps → redirect to Hub install.

## Future Considerations

Friends list invite.

## Related Documents

- [Map Selection](map-selection.md)
- [Lobby](../../06-UI/lobby/index.md)
