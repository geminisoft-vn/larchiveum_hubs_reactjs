import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  Link,
  Stack,
  Typography
} from "@mui/material";
// @mui
import { alpha, styled } from "@mui/material/styles";
import PropTypes from "prop-types";

// mock
import account from "src/_mock/account";
import NavSection from "src/components/nav-section";
// components
import Scrollbar from "src/components/scrollbar";
import { useAuth } from "src/hooks";
// hooks
import useResponsive from "src/hooks/useResponsive";
import UserService from "src/services/UserService";

//
import navConfig from "./config";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12)
}));

// ----------------------------------------------------------------------

const Nav = ({ openNav, onCloseNav }) => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  const [avatar, setAvatar] = useState(
    "/assets/images/avatars/avatar_default.jpg"
  );

  const loadAvatar = () => {
    if (user && user.hubAvatarId) {
      UserService.getAvatar(user.id).then(avatar => {
        setAvatar(avatar?.images?.preview?.url);
      });
    }
  };

  useEffect(
    () => {
      if (openNav) {
        onCloseNav();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [pathname]
  );

  useEffect(
    () => {
      loadAvatar();
    },
    []
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column"
        }
      }}
    >
      {/* <Box */}
      {/*   sx={{ */}
      {/*     my: 2, */}
      {/*     height: "auto", */}
      {/*     width: 128, */}
      {/*     display: "inline-flex", */}
      {/*     position: "relative", */}
      {/*   }} */}
      {/* > */}
      {/*   <img src="/assets/logo.png" alt="Logo" /> */}
      {/* </Box> */}

      <Box sx={{ mt: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={avatar} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {user?.username}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {user?.email}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    !isDesktop && (
      <Box
        component="nav"
        sx={{
          flexShrink: { lg: 0 },
          width: { lg: NAV_WIDTH }
        }}
      >
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: false
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </Box>
    )
  );
};

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func
};

export default Nav;