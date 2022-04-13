import React, { useState, useEffect } from "react";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import thanksLogo from "../../../Assets/Productlist/gratitude_icon.png";
import { Button, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../../store/state";
import { Link } from "react-router-dom";
const ThankyouPage = ({ classes }) => {
  const { type } = useParams();
  const [{}, dispatch] = useStateValue();

  let userData = JSON.parse(localStorage.getItem("userdata"));
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
  const handleSignInOpenClose = () => {
    dispatch({
      type: "SET_SIGNIN_OPEN_CLOSE",
      value: true,
    });
  };
  // let userName = JSON.parse(localStorage.getItem("data"));
  return (
    <div
      className={`${
        type === "buyer"
          ? thankyou_container_buyer
          : type === "buyerkyc"
          ? thankyou_container_buyer
          : thankyou_container_seller
      }`}
    >
      <div className={thankyou_sub_container}>
        <div className={thankyou_logo}>
          <img src={thanksLogo} alt="auth" />
        </div>
        <p className={thankyou_title}>Thank You !</p>
        <p className={thankyou_user}>
          Dear {userData?.firstname} {userData?.lastname}
        </p>
        {(type === "buyer" || type === "seller") && (
          // <p className={thankyou_for_register}>
          //   You have submitted the Registration form successfully. Kindly login
          //   into your account to complete the KYC.
          // </p>
          <p className={thankyou_for_register}>
            <p>You have submitted the KYC form successfully</p>
            <p>and our team will get back to you after verification.</p>
            <p>
              Once your account has been approved, you will receive a mail
              notification.
            </p>
          </p>
        )}
        {(type === "buyerkyc" || type === "sellerkyc") && (
          <p className={thankyou_for_register}>
            <p>
              Your account is not yet activated, so kindly visit again once you
              receive
            </p>
            <p> the account activation email.</p>
          </p>
        )}
        {type === "buyer" ||
        type === "seller" ||
        type === "buyerkyc" ||
        type === "sellerkyc" ? (
          ""
        ) : (
          <Box className={thankyou_button_box} fullWidth>
            <Button
              className={thankyou_button_signin}
              onClick={() => handleSignInOpenClose()}
            >
              SignIn
            </Button>
          </Box>
        )}
        <Link to="/">
          <p className={thankyou_backto_home}>Back To Homepage</p>
        </Link>
      </div>
    </div>
  );
};

export default withStyles(styles)(ThankyouPage);
