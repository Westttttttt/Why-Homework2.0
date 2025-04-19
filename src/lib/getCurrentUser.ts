import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getCurrentUser = async () => {
   try {
      const cookieStore = cookies();

      const token = (await cookieStore).get("why-token")?.value;
      if (!token) {
         return null;
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);

      return decodedToken;
   } catch (error) {
      console.error("Token verification failed:", error);
      return null;
   }
};
