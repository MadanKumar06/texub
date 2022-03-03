import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import styles from "../SectionRight/styles";
import { withStyles } from "@mui/styles";

function ValidationForKycForm({ classes, values, handleCallValidation }) {
  let { button_box, button_guest } = classes;
  const [valid, setValid] = useState(null);

  useEffect(() => {
    if (valid) {
      handleCallValidation(valid);
    }
  }, [valid]);

  const handleValidationClick = () => {
    if (!values?.business_name) {
      setValid((prevState) => ({
        ...prevState,
        business_name: "Please enter the business name.",
      }));
    }
    if (!values?.trade_lic_number) {
      setValid((prevState) => ({
        ...prevState,
        trade_lic_number: "Please enter the trade lic number.",
      }));
    }
    if (!values?.trade_expiration_date) {
      setValid((prevState) => ({
        ...prevState,
        trade_expiration_date: "Please enter the trade lic number.",
      }));
    } else if (values.toString() === "Invalid Date") {
      setValid((prevState) => ({
        ...prevState,
        trade_expiration_date: "Please select valid date.",
      }));
    }
  };
  return (
    <>
      <Box className={button_box} fullWidth>
        <Button
          className={button_guest}
          onClick={() => handleValidationClick()}
        >
          <span>Submit</span>
        </Button>
      </Box>
    </>
  );
}

export default withStyles(styles)(ValidationForKycForm);
