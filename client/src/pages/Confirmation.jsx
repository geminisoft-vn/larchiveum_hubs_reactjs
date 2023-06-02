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

export default function ConfirmationPage() {
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
      <Paper elevation={4} sx={{ p: 2, width: 512, height: 256 }}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: "100%" }}
        >
          <CheckCircleRoundedIcon color="success" sx={{ fontSize: 128 }} />

          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Verified!
          </Typography>

          <Stack direction="column" alignItems="center" spacing={1}>
            <Link to="/auth/signin" style={{ alginSelf: "center" }}>
              <Button>Back Home</Button>
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
