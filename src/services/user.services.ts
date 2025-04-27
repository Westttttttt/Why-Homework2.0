import { IUser } from "@/models/user.model";

type TypeData = {
   user: IUser | null;
   error?: string;
};

export async function getCurrentAuthenticatedUser() {
   try {
      const res = await fetch("/api/user/getme");

      const data: TypeData = await res.json();

      return { data, status: res.status };
   } catch (error) {
      console.error("Error getting current User", error);
      throw error;
   }
}
