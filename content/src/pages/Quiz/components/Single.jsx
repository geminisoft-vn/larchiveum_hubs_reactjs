import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Typography,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { purple } from "@mui/material/colors";

const Single = ({ question, questionIndex, handleSelectOption }) => {
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
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: 32,
          },
          width: "max-content",
        }}
        onChange={(e) => {
          handleSelectOption(question.id, parseInt(e.target.value, 10));
        }}
      >
        {question &&
          question.options &&
          question.options.map((option) => {
            return (
              <FormControlLabel
                key={option.id}
                value={option.id}
                control={
                  <Radio
                    sx={{
                      color: purple[800],
                      "&.Mui-checked": {
                        color: purple[600],
                      },
                    }}
                  />
                }
                label={option.content}
                sx={{
                  color: purple[800],
                  "&.Mui-checked": {
                    color: purple[600],
                  },
                }}
              />
            );
          })}
      </RadioGroup>
    </FormControl>
  );
};

export default Single;
