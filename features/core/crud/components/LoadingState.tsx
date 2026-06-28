import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface LoadingStateProps {
  rows?: number;
}

export function LoadingState({ rows = 4 }: LoadingStateProps) {
  return (
    <Card className="w-full border-border bg-card/60 backdrop-blur-md">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-1/3 rounded-lg" />
          <Skeleton className="h-4 w-1/2 rounded-lg" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-1/4 rounded-lg" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
          <Skeleton className="h-10 w-24 rounded-xl" />
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
}
