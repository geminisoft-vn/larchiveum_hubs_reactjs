import { useState } from "react";

import { Link } from "react-router-dom";
// @mui
import {
  Stack,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "src/components/iconify";

import { Controller, useForm } from "react-hook-form";
import { useAuth } from "src/hooks";
// ----------------------------------------------------------------------

export default function LoginForm() {
  const { signIn, isLoading } = useAuth();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [shouldRememberMe, setShouldRememberMe] = useState(false);

  const handleLogin = handleSubmit((data) => {
    const { email, password } = data;
    signIn(email, password);
  });

  return (
    <>
      <Stack spacing={3}>
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

        <Controller
          name={"password"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              label="Password"
              onChange={onChange}
              fullWidth
              value={value}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 2 }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={shouldRememberMe}
              onChange={(e) => setShouldRememberMe(e.target.checked)}
            />
          }
          label="Remember me"
        />
        <Link to="/auth/forgot-password">
          <Button>Forgot password?</Button>
        </Link>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Typography>Don’t have an account?</Typography>
        <Link to="/auth/signup">
          <Button>Get Started</Button>
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleLogin}
        loading={isLoading}
      >
        Login
      </LoadingButton>
    </>
  );
}
