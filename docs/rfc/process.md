# RFC Process

## Purpose

Every new gameplay feature must become an RFC before implementation.

## When Required

New gameplay subsystems · Event Bus contract changes · Replication ownership changes · Registry breaking changes · Hub protocol changes · Save format changes · **Constitution amendments**

## Constitutional Amendments

Amending [`docs/00-vision/Afterlife-Framework-Constitution.md`](../00-vision/Afterlife-Framework-Constitution.md) requires an RFC that:

1. Explains why existing Articles are insufficient
2. Describes expected impact on creators, maps, and compatibility
3. Is reviewed and explicitly accepted before the Constitution file is edited

Constitutional changes should be rare.

## Lifecycle

```
Draft → Community/Maintainer Review → Accepted | Rejected | Deferred → Implement → Archive
```

## Steps

1. Copy `rfcs/templates/0000-template.md` to `rfcs/XXXX-title.md`
2. Fill all sections
3. Open PR labeled `rfc`
4. Discuss; revise
5. Maintainer marks Accepted
6. Implementation PRs reference `RFC-XXXX`
7. Docs + CHANGELOG updated with implementation

## Acceptance Criteria

Philosophy alignment · Multiplayer authority · Extensibility · Compatibility impact understood · Test plan · Doc plan

## Related Documents

- [Template](../../rfcs/templates/0000-template.md)
- [Contributing](../../CONTRIBUTING.md)
- [Roadmap](../../ROADMAP.md)
