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
  const [{geo}, dispatch] = useStateValue()
  let {
    radio_btn_container,
    select_text,
    user_description,
    btn_user,
    radio_group,
    btn_link,
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
          Buyer -- Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
          diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
          erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
          et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
          Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor.
        </div>
      ) : (
        <div className={user_description}>
          Seller -- Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
          diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
          erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
          et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
          Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor.
        </div>
      )}
      <Link
        to={`${geo?.country_name}/register${userDescription ? "/buyer" : "/seller"}`}
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
