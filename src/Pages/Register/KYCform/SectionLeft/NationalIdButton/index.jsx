import React from "react";
import styles from "../styles";

import { TextField, Autocomplete } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Clear } from "@mui/icons-material";
import uploadImage from "../../../../../Assets/CommonImage/KYC Form/Icon.png";

const NationalIdButton = ({ classes, SetFormValues, FormValues }) => {
  let {
    media_upload,
    sub_media_upload_container,
    sub_media_upload_part,
    sub_media_upload_label,
    input_image_name,
    input_image_name_clear_btn,
    auto_complete_input,
  } = classes;

  const options = ["Option 1", "Option 2"];
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
              <input accept="image/*" id="icon-button-file" type="file" />
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
        <div className={input_image_name}>
          <p>Adhaar_20456.Jpg</p>
          <Clear
            className={input_image_name_clear_btn}
            // onClick={() => handleClose()}
          />
        </div>
      </div>
    </>
  );
};

export default withStyles(styles)(NationalIdButton);
