# Afterlife Framework Constitution

**Version:** 1.0  
**Status:** Foundational Project Law  
**Applies To:** All contributors, maintainers, AI agents, plugins, modules, maps, tools, and future expansions of Afterlife Framework.

**Location:** `docs/00-vision/Afterlife-Framework-Constitution.md`  
*(Canonical equivalent of `Docs/00 Vision/Afterlife Framework Constitution.md`.)*

---

# Purpose

This Constitution exists to protect the long-term vision of Afterlife Framework.

Technology changes.

Programming languages change.

Maintainers change.

Contributors come and go.

The principles defined in this document are intended to remain constant.

Any architectural, gameplay, tooling, networking, modding, or design decision should be evaluated against this Constitution.

If a proposed change violates this Constitution, the change should be rejected or redesigned.

---

# Hierarchy Of Authority

When documents conflict, resolve in this order:

1. **This Constitution** (foundational project law)
2. Accepted RFCs that amend the Constitution (rare; see Amendment Process)
3. [`ROADMAP.md`](../../ROADMAP.md) phase gates
4. System documentation under [`docs/`](../index.md)
5. Implementation code

Philosophy docs under [`docs/philosophy/`](../philosophy/design-philosophy.md) interpret and expand these Articles. They must never contradict them.

---

# Article I - The Framework Is Not A Game

Afterlife Framework is not a game.

Afterlife Framework is an engine and framework for creating games, maps, experiences, and game modes.

The framework must never be designed around a single map, game mode, mechanic, or creator.

Every system should be built with the expectation that creators will use it in ways that were never originally envisioned.

---

# Article II - Maps Own Content, The Framework Owns Behavior

Maps should provide:

* Layouts
* Visuals
* Audio
* Storytelling
* Characters
* Encounters
* Configuration

The framework should provide:

* Gameplay systems
* Networking
* Replication
* Inventory
* Weapons
* AI
* Progression
* Mod loading
* Save systems
* Core architecture

Gameplay systems should never be duplicated across maps.

Maps should configure systems rather than reimplement them.

---

# Article III - Discovery Over Instruction

One of the core values of Afterlife Framework is discovery.

Players should be free to explore, experiment, and uncover mechanics organically.

The framework must never require:

* Objective markers
* Quest arrows
* Handholding
* Forced tutorials

The framework may support such systems.

The framework must never enforce them.

Creators should decide how much information is revealed to players.

---

# Article IV - Everything Is Modular

Every major gameplay system must be replaceable.

This includes but is not limited to:

* Weapons
* Perks
* Movement
* Zombies
* AI
* Inventory
* HUD
* Powerups
* Progression
* Match Flow
* Round Systems
* Game Modes

No system should assume it is the only implementation.

Every system should expose extension points whenever practical.

---

# Article V - Data Over Hardcoding

Whenever possible:

Configuration should be stored as data.

Behavior should consume data.

Avoid hardcoded values.

Avoid hardcoded assumptions.

Avoid hardcoded content.

Examples:

Bad:

* Hardcoded perk lists
* Hardcoded weapon lists
* Hardcoded game modes

Good:

* Registries
* Data Assets
* Definitions
* Configuration Assets

---

# Article VI - Event Driven Architecture

The Event Bus is one of the foundations of the framework.

Systems should communicate through events whenever practical.

Systems should avoid direct dependencies whenever possible.

Benefits include:

* Modularity
* Testability
* Extensibility
* Maintainability

The Event Bus should be treated as a first-class engine service.

---

# Article VII - Multiplayer First

Afterlife Framework is multiplayer-first.

Singleplayer support should naturally emerge from multiplayer architecture.

Gameplay systems must never assume:

* One player exists
* One client exists
* One authority exists

The server is authoritative.

Clients are consumers of replicated state.

Trust should never be placed in clients.

---

# Article VIII - Extensibility Is A Requirement

Every feature should answer the following questions:

Can a creator extend this?

Can a creator replace this?

Can a creator disable this?

Can a creator override this?

