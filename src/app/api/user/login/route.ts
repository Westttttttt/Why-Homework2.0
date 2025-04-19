import connectDb from "@/db/connectDB";
import User, { IUser } from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "@/lib/generateTokenAndSetCookie";

type RequestBody = {
   username: string;
   pin: string;
};

export async function POST(request: Request) {
   connectDb();
   try {
      const body: RequestBody = await request.json();
      const { username, pin } = body;

      if (!username || !pin) {
         return NextResponse.json(
            {
               error: "All fields are required",
            },
            { status: 400 }
         );
      }

      const user = (await User.findOne({ username })) as IUser;
      if (!user) {
         return NextResponse.json(
            {
               error: "User not Found",
            },
            { status: 404 }
         );
      }

      const isPassCorrect = await bcrypt.compare(pin, user.pin);
      if (!isPassCorrect) {
         return NextResponse.json(
            { error: "Invalid Credentials" },
            { status: 400 }
         );
      }

      if (user && isPassCorrect) {
         await generateTokenAndSetCookie(user._id as string);
      }

      return NextResponse.json(
         {
            message: "User login Successfully",
            user,
         },
         { status: 200 }
      );
   } catch (error) {
      console.log("Error trying to logging");
      return NextResponse.json(
         {
            error: "Something went wrong" + error,
         },
         { status: 500 }
      );
   }
}
