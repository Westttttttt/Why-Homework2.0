"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcAddImage } from "react-icons/fc";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const AskQuestions = () => {
   const [selectedCategory, setSelectedCategory] = useState("");
   const imageRef = useRef<HTMLInputElement | null>(null);

   return (
      <form className="w-full flex justify-center items-center">
         <div className="max-w-md flex flex-col items-center mt-24">
            <h1 className="text-xl font-semibold mt-3">Ask a question 🧠</h1>
            <div className="flex flex-col gap-2 w-full p-6">
               <Label>Question Title *</Label>
               <Input
                  type="text"
                  placeholder="e.g., How do I use async/await in JavaScript?"
                  className="text-sm placeholder:text-xs w-full bg-[#2d2c2c] border border-gray-800"
               />
            </div>
            <div className="flex flex-col gap-2 w-full p-6">
               <Label>Description(optional)</Label>
               <Textarea
                  placeholder="Explain your doubt or questions in details..."
                  className="placeholder:text-xs bg-[#2d2c2c] border border-gray-800"
               />
            </div>
            <div className="flex flex-col gap-2 w-full p-6">
               <Label>Category *</Label>
               <Select
                  onValueChange={(value) => setSelectedCategory(value)}
                  defaultValue=""
               >
                  <SelectTrigger className="w-[180px] bg-[#2d2c2c] border border-gray-800 text-sm">
                     <SelectValue placeholder="Select catrgory" />
                  </SelectTrigger>
                  <SelectContent className=" text-white bg-[#2d2c2c] border border-gray-800 text-sm">
                     <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="coding">Coding</SelectItem>
                        <SelectItem value="maths">Maths</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                     </SelectGroup>
                  </SelectContent>
               </Select>
            </div>
            {selectedCategory === "coding" && <div>Code selected</div>}
            <div
               className="flex flex-col gap-2 w-full p-6"
               onClick={() => imageRef.current?.click()}
            >
               <Label>Upload Image</Label>
               <div className="border border-dashed h-36 flex items-center justify-center rounded-md gap-2 flex-col">
                  <FcAddImage className="text-4xl" />
                  <p className="text-sm tracking-wide">Upload Your Doubt</p>
                  <Input type="file" hidden ref={imageRef} />
               </div>
            </div>
            <Button
               className="bg-green-500 hover:bg-green-600 text-xs"
               type="submit"
            >
               Upload Question
            </Button>
         </div>
      </form>
   );
};

export default AskQuestions;
