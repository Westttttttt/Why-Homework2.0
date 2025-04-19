import { getCurrentUser } from "@/lib/getCurrentUser";
import Question, { IQuestions } from "@/models/question.model";
import User, { IUser } from "@/models/user.model";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

type AskQuestionRequestBody = {
   title: string;
   description?: string;
   category: "coding" | "maths" | "others";
};

export async function POST(request: Request) {
   try {
      const userId = await getCurrentUser();

      if (!userId) {
         return NextResponse.json(
            {
               error: "Unauthorized, Please login first, Before asking ",
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

      const body: AskQuestionRequestBody = await request.json();
      const { title, description, category } = body;

      if (!title || !category) {
         return NextResponse.json(
            {
               error: "All fields are required",
            },
            { status: 400 }
         );
      }

      if (
         category !== "coding" &&
         category !== "maths" &&
         category !== "others"
      ) {
         return NextResponse.json(
            {
               error: "Category should be either coding, maths or others",
            },
            { status: 400 }
         );
      }

      const newQuestion: IQuestions = new Question({
         title,
         description,
         category,
         uploader: user._id as Types.ObjectId,
      });

      const savedQuestion = await newQuestion.save();
      if (savedQuestion) {
         await User.findByIdAndUpdate<IUser>(
            userId,
            {
               $push: {
                  questionAsked: savedQuestion._id as Types.ObjectId,
               },
            },
            { new: true }
         );
      }

      return NextResponse.json(
         {
            savedQuestion,
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
