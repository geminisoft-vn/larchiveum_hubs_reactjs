import { lazy } from "react";

const QuizPage = lazy(() => import("./Quiz"));
const DocumentPage = lazy(() => import("./Document"));

export { QuizPage, DocumentPage };
