import React, { useState } from "react";
import { Modal, Backdrop } from "@mui/material";
import { Button, Box } from "@mui/material";
import like from "../../Assets/PDP/thumbs-up.png";
import "./styles.scss";

const Index = ({ 
  AddpendingInvoiceAlert, 
  handleIsValidUser, 
  allertData, 
  isAddalltoPendingInvoice, 
  addalltopending,
  setisAddalltoPendingInvoice
}) => {
  const [open, setOpen] = useState(true);
  let userDetails = JSON.parse(localStorage.getItem("userdata"));
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
          <p className="name">
            Dear {userDetails?.firstname} {userDetails?.lastname}
          </p>
        </div>
        <div className="allert_text">
          <p className="text">
            <p>
              Once the product is added to pending invoice, nothing can be
              editable.
            </p>
            <p>
              {" "}
              You won't be able to modify the product quantity or remove the
              product{" "}
            </p>
            <p> from the pending invoice.</p>
          </p>
        </div>
        <div className="button_section">
         <Box className="button_box">
            {
              isAddalltoPendingInvoice === true?<Button className="button_cancel button_cancel_all"
              onClick={()=>{
                setisAddalltoPendingInvoice(false)
                handleClose()
              }}
              >
                Cancel
              </Button>:<Button className="button_cancel" onClick={() => handleClose()}>
                Cancel
              </Button>
            }
            {
              isAddalltoPendingInvoice === true?<Button className="button_add button_add_all"
                onClick={()=>addalltopending()}
              >Add</Button>:
              <Button
                className="button_add"
                onClick={() =>
                  handleIsValidUser({ info: "pending_invoice", data: allertData })
                }
              >
              Add
              </Button>
            }
          </Box>
        </div>
      </div>
    </Modal>
  );
};
export default Index;