If the answer is no, the architecture should be reevaluated.

Extensibility is not optional.

It is a requirement.

---

# Article IX - Modding Is A First-Class Feature

Modding is one of the primary goals of the framework.

Mod support should never be considered an afterthought.

The framework should support:

* Global Mods
* Content Packs
* Embedded Mods
* Game Mode Mods
* Weapon Packs
* Character Packs
* Perk Packs
* Community Extensions

The best experiences created for Afterlife Framework should not require engine modifications.

---

# Article X - Community Content Matters

The framework exists because creators exist.

Community content should be treated as a primary use case.

Features should be evaluated based on how they empower creators.

The framework should reduce barriers to creation whenever possible.

---

# Article XI - Backward Compatibility

The framework should prioritize backward compatibility.

Maps built on older versions should continue functioning whenever reasonably possible.

Breaking changes should be avoided.

When breaking changes are unavoidable:

* They must be documented.
* Migration paths must be provided.
* Justification must be clear.

Backward compatibility is a feature.

---

# Article XII - Platform Independence

The framework should avoid unnecessary dependence on any single platform.

Examples include:

* Steam
* Epic Games Store
* Xbox
* PlayStation
* Mobile Platforms

Platform-specific functionality should be abstracted whenever possible.

The framework should remain portable.

---

# Article XIII - Afterlife Hub

Community content distribution should occur through Afterlife Hub.

The framework should not rely exclusively on third-party workshop ecosystems.

The goal is a platform-independent ecosystem that functions consistently across supported platforms.

Maps, Mods, Collections, Game Modes, and Community Content should be distributed through the same unified experience.

---

# Article XIV - Documentation Is Source Of Truth

Documentation is not optional.

Documentation is part of the product.

Before implementing a major feature:

* Documentation should exist.
* Architecture should be reviewed.
* Requirements should be defined.

After implementation:

* Documentation must be updated.

Code and documentation must never intentionally diverge.

---

# Article XV - RFC Driven Development

Major features should begin as RFCs.

An RFC should define:

* Problem Statement
* Goals
* Non-Goals
* Proposed Design
* Networking Considerations
* Extension Points
* Alternatives Considered

Architecture should be agreed upon before implementation begins.

---

# Article XVI - Readability Over Cleverness

The framework is intended to live for many years.

Future contributors must be able to understand it.

Prioritize:

* Clarity
* Consistency
* Maintainability

Avoid:

* Clever hacks
* Hidden behavior
* Overengineering
* Premature optimization

Readable code is a feature.

---

# Article XVII - Open Source Forever

Afterlife Framework is intended to remain open-source.

The community should always be able to:

* Study it
* Improve it
* Learn from it
* Extend it

Open development is a core part of the project's identity.

---

# Article XVIII - Respect The Experience

The goal is not to recreate a specific game.

The goal is to preserve and evolve the design principles that made those experiences memorable.

Examples include:

* Discovery
* Progression
* Tension
* Replayability
* Cooperation
* Creativity

Features should strengthen these pillars whenever possible.

---

# Amendment Process

The Constitution may evolve.

However, amendments should be treated as major project decisions.

Any amendment should:

1. Be proposed through an RFC.
2. Explain why existing principles are insufficient.
3. Describe expected impact.
4. Be reviewed before adoption.

Constitutional changes should be rare.

---

# Final Principle

When facing uncertainty, choose the solution that increases:

* Modularity
* Extensibility
* Discoverability
* Maintainability
* Community Creativity

And avoid solutions that increase:

* Hardcoding
* Coupling
* Complexity
* Platform Lock-In
* Creator Restrictions

The framework exists to empower creators.

Every decision should serve that purpose.

---

## Related Documents

- [Documentation Index](../index.md)
- [Design Philosophy](../philosophy/design-philosophy.md)
- [Discovery Philosophy](../philosophy/discovery-philosophy.md)
- [RFC Process](../rfc/process.md)
- [Roadmap](../../ROADMAP.md)
- [Contributing](../../CONTRIBUTING.md)
