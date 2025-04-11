import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

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
  const project = searchParams.get("project");
  const filename = searchParams.get("filename");

  // Validate required parameters
  if (!project || !filename) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    // Read snippet file from filesystem
    const filePath = path.join(process.cwd(), "src/snippets", project, filename);
    const content = fs.readFileSync(filePath, "utf-8");
    return NextResponse.json({ code: content });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
