import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Stack } from "@mui/material";

import { useEventBus } from "src/hooks";
import { OptionService } from "src/services";

import Option from "./Option";

const Options = props => {
  const {
    questionIndex,
    questionId,
    quizId,
    defaultValues,
    mutateQuestion
  } = props;

  const { $emit } = useEventBus();

  const { control, getValues } = useFormContext();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
    rules: {
      maxLength: 10
    }
  });

  const handleAddOption = () => {
    OptionService.create({ questionId }).then(option => {
      append({ optionId: option.id, content: "", isCorrect: false });
    });
  };

  const handleSaveOptionContent = (optionIndex, content) => {
    const option = fields[optionIndex];
    if (content && option.content === content) return;
    if (!content) {
      OptionService.update(option.optionId, {
        content: `Option #${optionIndex + 1}`
      }).then(() => {
        update(optionIndex, { content: `Option #${optionIndex + 1}` });
      });
      return;
    }
    OptionService.update(option.optionId, { content });
  };

  const handleChangeCorrectOption = async (optionIndex, isCorrect) => {
    // if single choice, there's only one correct option
    // if multiple choice, there's many correct options
    const _option = fields[optionIndex];
    await OptionService.update(_option.optionId, { isCorrect });
    const options = getValues(`questions.${questionIndex}.options`);
    if (getValues(`questions.${questionIndex}.type`) === "single") {
      for (let i = 0; i < options.length; i++) {
        if (options[i].optionId !== _option.optionId) {
          await OptionService.update(options[i].optionId, { isCorrect: false });
          update(i, {
            isCorrect: false
          });
        }
      }
    }
  };

  const handleDeleteOption = optionIndex => {
    const option = fields[optionIndex];
    $emit("alert/open", {
      title: "Delete Option",
      content: "Do you want to delete this option?",
      okText: "Delete",
      okCallback: () => {
        OptionService.delete(option.optionId).then(() => {
          remove(optionIndex);
        });
      }
    });
  };

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="column" spacing={2}>
        {fields.map((field, index) => (
          <Option
            key={field.id}
            optionIndex={index}
            questionIndex={questionIndex}
            handleDeleteOption={handleDeleteOption}
            handleChangeCorrectAnswer={handleChangeCorrectOption}
            handleSaveOptionContent={handleSaveOptionContent}
          />
        ))}
      </Stack>
      <Button
        variant="outlined"
        sx={{ alignSelf: "center" }}
        onClick={handleAddOption}
      >
        Add Answer
      </Button>
    </Stack>
  );
};

export default Options;
