import { Button, Paper, Stack, Typography } from "@mui/material";

const GettingStarted = ({ title, desc }) => {
  return (
    <Paper elevation={4} sx={{ p: 4 }}>
      <Stack diretion="column" spacing={2}>
        <Typography>{title}</Typography>
        <Typography>{desc}</Typography>
        <Button>Start</Button>
      </Stack>
    </Paper>
  );
};

export default GettingStarted;
