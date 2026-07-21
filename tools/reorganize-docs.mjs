/**
 * Reorganize docs into professional numbered sections.
 * Moves existing content; writes section indexes; updates root docs/index.md
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "docs");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function moveDir(fromRel, toRel) {
  const from = path.join(ROOT, fromRel);
  const to = path.join(ROOT, toRel);
  if (!fs.existsSync(from)) {
    console.log("skip missing", fromRel);
    return;
  }
  ensureDir(path.dirname(to));
  if (fs.existsSync(to)) {
    // merge: move children
    for (const name of fs.readdirSync(from)) {
      const src = path.join(from, name);
      const dst = path.join(to, name);
      if (fs.existsSync(dst)) {
        console.log("exists, skip child", path.join(toRel, name));
        continue;
      }
      fs.renameSync(src, dst);
      console.log("moved", path.join(fromRel, name), "->", path.join(toRel, name));
    }
    // remove from if empty
    try {
      fs.rmdirSync(from);
    } catch {}
  } else {
    fs.renameSync(from, to);
    console.log("moved", fromRel, "->", toRel);
  }
}

function write(rel, content) {
  const full = path.join(ROOT, rel);
  ensureDir(path.dirname(full));
  fs.writeFileSync(full, content.trim() + "\n", "utf8");
  console.log("wrote", rel);
}

// Target layout under docs/
const sections = [
  "docs/00-Vision",
  "docs/01-Engine",
  "docs/02-Gameplay",
  "docs/03-Maps",
  "docs/04-Multiplayer",
  "docs/05-Modding",
  "docs/06-UI",
  "docs/07-Coding",
  "docs/RFC",
];
sections.forEach((s) => ensureDir(path.join(ROOT, s)));

// Moves
moveDir("docs/00-vision", "docs/00-Vision");
moveDir("docs/philosophy", "docs/00-Vision/philosophy");
moveDir("docs/getting-started", "docs/00-Vision/getting-started");

moveDir("docs/architecture", "docs/01-Engine/architecture");
moveDir("docs/core", "docs/01-Engine/core");
moveDir("docs/animation", "docs/01-Engine/animation");
moveDir("docs/audio", "docs/01-Engine/audio");
moveDir("docs/performance", "docs/01-Engine/performance");

moveDir("docs/gameplay", "docs/02-Gameplay");

moveDir("docs/mapping", "docs/03-Maps");

moveDir("docs/networking", "docs/04-Multiplayer");

moveDir("docs/modding", "docs/05-Modding/modding");
moveDir("docs/hub", "docs/05-Modding/hub");
moveDir("docs/plugins", "docs/05-Modding/plugins");

moveDir("docs/ui", "docs/06-UI/ui");
moveDir("docs/lobby", "docs/06-UI/lobby");

moveDir("docs/standards", "docs/07-Coding/standards");
moveDir("docs/testing", "docs/07-Coding/testing");
moveDir("docs/devops", "docs/07-Coding/devops");
moveDir("docs/reference", "docs/07-Coding/reference");

moveDir("docs/rfc", "docs/RFC");

// Roadmap pointer in Docs
write(
  "docs/Roadmap.md",
  `# Roadmap

The canonical multi-year roadmap lives at the repository root:

→ [ROADMAP.md](../ROADMAP.md)

Keep a single roadmap source of truth. Do not fork a second competing roadmap here.
`
);

// Section READMEs
write(
  "docs/00-Vision/README.md",
  `# 00 — Vision

Foundational project law and philosophy.

| Document | Path |
|----------|------|
| **Constitution** | [Afterlife-Framework-Constitution.md](Afterlife-Framework-Constitution.md) |
| Philosophy | [philosophy/](philosophy/) |
| Getting Started | [getting-started/](getting-started/) |
`
);

write(
  "docs/01-Engine/README.md",
  `# 01 — Engine

Core architecture, services, and engine-level systems.

| Area | Path |
|------|------|
| Architecture | [architecture/](architecture/) |
| Core services | [core/](core/) |
| Audio | [audio/](audio/) |
| Animation | [animation/](animation/) |
| Performance | [performance/](performance/) |
`
);

write(
  "docs/02-Gameplay/README.md",
  `# 02 — Gameplay

All gameplay system specifications. Maps configure these systems; they do not reimplement them.

See [index.md](index.md) for the full system list.
`
);

write(
  "docs/03-Maps/README.md",
  `# 03 — Maps

Mapping guides, manifests, validation, packaging, and world-building.

Start: [index.md](index.md)
`
);

write(
  "docs/04-Multiplayer/README.md",
  `# 04 — Multiplayer

Networking, authority, replication, dedicated servers.

Start: [overview.md](overview.md)
`
);

write(
  "docs/05-Modding/README.md",
  `# 05 — Modding

Modding doctrine in practice: packs, plugins, Afterlife Hub, dependency resolution.

| Area | Path |
|------|------|
| Modding guide | [modding/](modding/) |
| Afterlife Hub | [hub/](hub/) |
| Plugins | [plugins/](plugins/) |
`
);

write(
  "docs/06-UI/README.md",
  `# 06 — UI

Frontend, lobby, HUD, and navigation.

| Area | Path |
|------|------|
| UI | [ui/](ui/) |
| Lobby | [lobby/](lobby/) |
`
);

write(
  "docs/07-Coding/README.md",
  `# 07 — Coding

Standards, testing, CI/CD, and reference policies.

| Area | Path |
|------|------|
| Standards | [standards/](standards/) |
| Testing | [testing/](testing/) |
| DevOps | [devops/](devops/) |
| Reference | [reference/](reference/) |
`
);

write(
  "docs/RFC/README.md",
  `# RFC

| Doc | Path |
|-----|------|
| Process | [process.md](process.md) |
| Reading RFCs | [reading-rfcs.md](reading-rfcs.md) |
| Templates & proposals | [/rfcs/](../../rfcs/) at repository root |
`
);

// New master index
write(
  "docs/index.md",
  `# Afterlife Framework Documentation

> **Single source of truth.** If code and docs disagree, update code to match docs—or amend docs via RFC.

**Foundational law:** [Constitution](00-Vision/Afterlife-Framework-Constitution.md)

---

## Documentation Structure

\`\`\`
docs/
├── 00-Vision/        Constitution, philosophy, getting started
├── 01-Engine/        Architecture, core services, audio, performance
├── 02-Gameplay/      All gameplay systems
├── 03-Maps/          Mapping guide
├── 04-Multiplayer/   Networking & dedicated servers
├── 05-Modding/       Mods, Hub, plugins
├── 06-UI/            Menus, lobby, HUD
├── 07-Coding/        Standards, testing, CI/CD
├── RFC/              RFC process
└── Roadmap.md        Pointer to root ROADMAP.md
\`\`\`

## How to Read

1. [Constitution](00-Vision/Afterlife-Framework-Constitution.md)
2. [Getting Started](00-Vision/getting-started/overview.md)
3. [Design Philosophy](00-Vision/philosophy/design-philosophy.md)
4. Your area: Engine · Gameplay · Maps · Multiplayer · Modding · UI · Coding
5. [RFC Process](RFC/process.md) before major features
6. [Roadmap](../ROADMAP.md)

## Section Indexes

- [00 Vision](00-Vision/README.md)
- [01 Engine](01-Engine/README.md)
- [02 Gameplay](02-Gameplay/README.md) · [Systems](02-Gameplay/index.md)
- [03 Maps](03-Maps/README.md)
- [04 Multiplayer](04-Multiplayer/README.md)
- [05 Modding](05-Modding/README.md)
- [06 UI](06-UI/README.md)
- [07 Coding](07-Coding/README.md)
- [RFC](RFC/README.md)

## Repository Runtime Layout

See [Folder Structure](01-Engine/architecture/folder-structure.md) and the root \`README.md\`.

## Version

Documentation baseline: **0.1.0-docs** (reorganized into numbered sections)
`
);

console.log("reorganize complete");
