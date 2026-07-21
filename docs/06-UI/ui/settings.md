# Settings

## Purpose

Graphics, audio, controls, accessibility, gameplay assists, network options.

## Responsibilities

- Persist settings domain
- Apply engine scalability
- Key rebinding
- Subtitles and colorblind options
- Privacy toggles

## Architecture

Tabbed settings; changes apply immediately where safe; some require restart.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server where applicable; otherwise local UI |
| Configuration | Data assets + widget trees |
| Presentation | Client UI |
| Extension | UI extension points / plugins |

## Data Flow

Change → validate → save → apply.

## Networking

Network settings affect client connection preferences only.

## Events

`Settings.Changed`

## Extension Points

Mod settings pages under namespaced tabs.

## Examples

Disable screen shake; increase FOV; subtitle size.

## Edge Cases

Invalid resolution · conflicting binds · corrupted settings file.

## Future Considerations

Cloud settings sync.

## Related Documents

- [Save System](../../01-Engine/core/save-system.md)
- [Audio](../audio/index.md)
