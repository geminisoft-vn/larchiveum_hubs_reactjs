import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

import { Button, FormContainer, FormItem, TextInput } from "src/components";
import QuestionService from "src/utilities/apiServices/QuestionService";
import QuizService from "src/utilities/apiServices/QuizService";

import Questions from "./components/Questions";

const QuizForm = (props) => {
  const { t } = useTranslation();

  const { quizId } = useParams();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: async () => {
      const res = await QuizService.getOne(quizId);

      if (res.result === "ok") {
        let questions = await Promise.all(
          res.data.questions.map((question) =>
            QuestionService.getOne(question.id)
          )
        );
        questions = questions.map((question) => ({
          ...question.data,
          multiple: question.data.multiple.toString(),
          answers: question.data.answers.map((answer) => ({
            ...answer,
            isCorrectAnswer: answer.isCorrectAnswer.toString(),
          })),
        }));
        res.data.questions = questions;

        return res.data;
      } else
        return {
          title: "",
          introduction: "",
          description: "",
          questions: [],
        };
    },
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  // function handleSaveQuiz() {
  //   setIsSaveQuizSubmiting(true);
  //   // QuizService.update(quizId, quizRef.current)
  //   //   .then((res) => {
  //   //     quizRef.current = res.data;
  //   //     setIsSaveQuizSubmiting(false);
  //   //   })
  //   //   .catch((error) => {
  //   //     if (
  //   //       error.response.data?.result == "fail" &&
  //   //       error.response.data.error == "invalid_input"
  //   //     ) {
  //   //       showValidateErrors(error.response.data.all);
  //   //     }
  //   //     setIsSaveQuizSubmiting(false);
  //   //   });
  // }

  const handleSaveQuiz = (data) => {
    if (quizId) {
      // edit
      const { dirtyFields } = methods.formState;
      const dataToSend = {};
      ["title", "introduction", "description"].forEach((item) => {
        if (dirtyFields[item]) {
          Object.assign(dataToSend, {
            ...data,
            [item]: data[item],
          });
        }
      });

      QuizService.create(dataToSend)
        .then(() => {})
        .catch((err) => console.error(err));
    } else {
      // create
      console.log({ data });
    }
  };

  return (
    <FormProvider {...methods}>
      <FormContainer onSubmit={methods.handleSubmit(handleSaveQuiz)}>
        <div className="flex flex-col gap-2 pb-4">
          <div className="flex justify-between">
            <Button beforeIcon={<LeftOutlined />} onClick={handleGoBack}>
              {t("__BUTTON__.BACK")}
            </Button>

            <Button
              className="bg-blue-500 text-white hover:text-white"
              type="submit">
              {t("__BUTTON__.SAVE")}
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <FormItem
              label={t(
                "content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_DETAIL__QUIZ_TITLE_INPUT_LABEL"
              )}
              renderInput={(props) => {
                return (
                  <TextInput
                    {...props}
                    {...methods.register("title")}
                    placeholder={t(
                      "content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_TITLE_INPUT_PLACEHOLDER"
                    )}
                  />
                );
              }}
            />

            <FormItem
              label={t(
                "content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_INTRODUCTION_INPUT_LABEL"
              )}
              renderInput={(props) => {
                return (
                  <TextInput
                    {...props}
                    {...methods.register("introduction")}
                    placeholder={t(
                      "content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_INTRODUCTION_INPUT_PLACEHOLDER"
                    )}
                  />
                );
              }}
            />

            <FormItem
              label={t(
                "content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_DESCRIPTION_INPUT_LABEL"
              )}
              renderInput={(props) => {
                return (
                  <TextInput
                    {...props}
                    {...methods.register("description")}
                    placeholder={t(
                      "content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_DESCRIPTION_INPUT_PLACEHOLDER"
                    )}
                  />
                );
              }}
            />
          </div>

          <Questions quizId={quizId} />
        </div>
      </FormContainer>
    </FormProvider>
  );
};

export default QuizForm;
