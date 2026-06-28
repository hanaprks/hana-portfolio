"use client";

import React, { useTransition } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function SearchInput({
  placeholder = "Cari data...",
  value,
  onChange,
  className = "",
}: SearchInputProps) {
  const [, startTransition] = useTransition();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    startTransition(() => {
      onChange(val);
    });
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={handleSearch}
        placeholder={placeholder}
        className="pl-9 bg-background border-border w-full focus-visible:ring-primary focus-visible:ring-1"
      />
    </div>
  );
}
