import React, { useState, useEffect } from "react";
import {
  TextField,
  Checkbox,
  InputLabel,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import {
  isEmailValid,
  SessionExpiredLogout,
  isFirstAndLastNameValid,
} from "../../../../utilities";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Constant from "../../../../Constant";
import { useStateValue } from "../../../../store/state";
import swal from "sweetalert2";

const TransitionsModal = ({ classes, adminToken }) => {
  const [{ geo, customnostore }, dispatch] = useStateValue();
  const history = useNavigate();
  let {
    section_right,
    info_text_lineNote,
    info_text_guest,
    input_fields,
    checkbox_label,
    button_box,
    button_guest,
    asterisk,
    validation_error,
  } = classes;
  const [guestData, setGuestData] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    password: "",
    confrim_password: "",
    checkbox_confrim: false,
  });
  const [inputValidation, setInputValidation] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    password: "",
    confrim_password: "",
  });
  const handleChangeInput = (event) => {
    if (event?.target?.name === "checkbox_confrim") {
      setGuestData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.checked,
      }));
      setInputValidation((prevState) => ({
        ...prevState,
        [event.target.name]: "",
      }));
    } else {
      setGuestData((prevState) => ({
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
    if (!guestData?.first_name) {
      document.getElementById("first_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        first_name: "Please enter the first name.",
      }));
      errorHandle = true;
    } else if (!isFirstAndLastNameValid(guestData?.first_name)) {
      document.getElementById("first_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        first_name: "Please enter alphabet.",
      }));
      errorHandle = true;
    }
    if (!guestData?.last_name) {
      document.getElementById("last_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        last_name: "Please enter the last name.",
      }));
      errorHandle = true;
    } else if (!isFirstAndLastNameValid(guestData?.last_name)) {
      document.getElementById("last_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        last_name: "Please enter alphabet.",
      }));
      errorHandle = true;
    }
    if (!guestData?.email_address) {
      document.getElementById("email_address")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        email_address: "Please enter the e-mail.",
      }));
      errorHandle = true;
    } else if (!isEmailValid(guestData?.email_address)) {
      document.getElementById("email_address")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        email_address: "Please enter the valid e-mail.",
      }));
      errorHandle = true;
    }
    if (!guestData?.password) {
      document.getElementById("password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        password: "Please enter your password.",
      }));
      errorHandle = true;
    } else if (guestData?.password?.length < 6) {
      document.getElementById("password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        password: "Please enter minimum 6 characters.",
      }));
      errorHandle = true;
    }
    if (!guestData?.confrim_password) {
      document.getElementById("confrim_password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        confrim_password: "Please enter your confirm password.",
      }));
      errorHandle = true;
    } else if (!(guestData?.password === guestData?.confrim_password)) {
      document.getElementById("confrim_password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        confrim_password: "Password and confirm password does not match",
      }));
      errorHandle = true;
    }
    if (!guestData?.checkbox_confrim) {
      document.getElementById("checkbox_confrim")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        checkbox_confrim: "Please confirm.",
      }));
      errorHandle = true;
    }
    if (!errorHandle) {
      //Apicall fuction
      FinalGuestRegistration();
    }
  };

  //API to Register
  const FinalGuestRegistration = () => {
    let storedata = JSON.parse(localStorage.getItem("storedata"));
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let data = {
      customer: {
        website_id: storedata?.website_id,
        store_id: storedata?.store_id,
        email: guestData?.email_address,
        first_name: guestData?.first_name,
        last_name: guestData?.last_name,
        password: guestData?.password,
        confirm_password: guestData?.confrim_password,
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
        if (res?.data?.[0]?.status === "true") {
          dispatch({
            type: "SET_SIGNIN_OPEN_CLOSE",
            value: false,
          });
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
        if (error.response.status === 401) {
          SessionExpiredLogout();
        } else {
          swal.fire({
            text: `${error?.response?.data?.message || error.message}`,
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
  };

  const [customerdata, setcustomerdata] = useState(false);
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
        dispatch({
          type: "USER_DATA_DETAILS",
          value: res?.data,
        });
        localStorage.setItem("userdata", JSON.stringify(res?.data));
        localStorage.setItem(
          "isLoggedIn_auth",
          res?.data?.group_id === 1 ? false : true
        );
        setcustomerdata(!customerdata);
        swal.fire({
          text: "You have Successfully loggedIn !",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
        setTimeout(() => {
          history(`/${customnostore ? customnostore : geo?.country_name}`);
        }, 1000);
      })
      .catch((err) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        if (err.response.status === 401) {
          SessionExpiredLogout();
        }
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
        if (e.response.status === 401) {
          SessionExpiredLogout();
        }
      }
    }
  }, [customerdata, adminToken]);
  return (
    <div className={section_right}>
      <p className={info_text_lineNote}>
        “Sign Up now to gain access to exclusive benefits created only for you.
        Visit us as a guest.
      </p>
      <p className={info_text_lineNote}>
        Just wanted to try out our site? Visit our site as a guest.”
      </p>
      <form onSubmit={handleClickValidation}>
        <div className={info_text_guest}>Guest Access</div>
        <div className={input_fields}>
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
            value={guestData?.first_name}
            name="first_name"
            onChange={handleChangeInput}
            variant="outlined"
          />
          <InputLabel className={validation_error}>
            {inputValidation?.first_name}
          </InputLabel>
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
            value={guestData?.last_name}
            name="last_name"
            onChange={handleChangeInput}
            variant="outlined"
          />
          <InputLabel className={validation_error}>
            {inputValidation?.last_name}
          </InputLabel>
          <TextField
            id="email_address"
            label="E-mail Address"
            placeholder="E-mail Address"
            fullWidth
            InputLabelProps={{
              shrink: true,
              required: true,
              classes: {
                asterisk: asterisk,
              },
            }}
            className="inputfield-box"
            value={guestData?.email_address}
            name="email_address"
            onChange={handleChangeInput}
            variant="outlined"
          />
          <InputLabel className={validation_error}>
            {inputValidation?.email_address}
          </InputLabel>
          <TextField
            id="password"
            label="Password"
            fullWidth
            type="password"
            placeholder="Password"
            InputLabelProps={{
              shrink: true,
              required: true,
              classes: {
                asterisk: asterisk,
              },
            }}
            className="inputfield-box"
            value={guestData?.password}
            name="password"
            onChange={handleChangeInput}
            variant="outlined"
          />
          <InputLabel className={validation_error}>
            {inputValidation?.password}
          </InputLabel>
          <TextField
            id="confrim_password"
            label="Confirm Password"
            fullWidth
            type="password"
            placeholder="Confirm Password"
            InputLabelProps={{
              shrink: true,
              required: true,
              classes: {
                asterisk: asterisk,
              },
            }}
            className="inputfield-box"
            value={guestData?.confrim_password}
            name="confrim_password"
            onChange={handleChangeInput}
            variant="outlined"
          />
          <InputLabel className={validation_error}>
            {inputValidation?.confrim_password}
          </InputLabel>
          <FormControlLabel
            value={guestData?.checkbox_confrim}
            control={<Checkbox color="color_third" />}
            label={
              <div>
                <div>I hereby certify that I am a wholesale buyer/seller.</div>
                {/* <div>and not a consumer or end user.</div> */}
              </div>
            }
            labelPlacement="end"
            className={checkbox_label}
            name="checkbox_confrim"
            onClick={(event) => handleChangeInput(event)}
          />
          <InputLabel className={validation_error}>
            {inputValidation?.checkbox_confrim}
          </InputLabel>

          <Box className={button_box}>
            <Button
              onClick={() => handleClickValidation()}
              className={button_guest}
              type="submit"
            >
              Register as Guest
            </Button>
          </Box>
        </div>
      </form>
    </div>
  );
};
export default withStyles(styles)(TransitionsModal);
