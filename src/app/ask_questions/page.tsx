import AskQuestionForm from "@/components/AskQuestionForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "As Question",
};

const AskQuestions = () => {
   return <AskQuestionForm />;
};

export default AskQuestions;
