import React from "react";
import PropTypes from "prop-types";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const Modal = props => {
  const { isActive, setIsActive, title, width } = props;

  const handleClose = () => {
    setIsActive(false);
  };

  return (
    <Dialog maxWidth="xl" onClose={handleClose} open={isActive}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Save</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

Modal.propTypes = {
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
  title: PropTypes.string,
  width: PropTypes.number,
  children: PropTypes.element
};

export default Modal;