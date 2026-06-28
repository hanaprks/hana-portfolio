"use client";

import React from "react";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import {
  Bell,
  Search,
  Sun,
  Moon,
  LogOut,
  User as UserIcon,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileSidebar from "./MobileSidebar";

interface NavbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
  };
}

export default function Navbar({ user }: NavbarProps) {
  const { theme, setTheme } = useTheme();

  const getInitials = (name?: string | null) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-border bg-card/80 px-6 backdrop-blur transition-colors duration-200">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <MobileSidebar />

        {/* Global Search Bar */}
        <div className="relative hidden sm:block w-64 md:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
          <Input
            placeholder="Cari fitur..."
            className="pl-9 bg-background/50 border-border focus-visible:ring-primary focus-visible:ring-1"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-xl"
          title="Toggle Theme"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" />
        </Button>

        {/* Notifications Placeholder */}
        <Button variant="ghost" size="icon" className="relative rounded-xl">
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-card" />
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none text-foreground">
                  {user?.name || "Hana Prakasita"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || "admin@hana.dev"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="/admin/settings" className="flex items-center gap-2 cursor-pointer">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span>Pengaturan</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/admin/hero" className="flex items-center gap-2 cursor-pointer">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                <span>Profil Hero</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-2 text-red-500 focus:text-red-500 focus:bg-red-50/10 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
