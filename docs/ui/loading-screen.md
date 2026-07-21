# Loading Screen

## Purpose

Show map art, tips (non-objective), and Asset Manager progress while packages load.

## Responsibilities

- Progress bar from Assets.LoadProgress
- Optional tip rotation from map manifest
- Cancel returns to Map Selection when allowed
- Show dependency download progress if Hub fetch mid-flow

## Architecture

Widget bound to load token; map provides background image + tips.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server where applicable; otherwise local UI |
| Configuration | Data assets + widget trees |
| Presentation | Client UI |
| Extension | UI extension points / plugins |

## Data Flow

Session Loading phase → show → Assets complete → fade to match/lobby countdown.

## Networking

Each client loads locally; server waits for ready flags.

## Events

`UI.LoadingShown`, `Assets.LoadProgress`

## Extension Points

Custom loading widgets per map.

## Examples

Tips teach economy without quest language.

## Edge Cases

Stuck load → timeout error with package ids · cancel mid-download.

## Future Considerations

Streaming install while loading.

## Related Documents

- [Asset Manager](../core/asset-manager.md)
- [Session Lifecycle](../core/session-lifecycle.md)
