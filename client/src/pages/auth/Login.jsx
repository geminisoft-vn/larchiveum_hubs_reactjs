import { Link } from "react-router-dom";
import { Button, Container, Divider, Stack, Typography } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";

import Iconify from "src/components/iconify";
// sections
import { LoginForm } from "src/sections/@auth/login";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex"
  }
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

const LoginPage = () => {
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

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
};

export default LoginPage;
