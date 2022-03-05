import React, { useState, useEffect } from "react";
import styles from "../styles";

import { TextField, InputLabel } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Clear } from "@mui/icons-material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import uploadImage from "../../../../../Assets/CommonImage/KYC Form/Icon.png";

const TaxCertificateButton = ({
  classes,
  SetFormValues,
  FormValues,
  validationFieldMessage,
}) => {
  useEffect(() => {
    setInputValidation({ ...validationFieldMessage });
  }, [validationFieldMessage]);
  let {
    input_div,
    asterisk,
    media_upload,
    sub_media_upload_container,
    sub_media_upload_part,
    sub_media_upload_label,
    input_image_name,
    input_image_name_clear_btn,
    validation_error,
  } = classes;

  //Date onchange event
  const [dateChange, setDateChange] = useState(null);
  const handleChange = (newValue) => {
    setDateChange(newValue);
    setInputValidation("");
    handleSwitchCase(["tax_expiration_date"], newValue);
  };

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
    tax_number: "",
    tax_expiration_date: "",
    tax_image: "",
  });
  // input state and onchange events
  const handleImageChange = (event) => {
    SetFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.files[0],
    }));
    setInputValidation("");
    handleSwitchCase([event.target.name], event.target?.files[0]?.name);
  };

  const handleSwitchCase = (fieldName, value) => {
    switch (fieldName[0]) {
      case "tax_number":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            tax_number: "Please enter the tax number.",
          }));
        }
        break;

      case "tax_expiration_date":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            tax_expiration_date: "Please select expiration date.",
          }));
        } else if (value.toString() === "Invalid Date") {
          setInputValidation((prevState) => ({
            ...prevState,
            tax_expiration_date: "Please select valid date.",
          }));
        }
        break;
      case "tax_image":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            tax_image: "Please attatch certificate.",
          }));
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className={input_div}>
        <TextField
          id="tax_number"
          label="Tax Number"
          type="number"
          fullWidth
          placeholder="Tax Number"
          InputLabelProps={{
            shrink: true,
            required: true,
            classes: {
              asterisk: asterisk,
            },
          }}
          name="tax_number"
          value={FormValues?.tax_number}
          onChange={handleFormvalue}
          variant="outlined"
        />
        <InputLabel className={validation_error}>
          {inputValidation?.tax_number}
        </InputLabel>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Expiration Date"
            inputFormat="MM/yy"
            views={["year", "month"]}
            minDate={new Date()}
            value={dateChange}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                id="tax_expiration_date"
                placeholder="MM/YY"
                InputLabelProps={{
                  shrink: true,
                  required: false,
                  classes: {
                    asterisk: asterisk,
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
        <InputLabel className={validation_error}>
          {inputValidation?.tax_expiration_date}
        </InputLabel>
      </div>
      <div className={media_upload}>
        <div className={sub_media_upload_container}>
          <div className={sub_media_upload_part}>
            <p>Attatch Certificate</p>
            <span>*</span>
            <label
              className={sub_media_upload_label}
              htmlFor="icon-button-file"
            >
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                name="tax_image"
                onChange={handleImageChange}
              />
              <img
                src={uploadImage}
                alt="auth"
                aria-label="upload picture"
                component="span"
              />
            </label>
          </div>

          <small>(Supported format : .jpg/.png/.pdf)</small>
          <InputLabel className={validation_error}>
            {inputValidation?.tax_image}
          </InputLabel>
        </div>
        {FormValues?.tax_image && (
          <div className={input_image_name}>
            <p>{FormValues?.tax_image?.name}</p>
            <Clear
              className={input_image_name_clear_btn}
              onClick={() =>
                SetFormValues((prevState) => ({
                  ...prevState,
                  tax_image: "",
                }))
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

export default withStyles(styles)(TaxCertificateButton);
