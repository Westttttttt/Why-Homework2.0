import Questions from "@/components/Questions";
import SearchAndFilter from "@/components/SearchAndFilter";

export default function Home() {
   return (
      <div className="w-full min-h-[calc(100vh-4rem)]">
         <div className="w-fit h-fit pb-34">
            <SearchAndFilter />
         </div>
         <div className="w-full flex flex-col items-center p-3">
            <h1 className="font-semibold m-4 text-xl ">Recent Questions📌</h1>
            <Questions />
         </div>
      </div>
   );
}
