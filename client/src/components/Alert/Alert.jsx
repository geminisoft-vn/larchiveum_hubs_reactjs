import { useEffect, useState } from "react";

import { Button,Dialog,DialogActions,DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import { useEventBus } from "src/hooks";

export default function AlertDialog() {
  const { $on } = useEventBus();

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    title: "",
    content: "",
    okText: "OK",
    cancelText: "Cancel",
    okCallback: null,
  });

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    $on("alert/open", (payload) => {
      setOpen(true);
      setInfo((prev) => ({ ...prev, ...payload }));
    });
  }, []);

  return (
    <div>
      <Dialog disableScrollLock open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{info.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {info.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{info.cancelText}</Button>
          <Button
            variant="contained"
            onClick={() => {
              info.okCallback();
              handleClose();
            }}
            autoFocus
          >
            {info.okText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
