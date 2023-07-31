import { Controller, useFormContext } from "react-hook-form";
import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { TrashIcon } from "src/components/iconify";

import Options from "./Options";

const Question = (props) => {
  const {
    handleDeleteQuestion,
    handleSaveQuestionContent,
    handleSaveQuestionType,
    handleToggleAllOption,
    question,
    questionIndex,
    quizId,
    defaultValues,
    mutateQuestion,
  } = props;

  const { register, getValues, control, formState } = useFormContext();
  const { errors } = formState;

  return (
    <Paper elevation={4} sx={{ p: 2 }}>
      <Stack direction="column" spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Question #{questionIndex + 1}</Typography>
          <Button
            variant="outlined"
            endIcon={<TrashIcon />}
            color="error"
            onClick={() => handleDeleteQuestion(questionIndex)}
          >
            Delete
          </Button>
        </Stack>

        <Stack>
          <Grid container spacing={1}>
            <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
              <TextField
                defaultValue=""
                fullWidth
                {...register(`questions.${questionIndex}.content`)}
                placeholder="Enter your question"
                error={Boolean(errors?.questions?.[questionIndex]?.content)}
                helperText={errors?.questions?.[questionIndex]?.content?.message}
                onBlur={() =>
                  handleSaveQuestionContent(
                    questionIndex,
                    getValues(`questions.${questionIndex}.content`)
                  )
                }
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <Controller
                control={control}
                name={`questions.${questionIndex}.type`}
                defaultValue={
                  getValues(`questions.${questionIndex}.type`) || "single"
                }
                render={({ field }) => {
                  return (
                    <Select
                      fullWidth
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handleToggleAllOption(questionIndex,e.target.value);
                      }}
                      MenuProps={{ disableScrollLock: true }}
                      onClose={() =>
                        handleSaveQuestionType(
                          questionIndex,
                          getValues(`questions.${questionIndex}.type`)
                        )
                      }
                    >
                      <MenuItem value="single">Single</MenuItem>
                      <MenuItem value="multiple">Multiple</MenuItem>
                    </Select>
                  );
                }}
              />
            </Grid>
          </Grid>
        </Stack>

        <Options
          questionIndex={questionIndex}
          questionId={question.questionId}
          quizId={quizId}
          defaultValues={defaultValues}
          mutateQuestion={mutateQuestion}
        />
      </Stack>
    </Paper>
  );
};

export default Question;
