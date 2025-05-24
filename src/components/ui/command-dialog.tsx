"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import * as Dialog from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import {
  ArrowRight,
  BookOpenText,
  Brain,
  House,
  Search,
  StickyNote,
} from "lucide-react";

import { VisuallyHidden } from "./visually-hidden";

interface CommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandDialog({ open, onOpenChange }: CommandDialogProps) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  return (
    <CommandPrimitive.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Command Menu"
      className="fixed inset-0 z-[99999]"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2">
        <CommandPrimitive
          className="mx-auto overflow-hidden rounded-lg border border-white/10 bg-black/90 shadow-2xl backdrop-blur-md"
          shouldFilter={false}
        >
          <VisuallyHidden>
            <Dialog.Title>Command Menu</Dialog.Title>
          </VisuallyHidden>
          <div className="flex items-center border-b border-white/10 px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-white/60" />
            <CommandPrimitive.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/60 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandPrimitive.List className="max-h-80 overflow-y-auto overflow-x-hidden p-2">
            <CommandPrimitive.Empty className="py-6 text-center text-sm text-white/60">
              No results found.
            </CommandPrimitive.Empty>

            <CommandPrimitive.Group heading="Navigation" className="mb-2">
              <div className="px-2 py-1.5 text-xs font-medium text-white/40 uppercase tracking-wider">
                Navigation
              </div>

              <CommandPrimitive.Item
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2 text-sm text-white outline-none aria-selected:bg-white/10 aria-selected:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                onSelect={() => runCommand(() => router.push("/"))}
              >
                <House className="mr-2 h-4 w-4" />
                <span>Home</span>
                <ArrowRight className="ml-auto h-4 w-4 text-white/40" />
              </CommandPrimitive.Item>

              <CommandPrimitive.Item
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2 text-sm text-white outline-none aria-selected:bg-white/10 aria-selected:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                onSelect={() => runCommand(() => router.push("/compendiums"))}
              >
                <StickyNote className="mr-2 h-4 w-4" />
                <span>Compendiums</span>
                <ArrowRight className="ml-auto h-4 w-4 text-white/40" />
              </CommandPrimitive.Item>

              <CommandPrimitive.Item
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2 text-sm text-white outline-none aria-selected:bg-white/10 aria-selected:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                onSelect={() => runCommand(() => router.push("/books"))}
              >
                <BookOpenText className="mr-2 h-4 w-4" />
                <span>Books</span>
                <ArrowRight className="ml-auto h-4 w-4 text-white/40" />
              </CommandPrimitive.Item>

              <CommandPrimitive.Item
                className="relative flex cursor-default select-none items-center rounded-md px-2 py-2 text-sm text-white outline-none aria-selected:bg-white/10 aria-selected:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                onSelect={() => runCommand(() => router.push("/thoughts"))}
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
  );
}
