# Map Selection

## Purpose

List installed maps (including Hub-installed) and show metadata, requirements, and launch into Lobby.

## Responsibilities

- Enumerate local + Hub-installed maps
- Show required/recommended mods
- Filter/search/sort
- Launch dependency resolve then Lobby
- Deep-link to Hub for missing content

## Architecture

Reads Hub local index + map manifests. Cards show screenshots, creators, framework range, capabilities.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server where applicable; otherwise local UI |
| Configuration | Data assets + widget trees |
| Presentation | Client UI |
| Extension | UI extension points / plugins |

## Data Flow

Open → scan index → user selects → DependencyLoader.resolve → Lobby.

## Networking

Host selection becomes session map id.

## Events

`UI.MapSelected`, `UI.MapMissingDeps`

## Extension Points

Custom filters · curated shelves.

## Examples

Installed maps appear automatically after Hub install—no manual folder copy.

## Edge Cases

Broken manifest · incompatible framework · empty library CTA to Hub.

## Future Considerations

Collections view.

## Related Documents

- [Hub](../../05-Modding/hub/index.md)
- [Dependency Loader](../../01-Engine/core/dependency-loader.md)
