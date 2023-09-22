import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { enqueueSnackbar, useSnackbar } from "notistack";

import { useAuth, useEventBus } from "src/hooks";
import { AuthService, AvatarService } from "src/services";
import UserService from "src/services/UserService";

const ChangePasswordModal = (userEmail) => {
  const { $on } = useEventBus();

  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    if (newPassword === confirmPassword && userEmail === email) {
      AuthService.changePassword(
        email,
        oldPassword,
        newPassword
      ).then((result) => {
        enqueueSnackbar("Updated password successfully!", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          }
        });
        handleCloseModal();
      });
    } else {
      enqueueSnackbar("The information is incorrect", {
        variant: "error",
        // The new password and confirmation password do not match
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        }
      });
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(
    () => {
      $on("modal/change-password/open", () => {
        setOpen(true);
      });
    },
    [$on]
  );

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
      <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Old Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordModal;
