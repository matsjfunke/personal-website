"use client";

import { ReactElement, ReactNode } from "react";
import { useState } from "react";

import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeElementProps {
  children?: string;
  className?: string;
}

interface CodeBlockProps {
  children: ReactElement<CodeElementProps> | ReactNode;
  [key: string]: unknown;
}

export default function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract the code element and its props
  const element = children as ReactElement<CodeElementProps>;
  const codeElement = element?.props?.children;
  const className = element?.props?.className || "";
  let language = className.replace("language-", "") || "text";

  // Language mappings
  if (language === "sh") language = "bash";
  if (language === "ascii") language = "text";
  if (language === "toml") language = "ini";

  const handleCopy = async () => {
    if (typeof codeElement === "string") {
      try {
        await navigator.clipboard.writeText(codeElement);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  if (typeof codeElement === "string") {
    return (
      <div className="my-6 relative">
        <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-white/10 rounded text-xs text-white/70 font-mono">
          {language}
        </div>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors duration-200"
          title={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-white/60 hover:text-white" />
          )}
        </button>
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
            margin: 0,
            padding: "1rem",
            paddingTop: "3rem", // Add extra padding for the copy button
          }}
          codeTagProps={{
            style: {
              background: "transparent",
            },
          }}
          showLineNumbers={language !== "text"}
          lineNumberStyle={{
            color: "rgba(255, 255, 255, 0.3)",
            fontSize: "0.75rem",
            paddingRight: "1rem",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
            marginRight: "1rem",
          }}
          {...props}
        >
          {codeElement}
        </SyntaxHighlighter>
      </div>
    );
  }

  // Fallback for non-string content
  return (
    <pre
      className="bg-white/5 border border-white/20 rounded-lg p-4 my-6 overflow-x-auto"
      {...props}
    >
      {children}
    </pre>
  );
}
