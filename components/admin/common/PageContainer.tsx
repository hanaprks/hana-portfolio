import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={`space-y-6 max-w-7xl mx-auto w-full pb-10 ${className}`}>
      {children}
    </div>
  );
}
