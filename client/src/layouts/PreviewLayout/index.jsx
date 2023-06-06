import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";

const PreviewLayout = () => {
  return (
    <Container>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Outlet />
      </Box>
    </Container>
  );
};

export default PreviewLayout;
