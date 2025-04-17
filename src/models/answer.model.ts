import mongoose, { Document, Schema, Types } from "mongoose";
import { IUser } from "./user.model";
import { IQuestions } from "./question.model";

export interface IAnswer extends Document {
   question: Types.ObjectId | IQuestions;
   text: string;
   image?: string;
   answerBy: Types.ObjectId | IUser;
   uploadedAt: Date;
}

const answerSchema = new Schema<IAnswer>({
   question: {
      type: Types.ObjectId,
      ref: "Question",
      required: true
   },
   text: {
      type: String,
      required: true,
   },
   image: {
      type: String,
   },
   answerBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
   },
   uploadedAt: {
      type: Date,
      default: Date.now,
   },
});

const Answer = mongoose.model<IAnswer>("Answer", answerSchema);
export default Answer;
