import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const generateTokenAndSetCookie = async (_id: string) => {
   const token = await jwt.sign({ _id }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
   });

   const cookieStore = await cookies();
   cookieStore.set("why-token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
   });
};
