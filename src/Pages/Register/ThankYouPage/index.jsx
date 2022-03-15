import React, { useState, useEffect } from "react";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import thanksLogo from "../../../Assets/Productlist/gratitude_icon.png";
import { Button, Box } from "@mui/material";
import { useParams } from "react-router-dom";
const ThankyouPage = ({ classes }) => {
  const { type } = useParams();
  let {
    thankyou_container_seller,
    thankyou_container_buyer,
    thankyou_sub_container,
    thankyou_title,
    thankyou_user,
    thankyou_for_register,
    thankyou_button_box,
    thankyou_button_signin,
    thankyou_backto_home,
    thankyou_logo,
  } = classes;

  return (
    <div
      className={`${
        type === "buyer" ? thankyou_container_buyer : thankyou_container_seller
      }`}
    >
      <div className={thankyou_sub_container}>
        <div className={thankyou_logo}>
          <img src={thanksLogo} alt="auth" />
        </div>
        <p className={thankyou_title}>Thank You !</p>
        <p className={thankyou_user}>Dear Nikhil</p>
        <p className={thankyou_for_register}>
          You have submitted the Registration form successfully. Kindly login
          into your account to complete the KYC.
        </p>
        <Box className={thankyou_button_box} fullWidth>
          <Button className={thankyou_button_signin}>SignIn</Button>
        </Box>
        <p className={thankyou_backto_home}>Back To Homepage</p>
      </div>
    </div>
  );
};

export default withStyles(styles)(ThankyouPage);
