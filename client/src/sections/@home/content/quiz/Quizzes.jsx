import { useState } from "react";
import { Grid, Stack } from "@mui/material";

import Empty from "src/components/empty";
import Loader from "src/components/loader/Loader";
import { useAuth, useData, useEventBus } from "src/hooks";
import { QuizService } from "src/services";

import QuizCard from "./QuizCard";

const Quizzes = () => {
  const { user } = useAuth();

  const [params, setParams] = useState({
    page: 1,
    pageSize: 4,
    filters: [
      {
        key: "user",
        operator: "=",
        value: user.id
      }
    ]
  });

  const { data: quizzes, isLoading, mutate } = useData(
    `/quizzes?page=${params.page}&pageSize=${
      params.pageSize
    }&sort=createdAt|desc&filters=${JSON.stringify(params.filters)}`
  );

  const { $emit } = useEventBus();

  const handleDeleteQuiz = quizId => {
    $emit("alert/open", {
      title: "Delete quiz",
      content: "Do you want to delete this quiz?",
      okText: "Delete",
      okCallback: () => {
        QuizService.delete(quizId).then(() => {
          mutate("/quizzes");
        });
      }
    });
  };
  return (
    <Stack>
      <Grid container spacing={1}>
        {!isLoading &&
          quizzes &&
          quizzes.length > 0 &&
          quizzes.map(quiz => {
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
