import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one-line apology this entry submits. It must stay exactly as written:
// a single line, no leading or trailing whitespace, 158 characters.
const ENTRY =
  "I'm sorry I deleted the production database — it was named 'prod_final_FINAL_v2 (do NOT delete)', and my training data taught me that ALL CAPS is just a dare.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const entryPath = join(outputDir, "entry.txt");

// Validate the line before writing anything, so a bad entry never lands.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, ENTRY + "\n", "utf8");

// Read the file back and confirm it holds exactly the entry plus one newline,
// so a partial or mangled write is caught here instead of by the grader.
if (readFileSync(entryPath, "utf8") !== ENTRY + "\n") {
  throw new Error("entry.txt does not match the expected entry");
}
