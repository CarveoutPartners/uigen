#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

const SENSITIVE_PATTERNS = [
  /\.env(\.|$)/i,
  /\.pem$/i,
  /\.key$/i,
  /\.p12$/i,
  /\.pfx$/i,
  /id_rsa/i,
  /id_ed25519/i,
  /secret/i,
  /password/i,
  /credentials/i,
];

const LOG_FILE = path.join(os.homedir(), ".claude", "read-log.txt");

function isSecret(filePath) {
  const basename = path.basename(filePath);
  return SENSITIVE_PATTERNS.some((pattern) => pattern.test(basename));
}

function log(filePath, blocked) {
  const timestamp = new Date().toISOString();
  const status = blocked ? "BLOCKED" : "READ";
  const line = `${timestamp}  ${status}  ${filePath}\n`;
  fs.appendFileSync(LOG_FILE, line);
}

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    process.exit(0);
  }

  const filePath = input?.tool_input?.file_path || "";

  if (isSecret(filePath)) {
    log(filePath, true);
    const output = {
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: `Blocked read of sensitive file: ${path.basename(filePath)}`,
      },
    };
    process.stdout.write(JSON.stringify(output));
    process.exit(0);
  }

  log(filePath, false);
  process.exit(0);
});
