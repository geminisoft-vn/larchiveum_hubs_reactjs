import { Container, Paper, Stack, Typography, Button } from "@mui/material";

import { Link } from "react-router-dom";

const Ending = () => {
  return (
    <Container sx={{ height: " 100%" }}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ height: "100%", py: 2, backgroundColor: "#fff" }}
      >
        <Typography
          sx={{ fontSize: "64px", fontWeight: 700, fontFamily: "Alegreya" }}
        >
          Thank you for answering
        </Typography>

        <Link to={`${import.meta.env.VITE_WEB_ROOT}/home/app`} target="_blank">
          <Button variant="contained">Go Home</Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default Ending;
