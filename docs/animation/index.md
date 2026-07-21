# Animation

## Purpose

Guidelines for player, enemy, and interactable animation in a multiplayer-authoritative game.

## Rules

- Server leads locomotion truth; clients interpolate
- Vault/barrier anims driven by AI state enums
- Interact montages predicted locally, corrected on reject

## Related Documents

- [AI](../gameplay/ai/index.md)
- [Networking](../networking/overview.md)
