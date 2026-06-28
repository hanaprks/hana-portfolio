import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans select-none antialiased p-6 md:p-12 space-y-12">
      
      {/* Top Navbar Skeleton */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-4 border-b border-border/20 shrink-0">
        <Skeleton className="h-6 w-24 rounded-lg" />
        <div className="hidden md:flex gap-6">
          <Skeleton className="h-4 w-12 rounded" />
          <Skeleton className="h-4 w-12 rounded" />
          <Skeleton className="h-4 w-12 rounded" />
          <Skeleton className="h-4 w-12 rounded" />
        </div>
        <Skeleton className="h-8 w-20 rounded-xl" />
      </div>

      {/* Main Content Area Skeletons */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 flex-1 items-start">
        
        {/* Left Column Skeletons */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex gap-3">
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-14 w-full rounded-xl" />
            <Skeleton className="h-14 w-3/4 rounded-xl" />
          </div>
          <Skeleton className="h-20 w-full rounded-xl" />
          
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-10 w-32 rounded-xl" />
            <Skeleton className="h-10 w-28 rounded-xl" />
          </div>
        </div>

        {/* Right Column Skeletons */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <Skeleton className="w-full max-w-[340px] aspect-[3/4] rounded-[32px]" />
        </div>

      </div>

    </div>
  );
}
