"use client";

import { Command, Search } from "lucide-react";

interface CommandTriggerProps {
  placeholder: string;
  className?: string;
  onClick: () => void;
  commandKey?: string;
}

export function CommandTrigger({
  placeholder,
  className = "",
  onClick,
  commandKey = "K",
}: CommandTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center w-full pl-10 pr-16 h-10 bg-black/40 border border-white/20 text-white placeholder:text-white/60 hover:border-white/40 focus:border-white/40 focus:ring-white/20 focus:ring-1 focus:outline-none rounded-md transition-colors ${className}`}
    >
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
      <span className="text-sm text-white/60 truncate">{placeholder}</span>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-white/40 text-sm">
        <Command className="w-3 h-3" />
        <span className="text-xs">{commandKey}</span>
      </div>
    </button>
  );
}
