import mongoose, { Schema, Types } from "mongoose";
import { IQuestions } from "./question.model";
import { IAnswer } from "./answer.model";

export interface IUser extends Document {
   username: string;
   pin: string;
   profilePic?: string;
   quote?: string;
   joinedAt: Date;
   questionAsked: Types.ObjectId[] | IQuestions[];
   answerGiven: Types.ObjectId[] | IAnswer[];
}

const userSchema = new Schema<IUser>({
   username: {
      type: String,
      required: true,
      minlength: 3,
   },
   pin: {
      type: String,
      required: true,
   },
   profilePic: {
      type: String,
   },
   quote: {
      type: String,
   },
   joinedAt: {
      type: Date,
      default: Date.now,
   },
   questionAsked: [
      {
         type: Types.ObjectId,
         ref: "Question",
      },
   ],
   answerGiven: [
      {
         type: Types.ObjectId,
         ref: "Answer",
      },
   ],
});

userSchema.pre("save", function (next) {
   if (!this.profilePic && this.username) {
      this.profilePic = `https://robohash.org/${this.username}`;
   }
   next();
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
