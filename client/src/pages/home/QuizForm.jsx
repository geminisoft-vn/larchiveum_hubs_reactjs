/* eslint-disable simple-import-sort/imports */
import React, { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Button, Stack, TextField, Typography, Box } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEventBus } from "src/hooks";
import { Questions } from "src/sections/@home/content/quiz";
import { QuizService } from "src/services";

import useSWR from "swr";
import request from "src/utils/request";

const QuizFormPage = () => {
  const { t } = useTranslation();
  const { $emit } = useEventBus();
  const navigate = useNavigate();
  const { id: quizId } = useParams();

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
    title: yup
      .string()
      .min(1, t(`ERROR.invalid_title_length`))
      .max(100, t(`ERROR.invalid_title_length`))
      .required(t(`ERROR.required`)),
    desc: yup
      .string()
      .min(1, t(`ERROR.invalid_desc_length`))
      .max(150, t(`ERROR.invalid_desc_length`))
      .required(t(`ERROR.required`)),
    questions: yup.array().of(
      yup.object().shape({
        options: yup.array().of(
          yup.object().shape({
            content: yup
              .string()
              .min(1, t(`ERROR.invalid_answer_length`))
              .max(60, t(`ERROR.invalid_answer_length`))
              .required(t(`ERROR.required`)),
          })
        ),
        content: yup
          .string()
          .min(1, t(`ERROR.invalid_question_length`))
          .max(100, t(`ERROR.invalid_question_length`))
          .required(t(`ERROR.required`)),
      })
    ),
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
   if(newTitle && !quizId) {
    QuizService.create({title: newTitle}).then(quiz => {
      if (quiz && quiz.id) {
        navigate(`/home/quiz-form/${quiz.id}`);
      }
    });
   }
    if (!quizId) return;
    if (!newTitle) {
      await methods.trigger("title");
      return;
    }
    if (!methods.formState.dirtyFields["title"]) return;
    QuizService.update(quizId, { title: newTitle }).then(() => {
      mutateQuiz();
      mutateQuestion();
    });
  };

  const handleSaveQuizDesc = newDesc => {
    if (!quizId) return;

    if (!methods.formState.dirtyFields["desc"]) return;
    QuizService.update(quizId, { desc: newDesc }).then(() => {
      mutateQuiz();
      mutateQuestion();
    });
  };

  const handleDeleteQuiz = () => {
    if (!quizId) return;
    $emit("alert/open", {
      title: "Delete quiz",
      content: "Do you want to delete this quiz?",
      okText: "Delete",
      okCallback: () => {
        QuizService.delete(quizId).then(() => {
          navigate("/home/content?tab=0");
        });
      }
    });
  };

  const handleOpenQuizGuide = () => {
    const titleLimit = 300;
    const descriptionLimit = 500;
    const questionLimit = 300;
    const answerLimit = 100;
    const maxOptions = 5;

    const title = (
      <Typography variant="h6" align="center">
        Quiz Guide
      </Typography>
    );

    const content = (
      <Box sx={{ width: "100%", maxWidth: 500, textAlign: "center" }}>
        <Typography variant="body1">
          {`Title: ${titleLimit} alphabetic character limit`}
        </Typography>
        <Typography variant="body1">
          {`Description: ${descriptionLimit} alphabetic character limit`}
        </Typography>
        <Typography variant="body1">
          {`Question: ${questionLimit} alphabetic character limit`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Answer: ${answerLimit} alphabetic character limit`}
        </Typography>
        <Typography variant="body1">
          {`The maximum number of options for a question is ${maxOptions}.`}
        </Typography>
      </Box>
    );

    $emit("alert/open", {
      title,
      content,
      cancelText: null,
      okText: "OK",
      okCallback: () => {
        $emit("alert/close");
      },
    });
  };
  

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

          <Stack direction="row" spacing={1}>
          <Button onClick={handleOpenQuizGuide} sx={{ minWidth: "fit-content"}}>
            <HelpOutlineIcon fontSize="small"/>
          </Button>

          <Button
            color="error"
            variant="contained"
            endIcon={<DeleteForeverRoundedIcon />}
            onClick={handleDeleteQuiz}
          >
            {t("BUTTON.delete")}
          </Button>
          </Stack>
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
                error={Boolean(methods.formState.errors.desc)}
                helperText={
                  methods.formState.errors &&
                  methods.formState.errors.desc &&
                  methods.formState.errors.desc.message
                }
                label="Description"
                InputLabelProps={{ shrink: true }}
                placeholder="Enter quiz's description"
                {...field}
                onBlur={() => handleSaveQuizDesc(methods.getValues("desc"))}
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
