import { Link } from "react-router-dom";
// @mui
import { Stack, Button, TextField, Paper } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components

import { Controller, useForm } from "react-hook-form";
import { useAuth } from "src/hooks";
// ----------------------------------------------------------------------

export default function ForgotPasswordForm() {
  const { signIn, isLoading } = useAuth();

  const { control, handleSubmit } = useForm();

  const handleLogin = handleSubmit((data) => {
    const { email, password } = data;
    signIn(email, password);
  });

  return (
    <Paper elevation={4} sx={{ p: 2 }}>
      <Stack direction="column" alignItem="center" spacing={1}>
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
}
