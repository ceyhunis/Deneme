import { auth } from "@/auth";
import AntContent from "@/components/AntDesign/AntContent";
import AntLayout from "@/components/AntDesign/AntLayout";
import GeneralSider from "@/components/General/DashboardSider";
import { DrawerContextProvider } from "@/lib/providers/DrawerContextProvider";
import {
  Bell,
  Building,
  FileText,
  LayoutDashboard,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session?.user?.super_admin) {
    redirect("/admin");
  }

  const linkStyle = {
    fontSize: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const items = [
    {
      key: "dashboard",
      icon: <LayoutDashboard style={{ color: "black" }} />,
      label: (
        <Link style={linkStyle} href="/panel">
          Dashboard
        </Link>
      ),
      href: "/panel",
    },
    {
      key: "organization",
      icon: <Building style={{ color: "black" }} />,
      label: (
        <Link style={linkStyle} href="/panel/organization">
          Organization
        </Link>
      ),
      href: "/panel/organization",
    },
    {
      key: "rfx-generator",
      icon: <FileText style={{ color: "black" }} />,
      label: (
        <Link style={linkStyle} href="/panel/rfx">
          RFx Generator
        </Link>
      ),
      href: "/panel/rfx",
    },
    {
      key: "notifications",
      icon: <Bell style={{ color: "black" }} />,
      label: (
        <Link style={linkStyle} href="/panel/notifications">
          Notifications
        </Link>
      ),
      href: "/panel/notifications",
    },
    {
      key: "support",
      icon: <MessageSquare style={{ color: "black" }} />,
      label: (
        <Link style={linkStyle} href="/panel/support">
          Support
        </Link>
      ),
      href: "/panel/support",
    },
  ];

  return (
    <DrawerContextProvider>
      <AntLayout hasSider={true}>
        <GeneralSider home="/panel" items={items} />
        <AntContent>{children}</AntContent>
      </AntLayout>
    </DrawerContextProvider>
  );
}
