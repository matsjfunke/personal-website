import { useEffect } from "react";

import { useRouter } from "next/navigation";

export function useGlobalShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if Alt/Option key is pressed (and no other modifiers)
      if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        // Use the code property to get the physical key pressed
        const code = e.code;
        if (["KeyH", "KeyB", "KeyC", "KeyT"].includes(code)) {
          e.preventDefault();
          e.stopPropagation();

          switch (code) {
            case "KeyH":
              router.push("/");
              break;
            case "KeyB":
              router.push("/books");
              break;
            case "KeyC":
              router.push("/compendiums");
              break;
            case "KeyT":
              router.push("/thoughts");
              break;
          }
        }
      }
    };

    // Use capture phase to ensure we get the event before other handlers
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [router]);
}
