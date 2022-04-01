import React, { useState, useEffect } from "react";
import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PopUpMessage = ({
  handleMessageModal,
  errorMessage,
  successMessage,
  routingPage,
}) => {
  var history = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    handleMessageModal({
      open: false,
    });
    // routingPage && history(`${"/"}`);
  };
  const handleOpenPopUp = () => {
    setOpen(true);
  };
  useEffect(() => {
    handleOpenPopUp();
  }, []);
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {(successMessage?.successMessage ? successMessage?.success : "") ||
          (errorMessage?.errorMessage ? errorMessage?.error : "")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {errorMessage?.errorMessage || successMessage?.successMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* {successMessage?.success !== "" ? (
          <Button onClick={handleClose} style={{ color: "#00cc44" }} autoFocus>
            Proceed
          </Button>
        ) : ( */}
        <Button onClick={handleClose} style={{ color: "#D71A1C" }} autoFocus>
          Ok
        </Button>
        {/* )} */}
      </DialogActions>
    </Dialog>
  );
};

export default PopUpMessage;
