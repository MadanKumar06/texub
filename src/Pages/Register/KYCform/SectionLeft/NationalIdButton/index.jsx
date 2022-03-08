import React, { useState, useEffect } from "react";
import styles from "../styles";

import { TextField, Autocomplete, InputLabel } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Clear } from "@mui/icons-material";
import uploadImage from "../../../../../Assets/CommonImage/KYC Form/Icon.png";

const NationalIdButton = ({
  classes,
  SetFormValues,
  FormValues,
  validationFieldMessage,
}) => {
  useEffect(() => {
    setInputValidation({ ...validationFieldMessage });
  }, [validationFieldMessage]);
  let {
    media_upload,
    sub_media_upload_container,
    sub_media_upload_part,
    sub_media_upload_label,
    input_image_name,
    input_image_name_clear_btn,
    auto_complete_input,
    validation_error,
  } = classes;

  const options = ["Option 1", "Option 2"];
  const handleImageChange = (event) => {
    SetFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.files[0],
    }));
    setInputValidation("");
    handleSwitchCase([event.target.name], event.target?.files[0]?.name);
  };
  // input validation on onchange
  const [inputValidation, setInputValidation] = useState({
    national_id_image: "",
  });
  const handleSwitchCase = (fieldName, value) => {
    switch (fieldName[0]) {
      case "national_id_image":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            national_id_image: "Please attach National id details.",
          }));
        }
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Autocomplete
        value={FormValues?.nationality}
        className={auto_complete_input}
        onInputChange={(event, newInputValue) => {
          SetFormValues((prevState) => ({
            ...prevState,
            nationality: newInputValue,
          }));
        }}
        id="Nationality"
        options={options}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            label="Nationality"
            placeholder="Nationality"
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
      <div className={media_upload}>
        <div className={sub_media_upload_container}>
          <div className={sub_media_upload_part}>
            <p>Attatch National ID</p>
            <span>*</span>
            <label
              className={sub_media_upload_label}
              htmlFor="icon-button-file"
            >
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                name="national_id_image"
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
            {inputValidation?.national_id_image}
          </InputLabel>
        </div>
        {FormValues?.national_id_image?.name && (
          <div className={input_image_name}>
            <div className={input_image_name}>
              <p>{FormValues?.national_id_image?.name}</p>
              <Clear
                className={input_image_name_clear_btn}
                onClick={() =>
                  SetFormValues((prevState) => ({
                    ...prevState,
                    national_id_image: "",
                  }))
                }
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default withStyles(styles)(NationalIdButton);
