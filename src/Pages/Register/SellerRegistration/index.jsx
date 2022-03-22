import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  InputLabel,
  Box,
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { isEmailValid, isPasswordValid } from "../../../utilities";
import { ArrowDropUp } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";
import { withStyles } from "@mui/styles";
import { Link, useParams } from "react-router-dom";
import { useStateValue } from "../../../store/state";
import styles from "./styles";
const BuyerRegistration = ({ classes }) => {
  let { type } = useParams();
  const [{}, dispatch] = useStateValue();
  let {
    main_container,
    input_fields,
    checkbox_label,
    button_guest,
    asterisk,
    input_textField,
    validation_error,
    text_field_container,
    arrow_icon,
    button_box,
    recaptcha_info,
    auto_complete_input,
  } = classes;
  const options = ["Option 1", "Option 2"];
  const [value, setValue] = useState({
    role: "",
    region: "",
    country: "",
  });
  const [sellerRegistrationData, setsellerRegistrationData] = useState({
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
  const handleChangeInput = (event) => {
    if (event?.target?.name === "remember_me") {
      setsellerRegistrationData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.checked,
      }));
      setInputValidation("");
      handleSwitchCase([event.target.name], event.target.value);
    } else {
      setsellerRegistrationData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
      setInputValidation("");
      handleSwitchCase([event.target.name], event.target.value);
    }
  };
  const handleSwitchCase = (fieldName, value) => {
    switch (fieldName[0]) {
      // case "first_name":
      //   if (!value) {
      //     setInputValidation((prevState) => ({
      //       ...prevState,
      //       first_name: "Please enter the first name.",
      //     }));
      //   }
      //   break;
      // case "last_name":
      //   if (!value) {
      //     setInputValidation((prevState) => ({
      //       ...prevState,
      //       last_name: "Please enter the last name.",
      //     }));
      //   }
      //   break;
      case "mobile_number":
        // if (!value) {
        //   document.getElementById("mobile_number")?.focus();
        //   setInputValidation((prevState) => ({
        //     ...prevState,
        //     mobile_number: "Please enter the mobile number.",
        //   }));
        // } else
        if (value?.length !== 10) {
          document.getElementById("mobile_number")?.focus();

          setInputValidation((prevState) => ({
            ...prevState,
            mobile_number: "Please enter 10 digit mobile number.",
          }));
        }
        break;
      case "confrim_password":
        // if (!value) {
        //   setInputValidation((prevState) => ({
        //     ...prevState,
        //     confrim_password: "Please enter your confrim password.",
        //   }));
        // } else
        if (!(sellerRegistrationData?.password === value)) {
          setInputValidation((prevState) => ({
            ...prevState,
            confrim_password: "Password and confirm password does not match",
          }));
        }
        break;
      case "email_address":
        // if (!value) {
        //   setInputValidation((prevState) => ({
        //     ...prevState,
        //     email_address: "Please enter the e-mail.",
        //   }));
        // } else
        if (!isEmailValid(value)) {
          setInputValidation((prevState) => ({
            ...prevState,
            email_address: "Please enter the valid e-mail.",
          }));
        }
        break;
      case "password":
        // if (!value) {
        //   setInputValidation((prevState) => ({
        //     ...prevState,
        //     password: "Please enter your password.",
        //   }));
        // } else
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
      // case "region":
      //   if (!value) {
      //     setInputValidation((prevState) => ({
      //       ...prevState,
      //       region: "Please select the region.",
      //     }));
      //   }
      //   break;
      // case "role":
      //   if (!value) {
      //     setInputValidation((prevState) => ({
      //       ...prevState,
      //       role: "Please select the role.",
      //     }));
      //   }
      //   break;
      default:
        break;
    }
  };
  const handleClickValidation = (event) => {
    var errorHandle = false;
    if (!sellerRegistrationData?.first_name) {
      document.getElementById("first_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        first_name: "Please enter the first name.",
      }));
      errorHandle = true;
    }
    if (!sellerRegistrationData?.last_name) {
      document.getElementById("last_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        last_name: "Please enter the last name.",
      }));
      errorHandle = true;
    }
    if (!sellerRegistrationData?.email_address) {
      document.getElementById("email_address")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        email_address: "Please enter the e-mail.",
      }));
      errorHandle = true;
    } else if (!isEmailValid(sellerRegistrationData?.email_address)) {
      document.getElementById("email_address")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        email_address: "Please enter the valid e-mail.",
      }));
      errorHandle = true;
    }
    if (!sellerRegistrationData?.mobile_number) {
      document.getElementById("mobile_number")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        mobile_number: "Please enter the mobile number.",
      }));
      errorHandle = true;
    } else if (sellerRegistrationData?.mobile_number?.length !== 10) {
      document.getElementById("mobile_number")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        mobile_number: "Please enter 10 digit mobile number.",
      }));
      errorHandle = true;
    }
    if (!sellerRegistrationData?.password) {
      document.getElementById("password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        password: "Please enter your password.",
      }));
      errorHandle = true;
    } else if (!isPasswordValid(sellerRegistrationData?.password)) {
      document.getElementById("password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        password:
          "Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character.",
      }));
      errorHandle = true;
    }
    if (!sellerRegistrationData?.confrim_password) {
      document.getElementById("confrim_password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        confrim_password: "Please enter your confrim password.",
      }));
      errorHandle = true;
    } else if (
      !(
        sellerRegistrationData?.password ===
        sellerRegistrationData?.confrim_password
      )
    ) {
      document.getElementById("confrim_password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        confrim_password: "Password and confirm password does not match",
      }));
      errorHandle = true;
    }
    if (!sellerRegistrationData?.company) {
      document.getElementById("company")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        company: "Please enter the company.",
      }));
      errorHandle = true;
    }
    if (!sellerRegistrationData?.designation) {
      document.getElementById("designation")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        designation: "Please enter the designation.",
      }));
      errorHandle = true;
    }
    if (!value?.country) {
      document.getElementById("last_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        country: "Please select the country.",
      }));
      errorHandle = true;
    }
    if (!value?.role) {
      document.getElementById("role")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        role: "Please select the role.",
      }));
      errorHandle = true;
    }
    if (!value?.region) {
      document.getElementById("region")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        region: "Please select the region.",
      }));
      errorHandle = true;
    }
    if (!errorHandle) {
      // Apicall fuction
    }
    dispatch({
      type: "SET_KYC_OPEN_CLOSE",
      value: true,
    });
  };
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
              InputLabelProps={{
                shrink: true,
                required: true,
                classes: {
                  asterisk: asterisk,
                },
              }}
              value={sellerRegistrationData?.first_name}
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
              value={sellerRegistrationData?.last_name}
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
              placeholder="E-mail Address"
              fullWidth
              InputLabelProps={{
                shrink: true,
                required: true,
                classes: {
                  asterisk: asterisk,
                },
              }}
              value={sellerRegistrationData?.email_address}
              name="email_address"
              onChange={handleChangeInput}
              variant="outlined"
            />
            <InputLabel className={validation_error}>
              {inputValidation?.email_address}
            </InputLabel>
          </div>
          <div className={text_field_container}>
            <TextField
              id="mobile_number"
              label="Mobile Number"
              fullWidth
              type="number"
              placeholder="Mobile Number"
              InputLabelProps={{
                shrink: true,
                required: true,
                classes: {
                  asterisk: asterisk,
                },
              }}
              value={sellerRegistrationData?.mobile_number}
              name="mobile_number"
              onChange={handleChangeInput}
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
              value={sellerRegistrationData?.password}
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
              type="password"
              placeholder="Confrim Password"
              InputLabelProps={{
                shrink: true,
                required: true,
                classes: {
                  asterisk: asterisk,
                },
              }}
              value={sellerRegistrationData?.confrim_password}
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
              fullWidth
              type="number"
              placeholder="Landline Number"
              InputLabelProps={{
                shrink: true,
              }}
              value={sellerRegistrationData?.landline_number}
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
              InputLabelProps={{
                shrink: true,
                required: true,
                classes: {
                  asterisk: asterisk,
                },
              }}
              value={sellerRegistrationData?.company}
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
              value={sellerRegistrationData?.designation}
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
              options={options}
              value={value?.role}
              name="role"
              onChange={(event, newValue) => {
                setValue((prevState) => ({
                  ...prevState,
                  role: newValue,
                }));
                setInputValidation("");
              }}
              className={auto_complete_input}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Role"
                  placeholder="Role"
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
              {inputValidation?.role}
            </InputLabel>
          </div>
        </div>
        <div className={input_textField}>
          <div className={text_field_container}>
            <Autocomplete
              value={value?.region}
              name="region"
              onChange={(event, newValue) => {
                setValue((prevState) => ({
                  ...prevState,
                  region: newValue,
                }));
                setInputValidation("");
              }}
              className={auto_complete_input}
              options={options}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Region"
                  placeholder="Region"
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
              {inputValidation?.region}
            </InputLabel>
          </div>
          <div className={text_field_container}>
            <Autocomplete
              value={value?.country}
              name="country"
              onChange={(event, newValue) => {
                setValue((prevState) => ({
                  ...prevState,
                  country: newValue,
                }));
                setInputValidation("");
              }}
              className={auto_complete_input}
              options={options}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
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
          <FormControlLabel
            value={sellerRegistrationData?.remember_me}
            control={<Checkbox color="color_third" />}
            label={
              <p>
                By using this form you agree with the <span>Terms of Use</span>
                and <span>Privacy Policy</span> by this website.
              </p>
            }
            labelPlacement="end"
            className={checkbox_label}
          />
          <ReCAPTCHA
            className={recaptcha_info}
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
      {/* <ArrowDropUp className={arrow_icon} /> */}
    </div>
  );
};
export default withStyles(styles)(BuyerRegistration);
