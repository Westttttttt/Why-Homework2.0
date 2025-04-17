import mongoose from "mongoose";

const connectDb = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGODB_URI!);
      if (conn) {
         console.log("MongoDb Connected Successfully", conn.connection.host);
      } else {
         throw new Error("MongoDB Connection Failed");
      }
   } catch (error: unknown) {
      const errorMessage =
         error instanceof Error ? error.message : "Unknown Error";
      console.log(`Error: ${errorMessage}`);
      process.exit(1);
   }
};

export default connectDb;
