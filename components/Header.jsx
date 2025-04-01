"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";

import useUser from "@/hooks/useUser";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/config/Subabase_Client";
import Logo from "./Logo";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [user] = useUser();
  const pathname = usePathname();
  const { website } = useParams();
  const router = useRouter();

  const logOut = async () => {
    await supabase.auth.signOut();
    router.push("/signin");
  };

  if (user === "no user") return null;

  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    "/default-avatar.png";

  return (
    <div className="w-full border-b border-white/5 sticky top-0 bg-black z-50 bg-opacity-20 backdrop-blur-lg">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo */}
        <Link href={"/"} prefetch className="flex items-center space-x-2">
          <Logo size="sm" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          {pathname !== "/dashboard" && (
            <>
              <Link href={"/dashboard"} prefetch>
                <button className="flex items-center space-x-2 text-sm text-white/60 hover:text-white transition">
                  <span>Dashboard</span>
                  <ArrowRightIcon className="h-4 w-4 stroke-white/60 hover:stroke-white" />
                </button>
              </Link>

              <Dialog>
                <DialogTrigger className="text-sm text-white/60 hover:text-white transition">
                  Snippet
                </DialogTrigger>
                <DialogContent className="bg-black bg-opacity-10 backdrop-blur-md text-white min-h-[400px] border border-white/5">
                  <DialogHeader>
                    <DialogTitle className="py-6">
                      Add this snippet to your website
                    </DialogTitle>
                    <DialogDescription className="flex justify-center border border-white/5">
                      {/* Snippet component goes here */}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger className="text-white outline-none">
              <div className="flex space-x-2 items-center hover:opacity-75">
                <p className="text-sm">
                  {user?.user_metadata?.full_name?.split(" ")[0] || "Guest"}
                </p>
                <img
                  className="h-8 w-8 rounded-full"
                  src={avatarUrl}
                  alt={user?.user_metadata?.full_name || "User"}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#0a0a0a] border-white/5 text-white backdrop-blur-md">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/5" />
              <Link href="/settings" prefetch>
                <DropdownMenuItem className="text-white/60 hover:text-white transition cursor-pointer rounded-md">
                  API
                </DropdownMenuItem>
              </Link>
              <Link href="/settings" prefetch>
                <DropdownMenuItem className="text-white/60 hover:text-white transition cursor-pointer rounded-md">
                  Guide
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="bg-white/5" />
              <DropdownMenuItem
                onClick={logOut}
                className="text-white/60 hover:text-white transition cursor-pointer rounded-md"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white"
          >
            {mobileMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-black bg-opacity-90 backdrop-blur-md text-white">
          {pathname !== "/dashboard" && (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white/80"
              >
                Dashboard
              </Link>
              <Dialog>
                <DialogTrigger
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  Snippet
                </DialogTrigger>
                <DialogContent className="bg-black bg-opacity-10 backdrop-blur-md text-white min-h-[400px] border border-white/5">
                  <DialogHeader>
                    <DialogTitle className="py-6">
                      Add this snippet to your website
                    </DialogTitle>
                    <DialogDescription className="flex justify-center border border-white/5">
                      {/* Snippet component */}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </>
          )}
          <Link
            href="/settings"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-white/80"
          >
            API
          </Link>
          <Link
            href="/settings"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-white/80"
          >
            Guide
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              logOut();
            }}
            className="hover:text-white/80 text-left"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
