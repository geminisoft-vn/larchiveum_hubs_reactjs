import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  Switch,
  TextField
} from "@mui/material";

import { TrashIcon } from "src/components/iconify";

const Option = props => {
  const {
    questionIndex,
    optionIndex,
    handleDeleteOption,
    handleChangeCorrectAnswer,
    handleSaveOptionContent,
  } = props;

  const { register, control, watch, getValues, formState } = useFormContext();
  const { errors } = formState;
  

  return (
    <Stack sx={{ px: 2 }}>
      <Grid container spacing={1}>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <TextField
            fullWidth
            placeholder="Enter your option"
            error={Boolean(errors?.questions?.[questionIndex]?.options?.[optionIndex]?.content)}
            helperText={
              errors?.questions?.[questionIndex]?.options?.[optionIndex]?.content?.message}
            {...register(
              `questions.${questionIndex}.options.${optionIndex}.content`
            )}
            onBlur={() => handleSaveOptionContent(optionIndex, getValues(`questions.${questionIndex}.options.${optionIndex}.content`))}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ pl: 2 }}
          >
            <FormControlLabel
              control={
                <Controller
                  defaultValue={false}
                  name={`questions.${questionIndex}.options.${optionIndex}.isCorrect`}
                  control={control}
                  render={({ field }) => (
                    <Switch
                      onChange={e => {
                        field.onChange(e.target.checked)
                        handleChangeCorrectAnswer(optionIndex, e.target.checked)
                      }}
                      checked={field.value}
                    />
                  )}
                />
              }
              label="Correct"
            />

            <IconButton onClick={() => handleDeleteOption(optionIndex)}>
              <TrashIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Option;
