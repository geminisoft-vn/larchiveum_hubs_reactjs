import React, { useEffect, useLayoutEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import {
  Button,
  Grid,
  Stack,
  Switch,
  TextField,
  FormControlLabel,
} from "@mui/material";

const Option = (props) => {
  const {
    questionIndex,
    optionIndex,
    handleDeleteAnswer,
    handleChangeCorrectAnswer,
  } = props;

  const { register, control, watch, getValues } = useFormContext();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (
        type === "change" &&
        name.includes("isCorrect") &&
        getValues(`questions.${questionIndex}.type`) === "single"
      ) {
        handleChangeCorrectAnswer(name);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Stack sx={{ px: 2 }}>
      <Grid container spacing={1}>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <TextField
            fullWidth
            placeholder="Enter your option"
            {...register(
              `questions.${questionIndex}.options.${optionIndex}.content`
            )}
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
                      onChange={(e) => field.onChange(e.target.checked)}
                      checked={field.value}
                    />
                  )}
                />
              }
              label="Correct"
            />

            <Button variant="contained" onClick={handleDeleteAnswer}>
              Delete Answer
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Option;
