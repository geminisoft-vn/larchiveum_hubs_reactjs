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

import qs from "qs";

const QuizFormPage = () => {
  const { t } = useTranslation();
  const { id: quizId } = useParams();
  const { user } = useAuth();

  const { data: quiz } = useSWR(quizId ? `/quizzes/${quizId}` : null, url => {
    return request.get(url).then(res => res.data.data);
  });
  const { data: questions } = useData(
    quiz
      ? `/questions?${qs.stringify({
          filters: {
            quiz: {
              id: quiz.id
            }
          }
        })}`
      : null
  );

  const methods = useForm({
    defaultValues: {
      title: "",
      desc: "",
      questions: []
    }
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

  const handleSaveQuiz = methods.handleSubmit(data => {
    if (quizId) {
      // edit
      const { dirtyFields } = methods.formState;
      const dataToUpdate = {};
      ["title", "desc"].forEach(item => {
        if (dirtyFields[item]) {
          dataToUpdate[item] = data[item];
        }
      });
      if (dirtyFields.title || dirtyFields.desc) {
        QuizService.update(quizId, dataToUpdate);
      }
      if (dirtyFields.questions && dirtyFields.questions.length) {
        let filteredQuestions = dirtyFields.questions.map((question, index) => {
          if (question.content || question.type) return index;
        });

        if (filteredQuestions && filteredQuestions.length) {
          Promise.all(
            filteredQuestions.map(questionIdx => {
              let question = data.questions[questionIdx];
              if (question) {
                if (question.id) {
                  return QuestionService.update(question.id, {
                    content: question.content,
                    type: question.type
                  });
                } else {
                  return QuestionService.create({
                    quizId,
                    content: question.content,
                    type: question.type
                  });
                }
              }
            })
          );
        }
      }
      if (dirtyFields.questions?.some(obj => obj.options)) {
        let filteredOptions = [];
        dirtyFields.questions.forEach((question, questionIndex) => {
          if (question.options && question.options.length) {
            question.options.forEach((option, optionIndex) => {
              if (option.content || option.isCorrect)
                filteredOptions.push([questionIndex, optionIndex]);
            });
          }
        });

        if (filteredOptions && filteredOptions.length) {
          Promise.all(
            filteredOptions.map(([questionIdx, optionIdx]) => {
              console.log({ questionIdx, optionIdx });
              let question = data.questions[questionIdx];
              let option = data.questions[questionIdx].options[optionIdx];
              if (option.id) {
                return OptionService.update(option.id, {
                  content: option.content,
                  isCorrect: option.isCorrect
                });
              } else {
                return OptionService.create({
                  questionId: question.id,
                  content: option.content,
                  isCorrect: option.isCorrect
                });
              }
            })
          );
        }
      }
    } else {
      // create
      QuizService.create({
        ...pick(data, ["title", "desc"]),
        userId: user.id
      }).then(newQuiz => {
        const { id } = newQuiz;
        Promise.all(
          data.questions.map(question => {
            return QuestionService.create({
              quizId: id,
              content: question.content,
              type: question.type
            });
          })
        ).then(questions => {
          const ids = questions.map(obj => obj.id);
          Promise.all(
            ids.map((questionId, index) => {
              return data.questions[index].options.map(option => {
                return OptionService.create({
                  questionId,
                  content: option.content,
                  isCorrect: option.isCorrect
                });
              });
            })
          );
        });
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
        />
      </Stack>
    </FormProvider>
  );
};

export default QuizFormPage;
