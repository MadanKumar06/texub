import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./styles";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Constant from "../../Constant";
import { useStateValue } from "../../store/state";

const TransitionsModal = ({ classes }) => {
  const [{}, dispatch] = useStateValue();
  const history = useNavigate();
  let {
    kyc_detail_container,
    info_text_guest,
    input_fields,
    button_box,
    button_guest,
  } = classes;
  const [kycDetailData, setKycDetailData] = useState({
    additional_info: "",
    account_holder_name: "",
    bank_name: "",
    account_number: "",
  });
  const handleChangeInput = (event) => {
    setKycDetailData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    const fetchCategoryData = () => {
      let customer_id = JSON.parse(localStorage.getItem("userdata"));
      let data = {
        customerData: {
          customer_id: customer_id?.id,
        },
      };
      axios
        .post(Constant.baseUrl() + "/getBankDetails", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          res?.data?.length && setKycDetailData({ ...res?.data?.[0] });
        })
        .catch((err) => {});
    };
    fetchCategoryData();
  }, []);

  //API to Register
  const FinalKYCBankDetailsAdd = () => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let customer_id = JSON.parse(localStorage.getItem("userdata"));
    let data = {
      customerData: {
        customer_id: customer_id?.id,
        account_number: kycDetailData?.account_number,
        bank_name: kycDetailData?.bank_name,
        account_holder_name: kycDetailData?.account_holder_name,
        additional_info: kycDetailData?.additional_info,
      },
    };
    axios
      .post(Constant.baseUrl() + "/saveBankDetails", data, {
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
        history("/");
      })
      .catch((err) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
      });
  };
  return (
    <div className={kyc_detail_container}>
      <div className={info_text_guest}>KYC Details</div>
      <div className={input_fields}>
        <TextField
          id="account_number"
          label="Account Number"
          placeholder="Account Number"
          fullWidth
          className="inputfield-box"
          InputLabelProps={{
            shrink: true,
          }}
          value={kycDetailData?.account_number}
          name="account_number"
          onChange={handleChangeInput}
          variant="outlined"
        />
        <TextField
          id="bank_name"
          className="inputfield-box"
          label="Bank Name"
          fullWidth
          placeholder="Bank Name"
          InputLabelProps={{
            shrink: true,
          }}
          value={kycDetailData?.bank_name}
          name="bank_name"
          onChange={handleChangeInput}
          variant="outlined"
        />
        <TextField
          id="account_holder_name"
          className="inputfield-box"
          label="Account Holder Name"
          fullWidth
          placeholder="Account Holder Name"
          InputLabelProps={{
            shrink: true,
          }}
          value={kycDetailData?.account_holder_name}
          name="account_holder_name"
          onChange={handleChangeInput}
          variant="outlined"
        />
        <TextField
          id="additional_info"
          className="inputfield-box"
          label="Additional Info"
          fullWidth
          placeholder="Additional Info"
          InputLabelProps={{
            shrink: true,
          }}
          value={kycDetailData?.additional_info}
          name="additional_info"
          onChange={handleChangeInput}
          variant="outlined"
        />
        <Box className={button_box}>
          <Button
            onClick={() => FinalKYCBankDetailsAdd()}
            className={button_guest}
          >
            Save
          </Button>
        </Box>
      </div>
    </div>
  );
};
export default withStyles(styles)(TransitionsModal);
