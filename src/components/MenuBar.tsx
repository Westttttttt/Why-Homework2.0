"use client";
import {
   Sheet,
   SheetContent,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AlignJustify, CircleHelp, House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";

const MenuBar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const pathname = usePathname();

   const handleSelectMenu = () => {
      setIsOpen(false);
   };

   return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
         <SheetTrigger asChild>
            <AlignJustify aria-hidden />
         </SheetTrigger>
         <SheetContent className="bg-[#22212148] border-none text-white backdrop-blur-lg">
            <SheetTitle className="hidden">Menu Content</SheetTitle>
            <section className="flex flex-col items-center mt-20 gap-6 text-sm font-semibold">
               <Link
                  href={"/"}
                  onClick={handleSelectMenu}
                  className={cn(
                     "flex gap-2 items-center",
                     pathname === "/" && "text-green-500"
                  )}
               >
                  <House className="size-5" />
                  Home
               </Link>
               <Link
                  href={"/ask_questions"}
                  onClick={handleSelectMenu}
                  className={cn(
                     "flex gap-2 items-center",
                     pathname === "/ask_questions" && "text-green-500"
                  )}
               >
                  <CircleHelp className="size-5" />
                  Ask Questions
               </Link>
               <Link
                  href={"/West"}
                  onClick={handleSelectMenu}
                  className={cn(
                     "flex items-center gap-2",
                     pathname === "/West" && "text-green-500"
                  )}
               >
                  <CgProfile className="text-xl" />
                  Profile
               </Link>
            </section>
         </SheetContent>
      </Sheet>
   );
};

export default MenuBar;
