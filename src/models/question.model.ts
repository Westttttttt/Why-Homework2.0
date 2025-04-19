import mongoose, { Document, Schema, Types } from "mongoose";
import { IUser } from "./user.model";
import { IAnswer } from "./answer.model";

export interface IQuestions extends Document {
   title: string;
   description?: string;
   category: "coding" | "maths" | "others";
   answers: Types.ObjectId[] | IAnswer[];
   check: number;
   uploader: Types.ObjectId | IUser;
   uploadedAt: Date;
}

const questionSchema = new Schema<IQuestions>({
   title: {
      type: String,
      require: true,
   },
   description: {
      type: String,
   },
   category: {
      type: String,
      required: true,
   },
   answers: [
      {
         type: Types.ObjectId,
         ref: "Answer",
      },
   ],
   check: {
      type: Number,
      default: 0,
   },
   uploader: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
   },
   uploadedAt: {
      type: Date,
      default: Date.now,
   },
});

const Question =
   mongoose.models.Question ||
   mongoose.model<IQuestions>("Question", questionSchema);

export default Question;
