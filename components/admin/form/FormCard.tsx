import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FormCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormCard({
  title,
  description,
  children,
  className = "",
}: FormCardProps) {
  return (
    <Card className={`overflow-hidden shadow-sm ${className}`}>
      <CardHeader className="border-b bg-muted/20 pb-4">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        {description && <CardDescription className="mt-1">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  );
}
