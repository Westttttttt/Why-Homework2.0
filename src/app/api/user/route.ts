import connectDb from "@/db/connectDB";
import User from "@/models/user.model";

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
         return new Response(
            JSON.stringify({ error: "All fields are required" }),
            { status: 400 }
         );
      }

      if (username.length < 4) {
         return new Response(
            JSON.stringify({
               error: "Username should be atleast 4 character long",
            }),
            { status: 400 }
         );
      }

      if (pin.length !== 4) {
         return new Response(
            JSON.stringify({ error: "Pin length should be exactly 4 digits" }),
            { status: 400 }
         );
      }

      const newUser = new User({
         username,
         pin,
         quote,
      });

      const savedUser = await newUser.save();

      return new Response(JSON.stringify({ savedUser }), {
         status: 201,
      });
   } catch (error: unknown) {
      console.log("Error Signing User", error);
      return new Response(JSON.stringify({ error: error }), { status: 500 });
   }
}
