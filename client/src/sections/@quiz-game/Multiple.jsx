import {
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  FormHelperText,
  Checkbox,
} from "@mui/material";

const Multiple = ({ question }) => {
  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend">Assign responsibility</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox name="gilad" />}
          label="Gilad Gray"
        />
        <FormControlLabel
          control={<Checkbox name="jason" />}
          label="Jason Killian"
        />
      </FormGroup>
      <FormHelperText>Choose many as you want</FormHelperText>
    </FormControl>
  );
};

export default Multiple;
