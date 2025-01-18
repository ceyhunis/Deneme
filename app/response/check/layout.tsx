'use client';

import { GenerateProvider } from "@/lib/providers/GenerateContextProvider";

export default function CheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GenerateProvider>
      {children}
    </GenerateProvider>
  );
} 