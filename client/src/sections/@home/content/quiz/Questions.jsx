import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Stack } from "@mui/material";

import Question from "./Question";
import { QuestionService } from "src/services";

const MAX_QUESTION = 10;

const Questions = ({ quizId, defaultValues }) => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
    rules: {
      maxLength: 10
    }
  });

  const handleDeleteQuestion = questionIndex => {
    if (quizId) {
      if (defaultValues && defaultValues.questions) {
        if (!defaultValues.questions[questionIndex]) {
          remove(questionIndex);
        } else {
          const questionId = defaultValues.questions[questionIndex].id;
          QuestionService.delete(questionId);
        }
      }
    } else {
      remove(questionIndex);
    }
  };

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
        {fields.map((field, index) => (
          <Question
            key={field.id}
            questionIndex={index}
            question={field}
            handleDeleteQuestion={() => handleDeleteQuestion(index)}
            quizId={quizId}
            defaultValues={defaultValues}
          />
        ))}
      </Stack>
      <Stack>
        {fields &&
          fields.length < MAX_QUESTION && (
            <Button
              variant="outlined"
              sx={{
                alignSelf: "center"
              }}
              onClick={() => append({ content: "" })}
            >
              Add Question
            </Button>
          )}
      </Stack>
    </Stack>
  );
};

export default Questions;
