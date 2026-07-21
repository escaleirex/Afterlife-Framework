# Hub Browse and Install

## Purpose

Define browsing, discovery, and one-click installation UX/flows.

## Responsibilities

- Query catalog
- Show media and metadata
- Install/update/uninstall
- Resolve dependencies recursively
- Report progress and errors

## Architecture

Hub Client subsystem + WBP_Hub. Install pipeline: select → resolve graph → download → verify hash → register local index → ready for Map Selection.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server where applicable; otherwise local UI |
| Configuration | Data assets + widget trees |
| Presentation | Client UI |
| Extension | UI extension points / plugins |

## Data Flow

Search → details → Install → Deps.DownloadProgress → complete → toast → library updated.

## Networking

HTTPS to Hub API; downloads resumable. Match netcode unrelated.

## Events

`Hub.SearchResults`, `Hub.InstallStarted`, `Hub.InstallCompleted`, `Hub.InstallFailed`

## Extension Points

Mirror repositories · offline USB import tool.

## Examples

Install Collection “Classic Night Survivors” pulls 3 maps + 2 mods automatically.

## Edge Cases

Disk full · hash mismatch · yanked version · partial uninstall.

## Future Considerations

Delta updates.

## Related Documents

- [Dependency Loader](../../01-Engine/core/dependency-loader.md)
- [Map Selection](../../06-UI/ui/map-selection.md)
