"use client";

import { useEffect, useRef } from "react";

import { Command, Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  autoFocus?: boolean;
  commandKey?: string;
}

export function SearchBar({
  placeholder,
  value,
  onChange,
  className = "",
  autoFocus = false,
  commandKey = "K",
}: SearchBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle Cmd+F keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "f") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-focus when component mounts if autoFocus is true
  useEffect(() => {
    if (autoFocus && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
      <Input
        ref={searchInputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        className="pl-10 pr-16 bg-black/40 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:ring-white/20"
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-white/40 text-sm">
        <Command className="w-3 h-3" />
        <span className="text-xs">{commandKey}</span>
      </div>
    </div>
  );
}
