import React, { useState } from "react";
import { RadioGroup, FormControlLabel } from "@material-ui/core";

import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import BuyerRegistration from "./BuyerRegistration";
import SellerRegistration from "./SellerRegistration";
import buyer_img from "../../Assets/CommonImage/RegisterPopup/user_select_buyer.png";
import seller_img from "../../Assets/CommonImage/RegisterPopup/user_select_seller.png";
const Registration = ({ classes }) => {
  let {
    register_main_container_buyer,
    register_main_container_seller,
    right_area,
    select_text,
    radio_group,
    left_area,
    area_container,
    user_signin,
    clicking_user,
    clicking_user_para,
  } = classes;
  const [user_type, setUser_type] = useState(true);
  const [clicked, setClicked] = useState("buyer");

  const handleChange = (event) => {
    setClicked(event);
  };
  return (
    <div
      className={`${
        clicked === "buyer"
          ? register_main_container_buyer
          : register_main_container_seller
      }`}
    >
      <div className={area_container}>
        <div className={left_area}>
          <h6>Create An Account</h6>
          <p className={user_signin}>
            <p>Already a user?</p> <span>Sign In</span>
          </p>
        </div>
        <div className={right_area}>
          <p className={select_text}>Select User Type</p>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="buyer"
            className={radio_group}
          >
            <FormControlLabel
              value="buyer"
              control={
                <>
                  <img
                    className={`${clicked === "buyer" && clicking_user}`}
                    src={buyer_img}
                    alt="auth"
                  />
                  <p className={`${clicked === "buyer" && clicking_user_para}`}>
                    Buyer
                  </p>
                </>
              }
              label="Buyer"
              labelPlacement="top"
              onClick={(event) => {
                setUser_type(true);
                handleChange("buyer");
              }}
            />
            <FormControlLabel
              value="seller"
              control={
                <>
                  <img
                    src={seller_img}
                    className={`${clicked === "seller" && clicking_user}`}
                    alt="auth"
                  />
                  <p
                    className={`${clicked === "seller" && clicking_user_para}`}
                  >
                    Seller
                  </p>
                </>
              }
              label="Seller"
              labelPlacement="top"
              onChange={handleChange}
              onClick={(event) => {
                setUser_type(false);
                handleChange("seller");
              }}
            />
          </RadioGroup>
        </div>
      </div>

      {user_type ? <BuyerRegistration /> : <SellerRegistration />}
    </div>
  );
};
export default withStyles(styles)(Registration);
