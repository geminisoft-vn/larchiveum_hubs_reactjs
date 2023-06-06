import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
// @mui
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import Cookies from "js-cookie";

import { AuthService } from "src/services";

const ConfirmationPage = () => {
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState(""); // 'failed' 'success'

  const checkToken = () => {
    const token = searchParams.get("token");
    if (token) {
      AuthService.checkToken(token).then(res => {
        if (res.status === 200) {
          setStatus("success");
          Cookies.set("__LARCHIVEUM__COOKIES", token);
        } else {
          setStatus("failed");
        }
      });
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Paper elevation={4} sx={{ p: 2, width: 512, height: 256 }}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: "100%" }}
        >
          {status === "success" ? (
            <CheckCircleRoundedIcon color="success" sx={{ fontSize: 128 }} />
          ) : (
            <ErrorOutlineRoundedIcon color="error" sx={{ fontSize: 128 }} />
          )}

          <Typography variant="h3" sx={{ textAlign: "center" }}>
            {status === "success"
              ? "Successfully verifying!"
              : "Error verifying!"}
          </Typography>

          <Stack direction="column" alignItems="center" spacing={1}>
            <Link
              to={status === "success" ? "/home/app" : "/auth/signin"}
              style={{ alginSelf: "center" }}
            >
              <Button variant="contained">Back Home</Button>
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ConfirmationPage;
