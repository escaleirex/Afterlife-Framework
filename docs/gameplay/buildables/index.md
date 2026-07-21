# Buildables

## Purpose

Support parts collection and crafting benches for map-unique tools, traps, or wonder weapon components—event-driven, not quest-forced.

## Responsibilities

- Place parts in world with pickup rules
- Track per-player or shared progress
- Assemble at build tables
- Grant resulting item/actor

## Architecture

Parts are InventoryTokens or world pickups. `BuildRecipe` data maps parts → output. Discovery remains environmental; UI hints are optional map plugins.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server (subsystem / game state) |
| Configuration | Data assets + Registries |
| Presentation | Client UI / HUD listeners |
| Extension | Plugins, Content Packs, Map Overrides |

## Data Flow

Pickup part → token granted → table interact → if recipe complete → consume parts → spawn output.

## Networking

Server tracks tokens and builds.

## Events

`Buildable.PartPicked`, `Buildable.Assembled`, `Buildable.RecipeProgress`

## Extension Points

Shared vs personal parts · damaged buildables · reverse engineer recipes.

## Examples

Build a trap piece; assemble a specialty weapon; craft a key item token.

## Edge Cases

Two players race same personal-part spawn · table without power · recipe disabled by mutator.

## Future Considerations

Buildables debugger showing part locations for authors only.

## Implementation Specification

Part spawn policies: once per match, per-player, or shared. Recipes map tokens → output actor/item. Tables show prompt progress only—no forced objective HUD.

## Related Documents

- [Wonder Weapons](../wonder-weapons/index.md)
- [Traps](../traps/index.md)
- [Discovery Philosophy](../../philosophy/discovery-philosophy.md)
