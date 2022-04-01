import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import styles from "../SectionRight/styles";
import { withStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../../../store/state";
import axios from "axios";
import Constant from "../../../../Constant";
var moment = require("moment");

function ValidationForKycForm({
  classes,
  values,
  handleCallValidation,
  documentButton,
  setDocumentButton,
}) {
  const history = useNavigate();
  const [{}, dispatch] = useStateValue();
  let { button_box, button_guest } = classes;
  const [valid, setValid] = useState(null);

  useEffect(() => {
    if (valid) {
      handleCallValidation(valid);
    }
  }, [valid]);

  const handleValidationClick = () => {
    let endPoint = false;
    setValid("");

    if (!values?.trade_lic_number) {
      debugger;
      setValid((prevState) => ({
        ...prevState,
        trade_lic_number: "Please enter the trade lic number.",
      }));
      endPoint = true;
    }
    if (values.toString() === "Invalid Date") {
      debugger;
      setValid((prevState) => ({
        ...prevState,
        trade_expiration_date: "Please select valid date.",
      }));
      endPoint = true;
    }
    if (!values?.trade_image?.name) {
      debugger;
      setValid((prevState) => ({
        ...prevState,
        trade_image: "Please attach the License details.",
      }));
      endPoint = true;
    }
    if (!values?.tax_number) {
      debugger;
      setValid((prevState) => ({
        ...prevState,
        tax_number: "Please enter the tax number.",
      }));
      endPoint = true;
    }
    if (!values?.tax_image?.name) {
      debugger;
      setValid((prevState) => ({
        ...prevState,
        tax_image: "Please attatch certificate.",
      }));
      endPoint = true;
    }
    if (!values?.national_id_image?.name) {
      debugger;
      setValid((prevState) => ({
        ...prevState,
        national_id_image: "Please attach National id details.",
      }));
      endPoint = true;
    }
    if (!values?.address_line_one) {
      debugger;
      setValid((prevState) => ({
        ...prevState,
        address_line_one: "Please enter the address line one.",
      }));
      endPoint = true;
    }
    if (!values?.pin_zip_code) {
      debugger;
      setValid((prevState) => ({
        ...prevState,
        pin_zip_code: "Please enter the pincode.",
      }));
      endPoint = true;
    }
    if (!values?.city) {
      debugger;
      setValid((prevState) => ({
        ...prevState,
        city: "Please enter the city.",
      }));
      endPoint = true;
    }
    if (!endPoint) {
      //API call
      debugger;
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
    // dispatch({
    //   type: "SET_IS_LOADING",
    //   value: true,
    // });

    let Category_id = values?.categorylist?.map(
      (itm) => itm?.texub_category_id
    );
    let data = {
      kyc: {
        customer_id: customer_id,
        bussiness_name: company_name?.[0]?.value,
        trade_license_number: values?.trade_lic_number,
        // license_expiry_date: moment(
        //   values?.trade_expiration_date,
        //   "MM-DD-YYYY"
        // ),
        license_expiry_date: "22-04-2022",
        license_expiry_remainder: values?.trade_remainder_check ? 1 : 0,
        license_certificate: values?.trade_image_base64,
        tax_number: values?.tax_number,
        tax_certificate: values?.tax_image_base64,
        // tax_expire_date: moment(values?.tax_expiration_date, "MM-DD-YYYY"),
        tax_expire_date: "22-04-2022",
        tax_expiry_remainder: values?.tax_remainder_check ? 1 : 0,
        full_name: "test",
        passport_number: "test",
        // account_number: values?.account_number,
        // bank_name: values?.bank_name,
        account_number: "data",
        bank_name: "data",
        passport_certificate: values?.nationality_image_base64,
        passport_expire_date: "test",
        passport_expiry_remainder: "test",
        // account_holder_name: values?.account_holder_name,
        // additional_info: values?.additional_info,
        account_holder_name: "test",
        additional_info: "test",
        category: Category_id?.toString(),
        country: country?.[0]?.value,
        // door_no: values?.address_line_one,
         door_no: "7/565",
        street: values?.address_line_two,
        pincode: values?.pin_zip_code,
        city: values?.city,
        other_category: values?.other_category,
      },
    };
    axios
      .post(Constant.baseUrl() + "/saveKyc", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        dispatch({
          type: "SET_KYC_OPEN_CLOSE",
          value: false,
        });
        let user_id = JSON.parse(localStorage.getItem("userdata"));
        history(`/thankyou/${user_id?.group_id === 5 ? "buyer" : "seller"}`);
      })
      .catch((err) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
      });
  };
  return (
    <>
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
