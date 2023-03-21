import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button } from "src/components";

import Question from "./Question";

const MAX_QUESTION = 10;

const Questions = (props) => {
  const {} = props;

  const { control } = useFormContext();

  const { t } = useTranslation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
    rules: {
      maxLength: 10,
    },
  });

  return (
    <div className="flex flex-col gap-2">
      {fields.map((field, index) => {
        return (
          <Question
            key={field.id}
            questionIndex={index}
            question={field}
            handleDeleteQuestion={() => remove(index)}
          />
        );
      })}

      <div className="flex justify-center">
        {fields && fields.length < MAX_QUESTION && (
          <Button onClick={() => append({ text: "" })}>
            {"+ " +
              t("content.QUIZ_TAB__QUIZ_DETAIL__ADD_QUESTION_BUTTON_LABEL")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Questions;
