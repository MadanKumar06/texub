import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import swal from "sweetalert2";

import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  InputLabel,
  Box,
  Autocomplete,
} from "@mui/material";
import {
  isEmailValid,
  isPasswordValid,
  isFirstAndLastNameValid,
  isCompanyNameValid,
  getAdminToken,
} from "../../../utilities";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import clsx from "clsx";

import { useStateValue } from "../../../store/state";
import axios from "axios";
import Constant from "../../../Constant";
import { useNavigate } from "react-router-dom";

const BuyerRegistration = ({ classes }) => {
  const history = useNavigate();
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
    button_box,
    recaptcha_info,
    auto_complete_input,
    other_textbox,
    mobile_input,
  } = classes;
  const [dropdownListFromApi, setDropdownListFromApi] = useState({
    regionList: [],
    countryList: [],
    rolesList: [],
  });
  const [adminToken, setAdminToken] = useState({});
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
    roles: "",
    other_roles: "",
    region: "",
    confrim_password: "",
    mobile_valid: "",
    remember_me: false,
    other_role: false,
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
    region: "",
    roles: "",
    other_roles: "",
    designation: "",
    country: "",
    confrim_password: "",
    recaptcha: "",
  });

  //API to fetch admin token
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);

  //Api to fetch dropdown values
  useEffect(() => {
    const fetchRegionData = () => {
      axios
        .get(Constant.baseUrl() + "/getRegionList", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setDropdownListFromApi((prevState) => ({
            ...prevState,
            regionList: res?.data,
          }));
        })
        .catch((err) => {});
    };
    fetchRegionData();
  }, []);
  useEffect(() => {
    const fetchRoleData = () => {
      axios
        .get(Constant.baseUrl() + "/getRoleList", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setDropdownListFromApi((prevState) => ({
            ...prevState,
            rolesList: res?.data,
          }));
        })
        .catch((err) => {});
    };
    fetchRoleData();
  }, []);
  useEffect(() => {
    if (sellerRegistrationData?.region?.region_id) {
      const fetchRegionBasedCountryData = () => {
        let data = {
          region_id: sellerRegistrationData?.region?.region_id,
        };
        axios
          .post(Constant.baseUrl() + "/getCountryListByRegion", data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setDropdownListFromApi((prevState) => ({
              ...prevState,
              countryList: res?.data,
            }));
          })
          .catch((err) => {});
      };
      fetchRegionBasedCountryData();
    }
  }, [sellerRegistrationData?.region]);

  // updating State
  const handleChangeInput = (event) => {
    if (event?.target?.name === "remember_me") {
      setsellerRegistrationData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.checked,
      }));
      setInputValidation((prevState) => ({
        ...prevState,
        [event.target.name]: "",
      }));
      handleSwitchCase([event.target.name], event.target.value);
    } else {
      setsellerRegistrationData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
      setInputValidation((prevState) => ({
        ...prevState,
        [event.target.name]: "",
      }));
      handleSwitchCase([event.target.name], event.target.value);
    }
  };

  //onchange validation
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
      case "confrim_password":
        if (!(sellerRegistrationData?.password === value)) {
          setInputValidation((prevState) => ({
            ...prevState,
            confrim_password: "Password and confirm password does not match",
          }));
        }
        break;

      case "company":
        if (!isCompanyNameValid(value)) {
          setInputValidation((prevState) => ({
            ...prevState,
            company: "Please enter Alphabet or (Alphabet and Number).",
          }));
        }
        break;
      case "designation":
        if (!isFirstAndLastNameValid(value)) {
          setInputValidation((prevState) => ({
            ...prevState,
            designation: "Please enter alphabet.",
          }));
        }
        break;
      case "other_roles":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            other_roles: "Please enter the other roles.",
          }));
        }
        break;
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
    } else if (!isFirstAndLastNameValid(sellerRegistrationData?.first_name)) {
      document.getElementById("first_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        first_name: "Please enter alphabet.",
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
    } else if (!isFirstAndLastNameValid(sellerRegistrationData?.last_name)) {
      document.getElementById("last_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        last_name: "Please enter alphabet.",
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
    } else if (
      sellerRegistrationData?.mobile_valid?.length < 6 ||
      sellerRegistrationData?.mobile_valid?.length > 15
    ) {
      document.getElementById("mobile_number")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        mobile_number:
          "Please enter more than 6 and less than 16 digit mobile number.",
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
    } else if (!isCompanyNameValid(sellerRegistrationData?.company)) {
      document.getElementById("company")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        company: "Please enter Alphabet or (Alphabet and Number)..",
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
    } else if (!isFirstAndLastNameValid(sellerRegistrationData?.designation)) {
      document.getElementById("designation")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        designation: "Please enter alphabet.",
      }));
      errorHandle = true;
    }
    if (!sellerRegistrationData?.country) {
      document.getElementById("last_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        country: "Please select the country.",
      }));
      errorHandle = true;
    }
    // if (!sellerRegistrationData?.role) {
    //   document.getElementById("role")?.focus();
    //   setInputValidation((prevState) => ({
    //     ...prevState,
    //     role: "Please select the role.",
    //   }));
    //   errorHandle = true;
    // }
    if (!sellerRegistrationData?.region) {
      document.getElementById("region")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        region: "Please select the region.",
      }));
      errorHandle = true;
    }
    if (
      sellerRegistrationData?.other_role &&
      !sellerRegistrationData?.other_roles
    ) {
      document.getElementById("other_roles")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        other_roles: "Please enter the other roles.",
      }));
      errorHandle = true;
    }
    if (!sellerRegistrationData?.recaptcha) {
      document.getElementById("recaptcha")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        recaptcha: "Please enter the recaptcha .",
      }));
      errorHandle = true;
    }
    if (!errorHandle) {
      // Apicall fuction
      FinalSellerRegistration();
    }
  };

  //onchange event for mobile number
  const handleMobileChangeInput = (value, data, event, formattedValue) => {
    setsellerRegistrationData((prevState) => ({
      ...prevState,
      mobile_number: value,
      mobile_valid: value?.slice(data?.dialCode?.length),
    }));
    setInputValidation((prevState) => ({
      ...prevState,
      mobile_number: "",
    }));
    handleSwitchCase(["mobile_number"], value?.slice(data?.dialCode?.length));
  };
  //API to Register
  const FinalSellerRegistration = () => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let data = {
      customer: {
        group_id: 6,
        website_id: 1,
        store_id: 2,
        email: sellerRegistrationData?.email_address,
        first_name: sellerRegistrationData?.first_name,
        last_name: sellerRegistrationData?.last_name,
        mobile_number: `+${sellerRegistrationData?.mobile_number}`,
        password: sellerRegistrationData?.password,
        confirm_password: sellerRegistrationData?.confrim_password,
        landline_number: sellerRegistrationData?.landline_number,
        company_name: sellerRegistrationData?.company,
        country: sellerRegistrationData?.country?.value,
        region: sellerRegistrationData?.region?.region_id,
        role: sellerRegistrationData?.roles?.role_id,
        other_role: sellerRegistrationData?.other_roles,
        designation: sellerRegistrationData?.designation,
        is_seller: 1,
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
          localStorage.setItem(
            "customer_auth",
            JSON.stringify(res?.data?.[0]?.token)
          );
          // history("/thankyou/buyer", { state: res?.data });
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
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        localStorage.setItem("userdata", JSON.stringify(res?.data));
        dispatch({
          type: "SET_KYC_OPEN_CLOSE",
          value: true,
        });
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
        <div className={input_textField}>
          <div className={text_field_container}>
            <TextField
              id="first_name"
              label="First Name"
              placeholder="First Name"
              className="inputfield-box"
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
              className="inputfield-box"
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
              className="inputfield-box"
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
            <PhoneInput
              country={"in"}
              id="mobile_number"
              fullWidth
              label="Mobile Number"
              className={mobile_input}
              name="mobile_number"
              placeholder="Mobile number"
              value={sellerRegistrationData?.mobile_number}
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
              fullWidth
              type="password"
              className="inputfield-box"
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
              className="inputfield-box"
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
              className="inputfield-box"
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
              className="inputfield-box"
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
            <Autocomplete
              value={sellerRegistrationData?.region}
              name="region"
              onChange={(event, newValue) => {
                setsellerRegistrationData((prevState) => ({
                  ...prevState,
                  region: newValue,
                }));
                setInputValidation((prevState) => ({
                  ...prevState,
                  region: "",
                }));
              }}
              className={auto_complete_input}
              options={dropdownListFromApi?.regionList}
              fullWidth
              getOptionLabel={(option) =>
                option.region_name ? option.region_name : ""
              }
              filterOptions={(options) => options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Region"
                  placeholder="Region"
                  className="inputfield-box"
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
              value={sellerRegistrationData?.country}
              name="country"
              onChange={(event, newValue) => {
                setsellerRegistrationData((prevState) => ({
                  ...prevState,
                  country: newValue,
                }));
                setInputValidation((prevState) => ({
                  ...prevState,
                  country: "",
                }));
              }}
              className={auto_complete_input}
              options={dropdownListFromApi?.countryList}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  placeholder="Country"
                  className="inputfield-box"
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
          <div className={text_field_container}>
            <Autocomplete
              options={dropdownListFromApi?.rolesList}
              value={sellerRegistrationData?.roles}
              name="roles"
              onChange={(event, newValue) => {
                if (newValue?.role_id === "1") {
                  setsellerRegistrationData((prevState) => ({
                    ...prevState,
                    other_role: true,
                  }));
                } else {
                  setsellerRegistrationData((prevState) => ({
                    ...prevState,
                    other_role: false,
                  }));
                }
                setsellerRegistrationData((prevState) => ({
                  ...prevState,
                  roles: newValue,
                }));
              }}
              className={auto_complete_input}
              fullWidth
              getOptionLabel={(option) =>
                option.role_name ? option.role_name : ""
              }
              filterOptions={(options) => options}
              // isOptionEqualToValue={(option, value) => {
              //   debugger;
              // }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Role"
                  className="inputfield-box"
                  placeholder="Role"
                  InputLabelProps={{
                    shrink: true,
                    // required: true,
                    // classes: {
                    //   asterisk: asterisk,
                    // },
                  }}
                />
              )}
            />
            {/* <InputLabel className={validation_error}>
              {inputValidation?.role}
            </InputLabel> */}
            {sellerRegistrationData?.other_role && (
              <div className={clsx(text_field_container, other_textbox)}>
                <TextField
                  id="other_roles"
                  label="Other Roles"
                  fullWidth
                  className="inputfield-box"
                  placeholder="Other Roles"
                  InputLabelProps={{
                    shrink: true,
                    required: true,
                    classes: {
                      asterisk: asterisk,
                    },
                  }}
                  value={sellerRegistrationData?.other_roles}
                  name="other_roles"
                  onChange={handleChangeInput}
                  variant="outlined"
                />
                <InputLabel className={validation_error}>
                  {inputValidation?.other_roles}
                </InputLabel>
              </div>
            )}
          </div>
          <div className={text_field_container}>
            <TextField
              id="designation"
              label="Designation"
              placeholder="Designation"
              className="inputfield-box"
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
        </div>
        <ReCAPTCHA
          className={recaptcha_info}
          sitekey="6LcaHDYfAAAAAOUR0jJWtEI128eoRL4xjBWOpjKD"
          onChange={() => {
            setsellerRegistrationData((prevState) => ({
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
        </div>
        <Box className={button_box} fullWidth>
          <Button
            onClick={() => handleClickValidation()}
            className={button_guest}
          >
            Register
          </Button>
        </Box>
      </div>
    </div>
  );
};
export default withStyles(styles)(BuyerRegistration);
