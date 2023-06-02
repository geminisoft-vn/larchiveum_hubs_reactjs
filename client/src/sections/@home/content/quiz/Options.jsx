import { useFieldArray, useFormContext } from "react-hook-form";

import { Button, Stack } from "@mui/material";

import Option from "./Option";

const Options = (props) => {
  const { questionIndex } = props;

  const { control, getValues } = useFormContext();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
    rules: {
      maxLength: 10,
    },
  });

  const handleChangeCorrectOption = (name) => {
    if (getValues(name)) {
      const options = getValues(`questions.${questionIndex}.options`);
      options.forEach((_, index) => {
        if (name === `questions.${questionIndex}.options.${index}.isCorrect`)
          return;
        update(index, {
          isCorrect: false,
          content: getValues(
            `questions.${questionIndex}.options.${index}.content`
          ),
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
            handleDeleteAnswer={() => remove(index)}
            handleChangeCorrectAnswer={handleChangeCorrectOption}
          />
        ))}
      </Stack>
      <Button
        variant="outlined"
        sx={{ alignSelf: "center" }}
        onClick={() => append({ content: "" })}
      >
        Add Answer
      </Button>
    </Stack>
  );
};

export default Options;
