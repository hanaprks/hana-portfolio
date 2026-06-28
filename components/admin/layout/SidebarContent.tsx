"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  User,
  BadgeInfo,
  Code2,
  FolderKanban,
  Mail,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuGroups = [
  {
    label: "",
    items: [
      {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "CONTENT",
    items: [
      {
        title: "Hero",
        href: "/admin/hero",
        icon: User,
      },
      {
        title: "About",
        href: "/admin/about",
        icon: BadgeInfo,
      },
      {
        title: "Skills",
        href: "/admin/skills",
        icon: Code2,
      },
      {
        title: "Projects",
        href: "/admin/projects",
        icon: FolderKanban,
      },
      {
        title: "Contact",
        href: "/admin/contact",
        icon: Mail,
      },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

interface SidebarContentProps {
  isCollapsed?: boolean;
}

export default function SidebarContent({ isCollapsed = false }: SidebarContentProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-card border-r border-border py-6 px-4 justify-between transition-colors duration-200">
      <div className="space-y-6">
        {/* Logo / Title */}
        <div className={cn("flex items-center px-2", isCollapsed ? "justify-center" : "justify-start")}>
          <span className={cn("font-bold text-2xl tracking-tight text-foreground transition-all duration-300", isCollapsed && "scale-0 w-0")}>
            Hana CMS
          </span>
          {isCollapsed && (
            <span className="font-extrabold text-xl text-primary bg-primary/10 rounded-xl px-2.5 py-1">H</span>
          )}
        </div>

        {/* Menus */}
        <nav className="space-y-6">
          {menuGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-2">
              {!isCollapsed && group.label && (
                <span className="text-[10px] font-bold tracking-wider text-muted-foreground/75 uppercase px-3 block">
                  {group.label}
                </span>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-muted group relative",
                        isActive
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className={cn("h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110", isActive ? "" : "text-muted-foreground/80")} />
                      {!isCollapsed && (
                        <span className="transition-all duration-300">{item.title}</span>
                      )}
                      
                      {/* Tooltip on collapse */}
                      {isCollapsed && (
                        <div className="absolute left-16 scale-0 rounded bg-popover text-popover-foreground border px-2.5 py-1.5 text-xs font-semibold shadow-md group-hover:scale-100 transition-all duration-150 z-50 origin-left whitespace-nowrap">
                          {item.title}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Logout button */}
      <div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className={cn(
            "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-all duration-200 w-full text-left group relative",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5 shrink-0 text-red-500 group-hover:translate-x-0.5 transition-transform" />
          {!isCollapsed && <span>Logout</span>}

          {isCollapsed && (
            <div className="absolute left-16 scale-0 rounded bg-red-600 text-white px-2.5 py-1.5 text-xs font-semibold shadow-md group-hover:scale-100 transition-all duration-150 z-50 origin-left whitespace-nowrap">
              Logout
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
