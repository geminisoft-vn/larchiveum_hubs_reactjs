import { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  List,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from "@mui/material";

const Question = ({ question, index, total, answers, handleSelectOption }) => {
  const [answer, setAnswer] = useState();
  console.log({ answer });
  return (
    <Grid container spacing={2}>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <Stack direction="column" spacing={2}>
          <Typography variant="body1" color="grey">
            Question {index + 1}/{total}
          </Typography>
          <Typography variant="h4">{question.content}</Typography>
        </Stack>
      </Grid>

      <Grid item lg={8} md={8} sm={12} xs={12}>
        <FormControl>
          <RadioGroup value={answer} onChange={e => setAnswer(e.target.value)}>
            {question &&
              question.options &&
              question.options.map(option => {
                return (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={option.content}
                  />
                );
              })}
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Question;
