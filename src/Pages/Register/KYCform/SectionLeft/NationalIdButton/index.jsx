import React, { useState, useEffect } from "react";
import styles from "../styles";

import { InputLabel } from "@mui/material";
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
    validation_error,
  } = classes;

  const handleImageChange = (event) => {
    SetFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.files[0],
    }));
    setInputValidation("");
  };
  // input validation on onchange
  const [inputValidation, setInputValidation] = useState({
    national_id_image: "",
  });
  return (
    <>
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
        </div>
        <InputLabel className={validation_error}>
          {inputValidation?.national_id_image}
        </InputLabel>
        {FormValues?.national_id_image?.name && (
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
        )}
      </div>
    </>
  );
};

export default withStyles(styles)(NationalIdButton);
