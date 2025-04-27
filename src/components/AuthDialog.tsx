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
import { IUser } from "@/models/user.model";
import { login, register } from "@/services/auth.services";
import { getCurrentAuthenticatedUser } from "@/services/user.services";
import { LoaderIcon } from "lucide-react";
import React, { SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
   isDialogOpen: boolean;
   setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
   authType: "Sign up" | "Login";
}

type AuthFormTypes = {
   username: string;
   pin: string;
};

export function AuthDialog({ isDialogOpen, setIsDialogOpen, authType }: Props) {
   const [formData, setFormData] = useState<AuthFormTypes>({
      username: "",
      pin: "",
   });

   const [confirmPin, setConfirmPin] = useState("");
   const [loading, setLoading] = useState(false);
   const [user, setUser] = useState<IUser | null>(null);

   useEffect(() => {
      const fetchUser = async () => {
         getCurrentAuthenticatedUser();
      };
      fetchUser();

      
   });

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [id]: value,
      }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.username || !formData.pin) {
         toast.error("All filelds are required");
         return;
      }

      if (formData.pin.length !== 4) {
         toast.error("Pin should be exactly 4 char long.");
         return;
      }

      if (authType === "Sign up" && formData.pin !== confirmPin) {
         toast.error("Pin and confirm pin should be same!.");
         return;
      }

      if (authType === "Sign up") {
         try {
            setLoading(true);
            const { data, status } = await register(formData);

            if (status === 201) {
               setLoading(false);
               toast.success("User created successfully!");
               setIsDialogOpen(false);
            } else {
               setLoading(false);
               toast.error(data.error);
            }
         } catch (error) {
            setLoading(false);
            toast.error("Something went wrong. Please try again." + error);
         }
      }

      if (authType === "Login") {
         try {
            setLoading(true);
            const { data, status } = await login(formData);

            if (status === 200) {
               setLoading(false);
               toast.success("User Login successfully!");
               setIsDialogOpen(false);
            } else {
               setLoading(false);
               toast.error(data.error);
            }
         } catch (error) {
            setLoading(false);
            toast.error("Something went wrong. Please try again." + error);
         }
      }
   };

   return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
         <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-gray-900 to-black text-white rounded-xl shadow-2xl border border-gray-700">
            <DialogHeader className="pb-2">
               <DialogTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  {authType}
               </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
               <div className="grid gap-5 py-6 px-4">
                  <div className="flex flex-col gap-2">
                     <Label
                        htmlFor="username"
                        className="text-sm font-medium text-gray-300"
                     >
                        Username
                     </Label>
                     <Input
                        id="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your username"
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <Label
                        htmlFor="pin"
                        className="text-sm font-medium text-gray-300"
                     >
                        Pin
                     </Label>
                     <Input
                        id="pin"
                        type="password"
                        value={formData.pin}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your 4-digit pin"
                        maxLength={4}
                     />
                  </div>
                  {authType === "Sign up" && (
                     <div className="flex flex-col gap-2">
                        <Label
                           htmlFor="confirmPin"
                           className="text-sm font-medium text-gray-300"
                        >
                           Confirm Pin
                        </Label>
                        <Input
                           id="confirmPin"
                           type="password"
                           value={confirmPin}
                           onChange={(e) => setConfirmPin(e.target.value)}
                           className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                           placeholder="Confirm your 4-digit pin"
                           maxLength={4}
                        />
                     </div>
                  )}
               </div>
               <DialogFooter className="px-4 pb-4">
                  <Button
                     type="submit"
                     className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg py-2 transition-all duration-200 transform hover:scale-105"
                     disabled={loading}
                  >
                     {loading ? (
                        <LoaderIcon className="animate-spin" />
                     ) : (
                        authType
                     )}
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
}
