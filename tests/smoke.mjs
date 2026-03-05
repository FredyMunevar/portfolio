import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import path from "node:path";

const PORT = Number(process.env.PORT || 4010);
const BASE_URL = `http://127.0.0.1:${PORT}`;
const BOOT_TIMEOUT_MS = 120000;
const NEXT_BIN = path.resolve(process.cwd(), "node_modules/next/dist/bin/next");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function waitForServer() {
  const start = Date.now();

  while (Date.now() - start < BOOT_TIMEOUT_MS) {
    try {
      const response = await fetch(`${BASE_URL}/en`, { redirect: "manual" });
      if (response.status < 500) {
        return;
      }
    } catch {
      // Server still booting.
    }

    await delay(1000);
  }

  throw new Error("Timed out waiting for Next.js dev server.");
}

async function testRoute(pathname, expectedStatus = 200) {
  const response = await fetch(`${BASE_URL}${pathname}`, { redirect: "manual" });
  assert(
    response.status === expectedStatus,
    `Expected ${pathname} to return ${expectedStatus}, received ${response.status}.`,
  );
}

async function testLocaleRedirect() {
  const response = await fetch(`${BASE_URL}/projects`, { redirect: "manual" });
  assert(
    response.status === 307 || response.status === 308,
    `Expected /projects to redirect, received ${response.status}.`,
  );

  const location = response.headers.get("location") || "";
  assert(
    /^\/(en|es)\/projects$/.test(location),
    `Expected /projects redirect to locale path, received "${location}".`,
  );
}

async function testValidSnippet() {
  const response = await fetch(`${BASE_URL}/api/snippets?project=hola&filename=BookingCalendar.tsx`);
  assert(response.status === 200, `Expected valid snippet request to return 200, received ${response.status}.`);

  const payload = await response.json();
  assert(typeof payload?.code === "string", "Expected snippet payload to contain string code.");
  assert(payload.code.includes("BookingCalendar"), "Expected snippet payload to include BookingCalendar source.");
}

async function testRejectedSnippetTraversal() {
  const response = await fetch(
    `${BASE_URL}/api/snippets?project=hola&filename=..%2Fmillion%2FLeadListContainer.tsx`,
  );
  assert(response.status === 400, `Expected traversal request to return 400, received ${response.status}.`);
}

async function testRejectedSnippetProject() {
  const response = await fetch(`${BASE_URL}/api/snippets?project=unknown&filename=BookingCalendar.tsx`);
  assert(response.status === 400, `Expected unknown project request to return 400, received ${response.status}.`);
}

async function run() {
  const server = spawn(process.execPath, [NEXT_BIN, "dev", "-p", String(PORT)], {
    env: { ...process.env, NODE_OPTIONS: "" },
    stdio: "inherit",
  });

  const shutdown = () => {
    if (!server.killed) {
      server.kill("SIGTERM");
    }
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  try {
    await waitForServer();
    await testRoute("/en");
    await testRoute("/es");
    await testRoute("/en/projects/branch");
    await testLocaleRedirect();
    await testValidSnippet();
    await testRejectedSnippetTraversal();
    await testRejectedSnippetProject();
    console.log("Smoke tests passed.");
  } finally {
    shutdown();
    await delay(1500);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
