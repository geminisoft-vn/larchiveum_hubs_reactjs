import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Stack } from "@mui/material";
import UserService from "src/services/UserService";
import useSWR, { mutate } from "swr";

const UserModal = ({ open, onClose,isEditing, userToEdit, onRefreshData }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(2);
  const [verified, setVerified] = useState(0);

  useEffect(() => {
    if (isEditing && userToEdit) {
      setUsername(userToEdit.username);
      setEmail(userToEdit.email);
      setType(userToEdit.type);
      setVerified(userToEdit.verified);
    } 
  }, [isEditing, userToEdit]);

  const handleUpdateUser = () => {
    const updatedUserData = {
      username,
      email,
      type,
      verified,
    };
    if (!userToEdit?.id) return;
    UserService.update(userToEdit?.id, updatedUserData).then(() => {
      mutate("/auth/users");
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Update user"}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 16}}>
        <form>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: '16px', marginTop: "16px" }} 
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: '16px' }} 
          />
          <FormControl fullWidth variant="outlined" sx={{ marginBottom: '16px' }}>
            <InputLabel>User Type</InputLabel>
            <Select
              label="User Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={2}>User</MenuItem>
              <MenuItem value={3}>Manager</MenuItem>
              <MenuItem value={5}>Admin</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={verified}
                onChange={(e) => setVerified(e.target.checked)}
              />
            }
            label="Verified"
            sx={{ marginBottom: '16px' }}
          />
        </form>
      </DialogContent>
      <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ padding: '16px' }}>
        <Button variant="contained" color="primary" onClick={handleUpdateUser}>
        {"Update"}
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </Stack>
    </Dialog>
  );
};

export default UserModal;
