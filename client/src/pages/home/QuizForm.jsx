/* eslint-disable simple-import-sort/imports */
import React, { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { parseInt, pick } from "lodash";

import { useAuth, useData } from "src/hooks";
import { Questions } from "src/sections/@home/content/quiz";
import { OptionService, QuestionService, QuizService } from "src/services";

import useSWR from "swr";
import request from "src/utils/request";

const QuizFormPage = () => {
  const { t } = useTranslation();
  const { id: quizId } = useParams();
  const { user } = useAuth();

  const { data: quiz, mutate: mutateQuiz } = useSWR(
    quizId ? `/quizzes/${quizId}` : null,
    (url) => {
      return request.get(url).then((res) => res.data.data);
    }
  );
  const { data: questions, mutate: mutateQuestion } = useSWR(
    quiz
      ? `/questions?filters=${JSON.stringify([
          {
            key: "quizId",
            operator: "=",
            value: quiz.id,
          },
        ])}`
      : null,
    (url) => {
      return request.get(url).then((res) => {
        if (res.data.result === "ok") {
          // Because Field Array use id as default value so we
          // have to change to another keyname
          return res.data.data.map((item) => ({
            ...item,
            questionId: item.id,
            options: item.options.map((option) => ({
              ...option,
              optionId: option.id,
            })),
          }));
        }
      });
    }
  );

  const methods = useForm({
    defaultValues: {
      title: "",
      desc: "",
      questions: [],
    },
  });

  const loadDefaultValues = async () => {
    if (quiz) {
      let defaultValues = {};
      defaultValues.title = quiz.title;
      defaultValues.desc = quiz.desc;
      if (questions) {
        defaultValues.questions = questions;
      }
      methods.reset({ ...defaultValues });
    }
  };

  const handleSaveQuiz = methods.handleSubmit((data) => {
    if (quizId) {
      // edit
      const { dirtyFields } = methods.formState;
      const dataToUpdate = {};
      ["title", "desc"].forEach((item) => {
        if (dirtyFields[item]) {
          dataToUpdate[item] = data[item];
        }
      });
      if (dirtyFields.title || dirtyFields.desc) {
        QuizService.update(quizId, dataToUpdate).then(() => {
          mutateQuiz();
          mutateQuestion();
        });
      }
    } else {
      // create
      QuizService.create({
        ...pick(data, ["title", "desc"]),
        userId: user.id,
      });
    }
  });

  useEffect(
    () => {
      loadDefaultValues();
    },
    [quiz, questions]
  );

  return (
    <FormProvider {...methods}>
      <Stack direction="column" spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link to="/home/content?tab=0">
            <Button variant="contained" startIcon={<ArrowBackRoundedIcon />}>
              {t("BUTTON.back")}
            </Button>
          </Link>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {quizId ? "Edit" : "Create"} Quiz
          </Typography>

          <Button
            variant="contained"
            endIcon={<SaveRoundedIcon />}
            onClick={handleSaveQuiz}
          >
            {t("BUTTON.save")}
          </Button>
        </Stack>

        <Controller
          name="title"
          control={methods.control}
          render={({ field }) => {
            return (
              <TextField
                label="Title"
                InputLabelProps={{ shrink: true }}
                placeholder="Enter quiz's title"
                {...field}
              />
            );
          }}
        />

        <Controller
          name="desc"
          control={methods.control}
          render={({ field }) => {
            return (
              <TextField
                label="Description"
                InputLabelProps={{ shrink: true }}
                placeholder="Enter quiz's description"
                {...field}
              />
            );
          }}
        />

        <Questions
          quizId={quizId}
          defaultValues={methods.formState.defaultValues}
          mutateQuestion={mutateQuestion}
        />
      </Stack>
    </FormProvider>
  );
};

export default QuizFormPage;
