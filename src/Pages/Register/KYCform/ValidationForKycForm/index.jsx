import React, { useState, useEffect } from "react";
import { Box, Button, Checkbox, InputLabel } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";

import styles from "../SectionRight/styles";
import { useStateValue } from "../../../../store/state";
import Constant from "../../../../Constant";
import { SessionExpiredLogout } from "../../../../utilities";
var moment = require("moment");

function ValidationForKycForm({
  classes,
  values,
  handleCallValidation,
  documentButton,
  setDocumentButton,
  KYCvalidationHandler,
  inputsValidations,
  setinputsValidations,
  isStatelist,
}) {
  let { validation_error } = classes;
  const history = useNavigate();
  const [{ geo, customnostore }, dispatch] = useStateValue();
  let { button_box, button_guest, agreemnetDowload, checkbox_agreement } =
    classes;
  const [valid, setValid] = useState(null);
  const [agreementChecked, setAgreementChecked] = useState(false);
  useEffect(() => {
    if (valid) {
      handleCallValidation(valid);
    }
  }, [valid]);

  const handleValidationClick = () => {
    let endPoint = false;
    setValid("");
    if (!values?.trade_lic_number) {
      setValid((prevState) => ({
        ...prevState,
        trade_lic_number: "Please enter the Trade License number.",
      }));
      endPoint = true;
    }
    if (!values?.trade_image?.name) {
      setValid((prevState) => ({
        ...prevState,
        trade_image: "Please attach the License details.",
      }));
      endPoint = true;
    }
    if (!values?.trade_image?.name) {
      setinputsValidations((prevState) => ({
        ...prevState,
        trade_image: "Please attach the License details.",
      }));
      endPoint = true;
    }
    if (!values?.tax_number) {
      setValid((prevState) => ({
        ...prevState,
        tax_number: "Please enter the tax number.",
      }));
      endPoint = true;
    }
    if (!values?.tax_image?.name) {
      setValid((prevState) => ({
        ...prevState,
        tax_image: "Please attach certificate.",
      }));
      endPoint = true;
    }
    if (!values?.tax_image?.name) {
      setinputsValidations((prevState) => ({
        ...prevState,
        tax_image: "Please attach certificate.",
      }));
      endPoint = true;
    }
    if (!values?.national_id_image?.name) {
      setValid((prevState) => ({
        ...prevState,
        national_id_image: "Please attach National id details.",
      }));
      endPoint = true;
    }
    if (!values?.national_id_image?.name) {
      setinputsValidations((prevState) => ({
        ...prevState,
        national_id_image: "Please attach National id details.",
      }));
      endPoint = true;
    }
    if (!values?.address_line_one) {
      setValid((prevState) => ({
        ...prevState,
        address_line_one: "Please enter the address line one.",
      }));
      endPoint = true;
    }
    if (isStatelist?.length) {
      if (!values?.state_dropdown_list) {
        setValid((prevState) => ({
          ...prevState,
          state_dropdown_list: "State field is Required.",
        }));
        setinputsValidations((prevState) => ({
          ...prevState,
          state_dropdown_list: "State field is Required.",
        }));
        endPoint = true;
      }
    }
    if (!isStatelist?.length) {
      if (!values?.state_text) {
        setinputsValidations((prevState) => ({
          ...prevState,
          state_text: "Please enter the state.",
        }));
        endPoint = true;
      }
    }
    /* if (!values?.state_dropdown_list && !values?.state_text) {
      setValid((prevState) => ({
        ...prevState,
        state_dropdown_list: "State field is Required.",
      }));
      endPoint = true;
    } */
    if (!values?.pin_zip_code) {
      setValid((prevState) => ({
        ...prevState,
        pin_zip_code: "Please enter the pincode.",
      }));
      endPoint = true;
    }
    if (!values?.city) {
      setValid((prevState) => ({
        ...prevState,
        city: "Please enter the city.",
      }));
      endPoint = true;
    }
    if (!agreementChecked) {
      setValid((prevState) => ({
        ...prevState,
        agreementChecked: "Please agree the terms of agreement",
      }));
      endPoint = true;
    }
    ScroltoTop();
    handleFocus();
    if (!endPoint && documentButton === "national_id") {
      // API call
      FinalKYCFormSavaData();
    }
    if (!endPoint) {
      setDocumentButton("national_id");
    }
  };
  console.log("values");
  console.log(values);
  console.log("valid");
  console.log(valid);
  const ScroltoTop = () => {
    document.getElementById("kyc_focus_input")?.focus();
  };
  const handleFocus = () => {
    if (!values?.trade_lic_number) {
      setDocumentButton("trade_license");
      document.getElementById("trade_image_container")?.focus();
      document.getElementById("trade_lic_number")?.focus();
    } else if (!values?.trade_image?.name) {
      setDocumentButton("trade_license");
      document.getElementById("trade_image_container")?.focus();
    } else if (!values?.tax_number) {
      setDocumentButton("tax_certificate");
      document.getElementById("tax_image_container")?.focus();
      document.getElementById("tax_number")?.focus();
    } else if (!values?.tax_image?.name) {
      setDocumentButton("tax_certificate");
      document.getElementById("tax_image_container")?.focus();
    } else if (!values?.national_id_image?.name) {
      setDocumentButton("national_id");
      document.getElementById("national_image_container")?.focus();
    } else if (!values?.address_line_one) {
      document.getElementById("address_line_one")?.focus();
    } else if (!values?.state_dropdown_list && !values?.state_text) {
      document.getElementById("state_dropdown_list")?.focus();
    } else if (!values?.city) {
      document.getElementById("city")?.focus();
    } else if (!values?.pin_zip_code) {
      document.getElementById("pin_zip_code")?.focus();
    } else if (!agreementChecked) {
      document.getElementById("agreementChecked")?.focus();
    }
  };
  let localUserData = JSON.parse(localStorage?.getItem("userdata"));
  let company_name = localUserData?.custom_attributes?.filter(
    (itm) => itm?.attribute_code === "customer_company_name"
  );
  const FinalKYCFormSavaData = () => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let Category_id = values?.categorylist?.map(
      (itm) => itm?.texub_category_id
    );
    let tax_date = values?.tax_expiration_date
      ? moment(values?.tax_expiration_date).format("DD-MM-YYYY")
      : "";
    let trade_date = values?.trade_expiration_date
      ? moment(values?.trade_expiration_date).format("DD-MM-YYYY")
      : "";
    let storedata = JSON.parse(localStorage.getItem("storedata"));
    let data = {
      kyc: {
        store_id: storedata?.store_id,
        customer_id: localUserData?.id,
        bussiness_name: company_name?.[0]?.value,
        group_id: localUserData?.group_id,
        state: {
          region:
            values?.state_text !== ""
              ? values?.state_text
              : values?.state_dropdown_list?.title,
          region_id: values?.state_dropdown_list?.value
            ? values?.state_dropdown_list?.value
            : 0,
        },
        trade_license_number: values?.trade_lic_number
          ? values?.trade_lic_number
          : "",
        license_expiry_date: trade_date,
        license_expiry_remainder: values?.trade_remainder_check ? 1 : 0,
        license_certificate: values?.trade_image_base64
          ? values?.trade_image_base64
          : "",
        tax_number: values?.tax_number ? values?.tax_number : "",
        tax_certificate: values?.tax_image_base64
          ? values?.tax_image_base64
          : "",
        tax_expire_date: tax_date,
        tax_expiry_remainder: values?.tax_remainder_check ? 1 : 0,
        full_name: "",
        passport_number: "",
        account_number: values?.account_number ? values?.account_number : "",
        bank_name: values?.bank_name ? values?.bank_name : "",
        passport_certificate: values?.nationality_image_base64
          ? values?.nationality_image_base64
          : "",
        passport_expire_date: "",
        passport_expiry_remainder: 0,
        account_holder_name: values?.account_holder_name
          ? values?.account_holder_name
          : "",
        additional_info: values?.additional_info ? values?.additional_info : "",
        category: Category_id?.toString() ? Category_id?.toString() : "",
        country: values?.country,
        door_no: values?.address_line_two ? values?.address_line_two : "",
        street: values?.address_line_one ? values?.address_line_one : "",
        pincode: values?.pin_zip_code ? values?.pin_zip_code : "",
        city: values?.city ? values?.city : "",
        other_category: values?.other_category ? values?.other_category : "",
      },
    };
    axios
      .post(Constant.baseUrl() + "/saveKyc", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        if (res?.data?.[0]?.status) {
          dispatch({
            type: "SET_KYC_OPEN_CLOSE",
            value: false,
          });
          let user_id = JSON.parse(localStorage.getItem("userdata"));
          localStorage.setItem("kycSubmitted", JSON.stringify(true));
          history(
            `/${customnostore ? customnostore : geo?.country_name}/thankyou/${
              user_id?.group_id === 5 ? "buyer" : "seller"
            }`
          );
        } else {
          swal.fire({
            text: `${res?.data?.[0]?.message}`,
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        if (err.response.status === 401) {
          SessionExpiredLogout();
        }
      });
  };

  const handlePdfDownload = () => {
    window.location.href =
      Constant.pdfDowloadUrl() +
      `/kyc/customer/selleragreement?address1=${
        values?.address_line_one ? values?.address_line_one : ""
      }&address2=${
        values?.address_line_two ? values?.address_line_two : ""
      }&state=${
        values?.state_text !== ""
          ? values?.state_text
          : values?.state_dropdown_list?.title
      }&country=${values?.country}&city=${
        values?.city ? values?.city : ""
      }&pin=${
        values?.pin_zip_code ? values?.pin_zip_code : ""
      }&trade_license_number=${
        values?.trade_lic_number ? values?.trade_lic_number : ""
      }&tax_no=${values?.tax_number ? values?.tax_number : ""}&customer_id=${
        localUserData?.id
      }`;
  };
  return (
    <>
      <div className={checkbox_agreement}>
        <Checkbox
          id="agreementChecked"
          color="color_third"
          checked={agreementChecked}
          onChange={(event) => {
            setAgreementChecked(event.target.checked);
            setValid((prev) => ({ ...prev, agreementChecked: "" }));
          }}
        />
        <p className={agreemnetDowload}>
          By Clicking Here, I state that I have read and understood the{" "}
          <span onClick={() => handlePdfDownload()}>Terms Of Agreement</span>.
        </p>
      </div>
      <InputLabel className={validation_error}>
        {valid?.agreementChecked}
      </InputLabel>
      <Box className={button_box} fullWidth>
        {documentButton === "national_id" ? (
          <Button
            className={button_guest}
            onClick={() => {
              handleValidationClick();
              KYCvalidationHandler();
            }}
          >
            <span>Submit</span>
          </Button>
        ) : (
          <Button
            className={button_guest}
            onClick={() => {
              handleValidationClick();
              KYCvalidationHandler();
            }}
          >
            <span>Continue</span>
          </Button>
        )}
      </Box>
    </>
  );
}

export default withStyles(styles)(ValidationForKycForm);
