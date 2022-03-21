import React, { useState } from "react";
import "./styles.scss";
import { TextField, InputLabel } from "@mui/material";
import { isPasswordValid, isEmailValid } from "../../../../utilities";
import MuiPhoneNumber from "material-ui-phone-number";
import { ArrowBackIosNew } from "@mui/icons-material";
const Index = (classes) => {
  let { validation_error } = classes;
  const [AccountInfoData, setAccountInfoData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    email_address: "",
    new_password: "",
    new_confrim_password: "",
  });
  console.log(AccountInfoData);

  // const [value, setValue] = React.useState();
  // const [inputValue, setInputValue] = React.useState("");
  const [inputValidation, setInputValidation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    email_address: "",
    new_password: "",
    new_confrim_password: "",
  });

  const handleChangeInput = (event) => {
    setAccountInfoData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    setInputValidation("");
    handleSwitchCase([event.target.name], event.target.value);
  };

  const handlephone = (event) => {
    setAccountInfoData((data) => ({
      ...data,
      mobile_number: event,
    }));
    handleSwitchCase("mobile_number", event);
  };

  const handleSwitchCase = (fieldName, value) => {
    switch (fieldName[0]) {
      case "first_name":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            first_name: "Please enter the first name.",
          }));
        } else if (!isEmailValid(value)) {
          setInputValidation((prevState) => ({
            ...prevState,
            email_address: "Please enter the valid e-mail.",
          }));
        }
        break;
      case "last_name":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            last_name: "Please enter your last name.",
          }));
        }
        break;
      case "mobile_number":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            mobile_number: "Please enter your mobile number.",
          }));
        }
        break;
      case "email_address":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            email_address: "Please enter your e-mail",
          }));
        } else if (!isEmailValid(value)) {
          setInputValidation((prevState) => ({
            ...prevState,
            email_address: "Please enter the valid e-mail.",
          }));
        }
        break;
      case "new_password":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            new_password: "Please enter your new password",
          }));
        } else if (!isPasswordValid(value)) {
          setInputValidation((prevState) => ({
            ...prevState,
            new_password:
              "Minimum 8 characters and 1 Alphabet, 1 Number & 1 Special Character.",
          }));
        }
        break;
      case "new_confrim_password":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            new_confrim_password: "Please enter confirm new password",
          }));
        } else if (!(AccountInfoData?.new_password === value)) {
          setInputValidation((prevState) => ({
            ...prevState,
            new_confrim_password:
              "Password and confirm password does not match",
          }));
        }
        break;
      default:
        break;
    }
  };
  const handleClickValidation = (event) => {
    var errorHandle = false;
    if (!AccountInfoData?.first_name) {
      document.getElementById("first_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        first_name: "Please enter the first name.",
      }));
      errorHandle = true;
    }
    if (!AccountInfoData?.last_name) {
      document.getElementById("last_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        last_name: "Please enter the last name.",
      }));
      errorHandle = true;
    }
    if (!AccountInfoData?.mobile_number) {
      document.getElementById("mobile_number")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        mobile_number: "Please enter the mobile number.",
      }));
      errorHandle = true;
    } else if (AccountInfoData?.mobile_number?.length !== 10) {
      document.getElementById("mobile_number")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        mobile_number: "Please enter 10 digit mobile number.",
      }));
      errorHandle = true;
    }
    if (!AccountInfoData?.email_address) {
      document.getElementById("email_address")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        email_address: "Please enter the email address.",
      }));
      errorHandle = true;
    }
    if (!AccountInfoData?.new_password) {
      document.getElementById("new_password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        new_password: "Please enter the new password.",
      }));
      errorHandle = true;
    }
    if (!AccountInfoData?.new_confrim_password) {
      document.getElementById("new_confrim_password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        new_confrim_password: "Please enter the new confirm password.",
      }));
      errorHandle = true;
    }

    // setConfirmpassword(event.target.value);
    // if (!(AccountInfoData)?.new_password === new_confrim_password){
    //   new_confrim_password:"password and confirm password does not match"
    // }
  };

  return (
    <div className="account_ifo_main">
      <span className="Account_heading">
        {" "}
        <p>EDIT PROFILE INFORMATION</p>
      </span>
      <div className="account_info_edit">
        {/* <form> */}
        <div className="form">
          <div className="inputfield_section">
            <div className="inputfield">
              <p>First Name</p>
              <TextField
                id="first_name"
                name="first_name"
                value={AccountInfoData?.first_name}
                InputLabelProps={{
                  shrink: false,
                }}
                onChange={handleChangeInput}
              />
              <InputLabel className={validation_error}>
                {inputValidation?.first_name}
              </InputLabel>
            </div>
            <div className="inputfield">
              <p>Last Name</p>
              <TextField
                id="last_name"
                name="last_name"
                value={AccountInfoData?.last_name}
                InputLabelProps={{
                  shrink: false,
                }}
                onChange={handleChangeInput}
              />
              <InputLabel className={validation_error}>
                {inputValidation?.last_name}
              </InputLabel>
            </div>
          </div>
          <div className="inputfield_section">
            <div className="inputfield">
              <p>Mobile Number</p>
              <MuiPhoneNumber
                fullwidth
                preferredCountries={["india"]}
                defaultCountry={"in"}
                id="mobile_number"
                name="mobile_number"
                value={AccountInfoData?.mobile_number}
                InputLabelProps={{
                  shrink: false,
                }}
                onChange={handlephone}
                variant="outlined"
              />
              {/* <TextField
              id="mobile_number"
              name="mobile_number"
              value={AccountInfoData?.mobile_number}
              InputLabelProps={{
                shrink: false,
              }}
              onChange={handleChangeInput}
            /> */}
              <InputLabel className={validation_error}>
                {inputValidation?.mobile_number}
              </InputLabel>
            </div>
            <div className="inputfield">
              <p>Email Address</p>
              <TextField
                id="email_address"
                name="email_address"
                value={AccountInfoData?.email_address}
                InputLabelProps={{
                  shrink: false,
                }}
                onChange={handleChangeInput}
              />
              <InputLabel className={validation_error}>
                {inputValidation?.email_address}
              </InputLabel>
            </div>
          </div>
          <div className="inputfield_section">
            <div className="inputfield">
              <p>New password</p>
              <TextField
                id="new_password"
                name="new_password"
                value={AccountInfoData?.new_password}
                type="password"
                InputLabelProps={{
                  shrink: false,
                }}
                onChange={handleChangeInput}
              />
              <InputLabel className={validation_error}>
                {inputValidation?.new_password}
              </InputLabel>
            </div>
            <div className="inputfield">
              <p>Confirm New password</p>
              <TextField
                id="new_confrim_password"
                name="new_confrim_password"
                value={AccountInfoData?.new_confrim_password}
                type="password"
                InputLabelProps={{
                  shrink: false,
                }}
                onChange={handleChangeInput}
              />
              <InputLabel className={validation_error}>
                {inputValidation?.new_confrim_password}
              </InputLabel>
            </div>
          </div>
          <div className="accountinfo_btn">
            <button className="account_info_cancel">Cancel</button>
            <button
              className="account_info_save"
              onClick={() => handleClickValidation()}
            >
              Save Changes
            </button>
          </div>
          <div className="my_profile_back">
            <ArrowBackIosNew />
            <span>
              <p className="back">Back</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
