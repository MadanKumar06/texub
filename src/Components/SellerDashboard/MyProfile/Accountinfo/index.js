import React, { useState, useEffect } from "react";
import "./styles.scss";
import { TextField, InputLabel } from "@mui/material";
import { isPasswordValid, isEmailValid } from "../../../../utilities";
// import MuiPhoneNumber from "material-ui-phone-number";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import baseUrl from "../../../../Constant";
import { useStateValue } from "../../../../store/state";

const Index = (classes) => {
  const [{ geo, customstore, customnostore }, dispatch] = useStateValue();
  let { validation_error } = classes;
  const [AccountInfoData, setAccountInfoData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    email_address: "",
    new_password: "",
    new_confrim_password: "",
  });
  const [CountryDropdown, setCountryDropdown] = useState(null);
  const [inputValidation, setInputValidation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    email_address: "",
    new_password: "",
    new_confrim_password: "",
  });

  const userData = JSON.parse(localStorage.getItem('userdata'))
  let company_name = userData?.custom_attributes?.filter(
    (itm) => itm?.attribute_code === "customer_company_name");


  const handleChangeInput = (event) => {
    setAccountInfoData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    handleSwitchCase([event.target.name], event.target.value);
  };
  const handleMobileChangeInput = (event) => {
    setAccountInfoData((prevState) => ({
      ...prevState,
      mobile_number: event,
    }));
    setInputValidation("");
  };
  const handleSwitchCase = (fieldName, value) => {
    switch (fieldName[0]) {
      case "first_name":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            first_name: "Please enter the first name.",
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
        } else if (AccountInfoData?.mobile_number?.length > 10) {
          document.getElementById("mobile_number")?.focus();
          setInputValidation((prevState) => ({
            ...prevState,
            mobile_number: "Please enter 10 digit mobile number.",
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
      document.getElementById("root")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        mobile_number: "Please enter the mobile number.",
      }));
      errorHandle = true;
    } else if (AccountInfoData?.mobile_number?.length < 10) {
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
  };
  //Api
  useEffect(() => {
    const fetchCountryList = () => {
      axios
        .get(baseUrl + "/getCountryList", {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((response) => {
          setCountryDropdown(response?.data);
        })
        .catch((error) => {});
    };
    fetchCountryList();
  }, []);
  {
  }

  return (
    <div className="account_ifo_main">
      <span className="Account_heading">
        {" "}
        <p>EDIT PROFILE INFORMATION</p>
      </span>
      <div className="account_info_edit">
        {/* <form className='form' > */}
        <div className="form">
          <div className="inputfield_section">
            <div className="inputfield">
              <p>First Name</p>
              <TextField
                id="first_name"
                name="first_name"
                placeholder="First Name"
                value={userData['firstname']}
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
                placeholder="Last Name"
                value={userData['lastname']}
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
              <PhoneInput
                country={"in"}
                id="mobile_number"
                fullWidth
                enableSearch={true}
                countryCodeEditable={false}
                className="inputfield-box"
                name="mobile_number"
                value={AccountInfoData?.mobile_number}
                InputLabelProps={{
                  shrink: true,
                  required: true,
                }}
                onChange={handleMobileChangeInput}
                variant="outlined"
              />
              {/* <MuiPhoneNumber
                // preferredCountries={["india"]}
                defaultCountry={'in'}
                id="mobile_number"
                name="mobile_number"
                placeholder='8796878788'
                value={AccountInfoData?.mobile_number}
                InputLabelProps={{
                  shrink: false,
                }}
                onChange={handleMobileChangeInput}
                variant="outlined"
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
                placeholder="E-Mail"
                value={userData['email']}
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
              <p>New Password</p>
              <TextField
                id="new_password"
                name="new_password"
                value={AccountInfoData?.new_password}
                type="password"
                placeholder="New Password"
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
              <p>Confirm New Password</p>
              <TextField
                id="new_confrim_password"
                name="new_confrim_password"
                placeholder="New Confirm Password"
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
          {/* </form> */}
        </div>
        <div className="my_profile_back">
          <Link
            to={`/${
              customstore ? customstore : geo?.country_name
            }/buyerdashboard/dashboard`}
            className="link"
          >
            <ArrowBackIosNew />
            <span>
              <p className="back">Back</p>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Index;
