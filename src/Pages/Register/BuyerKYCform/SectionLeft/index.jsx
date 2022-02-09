import React, { useState } from "react";
import {
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import { Clear } from "@material-ui/icons";
import Autocomplete from "@mui/material/Autocomplete";
import uploadImage from "../../../../Assets/CommonImage/KYC Form/Icon.png";
import SectionRight from "../SectionRight";
const BuyerKYCformSectionLeft = ({ classes, KYCformPop }) => {
  const [open, setOpen] = React.useState(true);
  const [documentButton, setDocumentButton] = useState("trade_license");
  let {
    buyer_kyc_section_left_container,
    modal,
    sections,
    section_left,
    section_right,
    header_section,
    clear_btn,
    info_text_lineNote_one,
    info_text_lineNote_two,
    input_fields,
    checkbox_label,
    box,
    asterisk,
    button_selected,
    button_notselected,
    auto_complete_input,
    input_div,
    media_upload,
    sub_media_upload_container,
    sub_media_upload_part,
    sub_media_upload_label,
    input_image_name,
    input_image_name_clear_btn,
    section_left_bank_details,
  } = classes;

  const handleClose = () => {
    setOpen(false);
    KYCformPop("");
  };
  const handleChangeButton = (event) => {
    setDocumentButton(event);
  };
  const options = ["Option 1", "Option 2"];
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={buyer_kyc_section_left_container}>
        <header className={header_section}>
          <p>KYC Form</p>
          <Clear className={clear_btn} onClick={() => handleClose()} />
        </header>
        <div className={sections}>
          <div className={section_left}>
            <p className={info_text_lineNote_one}>1. Required Documents</p>
            <Box className={box}>
              <Button
                className={`${
                  documentButton === "trade_license"
                    ? button_selected
                    : button_notselected
                }`}
                onClick={() => handleChangeButton("trade_license")}
              >
                Trade License
              </Button>
              <Button
                className={`${
                  documentButton === "tax_certificate"
                    ? button_selected
                    : button_notselected
                }`}
                onClick={() => handleChangeButton("tax_certificate")}
              >
                Tax Certificate
              </Button>
              <Button
                className={`${
                  documentButton === "national_id"
                    ? button_selected
                    : button_notselected
                }`}
                onClick={() => handleChangeButton("national_id")}
              >
                National ID
              </Button>
            </Box>
            <div className={input_fields}>
              {documentButton === "trade_license" && (
                <>
                  <TextField
                    id="outlined-textarea"
                    label="Business Name"
                    placeholder="Business Name"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                      required: true,
                      classes: {
                        asterisk: asterisk,
                      },
                    }}
                    variant="outlined"
                  />
                  <div className={input_div}>
                    <TextField
                      id="outlined-textarea"
                      label="Trade LIC Number"
                      placeholder="Trade LIC Number"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                        required: true,
                        classes: {
                          asterisk: asterisk,
                        },
                      }}
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-textarea"
                      label="Expiration Date"
                      placeholder="MM/YY"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                        required: true,
                        classes: {
                          asterisk: asterisk,
                        },
                      }}
                      variant="outlined"
                    />
                  </div>
                </>
              )}
              {documentButton === "tax_certificate" && (
                <>
                  <div className={input_div}>
                    <TextField
                      id="outlined-textarea"
                      label="Tax Number"
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
                    <TextField
                      id="outlined-textarea"
                      label="Expiration Date"
                      placeholder="MM/YY"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                        required: true,
                        classes: {
                          asterisk: asterisk,
                        },
                      }}
                      variant="outlined"
                    />
                  </div>
                </>
              )}
              {documentButton === "national_id" && (
                <Autocomplete
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  className={auto_complete_input}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="controllable-states-demo"
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
              )}
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
                <div className={input_image_name}>
                  <p>Adhaar_20456.Jpg</p>
                  <Clear
                    className={input_image_name_clear_btn}
                    // onClick={() => handleClose()}
                  />
                </div>
              </div>
              <FormControlLabel
                value="yes"
                control={<Checkbox color="color_third" />}
                label="Automated Reminder on Expiry."
                labelPlacement="end"
                className={checkbox_label}
              />

              <div className={section_left_bank_details}>
                <p className={info_text_lineNote_two}>2. Bank Details</p>
                <TextField
                  id="outlined-textarea"
                  label="Account No."
                  placeholder="Account Number"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
                <TextField
                  id="outlined-textarea"
                  label="Bank Name"
                  placeholder="Bank Name"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
                <TextField
                  id="outlined-textarea"
                  label="Account Holder’s Name"
                  placeholder="Account Holder’s Name"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
                <TextField
                  id="outlined-textarea"
                  label="Additional Infou"
                  placeholder="Additional Info"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </div>
            </div>
          </div>
          <div className={section_right}>
            <SectionRight handleClose={handleClose}/>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default withStyles(styles)(BuyerKYCformSectionLeft);
