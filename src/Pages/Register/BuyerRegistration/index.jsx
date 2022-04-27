import React, { useState, useEffect } from "react";
import styles from "./styles";
import "./popupstyle.scss";

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
  isCompanyNameValid,
  getAdminToken,
  isLandlineValid,
} from "../../../utilities";
import Autocomplete from "@mui/material/Autocomplete";
import { withStyles } from "@mui/styles";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert2";

import axios from "axios";
import Constant from "../../../Constant";

const BuyerRegistration = ({ classes }) => {
  const [{geo, customstore, customnostore}, dispatch] = useStateValue();
  const history = useNavigate();
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
    check_container,
    button_box,
    mobile_input,
  } = classes;
  const [countryList, setCountryList] = useState([]);
  const [adminToken, setAdminToken] = useState({});
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
    checkbox_confrim: false,
    recaptcha: false,
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
    checkbox_confrim: "",
    recaptcha: "",
  });
  const handleMobileChangeInput = (value, data, event, formattedValue) => {
    setbuyerRegistrationData((prevState) => ({
      ...prevState,
      mobile_number: value,
      mobile_valid: value?.slice(data?.dialCode?.length),
    }));
    setInputValidation((prevState) => ({
      ...prevState,
      mobile_number: "",
    }));
  };
  const handleChangeInput = (event) => {
    if (event?.target?.name === "checkbox_confrim") {
      setbuyerRegistrationData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.checked,
      }));
      setInputValidation((prevState) => ({
        ...prevState,
        [event.target.name]: "",
      }));
    } else {
      setbuyerRegistrationData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
      setInputValidation((prevState) => ({
        ...prevState,
        [event.target.name]: "",
      }));
    }
  };
  const handleClickValidation = (event) => {
    event.preventDefault();
    var errorHandle = false;
    if (!buyerRegistrationData?.first_name) {
      document.getElementById("first_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        first_name: "Please enter the first name.",
      }));
      errorHandle = true;
    } else if (!isFirstAndLastNameValid(buyerRegistrationData?.first_name)) {
      document.getElementById("first_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        first_name: "Please enter alphabet.",
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
    } else if (!isFirstAndLastNameValid(buyerRegistrationData?.last_name)) {
      document.getElementById("last_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        last_name: "Please enter alphabet.",
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
    } else if (
      buyerRegistrationData?.mobile_valid?.length < 6 ||
      buyerRegistrationData?.mobile_valid?.length > 15
    ) {
      document.getElementById("mobile_number")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        mobile_number:
          "Please enter more than 6 and less than 16 digit mobile number.",
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
        confrim_password: "Please enter your confirm password.",
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
        company: "Please enter the company name.",
      }));
      errorHandle = true;
    } else if (!isCompanyNameValid(buyerRegistrationData?.company)) {
      document.getElementById("company")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        company:
          "Please enter Alphabet or (Alphabet, Special Characters and Number)..",
      }));
      errorHandle = true;
    }
   if (!buyerRegistrationData?.landline_number) {
     document.getElementById("landline_number")?.focus();
     setInputValidation((prevState) => ({
       ...prevState,
       landline_number: "Please enter the landline number.",
     }));
     errorHandle = true;
   } else if (
     buyerRegistrationData?.landline_number &&
     !isLandlineValid(buyerRegistrationData?.landline_number)
   ) {
     document.getElementById("landline_number")?.focus();
     setInputValidation((prevState) => ({
       ...prevState,
       landline_number: "Please enter the valid landline number.",
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
    } else if (!isFirstAndLastNameValid(buyerRegistrationData?.designation)) {
      document.getElementById("designation")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        designation: "Please enter alphabet.",
      }));
      errorHandle = true;
    }
    if (!buyerRegistrationData?.country) {
      document.getElementById("country")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        country: "Please select the country.",
      }));
      errorHandle = true;
    }
    if (!buyerRegistrationData?.recaptcha) {
      document.getElementById("recaptcha")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        recaptcha: "Please enter the recaptcha .",
      }));
      errorHandle = true;
    }
    if (!buyerRegistrationData?.checkbox_confrim) {
      document.getElementById("checkbox_confrim")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        checkbox_confrim: "Please agree to terms and conditions .",
      }));
      errorHandle = true;
    }
    if (!errorHandle) {
      // Apicall fuction
      FinalBuyerRegistration();
    }
  };

  //API for fetch dropdown values
  useEffect(() => {
    const fetchCountryData = () => {
      axios
        .get(Constant.baseUrl() + "/getCountryList", {
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

  //API to fetch admin token
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);


  //API to Register
  const FinalBuyerRegistration = () => {
    let storedata = JSON.parse(localStorage.getItem('storedata'))
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let data = {
      customer: {
        group_id: 5,
        website_id: storedata?.website_id,
        store_id: storedata?.store_id,
        email: buyerRegistrationData?.email_address,
        first_name: buyerRegistrationData?.first_name,
        last_name: buyerRegistrationData?.last_name,
        mobile_number: buyerRegistrationData?.mobile_number,
        password: buyerRegistrationData?.password,
        confirm_password: buyerRegistrationData?.confrim_password,
        landline_number: buyerRegistrationData?.landline_number,
        company_name: buyerRegistrationData?.company,
        country: buyerRegistrationData?.country?.value,
        designation: buyerRegistrationData?.designation,
        is_seller: 0,
      },
    };
    axios
      .post(Constant.baseUrl() + "/createCustomer", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        if (res?.data?.[0]?.status) {
          localStorage.setItem("register_success", JSON.stringify(res?.data));
          localStorage.setItem("token", res?.data?.[0]?.token);
          getUserData(res.data?.[0]?.token);
        } else {
          swal.fire({
            text: `${res.data?.[0]?.message}`,
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        swal.fire({
          text: `${error?.response?.data?.message || error.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  const getUserData = (token) => {
    axios
      .get(Constant.customerMeDetailUrl(), {
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
        localStorage.setItem("userdata", JSON.stringify(res?.data));
        localStorage.setItem(
          "isLoggedIn_auth",
          res?.data?.group_id === 1 ? false : true
        );
        history(`/${customnostore ? customnostore : geo?.country_name}`);
        setTimeout(() => {
          dispatch({
            type: "SET_KYC_OPEN_CLOSE",
            value: true,
          });
        }, 1000 / 2);
      })
      .catch((err) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
      });
  };
  return (
    <div className={main_container}>
      <div className={input_fields}>
        <form onSubmit={handleClickValidation}>
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
                id="landline_number"
                label="Landline Number"
                className="inputfield-box"
                fullWidth
                type="text"
                placeholder="Landline Number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={buyerRegistrationData?.landline_number}
                name="landline_number"
                onChange={handleChangeInput}
                variant="outlined"
              />
              <InputLabel className={validation_error}>
                {inputValidation?.landline_number}
              </InputLabel>
            </div>
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
          </div>
          <div className={input_textField}>
            <div className={text_field_container}>
              <TextField
                id="confrim_password"
                label="Confirm Password"
                fullWidth
                className="inputfield-box"
                type="password"
                placeholder="Confirm Password"
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
                  setInputValidation((prevState) => ({
                    country: "",
                  }));
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
            <div className={check_container}>
              <div>
                <Checkbox
                  value={buyerRegistrationData?.checkbox_confrim}
                  color="color_third"
                  name="checkbox_confrim"
                  onClick={(event) => handleChangeInput(event)}
                  className={checkbox_label}
                />
                <p>
                  By using this form you agree with the{" "}
                  <Link to={`/${customnostore ? customnostore : geo?.country_name}/termsofuse`} target="_blank">Terms of Use</Link> and{" "}
                  <Link to={`/${customnostore ? customnostore : geo?.country_name}/privacypolicy`} target="_blank">Privacy Policy</Link> by this
                  website.
                </p>
              </div>
              <InputLabel className={validation_error}>
                {inputValidation?.checkbox_confrim}
              </InputLabel>
            </div>
            <div className={text_field_container}>
              {/* 6LcaHDYfAAAAAOUR0jJWtEI128eoRL4xjBWOpjKD ---- site key */}
              <ReCAPTCHA
                className="recaptcha_info1 buyer-recaptcha_info"
                // 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI  --- Localllllll
                sitekey="6LcaHDYfAAAAAOUR0jJWtEI128eoRL4xjBWOpjKD"
                onChange={() => {
                  setbuyerRegistrationData((prevState) => ({
                    ...prevState,
                    recaptcha: true,
                  }));
                  setInputValidation((prevState) => ({
                    ...prevState,
                    recaptcha: "",
                  }));
                }}
                name="recaptcha"
              />
              <InputLabel className={validation_error}>
                {inputValidation?.recaptcha}
              </InputLabel>
            </div>
          </div>

          <Box className={button_box} fullWidth>
            <Button
              onClick={() => handleClickValidation()}
              className={button_guest}
              type="submit"
            >
              Register
            </Button>
            {/* </Link> */}
          </Box>
        </form>
      </div>
    </div>
  );
};
export default withStyles(styles)(BuyerRegistration);
