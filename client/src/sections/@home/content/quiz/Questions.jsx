import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Stack } from "@mui/material";

import { useEventBus } from "src/hooks";
import { OptionService, QuestionService } from "src/services";

import Question from "./Question";

const MAX_QUESTION = 10;

const Questions = ({ quizId, defaultValues, mutateQuestion }) => {
  const { $emit } = useEventBus();
  const { control } = useFormContext();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "questions",
    rules: {
      maxLength: 10
    }
  });

  const handleAddQuestion = () => {
    QuestionService.create({ quizId }).then(question => {
      if (question) {
        append({ questionId: question.id, content: "", type: "single" });
      }
    });
  };

  const handleSaveQuestionContent = (questionIndex, content) => {
    const question = fields[questionIndex];
    if (content && question.content === content) return;
    if (!content) {
      QuestionService.update(question.questionId, {
        content: `Question #${questionIndex + 1}`
      }).then(() => {
        update(questionIndex, { content: `Question #${questionIndex + 1}` });
      });
      return;
    }
    QuestionService.update(question.questionId, {
      content
    });
  };

  const handleSaveQuestionType = (questionIndex, type) => {
    const question = fields[questionIndex];
    if (question.type === type) return;
    QuestionService.update(question.questionId, {
      type
    });
  };

  const handleToggleAllOption = async (questionIndex, type) => {
    console.log({ questionIndex, type });
    if (type === "single") {
      const question = fields[questionIndex];
      const options = question.options;
      if (options) {
        for (let i = 0; i < options.length; i++) {
          await OptionService.update(options[i].optionId, { isCorrect: false });
          update(questionIndex, {
            options: options.map(option => ({ ...option, isCorrect: false }))
          });
        }
      }
    }
  };

  const handleDeleteQuestion = questionIndex => {
    const question = fields[questionIndex];
    $emit("alert/open", {
      title: "Delete Question",
      content: "Do you want to delete this question?",
      okText: "Delete",
      okCallback: () => {
        QuestionService.delete(question.questionId).then(() => {
          remove(questionIndex);
          mutateQuestion();
        });
      }
    });
  };

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
        {fields.map((field, index) => (
          <Question
            key={field.id}
            questionIndex={index}
            question={field}
            handleDeleteQuestion={handleDeleteQuestion}
            handleSaveQuestionContent={handleSaveQuestionContent}
            handleSaveQuestionType={handleSaveQuestionType}
            handleToggleAllOption={handleToggleAllOption}
            quizId={quizId}
            defaultValues={defaultValues}
            mutateQuestion={mutateQuestion}
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
              onClick={handleAddQuestion}
            >
              Add Question
            </Button>
          )}
      </Stack>
    </Stack>
  );
};

export default Questions;
