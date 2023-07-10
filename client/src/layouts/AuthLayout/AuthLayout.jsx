import { Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
// components
import Logo from "../../components/logo";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

const StyledHeader = styled("header")(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: "100%",
  position: "absolute",
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

const AuthLayout = () => {
  return (
    <>
      <StyledHeader>
        <Link to="/home/app">
        <img
          src="/assets/logo.png"
          alt="logo icon"
          style={{ width: "128px" }}
        />
        </Link>
      </StyledHeader>

      <Outlet />
    </>
  );
};

export default AuthLayout;
