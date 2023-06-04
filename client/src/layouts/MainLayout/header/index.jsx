import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { AppBar, Box, Button, IconButton, Stack, Toolbar } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";

// components
import Iconify from "src/components/iconify";
import { useAuth } from "src/hooks";
import useResponsive from "src/hooks/useResponsive";
// utils
import { bgBlur } from "src/utils/cssStyles";

//
import AccountPopover from "./AccountPopover";
import LanguagePopover from "./LanguagePopover";

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default })
  // boxShadow: "none",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

const Header = ({ onOpenNav }) => {
  const isDesktop = useResponsive("up", "lg");

  const { t } = useTranslation();

  const { pathname } = useLocation();

  const { user } = useAuth();

  const navConfig = [
    {
      title: t("LINK.content"),
      path: "/home/content",
      requiredType: 3,
      target: "_self"
    },
    {
      title: t("LINK.room"),
      path: "/home/room",
      requiredType: 3,
      target: "_self"
    },

    {
      title: t("LINK.profile"),
      path: "/home/profile",
      requiredType: 3,
      target: "_self"
    },
    {
      title: t("LINK.user"),
      path: "/home/user",
      requiredType: 4,
      target: "_self"
    }
  ];

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: "text.primary",
            display: { lg: "none" }
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        {isDesktop && (
          <Link to="/home/app">
            <Box
              sx={{
                width: 128,
                height: 64,
                position: "relative"
              }}
            >
              <img
                src="/assets/logo.png"
                alt="Logo"
                style={{
                  objectFit: "contain"
                }}
              />
            </Box>
          </Link>
        )}

        {isDesktop &&
          user && (
            <Stack direction="row" alignItems="center" spacing={2}>
              {navConfig.map(item => {
                return (
                  user.role &&
                  user.role.id >= item.requiredType && (
                    <Link key={item.title} to={item.path} target={item.target}>
                      <Button
                        variant={
                          pathname.includes(item.path) ? "contained" : "text"
                        }
                      >
                        {item.title}
                      </Button>
                    </Link>
                  )
                );
              })}
              {user.role &&
                user.role.id >= 4 && (
                  <Link
                    to={`${
                      import.meta.env.VITE_APP_ROOT
                    }?action=signin&redirect_url=admin&email=${
                      user.email
                    }&hubs_token=${user.hubToken}`}
                    target="_blank"
                  >
                    <Button>Admin</Button>
                  </Link>
                )}
              {user.role &&
                user.role.id >= 4 && (
                  <Link
                    to={`${
                      import.meta.env.VITE_APP_ROOT
                    }?action=signin&redirect_url=spoke&email=${
                      user.email
                    }&hubs_token=${user.hubToken}`}
                    target="_blank"
                  >
                    <Button>Spoke</Button>
                  </Link>
                )}
            </Stack>
          )}

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1
          }}
        >
          <LanguagePopover />
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
};

export default Header;
