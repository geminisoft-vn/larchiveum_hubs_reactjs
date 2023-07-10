import { Link, Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
// components
<<<<<<< HEAD
import Logo from "../../components/logo";
import { Link } from "react-router-dom";
=======
>>>>>>> 4e1d6499eac4a4eb89679d57338eca92cd79a44d

// ----------------------------------------------------------------------

const StyledHeader = styled("header")(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: "100%",
  position: "absolute",
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

// ----------------------------------------------------------------------

const AuthLayout = () => {
  return (
    <>
      <StyledHeader>
        <Link to="/home/app">
<<<<<<< HEAD
        <img
          src="/assets/logo.png"
          alt="logo icon"
          style={{ width: "128px" }}
        />
=======
          <img
            src="/assets/logo.png"
            alt="logo icon"
            style={{ width: "128px" }}
          />
>>>>>>> 4e1d6499eac4a4eb89679d57338eca92cd79a44d
        </Link>
      </StyledHeader>

      <Outlet />
    </>
  );
};

export default AuthLayout;
