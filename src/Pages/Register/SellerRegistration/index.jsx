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
  isRolesValid,
  getAdminToken,
  isLandlineValid,
} from "../../../utilities";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import clsx from "clsx";

import { useStateValue } from "../../../store/state";
import axios from "axios";
import Constant from "../../../Constant";
import { useNavigate, Link } from "react-router-dom";

const BuyerRegistration = ({ classes }) => {
  const history = useNavigate();
  const [{ geo, customnostore, currencyData }, dispatch] = useStateValue();
  const [mobile_number_countryCode, setMobile_number_countryCode] =
    useState("ae");
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
    check_container,
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
    country: null,
    roles: null,
    other_roles: "",
    region: null,
    confrim_password: "",
    mobile_valid: "",
    checkbox_confrim: false,
    other_role: false,
    recaptcha: false,
  });
  useEffect(() => {
    if (geo) {
      let temp = geo?.country_code?.toLowerCase();
      setMobile_number_countryCode(temp);
    }
  }, [geo]);
  useEffect(() => {
    if (!sellerRegistrationData?.region) {
      setsellerRegistrationData((prevState) => ({
        ...prevState,
        country: null,
      }));
      setDropdownListFromApi((prevState) => ({
        ...prevState,
        countryList: [],
      }));
    }
  }, [sellerRegistrationData.region]);
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
    checkbox_confrim: "",
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
      setDropdownListFromApi((prev) => ({
        ...prev,
        countryList: [],
      }));
      setsellerRegistrationData((prev) => ({
        ...prev,
        country: "",
      }));
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
    if (event?.target?.name === "checkbox_confrim") {
      setsellerRegistrationData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.checked,
      }));
      setInputValidation((prevState) => ({
        ...prevState,
        [event.target.name]: "",
      }));
    } else {
      setsellerRegistrationData((prevState) => ({
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
    if (
      sellerRegistrationData?.landline_number &&
      !isLandlineValid(sellerRegistrationData?.landline_number)
    ) {
      document.getElementById("landline_number")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        landline_number: "Please enter only numbers.",
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
        confrim_password: "Please enter your confirm password.",
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
    } else if (isCompanyNameValid(sellerRegistrationData?.company)) {
      document.getElementById("company")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        company:
          "Please enter Alphabet or (Alphabet, Special Characters and Number).",
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
    if (
      sellerRegistrationData?.other_roles &&
      !isRolesValid(sellerRegistrationData?.other_roles)
    ) {
      document.getElementById("other_roles")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        other_roles: "Please enter only alphabet and special character.",
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
    if (!sellerRegistrationData?.checkbox_confrim) {
      document.getElementById("checkbox_confrim")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        checkbox_confrim: "Please agree to terms and conditions .",
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
  };
  //API to Register
  const FinalSellerRegistration = () => {
    let storedata = JSON.parse(localStorage.getItem("storedata"));
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let data = {
      customer: {
        group_id: 6,
        website_id: storedata?.website_id,
        store_id: storedata?.store_id,
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

  const [customerdata, setcustomerdata] = useState(false);
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
        setcustomerdata(!customerdata);
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

  useEffect(async () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    if (adminToken && user?.id) {
      try {
        const permission = await axios({
          method: "post",
          url: `${Constant?.permissiondetails()}`,
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
          data: {
            customer_id: user?.id,
          },
        });
        localStorage.setItem("permissions", JSON.stringify(permission?.data));
      } catch (e) {
        console.log(e);
      }
    }
  }, [customerdata, adminToken]);
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
                country={mobile_number_countryCode}
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
                id="landline_number"
                label="Landline Number"
                fullWidth
                className="inputfield-box"
                type="text"
                placeholder="Landline Number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={sellerRegistrationData?.landline_number}
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
          </div>
          <div className={input_textField}>
            <div className={text_field_container}>
              <TextField
                id="confrim_password"
                label="Confirm Password"
                fullWidth
                type="password"
                className="inputfield-box"
                placeholder="Confirm Password"
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
            <div className={check_container}>
              <div>
                <Checkbox
                  value={sellerRegistrationData?.checkbox_confrim}
                  color="color_third"
                  name="checkbox_confrim"
                  onClick={(event) => handleChangeInput(event)}
                  className={checkbox_label}
                />
                <p>
                  By using this form you agree with the{" "}
                  <Link
                    to={`/${
                      customnostore ? customnostore : geo?.country_name
                    }/termsofuse/${currencyData?.[2]?.staticPages?.terms}`}
                    target="_blank"
                  >
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link
                    to={`/${
                      customnostore ? customnostore : geo?.country_name
                    }/privacypolicy/${currencyData?.[2]?.staticPages?.privacy}`}
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>{" "}
                  by this website.
                </p>
              </div>
              <InputLabel className={validation_error}>
                {inputValidation?.checkbox_confrim}
              </InputLabel>
            </div>
            <div className={text_field_container}>
              <ReCAPTCHA
                className={recaptcha_info}
                // 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
                // 6LcaHDYfAAAAAOUR0jJWtEI128eoRL4xjBWOpjKD
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
          </Box>
        </form>
      </div>
    </div>
  );
};
export default withStyles(styles)(BuyerRegistration);
