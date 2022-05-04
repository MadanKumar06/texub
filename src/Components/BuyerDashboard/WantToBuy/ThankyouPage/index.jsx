import React, { useState, useEffect } from "react";
import { Modal, Backdrop } from "@mui/material";
import checkoutmark from "../../../../Assets/CheckoutPage/check-mark.png";
import { Clear } from "@mui/icons-material";
import { Button } from "@mui/material";
import "./styles.scss";

export default function BasicModal({ Popup, PopupAvailable }) {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    Popup(false);
    PopupAvailable(false);
  };

  useEffect(() => {
    setTimeout(() => {
      handleClose();
    }, 3000);
  }, []);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="thankyou_popup"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className="thankyou_popup_main">
          <Clear
            className="clear_btn thankyou_popup_clear_btn"
            onClick={() => handleClose()}
          />
          <div className="thank_popup">
            <div className="dashboard_center">
              <div className="report_image">
                <img src={checkoutmark} alt="" />
              </div>
              <div className="order_msg common-block">
                <span className="msg">Order Successful!!</span>
              </div>
              <div className="logged_user common-block">
                <span className="msg">Dear Customer</span>
              </div>
              <div className="custom_msg common-block">
                <span className="msg">
                  You Have submitted the Want To Buy request successfully. You
                  will be notified through e-mail once the product is added with
                  the quoation by the sellers
                </span>
              </div>
              <div className="backto_home_btn common-block">
                <Button className="home_to_home">Back To Dashboard</Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
