import React, { useState, useEffect } from "react";
import { TextField, InputLabel } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "../styles";
import axios from "axios";
import Constant from "../../../../../Constant";

const OfficeAddressDetails = ({
  classes,
  SetFormValues,
  FormValues,
  validationFieldMessage,
  setValidationFieldMessage,
}) => {
  let {
    info_text_lineNote_one,
    asterisk,
    input_div,
    input_fields,
    validation_error,
    textFlied_separate,
  } = classes;

  useEffect(() => {
    setInputValidation({ ...validationFieldMessage });
  }, [validationFieldMessage]);

  // input state and onchange events
  const handleFormvalue = (event) => {
    SetFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    setInputValidation("");
  };

  // input validation on onchange
  const [inputValidation, setInputValidation] = useState({
    address_line_one: "",
    pin_zip_code: "",
    city: "",
    country: "",
  });
  const [countryList, setCountryList] = useState([]);

  var country_readonly = JSON.parse(
    localStorage.getItem("userdata")
  )?.custom_attributes?.filter(
    (itm) => itm?.attribute_code === "customer_country"
  );
  //API for fetch dropdown values
  useEffect(() => {
    const fetchCountryData = () => {
      axios
        .get(Constant.baseUrl() + "/getCountryList", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          let temp = res?.data?.filter(
            (itm) => itm?.value === country_readonly?.[0]?.value
          );
          setCountryList(temp);
          SetFormValues((prev) => ({
            ...prev,
            country: temp?.[0]?.label,
          }));
        })
        .catch((err) => {});
    };
    fetchCountryData();
  }, []);

  return (
    <div>
      <p className={info_text_lineNote_one}>Office Address</p>
      <div className={input_fields}>
        <TextField
          id="address_line_one"
          label="Address Line 1"
          placeholder="Address Line 1"
          fullWidth
          className="inputfield-box"
          InputLabelProps={{
            shrink: true,
            required: true,
            classes: {
              asterisk: asterisk,
            },
          }}
          name="address_line_one"
          onChange={handleFormvalue}
          value={FormValues?.address_line_one}
          variant="outlined"
        />
        <InputLabel className={validation_error}>
          {inputValidation?.address_line_one}
        </InputLabel>
        <TextField
          id="address_line_two"
          label="Address Line 2"
          placeholder="Address Line 2"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          className="inputfield-box"
          name="address_line_two"
          onChange={handleFormvalue}
          value={FormValues?.address_line_two}
        />
        <div className={input_div}>
          <div className={textFlied_separate}>
            <TextField
              id="country"
              label="Country"
              placeholder="Country"
              fullWidth
              disabled
              className="inputfield-box"
              InputLabelProps={{
                shrink: true,
                required: true,
                readOnly: true,
                classes: {
                  asterisk: asterisk,
                },
              }}
              name="country"
              value={countryList?.[0]?.label}
              variant="outlined"
            />
          </div>
          <div className={textFlied_separate}>
            <TextField
              id="city"
              label="City"
              placeholder="City"
              className="inputfield-box"
              fullWidth
              InputLabelProps={{
                shrink: true,
                required: true,
                classes: {
                  asterisk: asterisk,
                },
              }}
              name="city"
              onChange={handleFormvalue}
              value={FormValues?.city}
              variant="outlined"
            />
            <InputLabel className={validation_error}>
              {inputValidation?.city}
            </InputLabel>
          </div>
        </div>
        {/* <div className={textFlied_separate}> */}
        <TextField
          id="pin_zip_code"
          label="PIN/ZIP Code"
          placeholder="PIN/ZIP Code"
          fullWidth
          className="inputfield-box"
          InputLabelProps={{
            shrink: true,
            required: true,
            classes: {
              asterisk: asterisk,
            },
          }}
          name="pin_zip_code"
          onChange={handleFormvalue}
          value={FormValues?.pin_zip_code}
          variant="outlined"
        />
        <InputLabel className={validation_error}>
          {inputValidation?.pin_zip_code}
        </InputLabel>
        {/* </div> */}
      </div>
    </div>
  );
};

export default withStyles(styles)(OfficeAddressDetails);
