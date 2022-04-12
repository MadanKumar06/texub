import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  InputLabel,
} from "@mui/material";
import styles from "../SectionRight/styles";
import { withStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../../../store/state";
import axios from "axios";
import Constant from "../../../../Constant";
import swal from "sweetalert2";
var moment = require("moment");

function ValidationForKycForm({
  classes,
  values,
  handleCallValidation,
  documentButton,
  setDocumentButton,
}) {
  let { validation_error } = classes;
  const history = useNavigate();
  const [{}, dispatch] = useStateValue();
  let { button_box, button_guest, download_link, agreemnetDowload } = classes;
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
        trade_lic_number: "Please enter the trade lic number.",
      }));
      endPoint = true;
    }
    if (values.toString() === "Invalid Date") {
      setValid((prevState) => ({
        ...prevState,
        trade_expiration_date: "Please select valid date.",
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
        tax_image: "Please attatch certificate.",
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
    if (!values?.address_line_one) {
      setValid((prevState) => ({
        ...prevState,
        address_line_one: "Please enter the address line one.",
      }));
      endPoint = true;
    }
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
    if (!endPoint) {
      //API call
      FinalKYCFormSavaData();
    }
  };

  let localUserData = JSON.parse(localStorage?.getItem("userdata"));
  let company_name = localUserData?.custom_attributes?.filter(
    (itm) => itm?.attribute_code === "customer_company_name"
  );
  let country = localUserData?.custom_attributes?.filter(
    (itm) => itm?.attribute_code === "customer_country"
  );
  let customer_id = localUserData?.id;
  const FinalKYCFormSavaData = () => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });

    let Category_id = values?.categorylist?.map(
      (itm) => itm?.texub_category_id
    );
    let tax_date = moment(values?.tax_expiration_date).format("DD-MM-YYYY");
    let trade_date = moment(values?.trade_expiration_date).format("DD-MM-YYYY");

    let data = {
      kyc: {
        customer_id: customer_id,
        bussiness_name: company_name?.[0]?.value,
        trade_license_number: values?.trade_lic_number
          ? values?.trade_lic_number
          : "",
        license_expiry_date: trade_date ? trade_date : "",
        license_expiry_remainder: values?.trade_remainder_check ? 1 : 0,
        license_certificate: values?.trade_image_base64
          ? values?.trade_image_base64
          : "",
        tax_number: values?.tax_number ? values?.tax_number : "",
        tax_certificate: values?.tax_image_base64
          ? values?.tax_image_base64
          : "",
        tax_expire_date: tax_date ? tax_date : "",
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
        country: country?.[0]?.value,
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
          history(`/thankyou/${user_id?.group_id === 5 ? "buyer" : "seller"}`);
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
      });
  };

  const handlePdfDownload = (event) => {
    setAgreementChecked(event.target.checked);
    if (event.target.checked) {
      window.location =
        Constant.pdfDowloadUrl() +
        `/kyc/customer/selleragreement?address1=${
          values?.address_line_one ? values?.address_line_one : ""
        }&address2=${
          values?.address_line_two ? values?.address_line_two : ""
        }&country=${country?.[0]?.value}&city=${
          values?.city ? values?.city : ""
        }&pin=${
          values?.pin_zip_code ? values?.pin_zip_code : ""
        }&trade_license_number=${
          values?.trade_lic_number ? values?.trade_lic_number : ""
        }&tax_no=${
          values?.tax_number ? values?.tax_number : ""
        }&customer_id=${customer_id}`;
    }
  };
  return (
    <>
      <FormControlLabel
        value="yes"
        control={
          <Checkbox
            color="secondary"
            checked={agreementChecked}
            onClick={(event) => handlePdfDownload(event)}
          />
        }
        label={
          <p className={agreemnetDowload}>
            By Clicking Here, I state that I have read and understood the{" "}
            <span>Terms Of Agreement</span>.
          </p>
        }
        labelPlacement="end"
        className={download_link}
      />
      <InputLabel className={validation_error}>
        {valid?.agreementChecked}
      </InputLabel>
      <Box className={button_box} fullWidth>
        {documentButton === "national_id" ? (
          <Button
            className={button_guest}
            onClick={() => handleValidationClick()}
          >
            <span>Submit</span>
          </Button>
        ) : (
          <Button
            className={button_guest}
            onClick={() =>
              documentButton === "trade_license"
                ? setDocumentButton("tax_certificate")
                : setDocumentButton("national_id")
            }
          >
            <span>Continue</span>
          </Button>
        )}
      </Box>
    </>
  );
}

export default withStyles(styles)(ValidationForKycForm);
