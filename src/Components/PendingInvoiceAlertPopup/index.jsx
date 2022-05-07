import React, { useState } from "react";
import { Modal, Backdrop } from "@mui/material";
import { Button, Box } from "@mui/material";
import like from "../../Assets/PDP/thumbs-up.png";
import "./styles.scss";

const Index = ({ AddpendingInvoiceAlert, handleIsValidUser }) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    AddpendingInvoiceAlert(false);
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      className="allert_modal"
      closeAfterTransition
      disableRestoreFocus={true}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className="allert_main">
        <div className="allert_like_section">
          <img src={like} alt="" />
        </div>
        <div className="allert_important">
          <p className="important">Important !</p>
        </div>
        <div className="allert_name">
          <p className="name">Dear Nikhil</p>
        </div>
        <div className="allert_text">
          <p className="text">
            Once the product ie added to pending invoice,nothing can be
            editable. You won't be able to modify the product quantity or remove
            the product from the pending invoice.
          </p>
        </div>
        <div className="button_section">
          <Box className="button_box">
            <Button className="button_cancel" onClick={() => handleClose()}>
              Cancel
            </Button>
            <Button
              className="button_add"
              onClick={() => handleIsValidUser("pending_invoice")}
            >
              Add
            </Button>
          </Box>
        </div>
      </div>
    </Modal>
  );
};
export default Index;
