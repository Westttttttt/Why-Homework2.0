import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getCurrentUser = async () => {
   try {
      const cookieStore = await cookies();
      const token = cookieStore.get("why-token");

      if (!token) return null;

      const decoded = jwt.verify(token.value, process.env.JWT_SECRET!) as {
         userId: string;
      };

      // Make sure userId exists and is a valid string
      if (!decoded || !decoded.userId) {
         return null;
      }

      return decoded.userId;
   } catch (error) {
      // Handle JWT verification errors
      console.error("Error verifying token:", error);
      return null;
   }
};