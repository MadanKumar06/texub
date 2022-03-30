import React, { useState, useEffect } from "react";
import { TextField, InputLabel } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "../styles";

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
    handleSwitchCase([event.target.name], event.target.value);
  };
  // input validation on onchange
  const [inputValidation, setInputValidation] = useState({
    address_line_one: "",
    pin_zip_code: "",
    city: "",
    country: "",
  });
  const handleSwitchCase = (fieldName, value) => {
    switch (fieldName[0]) {
      case "pin_zip_code":
        if (value !== 6) {
          setInputValidation((prevState) => ({
            ...prevState,
            pin_zip_code: "Please enter 6 digit pincode.",
          }));
        }
        break;
      default:
        break;
    }
  };
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
            classes: {
              asterisk: asterisk,
            },
          }}
          name="country"
          value={FormValues?.country}
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(OfficeAddressDetails);
