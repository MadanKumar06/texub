import React, { useEffect, useState } from "react";
import { RadioGroup, FormControlLabel } from "@mui/material";

import { withStyles } from "@mui/styles";
import styles from "./styles";
import BuyerRegistration from "./BuyerRegistration";
import SellerRegistration from "./SellerRegistration";
import buyer_img from "../../Assets/CommonImage/RegisterPopup/user_select_buyer.png";
import seller_img from "../../Assets/CommonImage/RegisterPopup/user_select_seller.png";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../store/state";

const Registration = ({ classes }) => {
  const { type } = useParams();
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
    arrow_up,
    clicking_user_para,
  } = classes;
  const [{}, dispatch] = useStateValue();
  const [clicked, setClicked] = useState("buyer");
  const SigninPopUP = (event) => {
    dispatch({
      type: "SET_SIGNIN_OPEN_CLOSE",
      value: true,
    });
  };
  const handleChange = (event) => {
    setClicked(event);
  };
  useEffect(() => {
    setClicked(type);
  }, [type]);
const Buyerregimg = <img  className={`${clicked === "buyer" && clicking_user}`}  src={buyer_img}  alt="auth" /> ;
const Sellerregimg = <img  className={`${clicked === "buyer" && clicking_user}`}  src={seller_img}  alt="auth"/>;
const BuyerregText =  <p className={`${clicked === "buyer" && clicking_user_para}`}>Buyer</p>;
const SellerregText =  <p className={`${clicked === "buyer" && clicking_user_para}`}>Seller</p>;

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
            <p>Already a user?</p>
            <span onClick={() => SigninPopUP()}>Sign In</span>
          </p>
        </div>
        <div className={right_area}>
          <p className={select_text}>
              {clicked === "buyer" ? Buyerregimg  : Sellerregimg}  
              {/* {clicked === "buyer" ? "Buyer Registration" : "Seller Registration"} */}
              <span >
                  {clicked === "buyer" ? BuyerregText  : SellerregText}          
            </span>
          </p>
         
          {/* <RadioGroup
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
              onClick={() => handleChange("buyer")}
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
              onClick={() => handleChange("seller")}
            />
          </RadioGroup> */}
        </div>
      </div>
      {clicked === "buyer" ? <BuyerRegistration /> : <SellerRegistration />}
    </div>
  );
};
export default withStyles(styles)(Registration);
