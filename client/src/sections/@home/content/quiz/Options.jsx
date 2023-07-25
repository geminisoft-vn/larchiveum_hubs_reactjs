import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Stack } from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { useEventBus } from "src/hooks";
import { OptionService } from "src/services";

import Option from "./Option";

const Options = props => {
  const { questionIndex, questionId } = props;

  const { $emit, $on, $remove } = useEventBus();

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

  const [prevOptionContent, setPrevOptionContent] = useState("");

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
    
    if (content !== prevOptionContent) {
      OptionService.update(option.optionId, { content });
    }
  };

  const handleChangeCorrectOption = async (optionIndex, isCorrect) => {
    const _option = fields[optionIndex];
    const currentIsCorrect = _option.isCorrect;
  
    if (isCorrect !== currentIsCorrect) {
      // Only update the database and state if the value has changed
      await OptionService.update(_option.optionId, { isCorrect });
  
      if (getValues(`questions.${questionIndex}.type`) === "single") {
        // For single-choice questions, set all other options to incorrect
        const options = getValues(`questions.${questionIndex}.options`);
        for (let i = 0; i < options.length; i++) {
          if (i !== optionIndex && options[i].isCorrect) {
            // Update only the incorrect options
            await OptionService.update(options[i].optionId, { isCorrect: false });
            update(i, {
              isCorrect: false
            });
          }
        }
      }
    }
  };
  

  const handleDeleteOption = optionIndex => {
    const options = getValues(`questions.${questionIndex}.options`);
    if (options.length <= 1) {
      enqueueSnackbar("There must be at least one option!", {
        variant: "error"
      });
      return;
    }
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

  useEffect(() => {
    const option = fields[questionIndex];
    setPrevOptionContent(option?.content || "");
  }, [fields[questionIndex]?.content, questionIndex]);

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
