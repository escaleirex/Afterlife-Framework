# Design Philosophy

## Purpose

Interpret and expand the [Afterlife Framework Constitution](../00-vision/Afterlife-Framework-Constitution.md) into day-to-day design guidance for a professional open-source gameplay **engine**, not a shipped commercial game clone.

This document must never contradict the Constitution. If they diverge, the Constitution wins.

## Core Statement

> Afterlife Framework is an engine. Maps provide content. The framework provides gameplay. Everything is modular, data-driven, event-connected, multiplayer-authoritative, and backwards-compatible.

## Laws

1. **Engine, not game** — no proprietary IP in core; generic vocabulary only.
2. **Maps contain almost no gameplay code** — systems + data + plugins.
3. **Composition over inheritance** — strategies, components, modifiers.
4. **Data-driven by default** — tunables in assets, not magic numbers.
5. **Event Bus communication** across system boundaries.
6. **Everything replaceable** without forking core.
7. **No hardcoded content identity** in engine code.
8. **Readable code over clever code**.
9. **Documentation over assumptions**.
10. **Community first, open-source forever**.

## Decision Test

Mapper-usable without gameplay code? Mod-replaceable? Dedicated-server safe? No forced objectives? No proprietary IP? Documented? Tested? Compatible with older maps?

## Related Documents

- [Constitution](../00-vision/Afterlife-Framework-Constitution.md)
- [Discovery Philosophy](discovery-philosophy.md)
- [Gameplay Philosophy](gameplay-philosophy.md)
- [Compatibility](compatibility.md)
- [Multiplayer Doctrine](multiplayer-doctrine.md)
- [Modding Doctrine](modding-doctrine.md)
