// @mui
import { styled } from "@mui/material/styles";
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
} from "@mui/material";
// hooks
import useResponsive from "src/hooks/useResponsive";
// components
import Logo from "src/components/logo";
import Iconify from "src/components/iconify";
// sections
import { LoginForm } from "src/sections/auth/login";
import ForgotPasswordForm from "src/sections/auth/forgot-password";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive("up", "md");

  return (
    <>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h3" sx={{ textAlign: "center", mb: 2 }}>
              Retrieve Password
            </Typography>
            <ForgotPasswordForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
