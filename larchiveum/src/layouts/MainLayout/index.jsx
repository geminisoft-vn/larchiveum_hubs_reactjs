import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, Stack } from "@mui/material";

import { Header } from "src/components";

const MainLayout = (props) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",

        height: "100%",
      }}
    >
      <Container>
        <Stack direction="column" spacing={2}>
          <Header />

          <Outlet />
        </Stack>
      </Container>
    </Box>
  );
};

export default MainLayout;
