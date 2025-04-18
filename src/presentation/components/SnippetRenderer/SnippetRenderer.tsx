import React, { useState, useEffect } from "react";
import { dracula, tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import "@/presentation/styles/globals.css";
import { useTheme } from "@/context/ThemeContext";
import { ISnippetRenderer } from "./interface/iSnippetRenderer";

/**
 * SnippetRenderer component that displays code snippets with syntax highlighting.
 * Features tabbed navigation, theme-aware styling, and loading states.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<{name: string, filename: string, language: string}>} props.snippets - Array of code snippets to display
 * @param {string} props.project - Project identifier for fetching snippets
 * @param {string} props.style - Additional CSS classes for styling
 *
 * @description
 * Features:
 * - Syntax highlighting with dark/light themes
 * - Tabbed navigation between multiple snippets
 * - Async loading of snippet content
 * - Loading state indication
 * - Line numbers
 * - Word wrap support
 * - Responsive layout
 */
const SnippetRenderer = ({ snippets, project, style }: ISnippetRenderer) => {
  const [activeTab, setActiveTab] = useState(0);
  const [snippetContent, setSnippetContent] = useState<string>("");

  /** Theme context for dark/light mode */
  const { theme } = useTheme();

  /** Flag to check if dark theme is active */
  const isDarkTheme = theme === "dark";

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const response = await fetch(`/api/snippets?project=${project}&filename=${snippets[activeTab].filename}`);
        const data = await response.json();
        setSnippetContent(data.code);
      } catch (error) {
        console.error("Error fetching snippet:", error);
      }
    };

    fetchSnippet();
  }, [activeTab, project, snippets]);

  return (
    <div className={`outline outline-border-light -outline-offset-1 w-full`}>
      <div className="flex outline outline-border-light -outline-offset-1 flex-wrap">
        {snippets.map((snippet, index) => (
          <button
            key={index}
            className={`w-full px-4 py-2 py-s px-m md:w-max outline outline-border-light -outline-offset-1
                ${
                  isDarkTheme
                    ? activeTab === index
                      ? "bg-gray text-tertiary"
                      : "bg-black text-gray-light"
                    : activeTab === index
                    ? "bg-border-light"
                    : "bg-gray-light"
                }`}
            onClick={() => setActiveTab(index)}
          >
            {snippet.name}
          </button>
        ))}
      </div>
      <div className={`w-full !relative ${style}`}>
        <SyntaxHighlighter
          language={snippets[activeTab].language}
          style={isDarkTheme ? dracula : tomorrow}
          showLineNumbers={true}
          wrapLines={true}
          showInlineLineNumbers={true}
          customStyle={{
            height: "100%",
            width: "100%",
            margin: 0,
            overflow: "auto",
            padding: "0.5rem",
          }}
          CodeTag={({ children, ...props }) => (
            <code {...props} style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {children}
            </code>
          )}
        >
          {snippetContent}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default SnippetRenderer;
