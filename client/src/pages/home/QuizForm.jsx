/* eslint-disable simple-import-sort/imports */
import React, { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { Button, Stack, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth, useData } from "src/hooks";
import { Questions } from "src/sections/@home/content/quiz";
import { OptionService, QuestionService, QuizService } from "src/services";

import useSWR from "swr";
import request from "src/utils/request";
import { useSnackbar } from "notistack";

const QuizFormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id: quizId } = useParams();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const { data: quiz, mutate: mutateQuiz } = useSWR(
    quizId ? `/quizzes/${quizId}` : null,
    url => {
      return request.get(url).then(res => res.data.data);
    }
  );
  const { data: questions, mutate: mutateQuestion } = useSWR(
    quiz
      ? `/questions?filters=${JSON.stringify([
          {
            key: "quizId",
            operator: "=",
            value: quiz.id
          }
        ])}`
      : null,
    url => {
      return request.get(url).then(res => {
        if (res.data.result === "ok") {
          // Because Field Array use id as default value so we
          // have to change to another keyname
          return res.data.data.map(item => ({
            ...item,
            questionId: item.id,
            options: item.options.map(option => ({
              ...option,
              optionId: option.id
            }))
          }));
        }
      });
    }
  );

  const schema = yup.object().shape({
    title: yup.string().required(t(`ERROR.required`))
  });

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      desc: "",
      questions: []
    },
    resolver: yupResolver(schema)
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

  const handleSaveQuizTitle = async newTitle => {
    if (!quizId) return;
    if (!newTitle) {
      await methods.trigger("title");
      return;
    }
    if (!methods.formState.dirtyFields["title"]) return;
    QuizService.update(quizId, { title: newTitle })
      .then(() => {
        mutateQuiz();
        mutateQuestion();
      })
      .then(() => {
        enqueueSnackbar("Successfully!", { variant: "success" });
      })
      .catch(() => {
        enqueueSnackbar("Failed!", { variant: "error" });
      });
  };

  const handleSaveQuizDesc = () => {};

  const handleGoBack = () => {
    if (!methods.getValues("title")) {
      methods.trigger("title", { shouldFocus: true });
      return;
    }
    navigate("/home/content?tab=0");
  };

  useEffect(
    () => {
      loadDefaultValues();
    },
    [quiz, questions]
  );

  console.log(methods.formState.errors);

  return (
    <FormProvider {...methods}>
      <Stack direction="column" spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            variant="contained"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={handleGoBack}
          >
            {t("BUTTON.back")}
          </Button>

          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {quizId ? "Edit" : "Create"} Quiz
          </Typography>

          <Button variant="contained" endIcon={<SaveRoundedIcon />}>
            {t("BUTTON.save")}
          </Button>
        </Stack>

        <Controller
          name="title"
          control={methods.control}
          render={({ field }) => {
            return (
              <TextField
                error={Boolean(methods.formState.errors.title)}
                helperText={
                  methods.formState.errors &&
                  methods.formState.errors.title &&
                  methods.formState.errors.title.message
                }
                label="Title"
                InputLabelProps={{ shrink: true }}
                placeholder="Enter quiz's title"
                {...field}
                onBlur={() => handleSaveQuizTitle(methods.getValues("title"))}
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
