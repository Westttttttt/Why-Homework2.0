import { getCurrentUser } from "@/lib/getCurrentUser";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const userId = await getCurrentUser();
      const user = await User.findById(userId);
      if (!user) {
         return NextResponse.json(
            {
               error: "User not found",
            },
            { status: 404 }
         );
      }

      return NextResponse.json(
         {
            user,
         },
         { status: 200 }
      );
   } catch (error) {
      console.log("Error Getting current User", error);
      return NextResponse.json(
         {
            user:null,
            error: error,
         },
         { status: 500 }
      );
   }
}
