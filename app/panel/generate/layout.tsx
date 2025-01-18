import AntLayout from "@/components/AntDesign/AntLayout";
import { GenerateProvider } from "@/lib/providers/GenerateContextProvider";
import React from "react";

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AntLayout>
      <GenerateProvider>{children}</GenerateProvider>
    </AntLayout>
  );
}
