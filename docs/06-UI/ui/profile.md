# Profile

## Purpose

Present player identity, statistics, cosmetics, and prestige/meta (if enabled).

## Responsibilities

- Show stats from Save System
- Manage display name / avatar (policy)
- Cosmetics inventory
- Challenge list (meta, not in-match objectives)

## Architecture

Profile view-model reads save domains; online sync merges in Phase 4+.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server where applicable; otherwise local UI |
| Configuration | Data assets + widget trees |
| Presentation | Client UI |
| Extension | UI extension points / plugins |

## Data Flow

Open Profile → load stats → render · edits save locally.

## Networking

Cosmetic ownership validated online when applicable.

## Events

`UI.ProfileOpened`, `Save.Committed`

## Extension Points

Mode-specific stat tabs.

## Examples

High rounds per map; lifetime kills; prestige badge.

## Edge Cases

Offline vs online mismatch · private profiles.

## Future Considerations

Creator profile linking to Hub.

## Related Documents

- [Save System](../../01-Engine/core/save-system.md)
- [Progression](../../02-Gameplay/progression/index.md)
