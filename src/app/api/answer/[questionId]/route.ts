import connectDb from "@/db/connectDB";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Answer, { IAnswer } from "@/models/answer.model";
import Question, { IQuestions } from "@/models/question.model";
import User, { IUser } from "@/models/user.model";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

type GiveAnswerRequestBody = {
   text: string;
   image?: string;
   questionId: string | Types.ObjectId;
};

export async function POST(request: Request) {
   await connectDb();
   try {
      const userId = await getCurrentUser();
      console.log("userId is ==== ", userId);

      if (!userId) {
         return NextResponse.json(
            {
               error: "Unauthorized, Please login first, Before giving answer ",
            },
            { status: 401 }
         );
      }

      const user: IUser | null = await User.findById(userId);
      if (!user) {
         return NextResponse.json(
            {
               error: "User not found, please signin first",
            },
            { status: 404 }
         );
      }

      const body: GiveAnswerRequestBody = await request.json();

      // const { questionId } = await params;
      const { text, image, questionId } = body;
      console.log(questionId);

      const isQuestionExists = await Question.findById(questionId);
      if (!isQuestionExists) {
         return NextResponse.json(
            {
               error: "Question doesn't exists, check again",
            },
            { status: 404 }
         );
      }

      if (!text) {
         return NextResponse.json(
            {
               error: "Please Provide the required fields",
            },
            { status: 400 }
         );
      }

      const newAnswer: IAnswer = new Answer({
         question: questionId as Types.ObjectId,
         text,
         image,
         answerBy: user._id,
      });

      const postedAns = await newAnswer.save();

      if (postedAns) {
         await Question.findByIdAndUpdate<IQuestions>(questionId, {
            $push: {
               answer: postedAns._id as Types.ObjectId,
            },
         });
      }
      return NextResponse.json(
         {
            ans: postedAns,
         },
         { status: 201 }
      );
   } catch (error) {
      console.log("Error asking Question", error);
      return NextResponse.json(
         {
            error: "Something went wrong" + error,
         },
         { status: 500 }
      );
   }
}
