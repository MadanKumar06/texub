import React from "react";
import { Modal } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import logo from "../../../../Assets/CommonImage/Logo/texub_logo_user_selection.svg";
import Register_section_Logo_one from "../../../../Assets/CommonImage/RegisterPopup/trade_and_auctions.png";
import Register_section_Logo_two from "../../../../Assets/CommonImage/RegisterPopup/secure_gateway.png";
import Register_section_Logo_three from "../../../../Assets/CommonImage/RegisterPopup/secured_technology.png";
import Register_section_Logo_four from "../../../../Assets/CommonImage/RegisterPopup/easy_inventory.png";
import Register_section_Logo_five from "../../../../Assets/CommonImage/RegisterPopup/product_upload.png";
import Register_section_Logo_arrow from "../../../../Assets/CommonImage/RegisterPopup/right_arrow_white.png";
import SectionRight from "../SectionRight";
const TransitionsModal = ({ classes, openPopUp }) => {
  const [open, setOpen] = React.useState(true);

  let {
    section_main,
    section_left,
    welcome_column,
    welcome_text,
    welcome_texub_logo,
    modal,
    tagline_text,
    section_right,
    row_info_points,
    thumb_image,
    arrow_image,
    point_info_text,
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
  const handleClose = () => {
    setOpen(false);
    openPopUp(false);
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={section_main}>
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
          <SectionRight />
        </div>
      </div>
    </Modal>
  );
};
export default withStyles(styles)(TransitionsModal);