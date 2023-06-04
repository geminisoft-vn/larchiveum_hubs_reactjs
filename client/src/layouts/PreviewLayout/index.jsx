import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const PreviewLayout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default PreviewLayout;
