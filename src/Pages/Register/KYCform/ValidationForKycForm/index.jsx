import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import styles from "../SectionRight/styles";
import { withStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../../../store/state";
import axios from "axios";
import Constant from "../../../../Constant";

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
    if (!endPoint) {
      //API call
      debugger;
      FinalKYCFormSavaData();
    }
  };
  const FinalKYCFormSavaData = () => {
    // dispatch({
    //   type: "SET_IS_LOADING",
    //   value: true,
    // });
    debugger;
    let data = {
      kyc: {
        customer_id: 341,
        bussiness_name: "business1",
        trade_license_number: "123782",
        license_expiry_date: "20-02-2023",
        license_expiry_remainder: 0,
        license_certificate: "png;i",
        tax_number: "56782342",
        tax_certificate: "jpeg;/9",
        tax_expire_date: "20-02-2025",
        tax_expiry_remainder: 0,
        full_name: "test2",
        passport_number: "2356893939112",
        account_number: "78234567812",
        bank_name: "hdfc12",
        passport_certificate: "png;i",
        passport_expire_date: "20-04-2022",
        passport_expiry_remainder: 0,
        account_holder_name: "udhaya2",
        additional_info: "test add2dddddddd",
        category: "cat1,cat2,cat3,cat4",
        country: "indiaa",
        door_no: "7/899",
        street: "maravv",
        pincode: "6235142",
        city: "bangalore",
        other_category: "other categoryy",
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
        localStorage.setItem("register_success", JSON.stringify(res?.data));
        history("/thankyou/buyer");
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
