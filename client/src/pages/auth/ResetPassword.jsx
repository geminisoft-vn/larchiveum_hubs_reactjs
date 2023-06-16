// @mui
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import ResetPasswordForm from "src/sections/@auth/reset-password";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex"
  }
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column"
}));

// ----------------------------------------------------------------------

const ResetPasswordPage = () => {
  return (
    <>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h3" sx={{ textAlign: "center", mb: 2 }}>
              Reset Password
            </Typography>
            <ResetPasswordForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
};

export default ResetPasswordPage;
