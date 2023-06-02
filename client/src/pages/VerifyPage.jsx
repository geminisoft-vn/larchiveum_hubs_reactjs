import { Link } from "react-router-dom";

// @mui
import {
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  Paper,
  Box,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

export default function VerifyPage() {
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
          <Typography sx={{ textAlign: "center" }}>
            Please go to your email and verify your account
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Stack direction="column" alignItems="center" spacing={1}>
            <Button variant="contained">Resend Email</Button>
            <Link to="/auth/signin" style={{ alginSelf: "center" }}>
              <Button>Back Home</Button>
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
