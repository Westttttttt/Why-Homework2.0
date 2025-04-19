import connectDb from "@/db/connectDB";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET() {
   connectDb();
   try {
      const users = await User.find({});

      return NextResponse.json(
         {
            users,
         },
         { status: 200 }
      );
   } catch (error) {
      console.log("Error fetching users", error);
      return NextResponse.json(
         {
            error: "Something went wrong " + error,
         },
         { status: 500 }
      );
   }
}
