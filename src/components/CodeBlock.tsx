import { ReactElement, ReactNode } from "react";

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
  // Extract the code element and its props
  const element = children as ReactElement<CodeElementProps>;
  const codeElement = element?.props?.children;
  const className = element?.props?.className || "";
  let language = className.replace("language-", "") || "text";

  // Language mappings
  if (language === "sh") language = "bash";
  if (language === "ascii") language = "text";
  if (language === "toml") language = "ini";

  if (typeof codeElement === "string") {
    return (
      <div className="my-6">
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
