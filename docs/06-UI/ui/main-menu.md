# Main Menu

## Purpose

Primary entry navigation: Play, Profile, Afterlife Hub, Settings, Quit.

## Responsibilities

- Route to major flows
- Show framework/version and content signature status
- Surface update prompts for Hub packages
- Quit cleanly

## Architecture

WBP_MainMenu with buttons bound to SessionDirector intents. Background is presentation-only (level or scene). Branding uses Afterlife Framework identity—not third-party IP.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server where applicable; otherwise local UI |
| Configuration | Data assets + widget trees |
| Presentation | Client UI |
| Extension | UI extension points / plugins |

## Data Flow

Boot → Save load → MainMenu → user selects route.

## Networking

Local. Online login status badge may appear in Phase 4+.

## Events

`UI.MainMenuOpened`, `UI.Navigate`

## Extension Points

Mods may add menu tiles via `ui.extend_main_menu` permission with review.

## Examples

Play → Map Selection; Hub → browse community; Profile → stats.

## Edge Cases

Corrupt save → safe mode settings · missing default map list.

## Future Considerations

News ticker from Hub (non-intrusive).

## Related Documents

- [Play](play.md)
- [Hub](../../05-Modding/hub/index.md)
- [Session Lifecycle](../../01-Engine/core/session-lifecycle.md)
