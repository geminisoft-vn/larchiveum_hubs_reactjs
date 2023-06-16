import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
// @mui
import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField
} from "@mui/material";

import Iconify from "src/components/iconify";
import { useAuth } from "src/hooks";
// ----------------------------------------------------------------------

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const { resetPassword, isLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      password: "",
      rePassword: ""
    }
  });

  const handleLogin = handleSubmit(data => {
    const { password } = data;
    const token = searchParams.get("token");
    if (!token) return;
    resetPassword(token, password);
  });

  return (
    <Paper elevation={4} sx={{ p: 2 }}>
      <Stack direction="column" alignItem="center" spacing={2}>
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
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleLogin}
          loading={isLoading}
        >
          Reset
        </LoadingButton>

        <Link to="/auth/signin" style={{ alignSelf: "center" }}>
          <Button>Back Home</Button>
        </Link>
      </Stack>
    </Paper>
  );
};

export default ResetPasswordForm;
