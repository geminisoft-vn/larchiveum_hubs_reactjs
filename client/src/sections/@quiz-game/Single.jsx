import { useMemo } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from "@mui/material";
import { purple } from "@mui/material/colors";

const Single = ({
  question,
  questionIndex,
  handleSelectSingleOption,
  isInReview
}) => {
  const answer = useMemo(
    () => {
      return Array.from(question.answers)[0];
    },
    [question]
  );

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
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
      <RadioGroup
        size="large"
        onChange={e => {
          handleSelectSingleOption(questionIndex, parseInt(e.target.value, 10));
        }}
      >
        {question &&
          question.options &&
          question.options.map(option => {
            return isInReview ? (
              <FormControlLabel
                key={option.id}
                control={
                  <Radio
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
                  <Radio
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
              />
            );
          })}
      </RadioGroup>
    </FormControl>
  );
};

export default Single;
