import React, { useState, useEffect } from "react";
import styles from "./styles";

import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  InputLabel,
  Box,
} from "@mui/material";
import { useStateValue } from "../../../store/state";
import ReCAPTCHA from "react-google-recaptcha";
import {
  isEmailValid,
  isPasswordValid,
  isFirstAndLastNameValid,
} from "../../../utilities";
import Autocomplete from "@mui/material/Autocomplete";
import { withStyles } from "@mui/styles";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import axios from "axios";
import baseUrl from "../../../Constant";

const BuyerRegistration = ({ classes }) => {
  const [{}, dispatch] = useStateValue();
  let {
    main_container,
    input_fields,
    checkbox_label,
    button_guest,
    asterisk,
    input_textField,
    auto_complete_input,
    validation_error,
    text_field_container,
    button_box,
    mobile_input,
  } = classes;
  const [countryList, setCountryList] = useState([]);
  const [buyerRegistrationData, setbuyerRegistrationData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    landline_number: "",
    email_address: "",
    password: "",
    company: "",
    designation: "",
    country: "",
    confrim_password: "",
    mobile_valid: "",
    remember_me: false,
  });
  const [inputValidation, setInputValidation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    landline_number: "",
    email_address: "",
    password: "",
    company: "",
    designation: "",
    country: "",
    confrim_password: "",
  });
  const handleMobileChangeInput = (value, data, event, formattedValue) => {
    setbuyerRegistrationData((prevState) => ({
      ...prevState,
      mobile_number: value,
      mobile_valid: value?.slice(data?.dialCode?.length),
    }));
    setInputValidation("");
    handleSwitchCase(["mobile_number"], value?.slice(data?.dialCode?.length));
  };
  const handleChangeInput = (event) => {
    if (event?.target?.name === "remember_me") {
      setbuyerRegistrationData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.checked,
      }));
      setInputValidation("");
      handleSwitchCase([event.target.name], event.target.value);
    } else {
      setbuyerRegistrationData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
      setInputValidation("");
      handleSwitchCase([event.target.name], event.target.value);
    }
  };
  const handleSwitchCase = (fieldName, value) => {
    switch (fieldName[0]) {
      case "first_name":
        if (!isFirstAndLastNameValid(value)) {
          setInputValidation((prevState) => ({
            ...prevState,
            first_name: "Please enter alphabet.",
          }));
        }
        break;
      case "last_name":
        if (!isFirstAndLastNameValid(value)) {
          setInputValidation((prevState) => ({
            ...prevState,
            last_name: "Please enter alphabet.",
          }));
        }
        break;
      case "mobile_number":
        if (value?.length < 6 || value?.length > 15) {
          document.getElementById("mobile_number")?.focus();
          setInputValidation((prevState) => ({
            ...prevState,
            mobile_number:
              "Please enter more than 6 and less than 16 digit mobile number.",
          }));
        }
        break;
      case "confrim_password":
        if (!(buyerRegistrationData?.password === value)) {
          setInputValidation((prevState) => ({
            ...prevState,
            confrim_password: "Password and confirm password does not match",
          }));
        }
        break;
      case "email_address":
        if (!isEmailValid(value)) {
          setInputValidation((prevState) => ({
            ...prevState,
            email_address: "Please enter the valid e-mail.",
          }));
        }
        break;
      case "password":
        if (!isPasswordValid(value)) {
          setInputValidation((prevState) => ({
            ...prevState,
            password:
              "Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character.",
          }));
        }
        break;
      // case "company":
      //   if (!value) {
      //     setInputValidation((prevState) => ({
      //       ...prevState,
      //       company: "Please enter the company.",
      //     }));
      //   }
      //   break;
      // case "designation":
      //   if (!value) {
      //     setInputValidation((prevState) => ({
      //       ...prevState,
      //       designation: "Please enter the designation.",
      //     }));
      //   }
      //   break;
      // case "country":
      //   if (!value) {
      //     setInputValidation((prevState) => ({
      //       ...prevState,
      //       country: "Please select the country.",
      //     }));
      //   }
      //   break;
      default:
        break;
    }
  };
  const handleClickValidation = (event) => {
    var errorHandle = false;
    if (!buyerRegistrationData?.first_name) {
      document.getElementById("first_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        first_name: "Please enter the first name.",
      }));
      errorHandle = true;
    }
    if (!buyerRegistrationData?.last_name) {
      document.getElementById("last_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        last_name: "Please enter the last name.",
      }));
      errorHandle = true;
    }
    if (!buyerRegistrationData?.email_address) {
      document.getElementById("email_address")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        email_address: "Please enter the e-mail.",
      }));
      errorHandle = true;
    } else if (!isEmailValid(buyerRegistrationData?.email_address)) {
      document.getElementById("email_address")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        email_address: "Please enter the valid e-mail.",
      }));
      errorHandle = true;
    }
    if (!buyerRegistrationData?.mobile_number) {
      document.getElementById("mobile_number")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        mobile_number: "Please enter the mobile number.",
      }));
      errorHandle = true;
    } else if (buyerRegistrationData?.mobile_number[1]?.length !== 10) {
      debugger;
      document.getElementById("mobile_number")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        mobile_number: "Please enter 10 digit mobile number.",
      }));
      errorHandle = true;
    }
    if (!buyerRegistrationData?.password) {
      document.getElementById("password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        password: "Please enter your password.",
      }));
      errorHandle = true;
    } else if (!isPasswordValid(buyerRegistrationData?.password)) {
      document.getElementById("password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        password:
          "Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character.",
      }));
      errorHandle = true;
    }
    if (!buyerRegistrationData?.confrim_password) {
      document.getElementById("confrim_password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        confrim_password: "Please enter your confrim password.",
      }));
      errorHandle = true;
    } else if (
      !(
        buyerRegistrationData?.password ===
        buyerRegistrationData?.confrim_password
      )
    ) {
      document.getElementById("confrim_password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        confrim_password: "Password and confirm password does not match",
      }));
      errorHandle = true;
    }
    if (!buyerRegistrationData?.company) {
      document.getElementById("company")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        company: "Please enter the company.",
      }));
      errorHandle = true;
    }
    if (!buyerRegistrationData?.designation) {
      document.getElementById("designation")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        designation: "Please enter the designation.",
      }));
      errorHandle = true;
    }
    if (!buyerRegistrationData) {
      document.getElementById("last_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        country: "Please select the country.",
      }));
      errorHandle = true;
    }
    if (!errorHandle) {
      // Apicall fuction
      dispatch({
        type: "SET_KYC_OPEN_CLOSE",
        value: true,
      });
    }
  };

  //API for fetch dropdown values
  useEffect(() => {
    const fetchCountryData = () => {
      axios
        .get(baseUrl + "/getCountryList", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setCountryList(res?.data);
        })
        .catch((err) => {});
    };
    fetchCountryData();
  }, []);

  return (
    <div className={main_container}>
      <div className={input_fields}>
        <div className={input_textField}>
          <div className={text_field_container}>
            <TextField
              id="first_name"
              label="First Name"
              placeholder="First Name"
              fullWidth
              className="inputfield-box"
              InputLabelProps={{
                shrink: true,
                required: true,
                classes: {
                  asterisk: asterisk,
                },
              }}
              value={buyerRegistrationData?.first_name}
              name="first_name"
              onChange={handleChangeInput}
              variant="outlined"
            />
            <InputLabel className={validation_error}>
              {inputValidation?.first_name}
            </InputLabel>
          </div>
          <div className={text_field_container}>
            <TextField
              id="last_name"
              className="inputfield-box"
              label="Last Name"
              fullWidth
              placeholder="Last Name"
              InputLabelProps={{
                shrink: true,
                required: true,
                classes: {
                  asterisk: asterisk,
                },
              }}
              value={buyerRegistrationData?.last_name}
              name="last_name"
              onChange={handleChangeInput}
              variant="outlined"
            />
            <InputLabel className={validation_error}>
              {inputValidation?.last_name}
            </InputLabel>
          </div>
        </div>
        <div className={input_textField}>
          <div className={text_field_container}>
            <TextField
              id="email_address"
              label="E-mail Address"
              autoComplete="off"
              className="inputfield-box"
              placeholder="E-mail Address"
              fullWidth
              InputLabelProps={{
                shrink: true,
                required: true,
                classes: {
                  asterisk: asterisk,
                },
              }}
              value={buyerRegistrationData?.email_address}
              name="email_address"
              onChange={handleChangeInput}
              variant="outlined"
            />
            <InputLabel className={validation_error}>
              {inputValidation?.email_address}
            </InputLabel>
          </div>

          <div className={text_field_container}>
            <PhoneInput
              country={"in"}
              id="mobile_number"
              fullWidth
              label="Mobile Number"
              className={mobile_input}
              name="mobile_number"
              placeholder="Mobile number"
              value={buyerRegistrationData?.mobile_number}
              inputProps={{
                label: "Mobile Number",
                required: true,
              }}
              onChange={handleMobileChangeInput}
              variant="outlined"
            />
            <InputLabel className={validation_error}>
              {inputValidation?.mobile_number}
            </InputLabel>
          </div>
        </div>
        <div className={input_textField}>
          <div className={text_field_container}>
            <TextField
              id="password"
              label="Password"
              className="inputfield-box"
              fullWidth
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              InputLabelProps={{
                shrink: true,
                required: true,
                classes: {
                  asterisk: asterisk,
                },
              }}
              value={buyerRegistrationData?.password}
              name="password"
              onChange={handleChangeInput}
              variant="outlined"
            />
            <InputLabel className={validation_error}>
              {inputValidation?.password}
            </InputLabel>
          </div>
          <div className={text_field_container}>
            <TextField
              id="confrim_password"
              label="Confrim Password"
              fullWidth
              className="inputfield-box"
              type="password"
              placeholder="Confrim Password"
              InputLabelProps={{
                shrink: true,
                required: true,
                classes: {
                  asterisk: asterisk,
                },
              }}
              value={buyerRegistrationData?.confrim_password}
              name="confrim_password"
              onChange={handleChangeInput}
              variant="outlined"
            />
            <InputLabel className={validation_error}>
              {inputValidation?.confrim_password}
            </InputLabel>
          </div>
        </div>
        <div className={input_textField}>
          <div className={text_field_container}>
            <TextField
              id="landline_number"
              label="Landline Number"
              className="inputfield-box"
              fullWidth
              type="number"
              placeholder="Landline Number"
              InputLabelProps={{
                shrink: true,
              }}
              value={buyerRegistrationData?.landline_number}
              name="landline_number"
              onChange={handleChangeInput}
              variant="outlined"
            />
          </div>
          <div className={text_field_container}>
            <TextField
              id="company"
              label="Company Name"
              fullWidth
              placeholder="Company Name"
              className="inputfield-box"
              InputLabelProps={{
                shrink: true,
                required: true,
                classes: {
                  asterisk: asterisk,
                },
              }}
              value={buyerRegistrationData?.company}
              name="company"
              onChange={handleChangeInput}
              variant="outlined"
            />
            <InputLabel className={validation_error}>
              {inputValidation?.company}
            </InputLabel>
          </div>
        </div>
        <div className={input_textField}>
          <div className={text_field_container}>
            <TextField
              id="designation"
              className="inputfield-box"
              label="Designation"
              placeholder="Designation"
              fullWidth
              InputLabelProps={{
                shrink: true,
                required: true,
                classes: {
                  asterisk: asterisk,
                },
              }}
              value={buyerRegistrationData?.designation}
              name="designation"
              onChange={handleChangeInput}
              variant="outlined"
            />
            <InputLabel className={validation_error}>
              {inputValidation?.designation}
            </InputLabel>
          </div>

          <div className={text_field_container}>
            <Autocomplete
              value={buyerRegistrationData?.country}
              name="country"
              onChange={(event, newValue) => {
                setbuyerRegistrationData((prevState) => ({
                  ...prevState,
                  country: newValue,
                }));
                setInputValidation("");
              }}
              className={auto_complete_input}
              id="controllable-states-demo"
              options={countryList}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  className="inputfield-box"
                  placeholder="Country"
                  InputLabelProps={{
                    shrink: true,
                    required: true,
                    classes: {
                      asterisk: asterisk,
                    },
                  }}
                />
              )}
            />
            <InputLabel className={validation_error}>
              {inputValidation?.country}
            </InputLabel>
          </div>
        </div>
        <div className={input_textField}>
          <div style={{ width: "100%" }}>
            <FormControlLabel
              value="yes"
              control={<Checkbox color="secondary" />}
              label="Remember Me"
              labelPlacement="end"
              className={checkbox_label}
            />
            <FormControlLabel
              value="yes"
              control={<Checkbox color="secondary" />}
              label={
                <div>
                  By using this form you agree with the{" "}
                  <span>Terms of Use</span>
                  and <span>Privacy Policy</span> by this website.
                </div>
              }
              labelPlacement="end"
              className={checkbox_label}
            />
          </div>
          <ReCAPTCHA
            className="recaptcha_info1"
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          />
        </div>

        <Box className={button_box} fullWidth>
          {/* <Link to={`/thankyou/${type}`}> */}
          <Button
            onClick={() => handleClickValidation()}
            className={button_guest}
          >
            Register
          </Button>
          {/* </Link> */}
        </Box>
      </div>
      {/* <ArrowDropUp className={arrow_icon} />  */}
    </div>
  );
};
export default withStyles(styles)(BuyerRegistration);
