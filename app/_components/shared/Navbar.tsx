"use client"

import { Button } from "@/components/ui/button";
import { FC } from "react";
import ThemeToggle from "./ThemeToggle";
import { useConvexAuth } from "convex/react";
import { Loader2 } from "lucide-react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";

const Navbar: FC = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div
      className={
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full px-6 py-4 "
      }
    >
        <h2 className="prose prose-h2: font-bold text-xl">My Notion</h2>
        <div
        className="md:ml-auto md:justify-end flex justify-between
       items-center md:w-fit w-full gap-x-2"
      >
        {isLoading && <Loader2 className="animate-spin w-8 h-8" />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton>
              <Button variant={"secondary"} size={"sm"}>
                Log In
              </Button>
            </SignInButton>
            <SignInButton>
              <Button size={"sm"}>Get Free Trial</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant={"ghost"} size={"sm"}>
              <Link href="/documents">Enter MyNotion</Link>
            </Button>
            <UserButton afterSwitchSessionUrl="/" />
          </>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
