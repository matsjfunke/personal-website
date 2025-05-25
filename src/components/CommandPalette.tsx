"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import * as Dialog from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import {
  ArrowRight,
  BookOpenText,
  Brain,
  Command,
  House,
  Search,
  StickyNote,
} from "lucide-react";

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
  const router = useRouter();

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

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const getItemClassName = (itemValue: string) => {
    const baseClasses =
      "relative flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm text-white outline-none transition-colors";
    const hoverClasses = hoveredItem === itemValue ? "bg-white/10" : "";
    const stateClasses = "data-[selected=true]:bg-white/10 focus:bg-white/10";
    return `${baseClasses} ${hoverClasses} ${stateClasses}`;
  };

  return (
    <>
      {/* Command Trigger */}
      <button
        onClick={() => setOpen(true)}
        className={`relative flex items-center w-full pl-10 pr-16 h-10 bg-black/40 border border-white/20 text-white placeholder:text-white/60 hover:border-white/40 focus:border-white/40 focus:ring-white/20 focus:ring-1 focus:outline-none rounded-md transition-colors ${className}`}
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
        <span className="text-sm text-white/60 truncate">{placeholder}</span>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-white/40 text-sm">
          <Command className="w-3 h-3" />
          <span className="text-xs">{commandKey}</span>
        </div>
      </button>

      {/* Command Dialog */}
      <CommandPrimitive.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command Menu"
        className="fixed inset-0 z-[99999]"
      >
        {/* Overlay that closes dialog when clicked */}
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />

        {/* Dialog content */}
        <div
          className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <CommandPrimitive
            className="mx-auto overflow-hidden rounded-lg border border-white/10 bg-black/90 shadow-2xl backdrop-blur-md"
            shouldFilter={true}
          >
            <VisuallyHidden>
              <Dialog.Title>Command Menu</Dialog.Title>
            </VisuallyHidden>

            {/* Search Input */}
            <div className="flex items-center border-b border-white/10 px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 text-white/60" />
              <CommandPrimitive.Input
                value={search}
                onValueChange={setSearch}
                placeholder="Search..."
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/60 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Command List */}
            <CommandPrimitive.List className="max-h-80 overflow-y-auto overflow-x-hidden p-2">
              <CommandPrimitive.Empty className="py-6 text-center text-sm text-white/60">
                No results found.
              </CommandPrimitive.Empty>

              <CommandPrimitive.Group className="mb-2">
                <div className="px-2 py-1.5 text-xs font-medium text-white/40 uppercase tracking-wider">
                  Navigation
                </div>

                <CommandPrimitive.Item
                  value="home"
                  className={getItemClassName("home")}
                  onSelect={() => runCommand(() => router.push("/"))}
                  onMouseEnter={() => setHoveredItem("home")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <House className="mr-2 h-4 w-4" />
                  <span>Home</span>
                  <ArrowRight className="ml-auto h-4 w-4 text-white/40" />
                </CommandPrimitive.Item>

                <CommandPrimitive.Item
                  value="compendiums"
                  className={getItemClassName("compendiums")}
                  onSelect={() => runCommand(() => router.push("/compendiums"))}
                  onMouseEnter={() => setHoveredItem("compendiums")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <StickyNote className="mr-2 h-4 w-4" />
                  <span>Compendiums</span>
                  <ArrowRight className="ml-auto h-4 w-4 text-white/40" />
                </CommandPrimitive.Item>

                <CommandPrimitive.Item
                  value="books"
                  className={getItemClassName("books")}
                  onSelect={() => runCommand(() => router.push("/books"))}
                  onMouseEnter={() => setHoveredItem("books")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <BookOpenText className="mr-2 h-4 w-4" />
                  <span>Books</span>
                  <ArrowRight className="ml-auto h-4 w-4 text-white/40" />
                </CommandPrimitive.Item>

                <CommandPrimitive.Item
                  value="thoughts"
                  className={getItemClassName("thoughts")}
                  onSelect={() => runCommand(() => router.push("/thoughts"))}
                  onMouseEnter={() => setHoveredItem("thoughts")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  <span>Thoughts</span>
                  <ArrowRight className="ml-auto h-4 w-4 text-white/40" />
                </CommandPrimitive.Item>
              </CommandPrimitive.Group>
            </CommandPrimitive.List>
          </CommandPrimitive>
        </div>
      </CommandPrimitive.Dialog>
    </>
  );
}
