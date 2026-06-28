"use client";

import React from "react";
import SearchInput from "../common/SearchInput";

interface TableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  action?: React.ReactNode;
}

export default function TableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Cari data...",
  action,
}: TableToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
      <SearchInput
        value={searchValue}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        className="w-full sm:max-w-xs"
      />
      {action && <div className="flex items-center gap-2 w-full sm:w-auto justify-end">{action}</div>}
    </div>
  );
}
