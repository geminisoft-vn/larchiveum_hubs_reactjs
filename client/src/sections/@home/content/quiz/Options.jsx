import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Stack } from "@mui/material";

import { useEventBus } from "src/hooks";
import { OptionService } from "src/services";

import Option from "./Option";

const Options = props => {
  const { questionIndex, quizId, defaultValues, mutateQuestion } = props;

  const { $emit } = useEventBus();

  const { control, getValues } = useFormContext();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
    rules: {
      maxLength: 10
    }
  });

  const handleDeleteOption = optionIndex => {
    if (quizId) {
      console.log({ defaultValues, optionIndex });
      if (
        defaultValues &&
        defaultValues.questions &&
        defaultValues.questions.length
      ) {
        if (
          defaultValues.questions[questionIndex].options &&
          defaultValues.questions[questionIndex].options.length > 0
        ) {
          if (!defaultValues.questions[questionIndex].options[optionIndex]) {
            remove(optionIndex);
          } else {
            const optionId =
              defaultValues.questions[questionIndex].options[optionIndex].id;
            $emit("alert/open", {
              title: "Delete Option",
              content: "Do you want to delete this option?",
              okText: "Delete",
              okCallback: () => {
                OptionService.delete(optionId).then(() => {
                  remove(optionIndex);
                  mutateQuestion();
                });
              }
            });
          }
        } else {
          remove(optionIndex);
        }
      }
    } else {
      remove(optionIndex);
    }
  };

  const handleChangeCorrectOption = name => {
    if (getValues(name)) {
      const options = getValues(`questions.${questionIndex}.options`);
      options.forEach((_, index) => {
        if (name === `questions.${questionIndex}.options.${index}.isCorrect`)
          return;
        update(index, {
          isCorrect: false,
          content: getValues(
            `questions.${questionIndex}.options.${index}.content`
          )
        });
      });
    }
  };

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="column" spacing={2}>
        {fields.map((field, index) => (
          <Option
            key={field.id}
            optionIndex={index}
            questionIndex={questionIndex}
            handleDeleteOption={() => handleDeleteOption(index)}
            handleChangeCorrectAnswer={handleChangeCorrectOption}
          />
        ))}
      </Stack>
      <Button
        variant="outlined"
        sx={{ alignSelf: "center" }}
        onClick={() => append({ content: "", isCorrect: false })}
      >
        Add Answer
      </Button>
    </Stack>
  );
};

export default Options;
