import connectDb from "@/db/connectDB";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(
   _request: Request,
   { params }: { params: Promise<{ username: string }> }
) {
   await connectDb();
   try {
      const { username } = await params;
      if (!username) {
         return NextResponse.json(
            { error: "Please Provide a username" },
            { status: 400 }
         );
      }

      const user = await User.findOne({ username });
      if (!user) {
         return NextResponse.json(
            {
               error: "User Not Found",
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
      console.log("Error Fetching user", error);
      return NextResponse.json(
         {
            error: "Something Went Wrong" + error,
         },
         { status: 500 }
      );
   }
}
