import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const generateTokenAndSetCookie = async (userId: string) => {
   try {
      // Generate JWT token
      const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
         expiresIn: "24h",
      });

      // Get the cookies instance
      const cookieStore = await cookies();
      
      // Set the cookie
      cookieStore.set({
         name: "why-token",
         value: token,
         httpOnly: true, // This should be true for security
         secure: process.env.NODE_ENV === "production", // True in production
         sameSite: "strict",
         maxAge: 24 * 60 * 60, // 24 hours in seconds
        path: "/" // Make sure cookie is available everywhere
      });

      return token;
   } catch (error) {
      console.error("Error generating token:", error);
      throw error;
   }
};