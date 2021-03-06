import React, { useState, useEffect } from "react";
import { Modal, Backdrop } from "@mui/material";
import checkoutmark from "../../../../Assets/CheckoutPage/check-mark.png";
import { Clear } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useStateValue } from "../../../../store/state";
import { FormControlLabel, TextField, InputLabel } from "@mui/material";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
export default function BasicModal({ Popup, PopupAvailable }) {
 // const [{}, dispatch] = useStateValue();
  let userDetails = JSON.parse(localStorage.getItem("userdata"));
  const navigate = useNavigate();
  const [{ geo, customnostore }, dispatch] = useStateValue();

  const [open, setOpen] = React.useState(true);
  
  const back_to_Dashboard = ()=>{
    navigate(`/${customnostore ? customnostore : geo?.country_name}/buyerdashboard/dashboard`)
  }

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    else {
      setOpen(false);
      dispatch({
        type: "SET_PDP_POPUP_OPEN_CLOSE",
        value: false,
      });
      setOpen(false);
      Popup(false);
      PopupAvailable(false);
    }
  };


  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="thankyou_popup"
        closeAfterTransition
        onClose={handleClose}
        disableRestoreFocus={true}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className="thankyou_popup_main" style={{ outline: "none" }}>
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
                <span className="msg">Thank You!</span>
              </div>
              <div className="logged_user common-block">
                <span className="msg">Dear {userDetails?.firstname} {userDetails?.lastname}</span>
              </div>
              <div className="custom_msg common-block">
                <span className="msg">
                  You Have submitted the Want To Buy request successfully. You
                  will be notified through e-mail once the product is added with
                  the quotation by the sellers.
                </span>
              </div>
              <div className="backto_home_btn common-block">
                <Button className="home_to_home" onClick={()=> back_to_Dashboard()}>Back To Dashboard</Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
