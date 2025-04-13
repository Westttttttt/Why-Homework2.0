import { Button } from "@/components/ui/button";
import { FaQuestion } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const MyProfile = async ({
   params,
}: {
   params: Promise<{ username: string }>;
}) => {
   const { username } = await params;
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
               <Button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-sm font-semibold rounded-lg py-3 shadow-md hover:shadow-lg transition-all duration-300"
                  aria-label="Questions asked"
               >
                  Asked: 3
               </Button>
               <Button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-sm font-semibold rounded-lg py-3 shadow-md hover:shadow-lg transition-all duration-300"
                  aria-label="Answers given"
               >
                  Given: 7
               </Button>
            </section>
         </div>
      </section>
   );
};

export default MyProfile;
