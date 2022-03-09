import React, { useState } from "react";
import styles from "./styles";
import {
  Modal,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Backdrop,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { Clear } from "@mui/icons-material";
import SectionRight from "../SectionRight";

import TradeLicenseButton from "./TradeLicenseButton";
import BankDetails from "./BankDetails";
import TaxCertificateButton from "./TaxCertificateButton";
import NationalIdButton from "./NationalIdButton";

const BuyerKYCformSectionLeft = ({ classes, KYCformPop }) => {
  const [open, setOpen] = React.useState(true);
  const [documentButton, setDocumentButton] = useState("trade_license");
  const [kycFormData, setKycFormData] = useState({});
  const [validationFieldMessage, setValidationFieldMessage] = useState();
  let {
    buyer_kyc_section_left_container,
    modal,
    sections,
    section_left,
    section_right,
    header_section,
    clear_btn,
    info_text_lineNote_one,
    input_fields,
    checkbox_label,
    box,
    button_selected,
    button_notselected,
  } = classes;

  const handleClose = () => {
    setOpen(false);
    KYCformPop("");
  };

  const handleChangeButton = (event) => {
    setDocumentButton(event);
  };

  console.log(kycFormData);
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
            <p className={info_text_lineNote_one}>Required Documents</p>
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
                <TradeLicenseButton
                  SetFormValues={setKycFormData}
                  FormValues={kycFormData}
                  validationFieldMessage={validationFieldMessage}
                  setValidationFieldMessage={setValidationFieldMessage}
                />
              )}
              {documentButton === "tax_certificate" && (
                <TaxCertificateButton
                  SetFormValues={setKycFormData}
                  FormValues={kycFormData}
                  validationFieldMessage={validationFieldMessage}
                  setValidationFieldMessage={setValidationFieldMessage}
                />
              )}
              {documentButton === "national_id" && (
                <NationalIdButton
                  SetFormValues={setKycFormData}
                  FormValues={kycFormData}
                  validationFieldMessage={validationFieldMessage}
                  setValidationFieldMessage={setValidationFieldMessage}
                />
              )}

              <FormControlLabel
                value="yes"
                control={<Checkbox color="color_third" />}
                label="Automated Reminder on Expiry."
                labelPlacement="end"
                className={checkbox_label}
              />
              <BankDetails
                SetFormValues={setKycFormData}
                FormValues={kycFormData}
              />
            </div>
          </div>
          <div className={section_right}>
            <SectionRight
              handleClose={handleClose}
              SetFormValues={setKycFormData}
              FormValues={kycFormData}
              validationFieldMessage={validationFieldMessage}
              setValidationFieldMessage={setValidationFieldMessage}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default withStyles(styles)(BuyerKYCformSectionLeft);