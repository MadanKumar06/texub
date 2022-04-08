import React, { useState } from "react";
import styles from "./styles";
import axios from "axios";

import {
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Backdrop,
  InputLabel,
} from "@mui/material";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import { Clear } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { isEmailValid, isPasswordValid } from "../../../../utilities";
import SectionRight from "../SectionRight";
import { useStateValue } from "../../../../store/state";

import Constant from "../../../../Constant";
import swal from "sweetalert2";

//Assets
import forgot from "../../../../Assets/Home/forgotpassword.svg";

const TransitionsModal = ({ classes, openPopUp }) => {
  let history = useNavigate();
  const [{}, dispatch] = useStateValue();
  let {
    forgotpassword,
    forgotpassword__title,
    forgotpassword__container,
    forgotpassword__content,
    forgotpassword__email,
    forgotpassword__image,
    forgotpassword__submit,
    forgotpassword__para,
    forgotpassword__clearbtn,
    logo_svg,
    section_main,
    modal,
    sections,
    section_left,
    section_right,
    button_box,
    header_section,
    clear_btn,
    info_text,
    info_text_lineNote_one,
    info_text_lineNote_two,
    input_fields,
    checkbox_label,
    button_signin,
    forgot_password,
    validation_error,
    asterisk,
  } = classes;

  const [open, setOpen] = useState(true);
  const [signInData, setSignInData] = useState({
    email_address: "",
    password: "",
    keep_me_logged_in: false,
  });
  const [inputValidation, setInputValidation] = useState({
    email_address: "",
    password: "",
  });

  const [forgotpwdemail, setforgotpwdemail] = useState();
  const handleChangeEmail = (event) => {
    setforgotpwdemail(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch({
      type: "SET_SIGNIN_OPEN_CLOSE",
      value: false,
    });
  };
  const handleChangeInput = (event) => {
    if (event?.target?.name === "keep_me_logged_in") {
      setSignInData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.checked,
      }));
      setInputValidation((prevState) => ({
        ...prevState,
        [event.target.name]: "",
      }));
      handleSwitchCase([event.target.name], event.target.value);
    } else {
      setSignInData((prevState) => ({
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
  const handleSwitchCase = (fieldName, value) => {
    switch (fieldName[0]) {
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
      default:
        break;
    }
  };
  const handleClickValidation = (event) => {
    var errorHandle = false;
    if (!signInData?.email_address) {
      document.getElementById("email_address")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        email_address: "Please enter the e-mail.",
      }));
      errorHandle = true;
    } else if (!isEmailValid(signInData?.email_address)) {
      document.getElementById("email_address")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        email_address: "Please enter the valid e-mail.",
      }));
      errorHandle = true;
    }
    if (!signInData?.password) {
      document.getElementById("password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        password: "Please enter your password.",
      }));
      errorHandle = true;
    } else if (!isPasswordValid(signInData?.password)) {
      document.getElementById("password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        password:
          "Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character.",
      }));
      errorHandle = true;
    }
    if (!errorHandle) {
      // Apicall fuction
      FinalSignin();
    }
  };

  //API to Register
  const FinalSignin = () => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let data = {
      username: signInData?.email_address,
      password: signInData?.password,
    };
    axios
      .post(Constant.customerTokenUrl(), data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        getSigninedUserData(res?.data);
        localStorage.setItem("token", res?.data);
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

  const handleKyc = (event) => {
    if (event?.info === "kyc_not_filled") {
      dispatch({
        type: "SET_SIGNIN_OPEN_CLOSE",
        value: false,
      });
      setTimeout(() => {
        dispatch({
          type: "SET_KYC_OPEN_CLOSE",
          value: true,
        });
      }, 1000 / 2);
    } else if (event?.info === "kyc_filled") {
      let user = event?.id === 5 ? "buyer" : event?.id === 6 && "seller";
      dispatch({
        type: "SET_SIGNIN_OPEN_CLOSE",
        value: false,
      });
      setTimeout(() => {
        history(`/thankyou/${user}kyc`);
      }, 1000 / 2);
    } else if (event?.info === "kyc_filled_success") {
      dispatch({
        type: "SET_SIGNIN_OPEN_CLOSE",
        value: false,
      });
      swal.fire({
        text: "You have Successfully loggedIn !",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(() => {
        history("/");
      }, 1000);
    }
  };

  const KycFormOpenClose = (isDataValid, group_id) => {
    let temp =
      isDataValid[0]?.value == 0
        ? handleKyc({
            info: "kyc_not_filled",
            id: group_id,
          })
        : isDataValid[0]?.value == 1
        ? handleKyc({ info: "kyc_filled", id: group_id })
        : isDataValid[0]?.value == 2
        ? handleKyc({ info: "kyc_filled_success", id: group_id })
        : "";
  };
  const getSigninedUserData = (token) => {
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
        localStorage.setItem(
          "isLoggedIn_auth",
          res?.data?.group_id === 1 ? false : true
        );

        let iskycFormFilled = res?.data;
        if (iskycFormFilled?.group_id === 1) {
          dispatch({
            type: "SET_SIGNIN_OPEN_CLOSE",
            value: false,
          });
          setTimeout(() => {
            history("/");
          }, 1000 / 2);
        } else if (
          iskycFormFilled?.group_id === 5 ||
          iskycFormFilled?.group_id === 6
        ) {
          let isDataValid = iskycFormFilled?.custom_attributes?.filter(
            (itm) => itm?.attribute_code === "kyc_status"
          );
          KycFormOpenClose(isDataValid, iskycFormFilled?.group_id);
        }
      })
      .catch((err) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
      });
  };
  //// Forgor Password ///
  const [passopen, setpassopen] = useState(false);
  const forgotpass = () => {
    setpassopen(true);
  };
  return (
    <>
      {passopen ? (
        <Modal
          open={passopen}
          onClose={() => setpassopen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className={modal}
        >
          <div className={forgotpassword}>
            <div className={forgotpassword__title}>
              Forgot Password ?
              <Clear
                className={forgotpassword__clearbtn}
                onClick={() => setpassopen(false)}
              />
            </div>
            <div className={forgotpassword__container}>
              <div className={forgotpassword__content}>
                <div className={forgotpassword__email}>
                  <p className={forgotpassword__para}>
                    Enter your E-mail address to receive a link to reset
                    Password.
                  </p>
                  <div className="inputfield-box">
                    <TextField
                      id="email_address"
                      name="email_address"
                      label="E-mail Address"
                      placeholder="E-mail Address"
                      fullWidth
                      autoFocus={true}
                      autoComplete="off"
                      value={forgotpwdemail}
                      InputLabelProps={{
                        shrink: true,
                        required: true,
                        classes: {
                          asterisk: asterisk,
                        },
                      }}
                      onChange={handleChangeEmail}
                      variant="outlined"
                    />
                  </div>
                  <Box>
                    <Button
                      className={clsx(
                        forgotpassword__submit,
                        "button-text btn-secondary"
                      )}
                      onClick={() => setpassopen(false)}
                    >
                      Submit
                    </Button>
                  </Box>
                </div>
                <img className={forgotpassword__image} src={forgot} alt="" />
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={modal}
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div className={section_main}>
            <header className={header_section}>
              <p>Welcome !</p>
              <Clear className={clear_btn} onClick={() => handleClose()} />
            </header>
            <div className={sections}>
              <div className={section_left}>
                <p className={info_text_lineNote_one}>
                  <small>*</small> Texub doesn’t sell or ship to consumers.
                </p>
                <p className={info_text_lineNote_two}>
                  To keep connected please login here
                </p>
                <div className={info_text}>Sign-In</div>
                <div className={input_fields}>
                  <TextField
                    id="email_address"
                    name="email_address"
                    label="E-mail Address"
                    placeholder="E-mail Address"
                    fullWidth
                    autoFocus={true}
                    autoComplete="off"
                    value={signInData?.email_address}
                    className="inputfield-box"
                    InputLabelProps={{
                      shrink: true,
                      required: true,
                      classes: {
                        asterisk: asterisk,
                      },
                    }}
                    onChange={handleChangeInput}
                    variant="outlined"
                  />
                  <InputLabel className={validation_error}>
                    {inputValidation?.email_address}
                  </InputLabel>
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    fullWidth
                    type="password"
                    autoComplete="new-password"
                    placeholder="Password"
                    value={signInData?.password}
                    className="inputfield-box"
                    InputLabelProps={{
                      shrink: true,
                      required: true,
                      classes: {
                        asterisk: asterisk,
                      },
                    }}
                    onChange={handleChangeInput}
                    variant="outlined"
                  />
                  <InputLabel className={validation_error}>
                    {inputValidation?.password}
                  </InputLabel>
                  <FormControlLabel
                    value={signInData?.keep_me_logged_in}
                    control={<Checkbox color="color_third" />}
                    label="Keep me signed in."
                    labelPlacement="end"
                    className={checkbox_label}
                    name="keep_me_logged_in"
                    onClick={(event) => handleChangeInput(event)}
                  />
                  <Box className={button_box}>
                    <Button
                      onClick={() => handleClickValidation()}
                      className={button_signin}
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </Box>
                  <p className={forgot_password} onClick={forgotpass}>
                    Forgot Password?
                  </p>
                </div>
                <div className={logo_svg}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="284.039"
                    height="87.111"
                    viewBox="0 0 310.039 87.111"
                  >
                    <g
                      id="Group_1457"
                      data-name="Group 1457"
                      transform="translate(3358.13 20621.301)"
                      opacity="0.251"
                    >
                      <path
                        id="_Compound_Path_"
                        data-name="&lt;Compound Path&gt;"
                        d="M1399.7,368.25h45.667a10.809,10.809,0,0,1,5.357,1.394,14.445,14.445,0,0,1,4.369,3.745,18.651,18.651,0,0,1,2.954,5.545,21.708,21.708,0,0,1-.427,14.834,16.765,16.765,0,0,1-4.088,6.044,16.632,16.632,0,0,1,4.088,6.034,21.708,21.708,0,0,1,.427,14.834,18.65,18.65,0,0,1-2.954,5.545,14.445,14.445,0,0,1-4.369,3.745,10.809,10.809,0,0,1-5.357,1.394H1399.7Zm41.257,24.977a3.49,3.49,0,0,0,2.913-1.716,7.142,7.142,0,0,0,1.217-4.234,6.618,6.618,0,0,0-1.217-4.015,3.5,3.5,0,0,0-2.913-1.664h-27.192v11.63Zm4.13,19.2a6.991,6.991,0,0,0-1.217-4.151,3.5,3.5,0,0,0-2.913-1.706h-27.192v11.443h27.192a3.533,3.533,0,0,0,2.913-1.623A6.418,6.418,0,0,0,1445.086,412.43Z"
                        transform="translate(-4507.242 -20977.463)"
                        fill="#002d56"
                      />
                      <path
                        id="_Path_"
                        data-name="&lt;Path&gt;"
                        d="M1267.606,418.049l-9.393,13.44h-35.7a9.063,9.063,0,0,1-9.061-9.071V377a9.061,9.061,0,0,1,9.061-9.061h35.255l9.841,13.43h-40v11.713h31.478v13.44h-31.478v11.526Z"
                        transform="translate(-4514.74 -20977.477)"
                        fill="#002d56"
                      />
                      <path
                        id="_Path_2"
                        data-name="&lt;Path&gt;"
                        d="M1302.213,387.983l-39.072,55.758h-4.931l30.521-43.774L1266,368.52h22.73l13.544,19.37Zm0,0-39.072,55.758h-4.931l30.521-43.774L1266,368.52h22.73l13.544,19.37Zm42.8-31.135L1314.644,400.4l22.73,31.447h-22.73l-.031-.042L1301.1,412.482l.062-.094,39.083-55.758h4.92Zm-9.831-.218-62.145,87.111h-4.546l62.135-87.111Zm-22.459,13.69h2.268l-10.455,14.657-1.134-1.592Zm-21.856,60.5h-2.278l10.486-14.688,1.1,1.623Z"
                        transform="translate(-4512.938 -20977.932)"
                        fill="#ddb363"
                      />
                      <path
                        id="_Path_3"
                        data-name="&lt;Path&gt;"
                        d="M1348.155,362.65v48.726a7.681,7.681,0,0,0,1.6,4.92,4.787,4.787,0,0,0,3.88,2.039h25.455v-49.86h14.085V431.7h-42.671a13.136,13.136,0,0,1-6.408-1.633,17.039,17.039,0,0,1-5.232-4.463,22.123,22.123,0,0,1-3.516-6.647,25.231,25.231,0,0,1-1.28-8.124V382.789Z"
                        transform="translate(-4509.884 -20977.689)"
                        fill="#002d56"
                      />
                      <path
                        id="_Path_4"
                        data-name="&lt;Path&gt;"
                        d="M1209.46,367.94v13.388h-17.549v50.016h-14.106V381.328H1158.81V367.94Z"
                        transform="translate(-4516.94 -20977.477)"
                        fill="#002d56"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div className={section_right}>
                <SectionRight />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
export default withStyles(styles)(TransitionsModal);
