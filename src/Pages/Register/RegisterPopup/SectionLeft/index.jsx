import React, { useState } from "react";
import { Modal, Backdrop } from "@mui/material";
import { withStyles } from "@mui/styles";
import clsx from "clsx";
import styles from "./styles";
import logo from "../../../../Assets/CommonImage/Logo/texub_logo_user_selection.svg";
import Register_section_Logo_one from "../../../../Assets/CommonImage/RegisterPopup/trade_and_auctions.png";
import Register_section_Logo_two from "../../../../Assets/CommonImage/RegisterPopup/secure_gateway.png";
import Register_section_Logo_three from "../../../../Assets/CommonImage/RegisterPopup/secured_technology.png";
import Register_section_Logo_four from "../../../../Assets/CommonImage/RegisterPopup/easy_inventory.png";
import Register_section_Logo_five from "../../../../Assets/CommonImage/RegisterPopup/product_upload.png";
import Register_section_Logo_arrow from "../../../../Assets/CommonImage/RegisterPopup/right_arrow_white.png";
import SectionRight from "../SectionRight";
import { Clear } from "@mui/icons-material";
import { useStateValue } from "../../../../store/state";

const TransitionsModal = ({ classes, openPopUp }) => {
  const [open, setOpen] = useState(true);
  const [clicked, setClicked] = useState("buyer");
  const [{ homeContent }, dispatch] = useStateValue();
  let {
    section_main,
    section_left,
    welcome_column,
    welcome_text,
    welcome_texub_logo,
    section_main_buyer,
    section_main_seller,
    modal,
    tagline_text,
    section_right,
    row_info_points,
    thumb_image,
    arrow_image,
    point_info_text,
    clear_btn,
    clearbuyer,
    clearseller,
  } = classes;
  const Images = [
    {
      content_img: Register_section_Logo_one,
      arrow_img: Register_section_Logo_arrow,
      text: "B2B Trade & Auctions",
    },
    {
      content_img: Register_section_Logo_two,
      arrow_img: Register_section_Logo_arrow,
      text: "Secure gateway & Crypto options",
    },
    {
      content_img: Register_section_Logo_three,
      arrow_img: Register_section_Logo_arrow,
      text: "Secured Technology",
    },
    {
      content_img: Register_section_Logo_four,
      arrow_img: Register_section_Logo_arrow,
      text: "Easy Inventory Management",
    },
    {
      content_img: Register_section_Logo_five,
      arrow_img: Register_section_Logo_arrow,
      text: "Simplified Product Upload",
    },
  ];
  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    else {
      setOpen(false);
      dispatch({
        type: "SET_REGISTER_OPEN_CLOSE",
        value: false,
      });
    }
  };
  const handleClassChange = (event) => {
    setClicked(event);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      disableRestoreFocus={true}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div
        className={clsx(
          section_main,
          `${clicked === "buyer" ? section_main_buyer : section_main_seller}`
        )}
        style={{
          backgroundImage: `${
            clicked === "buyer"
              ? `url('${homeContent?.popup?.buyer_banner}')`
              : `url('${homeContent?.popup?.seller_banner}')`
          }`,
          outline: "none",
        }}
      >
        <Clear
          className={clsx(
            clear_btn,
            `${clicked === "buyer" ? clearseller : clearseller}`
          )}
          onClick={() => handleClose()}
        />
        <div className={section_left}>
          <div className={welcome_column}>
            <div className={welcome_text}>Welcome to</div>
            <div className={welcome_texub_logo}>
              <img src={logo} alt="auth" />
            </div>
          </div>
          <div className={tagline_text}>
            A Secure, Safe And Seamless Digital Marketplace
          </div>
          {Images?.map((itm) => (
            <div className={row_info_points}>
              <div className={thumb_image}>
                <img src={itm?.content_img} alt="auth" />
              </div>
              <div className={arrow_image}>
                <img src={itm?.arrow_img} alt="auth" />
              </div>
              <div className={point_info_text}>{itm?.text}</div>
            </div>
          ))}
        </div>
        <div className={section_right}>
          <SectionRight
            handleClose={handleClose}
            handleClassChange={handleClassChange}
          />
        </div>
      </div>
    </Modal>
  );
};
export default withStyles(styles)(TransitionsModal);