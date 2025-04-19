import connectDb from "@/db/connectDB";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
   await connectDb();
   try {
      const cookieStore = await cookies();
      cookieStore.delete("why-token");

      return NextResponse.json(
         {
            message: "Logout Successfully",
         },
         { status: 200 }
      );
   } catch (error) {
      console.log("Error logout", error);
      return NextResponse.json(
         {
            error: "Something went wrong" + error,
         },
         { status: 500 }
      );
   }
}
