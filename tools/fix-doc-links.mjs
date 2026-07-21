/**
 * Fix common broken relative links after docs reorganize.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name.endsWith(".md") || ent.name.endsWith(".mdc")) out.push(p);
  }
  return out;
}

const replacements = [
  // Root-level doc path updates in non-docs files and docs
  [/docs\/00-vision\//g, "docs/00-Vision/"],
  [/docs\/philosophy\//g, "docs/00-Vision/philosophy/"],
  [/docs\/getting-started\//g, "docs/00-Vision/getting-started/"],
  [/docs\/architecture\//g, "docs/01-Engine/architecture/"],
  [/docs\/core\//g, "docs/01-Engine/core/"],
  [/docs\/gameplay\//g, "docs/02-Gameplay/"],
  [/docs\/mapping\//g, "docs/03-Maps/"],
  [/docs\/networking\//g, "docs/04-Multiplayer/"],
  [/docs\/modding\//g, "docs/05-Modding/modding/"],
  [/docs\/hub\//g, "docs/05-Modding/hub/"],
  [/docs\/plugins\//g, "docs/05-Modding/plugins/"],
  [/docs\/ui\//g, "docs/06-UI/ui/"],
  [/docs\/lobby\//g, "docs/06-UI/lobby/"],
  [/docs\/standards\//g, "docs/07-Coding/standards/"],
  [/docs\/testing\//g, "docs/07-Coding/testing/"],
  [/docs\/devops\//g, "docs/07-Coding/devops/"],
  [/docs\/reference\//g, "docs/07-Coding/reference/"],
  [/docs\/rfc\//g, "docs/RFC/"],
  [/docs\/performance\//g, "docs/01-Engine/performance/"],
  [/docs\/audio\//g, "docs/01-Engine/audio/"],
  [/docs\/animation\//g, "docs/01-Engine/animation/"],
];

const relativeFromGameplay = [
  [/\]\(\.\.\/\.\.\/philosophy\//g, "](../../00-Vision/philosophy/"],
  [/\]\(\.\.\/\.\.\/networking\//g, "](../../04-Multiplayer/"],
  [/\]\(\.\.\/\.\.\/core\//g, "](../../01-Engine/core/"],
  [/\]\(\.\.\/\.\.\/ui\//g, "](../../06-UI/ui/"],
  [/\]\(\.\.\/\.\.\/lobby\//g, "](../../06-UI/lobby/"],
  [/\]\(\.\.\/\.\.\/hub\//g, "](../../05-Modding/hub/"],
  [/\]\(\.\.\/\.\.\/mapping\//g, "](../../03-Maps/"],
  [/\]\(\.\.\/\.\.\/modding\//g, "](../../05-Modding/modding/"],
  [/\]\(\.\.\/\.\.\/performance\//g, "](../../01-Engine/performance/"],
  [/\]\(\.\.\/\.\.\/audio\//g, "](../../01-Engine/audio/"],
  [/\]\(\.\.\/\.\.\/rfc\//g, "](../../RFC/"],
  [/\]\(\.\.\/\.\.\/architecture\//g, "](../../01-Engine/architecture/"],
];

const relativeFromEngine = [
  [/\]\(\.\.\/philosophy\//g, "](../00-Vision/philosophy/"],
  [/\]\(\.\.\/gameplay\//g, "](../02-Gameplay/"],
  [/\]\(\.\.\/networking\//g, "](../04-Multiplayer/"],
  [/\]\(\.\.\/mapping\//g, "](../03-Maps/"],
  [/\]\(\.\.\/modding\//g, "](../05-Modding/modding/"],
  [/\]\(\.\.\/hub\//g, "](../05-Modding/hub/"],
  [/\]\(\.\.\/ui\//g, "](../06-UI/ui/"],
  [/\]\(\.\.\/lobby\//g, "](../06-UI/lobby/"],
  [/\]\(\.\.\/standards\//g, "](../07-Coding/standards/"],
  [/\]\(\.\.\/rfc\//g, "](../RFC/"],
  [/\]\(\.\.\/core\//g, "](../core/"], // same section sibling under 01-Engine - careful
];

// Fix engine core links that used ../networking etc from docs/core
const fromCoreFiles = [
  [/\]\(\.\.\/networking\//g, "](../../04-Multiplayer/"],
  [/\]\(\.\.\/philosophy\//g, "](../../00-Vision/philosophy/"],
  [/\]\(\.\.\/gameplay\//g, "](../../02-Gameplay/"],
  [/\]\(\.\.\/ui\//g, "](../../06-UI/ui/"],
  [/\]\(\.\.\/hub\//g, "](../../05-Modding/hub/"],
  [/\]\(\.\.\/modding\//g, "](../../05-Modding/modding/"],
  [/\]\(\.\.\/lobby\//g, "](../../06-UI/lobby/"],
  [/\]\(\.\.\/architecture\//g, "](../architecture/"],
  [/\]\(\.\.\/rfc\//g, "](../../RFC/"],
  [/\]\(\.\.\/performance\//g, "](../performance/"],
];

const fromVision = [
  [/\]\(\.\.\/gameplay\//g, "](../../02-Gameplay/"],
  [/\]\(\.\.\/ui\//g, "](../../06-UI/ui/"],
  [/\]\(\.\.\/00-vision\//gi, "](../"],
  [/\]\(\.\.\/rfc\//g, "](../../RFC/"],
];

let changed = 0;
for (const file of walk(ROOT)) {
  if (file.includes("node_modules") || file.includes(".git" + path.sep)) continue;
  let text = fs.readFileSync(file, "utf8");
  const orig = text;
  for (const [re, to] of replacements) text = text.replace(re, to);

  const norm = file.replace(/\\/g, "/");
  if (norm.includes("/02-Gameplay/")) {
    for (const [re, to] of relativeFromGameplay) text = text.replace(re, to);
  }
  if (norm.includes("/01-Engine/core/") || norm.includes("/01-Engine/architecture/")) {
    for (const [re, to] of fromCoreFiles) text = text.replace(re, to);
  }
  if (norm.includes("/00-Vision/")) {
    for (const [re, to] of fromVision) text = text.replace(re, to);
  }
  if (norm.includes("/03-Maps/") || norm.includes("/04-Multiplayer/") || norm.includes("/05-Modding/") || norm.includes("/06-UI/") || norm.includes("/07-Coding/")) {
    text = text
      .replace(/\]\(\.\.\/philosophy\//g, "](../../00-Vision/philosophy/")
      .replace(/\]\(\.\.\/gameplay\//g, "](../../02-Gameplay/")
      .replace(/\]\(\.\.\/networking\//g, "](../../04-Multiplayer/")
      .replace(/\]\(\.\.\/core\//g, "](../../01-Engine/core/")
      .replace(/\]\(\.\.\/architecture\//g, "](../../01-Engine/architecture/")
      .replace(/\]\(\.\.\/hub\//g, "](../../05-Modding/hub/")
      .replace(/\]\(\.\.\/modding\//g, "](../../05-Modding/modding/")
      .replace(/\]\(\.\.\/ui\//g, "](../../06-UI/ui/")
      .replace(/\]\(\.\.\/lobby\//g, "](../../06-UI/lobby/")
      .replace(/\]\(\.\.\/mapping\//g, "](../../03-Maps/")
      .replace(/\]\(\.\.\/rfc\//g, "](../../RFC/")
      .replace(/\]\(\.\.\/standards\//g, "](../../07-Coding/standards/")
      .replace(/\]\(\.\.\/performance\//g, "](../../01-Engine/performance/");
  }

  // deeper nested gameplay system: ../../../philosophy was ../../philosophy before (from docs/gameplay/x)
  if (norm.includes("/02-Gameplay/") && norm.split("/02-Gameplay/")[1]?.includes("/")) {
    text = text
      .replace(/\]\(\.\.\/\.\.\/\.\.\/philosophy\//g, "](../../../00-Vision/philosophy/")
      .replace(/\]\(\.\.\/\.\.\/\.\.\/networking\//g, "](../../../04-Multiplayer/")
      .replace(/\]\(\.\.\/\.\.\/\.\.\/core\//g, "](../../../01-Engine/core/")
      .replace(/\]\(\.\.\/\.\.\/\.\.\/ui\//g, "](../../../06-UI/ui/")
      .replace(/\]\(\.\.\/\.\.\/\.\.\/lobby\//g, "](../../../06-UI/lobby/")
      .replace(/\]\(\.\.\/\.\.\/\.\.\/hub\//g, "](../../../05-Modding/hub/")
      .replace(/\]\(\.\.\/\.\.\/\.\.\/mapping\//g, "](../../../03-Maps/")
      .replace(/\]\(\.\.\/\.\.\/\.\.\/performance\//g, "](../../../01-Engine/performance/")
      .replace(/\]\(\.\.\/\.\.\/\.\.\/architecture\//g, "](../../../01-Engine/architecture/")
      .replace(/\]\(\.\.\/\.\.\/\.\.\/audio\//g, "](../../../01-Engine/audio/")
      .replace(/\]\(\.\.\/\.\.\/\.\.\/rfc\//g, "](../../../RFC/");
  }

  if (text !== orig) {
    fs.writeFileSync(file, text, "utf8");
    changed++;
    console.log("fixed", path.relative(ROOT, file));
  }
}
console.log("files changed:", changed);
