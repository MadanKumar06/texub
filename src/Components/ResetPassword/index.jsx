import React, { useState, useEffect } from "react";
import "./styles.scss";
import axios from "axios";
import { Clear } from "@mui/icons-material";
import Gratitude from "./Gratitude";
import { getAdminToken, SessionExpiredLogout } from "../../utilities";
import { InputLabel, TextField, Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";

import { useStateValue } from "../../store/state";

import Constant from "../../Constant";
import swal from "sweetalert2";
const Index = () => {
  const { token } = useParams();
  const [{}, dispatch] = useStateValue();
  const [resetData, setresetData] = useState({
    new_password: "",
    confirm_new_password: "",
  });
  const [inputValidation, setInputValidation] = useState({
    new_password: "",
    confirm_new_password: "",
  });

  const [gratitude, setgratitude] = useState(false);
  const thankyou = () => {
    setgratitude(!gratitude);
    setfirst(false);
  };
  const [first, setfirst] = useState(true);
  const [signifier, setsignifier] = useState(false);
  const handleChangeInput = (event) => {
    setresetData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    setInputValidation("");
  };
  const handleClickValidation = (event) => {
    event.preventDefault();
    var errorHandle = false;
    if (!resetData?.new_password) {
      document.getElementById("new_password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        new_password: "Please enter the new password.",
      }));
      errorHandle = true;
    } else if (resetData?.new_password?.length < 6) {
      document.getElementById("new_password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        new_password: "Please enter minimum 6 characters.",
      }));
      errorHandle = true;
    }
    if (!resetData?.confirm_new_password) {
      document.getElementById("confirm_new_password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        confirm_new_password: "Please enter the confirm new password.",
      }));
      errorHandle = true;
    } else if (!(resetData?.new_password === resetData?.confirm_new_password)) {
      document.getElementById("confirm_new_password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        confirm_new_password: "Password and confirm password does not match",
      }));
      errorHandle = true;
    }
    if (!errorHandle) {
      APIcall();
    }
  };

  const [adminToken, setAdminToken] = useState("");
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);
  const APIcall = () => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let data = {
      data: {
        token: token,
        password: resetData?.new_password,
        confirm_password: resetData?.confirm_new_password,
      },
    };
    axios
      .post(Constant.baseUrl() + "/resetPassword", data, {
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
          thankyou();
        } else {
          swal.fire({
            text: `${res?.data?.[0]?.message}`,
            icon: "error",
            showConfirmButton: true,
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
            text: `${error?.data?.message}`,
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
  };
  return (
    <div className="reset_password_main">
      {first && (
        <div className="reset_pwd_section">
          <div className="reset_pwd_header">
            <Clear className="clear_btn" />
            <p className="reset_heading">Reset Password</p>
          </div>
          <div className="reset_left_section">
            <form onSubmit={handleClickValidation} className="resetForm">
              <div className="reset_credetial">
                <p className="reset_pwd_heading">Reset Your Password</p>
                <div>
                  <TextField
                    id="new_password"
                    name="new_password"
                    label="New Password"
                    fullWidth
                    type="password"
                    autoComplete="new-password"
                    placeholder="New Password"
                    className="inputfield-box"
                    value={resetData?.new_password}
                    onChange={handleChangeInput}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                  <InputLabel className="validation_error">
                    {inputValidation?.new_password}
                  </InputLabel>
                </div>
                <div>
                  <div className="reset_signifire">
                    <TextField
                      id="confirm_new_password"
                      name="confirm_new_password"
                      label="Confirm New Password"
                      fullWidth
                      type="password"
                      className="inputfield-box"
                      placeholder="Confirm New Password"
                      value={resetData?.confirm_new_password}
                      onChange={handleChangeInput}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />
                  </div>
                  <InputLabel className="validation_error">
                    {inputValidation?.confirm_new_password}
                  </InputLabel>
                </div>

                <Box className="reset_box">
                  <Button
                    onClick={(e) => handleClickValidation(e)}
                    className="reset_button"
                    type="submit"
                  >
                    Change My Password
                  </Button>
                </Box>
              </div>
            </form>
          </div>
        </div>
      )}
      {gratitude && <Gratitude />}
    </div>
  );
};
export default Index;
