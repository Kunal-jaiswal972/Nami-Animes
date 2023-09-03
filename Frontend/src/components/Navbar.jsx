import React from "react";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/themes/mode-toggle";
import { MobileSidebar } from "@/components/sidebar/MobileSidebar";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary mb-14">
      <div className="flex items-center">
        <MobileSidebar />
        <Link to="/">
          <h1
            className={cn(
              "block text-xl md:test-3xl font-bold text-primary",
              "font-['Poppins']"
            )}
          >
            nami-animes
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <Button size="sm" variant="premium">
          Upgrade
          <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
        </Button>
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
