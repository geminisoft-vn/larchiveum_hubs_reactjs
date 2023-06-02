import React, { useEffect, useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { parseInt, pick } from "lodash";

import { Questions } from "src/sections/@home/content/quiz";
import { OptionService, QuestionService, QuizService } from "src/services";

const QuizFormPage = () => {
  const { t } = useTranslation();
  const { id: quizId } = useParams();

  console.log({ quizId });
  const methods = useForm({});

  const loadDefaultValues = async () => {
    if (quizId) {
      const quiz = await QuizService.getOne(quizId);
      let defaultValues = {};
      defaultValues.title = quiz.title;
      defaultValues.desc = quiz.desc;
      defaultValues.questions = quiz.questions;
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
        QuizService.update(quizId, dataToUpdate);
      }
      if (dirtyFields.questions) {
        Promise.all(
          data.questions.map((question) =>
            QuestionService.update(question.id, {
              content: question.content,
              type: question.type,
            })
          )
        );
      }
      if (dirtyFields.questions?.some((obj) => obj.options)) {
        Promise.all(
          data.questions.map((question) =>
            question.options.map((option) => {
              return OptionService.update(option.id, {
                content: option.content,
                isCorrect: option.isCorrect,
              });
            })
          )
        );
      }
    } else {
      // create
      QuizService.create(pick(data, ["title", "desc"])).then((newQuiz) => {
        const { id } = newQuiz;
        Promise.all(
          data.questions.map((question) => {
            return QuestionService.create({
              quizId: id,
              content: question.content,
              type: question.type,
            });
          })
        ).then((questions) => {
          const ids = questions.map((obj) => obj.id);
          Promise.all(
            ids.map((questionId, index) => {
              return data.questions[index].options.map((option) => {
                return OptionService.create({
                  questionId,
                  content: option.content,
                  isCorrect: option.isCorrect,
                });
              });
            })
          );
        });
      });
    }
  });

  useEffect(() => {
    loadDefaultValues();
  }, [quizId]);

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
                defaultValue=""
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
                defaultValue=""
                label="Description"
                InputLabelProps={{ shrink: true }}
                placeholder="Enter quiz's description"
                {...field}
              />
            );
          }}
        />

        <Questions />
      </Stack>
    </FormProvider>
  );
};

export default QuizFormPage;
