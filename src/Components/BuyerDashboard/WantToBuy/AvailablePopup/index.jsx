import React from "react";
import { Modal, Backdrop } from "@mui/material";
import checkoutmark from "../../../../Assets/buyerdashboard/wanttobuy/information-button.png";
import { Clear } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../../../store/state";
export default function BasicModal({ PopupAvailable }) {
  const [open, setOpen] = React.useState(true);
  const [{ customnostore, geo }, dispatch] = useStateValue();
  const Navigate = useNavigate();
  let userDetails = JSON.parse(localStorage.getItem("userdata"));

    const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
      else {
        setOpen(false);
          dispatch({
          type: "SET_PDP_POPUP_OPEN_CLOSE",
          value: false,
        });
        PopupAvailable(false)
      }
    }

  // const handleClose = () => {
  //   setOpen(false);
  //   PopupAvailable(false);
  // };
  const linkToRoute = () => {
    Navigate(`/${customnostore ? customnostore : geo?.country_name}/products`);
  };
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="thankyou_popup"
        closeAfterTransition
        BackdropComponent={Backdrop}
        onClose={handleClose}
        disableRestoreFocus={true}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className="thankyou_popup_main" style={{outline:'none'}}>
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
                <span className="msg">Available</span>
              </div>
              <div className="logged_user common-block">
                <span className="msg">Dear {userDetails?.firstname} {userDetails?.lastname}</span>
              </div>
              <div className="custom_msg common-block">
                <span className="msg">
                  This product is already available in our product listing page.
                  Please go to the page for more info
                </span>
              </div>
              <div className="backto_home_btn common-block">
                <Button className="home_to_home" onClick={() => linkToRoute()}>
                  Go To Product Listing Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
