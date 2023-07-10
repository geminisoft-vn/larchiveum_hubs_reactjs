import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
// ----------------------------------------------------------------------
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
// @mui
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material";

// components
import Iconify from "src/components/iconify";
import { useAuth } from "src/hooks";

const SignupForm = () => {
  const { signUp, isLoading } = useAuth();

  const { control, handleSubmit } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleLogin = handleSubmit(data => {
    const { username, email, password } = data;
    signUp(username, email, password);
    localStorage.setItem('email', email);
  });

  return (
    <>
      <Stack spacing={3}>
        <Controller
          name={"username"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              onChange={onChange}
              value={value}
              label={"Username"}
              fullWidth
            />
          )}
        />

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
                )
              }}
            />
          )}
        />

        <Controller
          name={"repassword"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              label="Re-Password"
              onChange={onChange}
              fullWidth
              value={value}
              type={showRePassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowRePassword(!showRePassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showRePassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1} sx={{ my: 1 }}>
        <Typography>Already have an account? {""}</Typography>
        <Link to="/auth/signin">
          <Button>Log In</Button>
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleLogin}
        // loading={isLoading}
      >
        Sign Up
      </LoadingButton>
    </>
  );
};

export default SignupForm;
