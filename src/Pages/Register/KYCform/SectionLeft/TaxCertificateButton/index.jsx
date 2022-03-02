import React from "react";
import styles from "../styles";

import { TextField } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Clear } from "@mui/icons-material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import uploadImage from "../../../../../Assets/CommonImage/KYC Form/Icon.png";

const TaxCertificateButton = ({ classes }) => {
  let {
    input_div,
    asterisk,
    media_upload,
    sub_media_upload_container,
    sub_media_upload_part,
    sub_media_upload_label,
    input_image_name,
    input_image_name_clear_btn,
  } = classes;

  const [dateChange, setDateChange] = React.useState(new Date());

  const handleChange = (newValue) => {
    setDateChange(newValue);
  };
  return (
    <>
      <div className={input_div}>
        <TextField
          id="outlined-textarea"
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
          variant="outlined"
        />
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
                placeholder="MM/YY"
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
        </LocalizationProvider>
      </div>
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

export default withStyles(styles)(TaxCertificateButton);
