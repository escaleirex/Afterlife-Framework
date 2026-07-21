# Map Manifest

## Purpose

Define required metadata for every map package.

## Example

```json
{
  "id": "com.acme.maps.abandoned_rail",
  "version": "1.0.0",
  "title": "Abandoned Rail",
  "frameworkRange": ">=1.0.0 <2.0.0",
  "maxPlayers": 4,
  "capabilities": ["consumables", "character_select", "mutators", "difficulty"],
  "allowedModes": ["afterlife.mode.classic_survival"],
  "requires": [{ "id": "com.acme.perkpack", "range": "^2.0.0" }],
  "recommends": [{ "id": "com.acme.qol", "range": ">=1.0.0" }],
  "entry": "/Game/Maps/AbandonedRail/AbandonedRail"
}
```

## Related Documents

- [Dependency Loader](../../01-Engine/core/dependency-loader.md)
- [Lobby](../../06-UI/lobby/index.md)
