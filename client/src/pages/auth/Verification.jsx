import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
// @mui
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
//notifications
import { SnackbarProvider } from "notistack";

import { useAuth } from "src/hooks";

const VerifyPage = () => {
  const { reSendVerificationEmail } = useAuth();
  const reSendEmail = () => {
    const email = localStorage.getItem("email");
    reSendVerificationEmail(email);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={4} sx={{ p: 2 }}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: "100%" }}
        >
          <SnackbarProvider
            autoHideDuration={2000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          />

          <Divider sx={{ my: 1 }} />
          <MarkEmailUnreadIcon fontSize="inherit" sx={{ fontSize: "48px" }} />
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontSize: "28px",
              fontStyle: "bold",
              marginBottom: "20px",
              color: "#333333",
            }}
          >
            Verify your email address
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            We have sent a verification link to your email.
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Click on the link to complete the verification process.
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            You might need to <b>check your spam folder</b>.
          </Typography>
          <Divider sx={{ my: 1 }} />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Button variant="contained" onClick={reSendEmail}>
              Resend Email
            </Button>
            <Link to="/auth/signin" style={{ alignSelf: "center" }}>
              <Button endIcon={<ArrowForwardIcon />}>Back Home</Button>
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default VerifyPage;
