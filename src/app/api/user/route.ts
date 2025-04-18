import connectDb from "@/db/connectDB";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

type RequestBody = {
   username: string;
   pin: string;
   quote: string;
};

export async function POST(request: Request) {
   await connectDb();
   try {
      const body: RequestBody = await request.json();
      const { username, pin, quote } = body;

      if (!username || !pin) {
         return NextResponse.json(
            {
               error: "All fields are required",
            },
            { status: 400 }
         );
      }

      if (username.length < 4) {
         return NextResponse.json(
            {
               error: "Username should be atleast 4 character long",
            },
            { status: 400 }
         );
      }

      if (pin.length !== 4) {
         return NextResponse.json(
            {
               error: "Pin should be exactly 4 digits",
            },
            { status: 400 }
         );
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPin = await bcrypt.hash(pin, salt);

      const newUser = new User({
         username,
         pin: hashedPin,
         quote,
      });

      const savedUser = await newUser.save();

      return NextResponse.json(
         {
            user: savedUser,
         },
         { status: 201 }
      );
   } catch (error: unknown) {
      console.log("Error Signing User", error);
      return NextResponse.json(
         {
            error: error,
         },
         { status: 500 }
      );
   }
}
