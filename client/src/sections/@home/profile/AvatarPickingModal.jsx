import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid
} from "@mui/material";
import { useSnackbar } from "notistack";

import { useAuth, useEventBus } from "src/hooks";
import { AvatarService } from "src/services";
import UserService from "src/services/UserService";

const AvatarPickingModal = () => {
  const { $on } = useEventBus();

  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const handleChangeAvatar = () => {
    UserService.update(user.id, {
      avatarId: selectedAvatar.id
    });
  };

  const loadAvatars = () => {
    AvatarService.getAll().then(avatars => {
      setAvatars(avatars);
    });
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSelectAvatar = avt => {
    setSelectedAvatar(avt);
  };

  const handleConfirmSelectAvatar = () => {
    handleChangeAvatar();
    handleCloseModal();
  };

  useEffect(() => {
    loadAvatars();
  }, []);

  useEffect(
    () => {
      $on("modal/avatar-picking/open", ({ defaultAvatar }) => {
        setOpen(true);

        setSelectedAvatar(defaultAvatar);
      });
    },
    [$on]
  );

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <DialogTitle>Change Avatar</DialogTitle>
      <DialogContent>
        <Grid container>
          {avatars &&
            avatars.map(avt => (
              <Grid key={avt.id} item lg={4} md={4} sm={6} xs={12}>
                <Button
                  variant={
                    selectedAvatar && avt.id === selectedAvatar.id
                      ? "outlined"
                      : "text"
                  }
                  onClick={() => {
                    handleSelectAvatar(avt);
                  }}
                >
                  {avt.isCustomAvatar ? (
                    <model-viewer
                      style={{ width: "100%", height: "100%" }}
                      src={avt.url}
                    />
                  ) : (
                    <img
                      width={512}
                      height={512}
                      style={{ width: "100%", height: "100%" }}
                      src={avt.images.preview.url}
                      alt=""
                    />
                  )}
                </Button>
              </Grid>
            ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <LoadingButton variant="contained" onClick={handleConfirmSelectAvatar}>
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AvatarPickingModal;
