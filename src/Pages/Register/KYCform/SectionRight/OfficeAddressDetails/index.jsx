import React, { useState, useEffect } from "react";
import { TextField, InputLabel } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "../styles";
import Autocomplete from "@mui/material/Autocomplete";

const OfficeAddressDetails = ({
  classes,
  SetFormValues,
  FormValues,
  validationFieldMessage,
  setValidationFieldMessage,
}) => {
  let {
    info_text_lineNote_one,
    auto_complete_input,
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
      case "address_line_one":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            address_line_one: "Please enter the address line one.",
          }));
        }
        break;

      case "pin_zip_code":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            pin_zip_code: "Please enter the pincode.",
          }));
        }
        break;
      case "city":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            city: "Please enter the city.",
          }));
        }
        break;
      case "country":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            country: "Please select the country.",
          }));
        }
        break;
      default:
        break;
    }
  };

  const options = ["Option 1", "Option 2"];
  return (
    <div>
      <p className={info_text_lineNote_one}>Office Address</p>
      <div className={input_fields}>
        <TextField
          id="address_line_one"
          label="Address Line 1"
          placeholder="Address Line 1"
          fullWidth
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
        <Autocomplete
          value={FormValues?.country}
          className={auto_complete_input}
          onInputChange={(event, newInputValue) => {
            SetFormValues((prevState) => ({
              ...prevState,
              country: newInputValue,
            }));
            setInputValidation("");
            handleSwitchCase(["country"], newInputValue);
          }}
          id="country"
          options={options}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              label="Country"
              placeholder="Country"
              InputLabelProps={{
                shrink: true,
                required: true,
                classes: {
                  asterisk: asterisk,
                },
              }}
            />
          )}
        />
        <InputLabel className={validation_error}>
          {inputValidation?.country}
        </InputLabel>
      </div>
    </div>
  );
};

export default withStyles(styles)(OfficeAddressDetails);
