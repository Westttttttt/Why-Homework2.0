"use client";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { SetStateAction, useState } from "react";

interface Props {
   isDialogOpen: boolean;
   setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
   authType: "Sign up" | "Login";
}

type AuthFormTypes = {
   username: string | "";
   pin: string | "";
   confirmPin?: string | ""
};

export function AuthDialog({ isDialogOpen, setIsDialogOpen, authType }: Props) {
   const [formData, setFormData] = useState<AuthFormTypes>({
      username: "",
      pin: "",
      confirmPin: ""
   });

   return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
         {/* <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
         </DialogTrigger> */}
         <DialogContent className="sm:max-w-[425px] bg-black text-white">
            <DialogHeader>
               <DialogTitle>{authType}</DialogTitle>
               {/* <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
               </DialogDescription> */}
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                     Username
                  </Label>
                  <Input
                     id="username"
                     value={formData.username}
                     className="col-span-3 text-xs"
                     placeholder="Enter your username"
                  />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pin" className="text-right">
                     pin
                  </Label>
                  <Input
                     id="pin"
                     value={formData.pin}
                     className="col-span-3 placeholder:text-xs"
                     placeholder="Enter your 4 digit pin"
                  />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pin" className="text-right">
                     Confirm pin
                  </Label>
                  <Input
                     id="pin"
                     value={formData.pin}
                     className="col-span-3 placeholder:text-xs"
                     placeholder="Enter your 4 digit pin"
                  />
               </div>
            </div>
            <DialogFooter>
               <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {authType}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
