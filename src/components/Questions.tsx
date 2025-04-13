import { questions } from "@/constants/constants";
import { Button } from "./ui/button";
import { CheckCheck, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const Questions = () => {
   return (
      <div className="w-full flex justify-center flex-col items-center gap-8 ">
         {questions.map((question) => (
            <div
               key={question.username}
               className="w-full p-4 flex flex-col gap-4 bg-[#1b1b1b] "
            >
               <section className="flex gap-2 items-center">
                  <img
                     src={question.profilePic}
                     alt="profilePic"
                     className="w-14 h-14 rounded-full cursor-pointer"
                  />
                  <p className="font-medium opacity-65">{question.username}</p>
                  <p className="mb-2 font-extrabold">.</p>
                  <p className="text-xs">{question.uploadedAt}</p>
               </section>
               <section className="space-y-4">
                  <p className="font-bold text-xl">{question.title}</p>
                  <Button
                     className={cn(
                        "text-[#4CC9F0] cursor-pointer border border-[#4CC9F0] bg-[#00c2fd1c] min-w-22",
                        question.tags === "math" &&
                           "bg-[#00ff551e] text-green-500 border-green-500",
                        question.tags === "other" &&
                           "bg-[#080cd51a] text-[#0671fc] border-[#0671fc]"
                     )}
                  >
                     {question.tags}
                  </Button>
                  <p className="text-sm text-wrap">
                     {question.questionDescription}
                  </p>
               </section>
               <section className="flex items-center gap-2 ">
                  <Button className="rounded-full w-20 cursor-pointer hover:opacity-70 border border-gray-600">
                     <MessageCircle />
                     {question.comment}
                  </Button>
                  <Button className="rounded-full w-16 cursor-pointer hover:opacity-70 border border-gray-600">
                     <CheckCheck /> {question.check}
                  </Button>
                  <Button className="bg-blue-500 rounded-full hover:bg-blue-600 cursor-pointer py-2">
                     Answer Question
                  </Button>
               </section>
            </div>
         ))}
      </div>
   );
};

export default Questions;
