import { useState } from "react";
import { Grid, Pagination, Stack } from "@mui/material";
import { useSnackbar } from "notistack";

import Empty from "src/components/empty";
import Loader from "src/components/loader/Loader";
import { useAuth, useData, useEventBus } from "src/hooks";
import { QuizService } from "src/services";

import QuizCard from "./QuizCard";

const Quizzes = () => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [params, setParams] = useState({
    page: 1,
    pageSize: 4,
    filters: [
      {
        key: "userId",
        operator: "=",
        value: user?.id
      }
    ]
  });

  const { data: quizzes, pagination, isLoading, mutate } = useData(
    user && user.id
      ? `/quizzes?page=${params.page}&pageSize=${
          params.pageSize
        }&sort=createdAt|desc&filters=${JSON.stringify(params.filters)}`
      : null
  );

  const { $emit } = useEventBus();

  const handleDeleteQuiz = quizId => {
    $emit("alert/open", {
      title: "Delete quiz",
      content: "Do you want to delete this quiz?",
      okText: "Delete",
      okCallback: () => {
        QuizService.delete(quizId)
          .then(() => {
            mutate("/quizzes");
          })
          .then(() => {
            enqueueSnackbar("Successfully!", { variant: "success" });
          })
          .catch(() => {
            enqueueSnackbar("Failed!", { variant: "error" });
          });
      }
    });
  };

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
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
      </Grid>
      {!isLoading && quizzes && quizzes.length === 0 && <Empty />}
      {isLoading && <Loader />}

      {!isLoading &&
        quizzes &&
        quizzes.length > 0 && (
          <Pagination
            color="primary"
            count={pagination?.total || 1}
            page={params.page}
            onChange={(_, newPage) =>
              setParams(prev => ({ ...prev, page: newPage }))
            }
          />
        )}
    </Stack>
  );
};

export default Quizzes;
