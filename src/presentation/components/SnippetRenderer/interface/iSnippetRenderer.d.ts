/**
 * Type definition for a code snippet
 */
type SnippetType = {
  /** Display name for the snippet tab */
  name: string;
  /** Programming language for syntax highlighting */
  language: string;
  /** Name of the file containing the snippet */
  filename: string;
};

/**
 * Props interface for the SnippetRenderer component
 * @interface ISnippetRenderer
 */
interface ISnippetRenderer {
  /** Array of code snippets to be displayed */
  snippets: SnippetType[];
  /** Project identifier for fetching snippets */
  project: string;
  /** Additional CSS classes for styling */
  style: string;
}

export type { SnippetType, ISnippetRenderer };
