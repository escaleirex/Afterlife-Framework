# Mapping Guide

## Purpose

Teach mappers how to build Afterlife maps with **almost no gameplay code**.

## Mapper Mindset

You place content and wire data. The framework provides systems. Prefer WorldFlags and events over custom quest scripts.

## Quick Start

1. Create map under `/Game/Maps/YourMap`
2. Add spawn points, barriers, doors, buys, power
3. Create `MapManifest` with id, capabilities, dependencies
4. Place Round/Spawn directors (or use defaults from GameMode)
5. Validate with map validator (Phase 3)
6. Package for Hub

## Core Actors to Place

Player starts · Enemy spawn points/windows · Barriers · Doors/debris · Wall buys · Crate locations · Perk machines · Power activators · Upgrade station · Player boundaries · Audio/music volumes

## What Not To Do

- Copy a RoundManager into the map Blueprint and fork it
- Hardcode objectives into core types
- Assume singleplayer-only testing is enough

## Implementation Specification Checklist

### Minimum Viable Survival Map

- [ ] 4 player starts
- [ ] Navmesh bound to playable area
- [ ] 8+ spawn points / windows with barriers
- [ ] 2+ purchasable doors expanding zones
- [ ] 1 power activator + 1 power domain
- [ ] 3 wall buys
- [ ] 1 crate location (optional but recommended)
- [ ] 4 perk machines (or fewer for minimal maps)
- [ ] 1 upgrade station gated by power
- [ ] MapManifest with id/version/capabilities
- [ ] Dedicated server PIE test with 2 clients

### Recommended Event Hooks (Map Plugin Optional)

Listen only; do not fork directors:

- `Door.Opened` → unlock spawn group tags
- `Power.Activated` → enable machines FX
- `Round.Started` → local ambience

### Greybox First

Blockout routes and economy gates before art. Validate spawn flow by round 10.

## Related Documents

- [Map Manifest](map-manifest.md)
- [World Building](world-building.md)
- [Interactions](interactions.md)
- [Validation](validation.md)
- [Packaging](packaging.md)
- [Discovery Philosophy](../philosophy/discovery-philosophy.md)
