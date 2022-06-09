import React, { useState } from "react";
import styles from "./styles";
import { Modal, Button, Box, Backdrop } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Clear } from "@mui/icons-material";
import SectionRight from "../SectionRight";
import "./style.scss"

import TradeLicenseButton from "./TradeLicenseButton";
import BankDetails from "./BankDetails";
import TaxCertificateButton from "./TaxCertificateButton";
import NationalIdButton from "./NationalIdButton";
import { useStateValue } from "../../../../store/state";

const BuyerKYCformSectionLeft = ({ classes }) => {
  const [open, setOpen] = React.useState(true);
  const [documentButton, setDocumentButton] = useState("trade_license");
  const [kycFormData, setKycFormData] = useState({});
  const [validationFieldMessage, setValidationFieldMessage] = useState();
  const [{}, dispatch] = useStateValue();
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
    box,
    button_selected,
    button_notselected,
  } = classes;
  const [inputsValidations,setinputsValidations] = useState({
    trade_lic_number: "",
    tax_number: "",
    address_line_one: "",
    state_text: "",
    city: "",
    pin_zip_code: "",
    agreementChecked: "",
    trade_image: "",
    tax_image: ""
  })
  const [isStatelist,setisStatelist] = useState([])

  const KYCvalidationHandler = () => {
    let isError = false;
    if (!kycFormData?.trade_lic_number) {
      setinputsValidations((prevState) => ({
        ...prevState,
        trade_lic_number: "Please enter the Trade License number.",
      }));
      isError = true;
    }
    if (!kycFormData?.tax_number) {
      setinputsValidations((prevState) => ({
        ...prevState,
        tax_number: "Please enter the tax number.",
      }));
      isError = true;
    }
    if (!kycFormData?.address_line_one) {
      setinputsValidations((prevState) => ({
        ...prevState,
        address_line_one: "Please enter the address line one.",
      }));
      isError = true;
    }
    if(!isStatelist?.length){
      if (!kycFormData?.state_text) {
        setinputsValidations((prevState) => ({
          ...prevState,
          state_text: "Please enter the state.",
        }));
        isError = true;
      }
    }
    if (!kycFormData?.city) {
      setinputsValidations((prevState) => ({
        ...prevState,
        city: "Please enter the city.",
      }));
      isError = true;
    }
    if (!kycFormData?.pin_zip_code) {
      setinputsValidations((prevState) => ({
        ...prevState,
        pin_zip_code: "Please enter the pincode.",
      }));
      isError = true;
    }

  };

  const handleClose = () => {
    setOpen(false);
    dispatch({
      type: "SET_KYC_OPEN_CLOSE",
      value: false,
    });
  };

  const handleChangeButton = (event) => {
    setDocumentButton(event);
  };
  //HIDE and show bank details for different users
  let HideAndShowBankDetails = JSON.parse(localStorage.getItem("userdata"));
  let buyer_or_seller = HideAndShowBankDetails?.group_id;
  let seller = HideAndShowBankDetails?.custom_attributes?.filter(
    (itm) => itm?.attribute_code === "customer_country"
  );
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={modal}
      open={open}
      disableRestoreFocus={true}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={buyer_kyc_section_left_container}>
        <header className={header_section} >
          <p>KYC Form</p>
          {/* <Clear className={clear_btn} onClick={() => handleClose()} /> */}
        </header>
        <div className={sections} style={{position:"relative"}}>
          <div className={section_left}>
            <p className={info_text_lineNote_one}>Required Documents 
              <span id="kyc_scrolltop"><input type="text" id="kyc_focus_input"/></span>
            </p>
            <Box className={box}>
              <Button
                id="trade_image_container"
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
                id="tax_image_container"
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
                id="national_image_container"
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
                  inputsValidations={inputsValidations}
                  setinputsValidations={setinputsValidations}
                />
              )}
              {documentButton === "tax_certificate" && (
                <TaxCertificateButton
                  SetFormValues={setKycFormData}
                  FormValues={kycFormData}
                  validationFieldMessage={validationFieldMessage}
                  setValidationFieldMessage={setValidationFieldMessage}
                  inputsValidations={inputsValidations}
                  setinputsValidations={setinputsValidations}
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
              {seller?.[0]?.value !== "US" && buyer_or_seller === 6 && (
                <BankDetails
                  SetFormValues={setKycFormData}
                  FormValues={kycFormData}
                />
              )}
            </div>
          </div>
          <div className={section_right}>
            <SectionRight
              handleClose={handleClose}
              SetFormValues={setKycFormData}
              FormValues={kycFormData}
              validationFieldMessage={validationFieldMessage}
              setValidationFieldMessage={setValidationFieldMessage}
              setDocumentButton={setDocumentButton}
              documentButton={documentButton}
              KYCvalidationHandler={KYCvalidationHandler}
              inputsValidations={inputsValidations}
              setinputsValidations={setinputsValidations}
              getisStatelist={(state)=>setisStatelist(state)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default withStyles(styles)(BuyerKYCformSectionLeft);
