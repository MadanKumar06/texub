import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import styles from "../SectionRight/styles";
import { withStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../../../store/state";

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
    if (!values?.business_name) {
      setValid((prevState) => ({
        ...prevState,
        business_name: "Please enter the business name.",
      }));
      endPoint = true;
    }
    if (!values?.trade_lic_number) {
      setValid((prevState) => ({
        ...prevState,
        trade_lic_number: "Please enter the trade lic number.",
      }));
      endPoint = true;
    }
    if (!values?.trade_expiration_date) {
      setValid((prevState) => ({
        ...prevState,
        trade_expiration_date: "Please select expiration date .",
      }));
      endPoint = true;
    } else if (values.toString() === "Invalid Date") {
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
    // if (!values?.tax_expiration_date) {
    //   setValid((prevState) => ({
    //     ...prevState,
    //     tax_expiration_date: "Please select expiration date.",
    //   }));
    // } else if (values?.toString() === "Invalid Date") {
    //   setValid((prevState) => ({
    //     ...prevState,
    //     tax_expiration_date: "Please select valid date.",
    //   }));
    // }
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
    if (!values?.country) {
      setValid((prevState) => ({
        ...prevState,
        country: "Please select the country.",
      }));
      endPoint = true;
    }

    if (endPoint) {
      dispatch({
        type: "SET_KYC_OPEN_CLOSE",
        value: false,
      });
      history("/thankyou/buyer");
    }
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
