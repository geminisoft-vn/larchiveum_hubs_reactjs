import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
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
  const reSendEmail = (() => {
    const email = localStorage.getItem("email");
    reSendVerificationEmail(email);
  });

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
          <Typography
            sx={{ textAlign: "center", fontSize: "24px", fontStyle: "italic" }}
          >
            Please go to your email.
          </Typography>

          <Divider sx={{ my: 1 }} />
          <MarkEmailUnreadIcon fontSize={"large"}/>
          <Divider sx={{ my: 1 }} />

          <Stack direction="column" alignItems="center" spacing={1}>
            <Button variant="contained" onClick={reSendEmail}>
              Resend Email
            </Button>
            <Link to="/auth/signin" style={{ alginSelf: "center" }}>
              <Button>Back Home</Button>
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default VerifyPage;
