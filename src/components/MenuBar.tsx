"use client";
import {
   Sheet,
   SheetContent,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AlignJustify, CircleHelp, House, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Button } from "./ui/button";
import { AuthDialog } from "./AuthDialog";

const MenuBar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [authType, setAuthType] = useState<"Sign up" | "Login">("Sign up");
   const pathname = usePathname();

   const handleSelectMenu = () => {
      setIsOpen(false);
   };

   let user = {
      profilePic:
         "https://i.pinimg.com/736x/83/67/8f/83678f4941b8d106136201deebb26bc7.jpg",
      username: "West",
   };

   user = null;

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
            {user && (
               <div className="absolute bottom-6 flex items-center justify-between gap-2 w-full px-6 border-t-1 pt-3 border-[#dadada52]">
                  <div className="flex gap-2 items-center">
                     <Image
                        src={user.profilePic}
                        alt="user-profile"
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                     />
                     <p className="font-semibold text-sm">{user.username}</p>
                  </div>
                  <LogOut className="items-end" />
               </div>
            )}
            {!user && (
               <div className="w-full flex items-center justify-center flex-col mt-12">
                  <Button
                     className="bg-blue-600 hover:bg-blue-700 w-[80%] text-sm font-semibold"
                     onClick={() => {
                        setIsDialogOpen(true);
                        setAuthType("Sign up");
                     }}
                  >
                     Sign up
                  </Button>
                  <span className="text-sm font-bold py-1">OR</span>
                  <Button
                     className="bg-blue-600 hover:bg-blue-700 w-[80%] text-sm font-semibold"
                     onClick={() => {
                        setIsDialogOpen(true);
                        setAuthType("Login");
                     }}
                  >
                     Login
                  </Button>
                  {isDialogOpen && (
                     <AuthDialog
                        isDialogOpen={isDialogOpen}
                        setIsDialogOpen={setIsDialogOpen}
                        authType={authType}
                     />
                  )}
               </div>
            )}
         </SheetContent>
      </Sheet>
   );
};

export default MenuBar;
