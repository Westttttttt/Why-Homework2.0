import Questions from "@/components/Questions";
import SearchAndFilter from "@/components/SearchAndFilter";

export default function Home() {
   return (
      <div className="w-full min-h-[calc(100vh-4rem)]">
         <SearchAndFilter />
         <div className="w-full">
            <h1 className="font-semibold m-4 text-2xl">Recent Questions</h1>
            <Questions />
         </div>
      </div>
   );
}
