// components
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
// @mui
import {
  Alert,
  Button,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";

import { useAuth } from "src/hooks";
// ----------------------------------------------------------------------

const ForgotPasswordForm = () => {
  const { retrievePassword, isSuccess, isLoading } = useAuth();

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      email: ""
    }
  });

  const handleLogin = handleSubmit(data => {
    const { email } = data;
    retrievePassword(email);
  });

  return (
    <Paper elevation={4} sx={{ p: 2 }}>
      <Stack direction="column" alignItem="center" spacing={1}>
        {isSuccess &&
          getValues("email") && (
            <Alert severity="success">
              We have sent an email with a link to reset your password. Please
              check email at <strong>{getValues("email")}</strong>.
            </Alert>
          )}
        <Controller
          name={"email"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              onChange={onChange}
              value={value}
              label={"Email"}
              fullWidth
            />
          )}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleLogin}
          loading={isLoading}
        >
          Send
        </LoadingButton>

        <Link to="/auth/signin" style={{ alignSelf: "center" }}>
          <Button>Back Home</Button>
        </Link>
      </Stack>
    </Paper>
  );
};

export default ForgotPasswordForm;
