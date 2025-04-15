import Link from "next/link";
import MenuBar from "./MenuBar";

const Navbar = () => {
   return (
      <nav className="w-full h-16 flex justify-between px-8 items-center bg-[#252525] fixed z-50">
         <Link href={"/"} className="font-semibold leading-4">
            Why <br />
            Homework
         </Link>
         <MenuBar />
      </nav>
   );
};

export default Navbar;
