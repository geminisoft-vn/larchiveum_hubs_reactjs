// @mui
import {
  Button,
  Container,
  Divider,
  Link,
  Stack,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";

import Iconify from "src/components/iconify";
// components
import Logo from "src/components/logo";
// hooks
import useResponsive from "src/hooks/useResponsive";
// sections
import { LoginForm } from "src/sections/@auth/login";
import SignupForm from "src/sections/@auth/signup/SignupForm";

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

const RegistrationPage = () => {
  return (
    <>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <Link to={`${import.meta.env.VITE_API_ROOT}/v1/connect/google`}>
                <Button
                  fullWidth
                  size="large"
                  color="inherit"
                  variant="outlined"
                >
                  <Iconify
                    icon="eva:google-fill"
                    color="#DF3E30"
                    width={32}
                    height={32}
                  />
                </Button>
              </Link>
              <Link to={`${import.meta.env.VITE_API_ROOT}/v1/connect/facebook`}>
                <Button
                  fullWidth
                  size="large"
                  color="inherit"
                  variant="outlined"
                >
                  <Iconify
                    icon="eva:facebook-fill"
                    color="#1877F2"
                    width={32}
                    height={32}
                  />
                </Button>
              </Link>
              <Link to={`${import.meta.env.VITE_API_ROOT}/v1/connect/kakao`}>
                <Button
                  fullWidth
                  size="large"
                  color="inherit"
                  variant="outlined"
                >
                  <img
                    src="/assets/icons/kakao.svg"
                    alt="kakao logo"
                    width={32}
                    height={32}
                  />
                </Button>
              </Link>{" "}
              <Link to={`${import.meta.env.VITE_API_ROOT}/v1/connect/naver`}>
                <Button
                  fullWidth
                  size="large"
                  color="inherit"
                  variant="outlined"
                >
                  <img
                    src="/assets/icons/naver.svg"
                    alt="naver logo"
                    width={64}
                    height={64}
                  />
                </Button>
              </Link>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                OR
              </Typography>
            </Divider>

            <SignupForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
};

export default RegistrationPage;
