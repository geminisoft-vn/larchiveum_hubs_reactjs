import { configureStore } from "@reduxjs/toolkit";

import { questionSlice } from "./features/question/QuestionSlice";
import { quizSlice } from "./features/quiz/QuizSlice";

export default configureStore({
  reducer: {
    [quizSlice.reducerPath]: quizSlice.reducer,
    [questionSlice.reducerPath]: questionSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(quizSlice.middleware)
      .concat(questionSlice.middleware),
});
