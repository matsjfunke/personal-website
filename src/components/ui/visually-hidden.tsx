import * as React from "react";

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function VisuallyHidden({ children, ...props }: VisuallyHiddenProps) {
  return (
    <div
      {...props}
      style={{
        position: "absolute",
        border: 0,
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal",
        ...props.style,
      }}
    >
      {children}
    </div>
  );
}
