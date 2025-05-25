"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import * as Dialog from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import {
  ArrowDown,
  ArrowUp,
  BookOpenText,
  Brain,
  Command,
  CornerDownLeft,
  FileText,
  House,
  Option,
  Search,
  StickyNote,
} from "lucide-react";

import {
  SearchableItem,
  getAllSearchableContent,
} from "@/data/searchableContent";
import { getTypeLabel, searchContent } from "@/lib/search";

import { VisuallyHidden } from "./ui/visually-hidden";

interface CommandPaletteProps {
  placeholder?: string;
  className?: string;
  commandKey?: string;
}

export function CommandPalette({
  placeholder = "Search...",
  className = "",
  commandKey = "K",
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);
  const router = useRouter();

  // Memoize all searchable content to prevent re-creation on every render
  const allContent = useMemo(() => getAllSearchableContent(), []);

  // Handle Cmd+K keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  // Search through content when search value changes
  useEffect(() => {
    if (search.trim()) {
      const results = searchContent(allContent, search);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [search, allContent]); // Include allContent to satisfy ESLint

  const runCommand = (command: () => void) => {
    setOpen(false);
    setSearch(""); // Clear search when closing
    command();
  };

  const getItemClassName = (itemValue: string) => {
    const baseClasses =
      "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-3 text-sm outline-none transition-colors";
    const hoverClasses = hoveredItem === itemValue ? "bg-neutral-700/30" : "";
    const stateClasses =
      "data-[selected=true]:bg-neutral-700/30 focus:bg-neutral-700/30 hover:bg-neutral-700/30";
    return `${baseClasses} ${hoverClasses} ${stateClasses}`;
  };

  const getTypeIcon = (type: SearchableItem["type"]) => {
    switch (type) {
      case "page":
        return <FileText className="mr-3 h-4 w-4 text-neutral-400" />;
      case "book":
        return <BookOpenText className="mr-3 h-4 w-4 text-neutral-400" />;
      case "compendium":
        return <StickyNote className="mr-3 h-4 w-4 text-neutral-400" />;
      default:
        return <FileText className="mr-3 h-4 w-4 text-neutral-400" />;
    }
  };

  return (
    <>
      {/* Command Trigger */}
      <button
        onClick={() => setOpen(true)}
        className={`relative flex items-center w-full pl-10 pr-16 h-10 bg-black/60 border border-neutral-700/40 text-neutral-300 placeholder:text-neutral-500 hover:border-neutral-600 focus:border-neutral-500 focus:ring-neutral-500/20 focus:ring-1 focus:outline-none rounded-lg transition-colors ${className}`}
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4" />
        <span className="text-sm text-neutral-500 truncate">{placeholder}</span>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-neutral-500 text-sm">
          <Command className="w-3 h-3" />
          <span className="text-xs">{commandKey}</span>
        </div>
      </button>

      {/* Command Dialog */}
      <CommandPrimitive.Dialog
        open={open}
        onOpenChange={(newOpen) => {
          setOpen(newOpen);
          if (!newOpen) {
            setSearch(""); // Clear search when closing
            setHoveredItem(null);
          }
        }}
        label="Command Menu"
        className="fixed inset-0 z-[99999]"
      >
        {/* Overlay that closes dialog when clicked */}
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        {/* Dialog content */}
        <div
          className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <CommandPrimitive
            className="mx-auto overflow-hidden rounded-xl border border-neutral-700/40 bg-black/80 backdrop-blur-md shadow-2xl"
            shouldFilter={false} // We handle filtering manually
          >
            <VisuallyHidden>
              <Dialog.Title>Command Menu</Dialog.Title>
              <Dialog.Description>
                Search through pages and navigate quickly using keyboard
                shortcuts.
              </Dialog.Description>
            </VisuallyHidden>

            {/* Search Input */}
            <div className="flex items-center border-b border-neutral-700/30 px-4 py-3">
              <Search className="mr-3 h-4 w-4 shrink-0 text-neutral-500" />
              <CommandPrimitive.Input
                value={search}
                onValueChange={setSearch}
                placeholder="Search..."
                className="flex h-6 w-full rounded-md bg-transparent text-sm text-neutral-200 outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Command List */}
            <CommandPrimitive.List className="max-h-96 overflow-y-auto overflow-x-hidden p-2">
              <CommandPrimitive.Empty className="py-8 text-center text-sm text-neutral-500">
                {search.trim()
                  ? "No results found."
                  : "Type to search or use navigation below."}
              </CommandPrimitive.Empty>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <CommandPrimitive.Group className="mb-4">
                  <div className="px-3 py-2 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Search Results
                  </div>

                  {searchResults.slice(0, 3).map((item) => (
                    <CommandPrimitive.Item
                      key={item.id}
                      value={item.id}
                      className={getItemClassName(item.id)}
                      onSelect={() => runCommand(() => router.push(item.url))}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {getTypeIcon(item.type)}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate text-neutral-200">
                          {item.title}
                        </div>
                        <div className="text-xs text-neutral-500 truncate">
                          {item.description}
                        </div>
                      </div>
                      <div className="ml-3 text-xs text-neutral-500 bg-neutral-800/50 px-2 py-1 rounded">
                        {getTypeLabel(item.type)}
                      </div>
                    </CommandPrimitive.Item>
                  ))}
                </CommandPrimitive.Group>
              )}

              {/* Navigation - always show */}
              <CommandPrimitive.Group className="mb-2">
                <div className="px-3 py-2 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Navigation
                </div>

                <CommandPrimitive.Item
                  value="home"
                  className={getItemClassName("home")}
                  onSelect={() => runCommand(() => router.push("/"))}
                  onMouseEnter={() => setHoveredItem("home")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <House className="mr-3 h-4 w-4 text-neutral-400" />
                  <span className="text-neutral-200">Home</span>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="text-xs text-neutral-500 bg-neutral-800/50 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Option className="w-3 h-3" />
                      <span>H</span>
                    </div>
                    <span className="text-xs text-neutral-500">Page</span>
                  </div>
                </CommandPrimitive.Item>

                <CommandPrimitive.Item
                  value="compendiums"
                  className={getItemClassName("compendiums")}
                  onSelect={() => runCommand(() => router.push("/compendiums"))}
                  onMouseEnter={() => setHoveredItem("compendiums")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <StickyNote className="mr-3 h-4 w-4 text-neutral-400" />
                  <span className="text-neutral-200">Compendiums</span>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="text-xs text-neutral-500 bg-neutral-800/50 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Option className="w-3 h-3" />
                      <span>C</span>
                    </div>
                    <span className="text-xs text-neutral-500">Page</span>
                  </div>
                </CommandPrimitive.Item>

                <CommandPrimitive.Item
                  value="books"
                  className={getItemClassName("books")}
                  onSelect={() => runCommand(() => router.push("/books"))}
                  onMouseEnter={() => setHoveredItem("books")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <BookOpenText className="mr-3 h-4 w-4 text-neutral-400" />
                  <span className="text-neutral-200">Books</span>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="text-xs text-neutral-500 bg-neutral-800/50 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Option className="w-3 h-3" />
                      <span>B</span>
                    </div>
                    <span className="text-xs text-neutral-500">Page</span>
                  </div>
                </CommandPrimitive.Item>

                <CommandPrimitive.Item
                  value="thoughts"
                  className={getItemClassName("thoughts")}
                  onSelect={() => runCommand(() => router.push("/thoughts"))}
                  onMouseEnter={() => setHoveredItem("thoughts")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Brain className="mr-3 h-4 w-4 text-neutral-400" />
                  <span className="text-neutral-200">Thoughts</span>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="text-xs text-neutral-500 bg-neutral-800/50 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Option className="w-3 h-3" />
                      <span>T</span>
                    </div>
                    <span className="text-xs text-neutral-500">Page</span>
                  </div>
                </CommandPrimitive.Item>
              </CommandPrimitive.Group>
            </CommandPrimitive.List>

            <div className="flex items-center justify-between border-t border-neutral-700/30 px-4 py-3 bg-neutral-900/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <span>Open Page</span>
                  <CornerDownLeft className="h-3 w-3" />
                </div>
                <div className="h-4 w-px bg-neutral-700/50"></div>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <span>Close</span>
                  <span className="text-xs text-neutral-500">ESC</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span>Navigate</span>
                <div className="flex items-center gap-1">
                  <ArrowUp className="h-3 w-3" />
                  <ArrowDown className="h-3 w-3" />
                </div>
              </div>
            </div>
          </CommandPrimitive>
        </div>
      </CommandPrimitive.Dialog>
    </>
  );
}
