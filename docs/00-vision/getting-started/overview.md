# Getting Started Overview

## Purpose

Orient new contributors, mappers, and modders to Afterlife Framework without requiring prior Call of Duty knowledge.

## What You Are Building On

Afterlife Framework is an Unreal Engine 5 framework written primarily in **C# via UnrealSharp**. It provides reusable gameplay systems for round-based survival maps.

You are not expected to ship a commercial game inside this repository. You are expected to harden an engine other people will use for years.

## Choose Your Path

| Role | Start here | Then read |
|------|------------|-----------|
| Engine programmer | [Developer Setup](developer-setup.md) | [Architecture](../architecture/overview.md), [Event Bus](../core/event-bus.md) |
| Gameplay programmer | [Gameplay Index](../gameplay/index.md) | [Rounds](../gameplay/rounds/index.md), [Networking](../networking/overview.md) |
| Mapper | [Mapping Guide](../mapping/index.md) | [Discovery Philosophy](../philosophy/discovery-philosophy.md) |
| Modder | [Modding Guide](../modding/index.md) | [Registries](../core/registries.md), [Hub](../hub/index.md) |
| UI engineer | [UI Index](../ui/index.md) | [Lobby](../lobby/index.md) |

## Absolute Rules (Read Once)

0. Obey the [Constitution](../00-vision/Afterlife-Framework-Constitution.md).
1. Documentation is the source of truth.
2. Do not skip [roadmap](../../ROADMAP.md) phases.
3. Do not invent undocumented architecture.
4. Do not hardcode proprietary IP.
5. Do not add Main Quest / Objective ontology to core.
6. Do not put gameplay authority on clients.
7. Do not bypass the Event Bus for cross-system chatter.
8. Update CHANGELOG and docs in the same PR as behavior changes.

## First Week Checklist

- [ ] Read Design + Discovery + Multiplayer doctrines
- [ ] Skim architecture folder structure
- [ ] Read Event Bus + Registries
- [ ] Run developer setup
- [ ] Make a docs-only or test-only PR as a warm-up

## Related Documents

- [First Contribution](first-contribution.md)
- [Glossary](glossary.md)
- [Contributing](../../CONTRIBUTING.md)
