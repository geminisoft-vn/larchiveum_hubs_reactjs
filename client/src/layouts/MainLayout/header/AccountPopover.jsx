import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Typography
} from "@mui/material";
// @mui
import { alpha } from "@mui/material/styles";

import { useAuth } from "src/hooks";
import UserService from "src/services/UserService";

// ----------------------------------------------------------------------

const AccountPopover = () => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  const [open, setOpen] = useState(false);
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

  const handleSignOut = () => {
    signOut();
    setOpen(false);
  };

  const handleOpen = event => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <>
      {user?.id ? (
        <IconButton
          onClick={handleOpen}
          sx={{
            p: 0,
            ...(open && {
              "&:before": {
                zIndex: 1,
                content: "''",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                position: "absolute",
                bgcolor: theme => alpha(theme.palette.grey[900], 0.8)
              }
            })
          }}
        >
          <Avatar src={avatar} alt="avatar" />
        </IconButton>
      ) : (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Link to="/auth/signup">
            <Button>{t("BUTTON.register")}</Button>
          </Link>
          <Link to="/auth/signin">
            <Button variant="contained">{t("BUTTON.login")}</Button>
          </Link>
        </Stack>
      )}

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        disableScrollLock
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75
            }
          }
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.username}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleSignOut} sx={{ m: 1 }}>
          {t("BUTTON.logout")}
        </MenuItem>
      </Popover>
    </>
  );
};

export default AccountPopover;
