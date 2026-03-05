import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const ALLOWED_PROJECTS = new Set(["hola", "million", "weelo"]);
const SAFE_FILENAME = /^[A-Za-z0-9._-]+$/;
const SNIPPETS_ROOT = path.resolve(process.cwd(), "src/snippets");

/**
 * API route handler for fetching code snippets.
 * Reads snippet files from the filesystem and returns their content.
 *
 * @route GET /api/snippets
 * @param {Request} request - The incoming HTTP request
 * @query {string} project - Project identifier/folder name
 * @query {string} filename - Name of the snippet file to fetch
 *
 * @returns {Promise<NextResponse>} JSON response with code content or error
 *
 * @example
 * ```
 * // Success response
 * GET /api/snippets?project=myProject&filename=example.ts
 * {
 *   "code": "console.log('Hello World');"
 * }
 *
 * // Error response - Missing parameters
 * GET /api/snippets
 * {
 *   "error": "Missing parameters"
 * }
 *
 * // Error response - File not found
 * GET /api/snippets?project=invalid&filename=nonexistent.ts
 * {
 *   "error": "File not found"
 * }
 * ```
 */
export async function GET(request: Request) {
  // Get query parameters from URL
  const { searchParams } = new URL(request.url);
  const project = searchParams.get("project")?.trim();
  const filename = searchParams.get("filename")?.trim();

  // Validate required parameters
  if (!project || !filename) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  if (!ALLOWED_PROJECTS.has(project)) {
    return NextResponse.json({ error: "Invalid project" }, { status: 400 });
  }

  // Only allow direct filenames, never path segments.
  if (!SAFE_FILENAME.test(filename) || filename.includes("/") || filename.includes("\\")) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  try {
    // Read snippet file from filesystem
    const projectRoot = path.resolve(SNIPPETS_ROOT, project);
    const filePath = path.resolve(projectRoot, filename);

    // Ensure file path is still inside project root after resolution.
    if (!filePath.startsWith(`${projectRoot}${path.sep}`)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const content = await fs.promises.readFile(filePath, "utf-8");
    return NextResponse.json({ code: content });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
