# Lobby Dynamic Adaptation

## Purpose

Specify how lobby UI hides/shows and validates options from map manifests.

## Capability Negotiation

```json
{
  "capabilities": ["consumables", "character_select", "mutators", "difficulty"],
  "allowedModes": ["afterlife.mode.classic_survival"],
  "allowedMutators": ["*", "-com.acme.mutator.chaos_economy"],
  "maxPlayers": 4
}
```

## Validation

Client UI filters for UX; server re-validates on Start. Never trust client-only filtering.

## Related Documents

- [Lobby Index](index.md)
- [Dependency Loader](../../01-Engine/core/dependency-loader.md)
