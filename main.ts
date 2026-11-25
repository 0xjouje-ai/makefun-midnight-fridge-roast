// Midnight Fridge Roast — make.fun bounty entry.
// The program writes one line to /output/entry.txt: a roast of a smart
// fridge that refuses to open after midnight. The joke: the fridge locks
// itself at midnight, and the punchline turns the owner into the threat —
// the leftovers inside filed a restraining order against him. The midnight
// lock itself is the target, not generic smart-home grumbling.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "My fridge locks at midnight like my leftovers filed a restraining order against me.";

// The gate only accepts UTF-8 text of 1 to 200 characters, not only
// whitespace: refuse to write anything that would fail it. The contest
// wants exactly one line, so also reject leading/trailing whitespace
// (a stray space or newline would change the joke) and require the line
// to end with a period, matching the entry's one-sentence format.
if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  LINE.trim() === "" ||
  LINE.includes("\n") ||
  LINE !== LINE.trim() ||
  !LINE.endsWith(".")
) {
  throw new Error(`entry line fails the gate: ${LINE.length} characters`);
}

// Write the validated line to the output file. The gate check above
// guarantees the text is exactly one clean line, so this writer's only
// job is creating the directory and writing the bytes unchanged.
function writeEntry(line: string, outDir: string): void {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/entry.txt`, line, "utf8");
}

// MAKEFUN_OUTPUT_DIR exists only so local tests can point at a private
// temp dir; the grader runs with /output.
writeEntry(LINE, process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
