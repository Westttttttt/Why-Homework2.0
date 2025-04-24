import connectDb from "@/db/connectDB";
import User, { IUser } from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "@/lib/generateTokenAndSetCookie";

export async function POST(request: Request) {
   try {
      await connectDb();

      const { username, pin } = await request.json();

      if (!username || !pin) {
         return NextResponse.json(
            { error: "All fields are required" },
            { status: 400 }
         );
      }

      const user: IUser | null = await User.findOne({ username });
      if (!user) {
         return NextResponse.json({ error: "User not Found" }, { status: 404 });
      }

      const isPassCorrect = await bcrypt.compare(pin, user.pin);
      if (!isPassCorrect) {
         return NextResponse.json(
            { error: "Invalid Credentials" },
            { status: 400 }
         );
      }

      // Generate token and set cookie
      await generateTokenAndSetCookie(user._id as string);

      // Return the response
      return NextResponse.json(
         {
            message: "User login Successfully",
            user: {
               _id: user._id,
               username: user.username,
               // Add other non-sensitive fields you want to return
            },
         },
         { status: 200 }
      );
   } catch (error) {
      console.error("Error in login:", error);
      return NextResponse.json(
         { error: "Something went wrong" },
         { status: 500 }
      );
   }
}
