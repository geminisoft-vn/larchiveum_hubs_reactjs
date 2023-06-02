import * as React from "react";



import { Grid, Stack, Box, Typography } from "@mui/material";
import QuizCard from "./QuizCard";
import { useData, useEventBus } from "src/hooks";
import { QuizService } from "src/services";
import Loader from "src/components/loader/Loader";
import Empty from "src/components/empty";

const Quizzes = () => {
  const { data: quizzes, isLoading, mutate } = useData("/quizzes");

  const { $emit } = useEventBus();

  const handleDeleteQuiz = (quizId) => {
    $emit("alert/open", {
      title: "Delete quiz",
      content: "Do you want to delete this quiz?",
      okText: "Delete",
      okCallback: () => {
        QuizService.delete(quizId).finally(() => {
          mutate("/quizzes");
        });
      },
    });
  };
  return (
    <Stack>
      <Grid container spacing={1}>
        {!isLoading &&
          quizzes &&
          quizzes.length > 0 &&
          quizzes.map((quiz) => {
            return (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                handleDeleteQuiz={handleDeleteQuiz}
              />
            );
          })}
        {!isLoading && quizzes && quizzes.length === 0 && <Empty />}
        {isLoading && <Loader />}
      </Grid>
    </Stack>
  );
};

export default Quizzes;
