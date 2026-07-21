/**
 * Additional deep-dive docs for remaining gaps.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
function w(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + "\n", "utf8");
  console.log("wrote", rel);
}

w("docs/gameplay/player/index.md", `# Player Systems

## Purpose

Define player pawn, controller, state, downed/revive loop, and interaction without turning players into class-locked roles.

## Responsibilities

- Possess pawn with movement suited to training routes
- Replicate PlayerState fields (currency, perks, inventory ids, downs)
- Handle downed / revive / bleedout policies via mode data
- Route interact intents to server systems
- Apply modifier stack from perks/consumables

## Architecture

| Type | Role |
|------|------|
| \`AfterlifePlayerController\` | Input, UI, RPCs |
| \`AfterlifePlayerState\` | Replicated persistent match state |
| \`AfterlifeCharacter\` | Pawn movement, camera, anim |
| \`InteractComponent\` | Trace/prompt |
| \`DownedComponent\` | Downed state machine |
| \`ModifierSink\` | Applies gameplay modifiers |

### Downed State Machine

\`\`\`
Alive → Downed : Lethal while downs remaining
Downed → Alive : Revived
Downed → Bleedout : Timer expired
Bleedout → Eliminated : No self-revives/tokens
Eliminated → Spectate : Mode policy
\`\`\`

Revive: teammate hold interact → progress server-side → restore with configurable health fraction. Consumables may self-revive.

## Ownership

| Role | Owner |
|------|-------|
| Authoritative runtime | Server |
| Configuration | Mode + character defs |
| Presentation | Client |
| Extension | Perks, consumables, character passives |

## Data Flow

Input → Controller → server validate → mutate PlayerState/pawn → events → HUD.

## Networking

Movement uses Unreal character networking with server authority corrections. Inventory/currency never client-authoritative.

## Events

\`Player.Downed\`, \`Player.Revived\`, \`Player.Bleedout\`, \`Player.Eliminated\`, \`Player.InteractStarted\`, \`Player.InteractFinished\`

## Extension Points

Custom movement components · alternate revive rules · last-stand mutators.

## Examples

Classic four-player revive loop; solo mode with limited self-revive charges.

## Edge Cases

- Simultaneous revive and damage
- Revive through geo exploit (distance checks)
- Host disconnect on listen server
- Joining as spectator

## Future Considerations

Ping system; advanced accessibility aiming assists as settings—not perks.

## Related Documents

- [Economy](../economy/index.md)
- [Perks](../perks/index.md)
- [HUD](../../ui/hud.md)
- [Authority](../../networking/authority.md)
`);

w("docs/gameplay/interactions/index.md", `# Interaction System

## Purpose

Unify world interactions (doors, machines, repairs, pickups, build tables) under one priority-aware, server-validated channel.

## Responsibilities

- Detect candidate interactables
- Rank by distance/angle/priority
- Show prompt via HUD
- Send hold/tap intents to server
- Cancel cleanly on interrupt

## Architecture

\`IAfterlifeInteractable\` interface on actors:

\`\`\`csharp
bool CanInteract(AfterlifePlayerController pc, out InteractFailureReason reason);
InteractChannel GetChannel(); // Instant, Hold
float GetHoldDuration(AfterlifePlayerController pc);
void ServerExecuteInteract(AfterlifePlayerController pc);
\`\`\`

Priority stack prevents barrier repair from stealing focus from a door when looking at both—use explicit ranks.

## Ownership

Server executes; client predicts prompts/animations only.

## Data Flow

Trace → rank → prompt UI → input → RPC → CanInteract → Execute → system events.

## Networking

Hold progress is server-authoritative. Client may show local progress bar estimated from server start ack.

## Events

\`Interact.PromptChanged\`, \`Interact.HoldStarted\`, \`Interact.HoldCanceled\`, \`Interact.Executed\`

## Extension Points

New interactable actors · custom failure reasons localized by maps.

## Examples

Door hold 0.0s tap; upgrade station hold 1.0s; barrier repair continuous.

## Edge Cases

- Player downed mid-hold
- Power turns off mid-purchase
- Two players interact same machine (queue or exclusive lock)

## Future Considerations

Controller sticky aim assist toward interactables as accessibility option.

## Related Documents

- [Mapping Interactions](../../mapping/interactions.md)
- [Doors](../doors/index.md)
- [HUD](../../ui/hud.md)
`);

w("docs/gameplay/modifiers/index.md", `# Modifier System

## Purpose

Provide a deterministic composition layer for perks, consumables, power-ups, and mutators affecting player/world stats.

## Responsibilities

- Register modifiers with channels
- Compute final values with documented op order
- Replicate active modifier ids when needed for UI
- Remove cleanly on expire/down policies

## Architecture

Channels examples: \`MaxHealth\`, \`ReloadRate\`, \`MoveSpeed\`, \`DamageDealt\`, \`DamageTaken\`, \`CurrencyGain\`, \`WeaponSlots\`.

Computation order per channel (default):

1. Base
2. Additive sum
3. Multiplicative product
4. Clamps

\`\`\`csharp
final = Clamp((base + addSum) * mulProduct)
\`\`\`

## Ownership

Server computes gameplay; clients may compute presentation estimates.

## Data Flow

Effect module adds modifier → sink recalculates → attributes update → events.

## Networking

Replicate modifier source ids for HUD icons; do not trust client math.

## Events

\`Modifier.Added\`, \`Modifier.Removed\`, \`Modifier.Recomputed\`

## Extension Points

New channels via RFC · temporary world modifiers (double points) as global channel.

## Examples

Tank perk +50 health add; Double Points ×2 currency gain; consumable ×1.25 move for 20s.

## Edge Cases

- Stacking identical sources (refresh vs stack policy)
- Removal order when multiple expire same frame
- Negative multipliers forbidden unless mutator explicitly allows

## Future Considerations

Visualizer in editor showing final stat breakdown.

## Related Documents

- [Perks](../perks/index.md)
- [Consumables](../consumables/index.md)
- [Power-Ups](../power-ups/index.md)
`);

w("docs/gameplay/world-flags/index.md", `# World Flags & Unlock Tokens

## Purpose

Provide generic, quest-free progress bits for maps and plugins to gate content.

## Responsibilities

- Store boolean/int flags on GameState
- Replicate changes
- Emit events for listeners (spawn groups, doors, dialogue)
- Persist only if mode explicitly requests (rare)

## Architecture

\`WorldFlagId\` stable strings: \`power.global\`, \`door.courtyard\`, \`token.fuse_a\`.

Unlock tokens can live in player inventory or shared world inventory depending on definition.

**These are not objectives.** UI must not auto-list flags as tasks.

## Ownership

Server.

## Data Flow

System sets flag → replicate → EventBus \`WorldFlag.Changed\` → listeners.

## Networking

Replicated map/bitset; late join receives full snapshot.

## Events

\`WorldFlag.Changed\`, \`UnlockToken.Granted\`, \`UnlockToken.Consumed\`

## Extension Points

Map namespaces \`map.<id>.*\` · mod namespaces \`mod.<id>.*\`

## Examples

Power activation sets \`power.global\`; collecting three fuses sets shared tokens toward a door prerequisite—without a quest tracker.

## Edge Cases

- Unknown flag set by typo (validator warns)
- Client attempting to set flags (reject)

## Future Considerations

Flag graph visualization for authors.

## Related Documents

- [Discovery Philosophy](../../philosophy/discovery-philosophy.md)
- [Doors](../doors/index.md)
- [Power](../power/index.md)
`);

w("docs/ui/navigation.md", `# UI Navigation Model

## Purpose

Define how frontend screens transition with Session phases.

## Graph

\`\`\`
MainMenu ↔ Hub
MainMenu → Play → MapSelection → Lobby → Loading → InMatchHUD
InMatch → Pause → Settings(overlay)
PostMatch → MainMenu / MapSelection
\`\`\`

## Rules

1. Navigation requests go through \`UINavigationService\` tied to \`SessionDirector\`.
2. Illegal transitions are rejected (e.g., Hub during InMatch).
3. Back stack exists for Hub browsing; cleared on match start.
4. Gamepad and keyboard/mouse first-class.

## Related Documents

- [Session Lifecycle](../core/session-lifecycle.md)
- [UI Index](index.md)
`);

w("docs/standards/git-workflow.md", `# Git Workflow

## Purpose

Standardize branches, reviews, and releases.

## Branches

- \`main\` — stable docs/runtime
- \`release/x.y\` — release trains when runtime exists
- feature branches from \`main\`

## Reviews

At least one maintainer approval for architecture-impacting PRs. RFCs need explicit acceptance before impl merges.

## Releases

Tag \`vX.Y.Z\`; move CHANGELOG Unreleased → version section; publish Hub protocol version notes if needed.

## Related Documents

- [Contributing](../../CONTRIBUTING.md)
- [CI/CD](../devops/ci-cd.md)
`);

w("docs/reference/faq.md", `# FAQ

## Is this Call of Duty Zombies?

No. It is an original open-source framework inspired by round-based survival design patterns from that era. No affiliation.

## Can I make objective-based maps?

Yes, via map content or the opt-in Quest Framework plugin. Core will not force objectives.

## Does it use Steam Workshop?

No. Afterlife Hub is the content platform.

## Can old maps break?

The project promises not to intentionally break compatibility. Undocumented API usage may break; documented APIs deprecate with process.

## What language is gameplay in?

C# via UnrealSharp on Unreal Engine 5.

## When can I download a playable build?

Follow \`ROADMAP.md\`. Documentation foundation ships first.
`);

w("docs/reference/document-status.md", `# Document Status

## Baseline

**0.1.0-docs** — Documentation foundation complete for architecture, core, gameplay specs, UI/Hub/Lobby, mapping/modding, RFC, and Cursor rules.

## Maturity Legend

| Status | Meaning |
|--------|---------|
| Draft Spec | Normative intent; APIs may refine via RFC before code |
| Accepted Spec | RFC accepted; ready to implement in phase |
| Implemented | Code matches docs on \`main\` |

All gameplay system docs in 0.1.0-docs are **Draft Spec** pending Phase 2 RFCs per system as implementation begins. Core philosophy docs are **Accepted Spec** for project governance.
`);

// Update gameplay index to include new systems
const gameplayIndex = path.join(ROOT, "docs/gameplay/index.md");
let gi = fs.readFileSync(gameplayIndex, "utf8");
if (!gi.includes("player/index.md")) {
  gi = gi.replace(
    "| Rounds | [rounds/index.md](rounds/index.md) |",
    "| Player | [player/index.md](player/index.md) |\n| Interactions | [interactions/index.md](interactions/index.md) |\n| Modifiers | [modifiers/index.md](modifiers/index.md) |\n| World Flags | [world-flags/index.md](world-flags/index.md) |\n| Rounds | [rounds/index.md](rounds/index.md) |"
  );
  fs.writeFileSync(gameplayIndex, gi, "utf8");
  console.log("updated gameplay index");
}

console.log("done");
