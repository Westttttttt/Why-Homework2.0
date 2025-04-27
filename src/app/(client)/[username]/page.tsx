import { Button } from "@/components/ui/button";
import { profileQuestions } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { CheckCheck, MessageCircle } from "lucide-react";
import { MdVerified } from "react-icons/md";
import type { Metadata } from "next";
import { getCurrentAuthenticatedUser } from "@/services/user.services";

export const metadata: Metadata = {
   title: "Profile",
};


const MyProfile = async ({
   params,
}: {
   params: Promise<{ username: string }>;
}) => {
   const { username } = await params;
   const user = await getCurrentAuthenticatedUser();
   
   return (
      <section
         className="w-full min-h-screen flex flex-col items-center py-12 px-4"
         aria-labelledby="profile-heading"
      >
         <div className="w-full max-w-md flex flex-col items-center">
            {/* Profile Header */}
            <header className="flex flex-col items-center gap-4 mt-6">
               <img
                  src="https://i.pinimg.com/736x/83/67/8f/83678f4941b8d106136201deebb26bc7.jpg"
                  alt={`${username}'s profile picture`}
                  className="w-20 h-20 rounded-full border-2 border-[#334155] shadow-md object-cover"
               />
               <div className="flex items-center gap-2">
                  <h1
                     id="profile-heading"
                     className="text-xl md:text-2xl font-semibold text-white"
                  >
                     {username}
                  </h1>
                  <MdVerified className="text-xl text-blue-500" />
               </div>
            </header>

            {/* Bio/Quote */}
            <p className="text-sm text-gray-300 font-medium text-center mt-4 max-w-xs italic">
               &quot;The code you write makes you a developer. The bugs you fix
               make you a legend&quot;
            </p>

            {/* Stats Section */}
            <section className="flex items-center justify-center gap-6 mt-8 w-full">
               <p className="text-yellow-400 hover:text-yellow-500 font-bold tracking-wider">
                  Asked: 3
               </p>
               <p className="text-yellow-400 hover:text-yellow-500 font-bold tracking-wider">
                  Given: 7
               </p>
            </section>
            {/* User Questions */}

            <section className="w-full flex justify-center flex-col items-center gap-4 mt-12">
               <h1 className="font-bold">Question asked 📌</h1>
               {profileQuestions.map((question, idx) => (
                  <div
                     key={idx}
                     className="w-full p-4 flex flex-col gap-4 bg-[#1b1b1b] "
                  >
                     <section className="flex gap-2 items-center">
                        <img
                           src={question.profilePic}
                           alt="profilePic"
                           className="w-14 h-14 rounded-full cursor-pointer"
                        />
                        <p className="font-medium opacity-65">
                           {question.username}
                        </p>
                        <p className="mb-2 font-extrabold">.</p>
                        <p className="text-xs">{question.uploadedAt}</p>
                     </section>
                     <section className="space-y-4">
                        <p className="font-bold text-xl">{question.title}</p>
                        <Button
                           className={cn(
                              "text-[#4CC9F0] cursor-pointer border border-[#4CC9F0] bg-[#00c2fd1c] min-w-22",
                              question.tags === "maths" &&
                                 "bg-[#00ff551e] text-green-500 border-green-500",
                              question.tags === "others" &&
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
                        <Button className="bg-blue-600 rounded-full hover:bg-blue-700 cursor-pointer py-2">
                           Answer Question
                        </Button>
                     </section>
                  </div>
               ))}
            </section>
         </div>
      </section>
   );
};

export default MyProfile;
