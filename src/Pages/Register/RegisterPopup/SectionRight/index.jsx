import React, { useState, useEffect } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import { useStateValue } from "../../../../store/state";
import styles from "./styles";
import buyer_img from "../../../../Assets/CommonImage/RegisterPopup/user_select_buyer.png";
import seller_img from "../../../../Assets/CommonImage/RegisterPopup/user_select_seller.png";
const SectionRight = ({ classes, handleClose, handleClassChange }) => {
  const [{ geo, homeContent, customnostore }, dispatch] = useStateValue();
  let {
    radio_btn_container,
    select_text,
    user_description,
    btn_user,
    radio_group,
    btn_link,
    register_popup,
  } = classes;
  const [userDescription, setUserDescription] = useState(true);
  const handleChange = (event) => {
    handleClassChange(event);
  };

  return (
    <FormControl component="fieldset" className={radio_btn_container}>
      <FormLabel component="legend" className={select_text}>
        Select User Type
      </FormLabel>
      <RadioGroup
        row
        aria-label="position"
        name="position"
        defaultValue="buyer"
        className={radio_group}
      >
        <FormControlLabel
          value="buyer"
          control={<Radio color="secondary" />}
          label={
            <>
              <img src={buyer_img} alt="auth" />
              <p>Buyer</p>
            </>
          }
          labelPlacement="top"
          onClick={() => {
            handleChange("buyer");
            setUserDescription(true);
          }}
        />
        <FormControlLabel
          value="seller"
          control={<Radio color="secondary" />}
          label={
            <>
              <img src={seller_img} alt="auth" />
              <p>Seller</p>
            </>
          }
          labelPlacement="top"
          onClick={() => {
            handleChange("seller");
            setUserDescription(false);
          }}
        />
      </RadioGroup>
      {userDescription ? (
        <div className={user_description}>
          {/* {homeContent?.popup?.buyer_content} */}
          <span>
            Are you a buyer looking for high-quality IT products? Seek no
            farther for your quest is over.
          </span>
          <ol>
            <li>We have recognised top sellers on our website.</li>
            <li>
              Browse our up-to-date catalogue, which includes product
              specifications and pricing.
            </li>
            <li>
              Obtain quotes from various Hubs/Locations and buy online with a
              single click.
            </li>
          </ol>
          <p>
            <span>
              Register with us today to have access to a variety of reliable
              online verified sellers.
            </span>
            <span>Follow this link to sign up.</span>
          </p>
        </div>
      ) : (
        <div className={user_description}>
          {/* {homeContent?.popup?.seller_content} */}
          <p className={register_popup}>
            <span>
              Are you a Seller? Struggling to find a verified platform to sell?
              Worry no more TEXUB is here to help.
            </span>
            <span>Follow these simple steps to go global</span>
          </p>
          <ol>
            <li>Sell Globally with Multiple hubs</li>
            <li>Upload Multiple products and Dynamic pricing</li>
            <li>Reduce Credit risk </li>
            <li>Boost your revenue and reduce operational cost </li>
          </ol>
          <p>
            <span>Register now to get identified by global buyers. </span>
            <span>Click here to sign up as a seller.</span>
          </p>
        </div>
      )}
      <Link
        to={`/${customnostore ? customnostore : geo?.country_name}/register${
          userDescription ? "/buyer" : "/seller"
        }`}
        className={btn_link}
      >
        <Button
          variant="contained"
          className={btn_user}
          onClick={() => handleClose()}
        >
          Continue
        </Button>
      </Link>
    </FormControl>
  );
};
export default withStyles(styles)(SectionRight);
