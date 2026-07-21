# HUD

## Purpose

In-match heads-up display for currency, ammo, round, perks, consumables, teammate status—without core objective trackers.

## Responsibilities

- Bind to replicated PlayerState/GameState
- Show interact prompts
- Downed/revive UI
- Power-up banners
- Extensibility slots for maps/mods

## Architecture

WBP_HUD with slots: BottomLeft (perks), BottomRight (weapons/ammo), Top (round), Center (banners), Teammates. **No QuestTracker slot in core.** Optional Objectives plugin may inject a slot only when enabled.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server where applicable; otherwise local UI |
| Configuration | Data assets + widget trees |
| Presentation | Client UI |
| Extension | UI extension points / plugins |

## Data Flow

Rep notifies / events → view model → widgets.

## Networking

HUD is client presentation of server truth.

## Events

`UI.HUDReady`, listens to Economy/Round/Perk/PowerUp events.

## Extension Points

`ui.extend_hud` for map widgets (compass, custom meters).

## Examples

Currency updates on Economy.CurrencyChanged; round text on Round.Started.

## Edge Cases

Spectator HUD · split screen (if supported later) · safe zones.

## Future Considerations

HUD profiles per mode.

## Implementation Specification

### View Models

Bind to replicated fields via lightweight VMs. Avoid tick polling when rep notifies exist. Extension slots named: `Slot.TopCenter`, `Slot.BottomLeft`, `Slot.BottomRight`, `Slot.Left`, `Slot.Right`. Core does not ship `Slot.Objectives`.

## Related Documents

- [Discovery Philosophy](../philosophy/discovery-philosophy.md)
- [Lobby](../lobby/index.md)
