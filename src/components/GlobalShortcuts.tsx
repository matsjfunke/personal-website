"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export function GlobalShortcuts() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("GlobalShortcuts: Setting up keyboard listeners");
    setMounted(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      console.log("Key pressed:", {
        key: e.key,
        code: e.code,
        altKey: e.altKey,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        shiftKey: e.shiftKey,
        target: e.target,
      });

      // Check if Alt/Option key is pressed (and no other modifiers)
      if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        console.log("Alt key combination detected, code:", e.code);

        // Use the code property to get the physical key pressed
        const code = e.code;
        if (["KeyH", "KeyB", "KeyC", "KeyT"].includes(code)) {
          e.preventDefault();
          e.stopPropagation();

          switch (code) {
            case "KeyH":
              console.log("Navigating to home");
              router.push("/");
              break;
            case "KeyB":
              console.log("Navigating to books");
              router.push("/books");
              break;
            case "KeyC":
              console.log("Navigating to compendiums");
              router.push("/compendiums");
              break;
            case "KeyT":
              console.log("Navigating to thoughts");
              router.push("/thoughts");
              break;
          }
        }
      }
    };

    // Use capture phase to ensure we get the event before other handlers
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      console.log("GlobalShortcuts: Cleaning up keyboard listeners");
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [router]);

  // Temporary visual indicator to confirm component is mounted
  if (process.env.NODE_ENV === "development" && mounted) {
    return (
      <div className="fixed bottom-4 right-4 bg-green-500 text-white px-2 py-1 text-xs rounded z-50">
        Shortcuts Active
      </div>
    );
  }

  return null;
}
