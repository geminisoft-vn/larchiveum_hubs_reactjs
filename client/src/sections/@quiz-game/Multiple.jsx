import { useMemo } from "react";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Stack,
  Typography
} from "@mui/material";
import { grey, purple } from "@mui/material/colors";

const Multiple = ({
  question,
  questionIndex,
  handleSelectOption,
  isInReview
}) => {
  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel
        component="legend"
        sx={{ fontSize: "20px", color: purple[700], fontWeight: 900 }}
      >
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Typography
            sx={{ fontSize: "20px", color: purple[700], fontWeight: 900 }}
          >
            {questionIndex + 1}.
          </Typography>
          <Typography sx={{ fontSize: "28px", color: "#000", fontWeight: 500 }}>
            {question.content}
          </Typography>
        </Stack>
      </FormLabel>
      <FormGroup>
        {question &&
          question.options &&
          question.options.map(option => {
            return isInReview ? (
              <FormControlLabel
                key={option.id}
                control={
                  <Checkbox
                    disableRipple
                    disabled
                    checked={question.answers.has(option.id)}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 32 }
                    }}
                  />
                }
                label={option.content}
                sx={{
                  "&.Mui-disabled": {
                    "& .MuiTypography-root": {
                      color: option.isCorrect
                        ? "green"
                        : question.answers.has(option.id) && !option.isCorrect
                          ? "red"
                          : "inherit"
                    }
                  },
                  "& .MuiTypography-root": {
                    fontSize: 20
                  }
                }}
              />
            ) : (
              <FormControlLabel
                key={option.id}
                value={option.id}
                control={
                  <Checkbox
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 32 }
                    }}
                  />
                }
                label={option.content}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 20
                  }
                }}
                onChange={e => {
                  if (e.target.checked) {
                    handleSelectOption(questionIndex, e.target.value);
                  }
                }}
              />
            );
          })}
      </FormGroup>
    </FormControl>
  );
};

export default Multiple;
