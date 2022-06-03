import React, { useState, useEffect } from "react";
import "./styles.scss";
import { TextField, InputLabel, Checkbox } from "@mui/material";
import { getAdminToken } from "../../../../../utilities";
import Autocomplete from "@mui/material/Autocomplete";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useStateValue } from "../../../../../store/state";
import axios from "axios";
import Constant from "../../../../../Constant";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import swal from "sweetalert2";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Index = ({ currentid, setisSub, setisSubusers, setshowButton }) => {
  const [{}, dispatch] = useStateValue();
  const [adminToken, setAdminToken] = useState("");
  const [plist, setplist] = useState();
  const [NewSubAccountData, setNewSubAccountData] = useState({
    first_name: "",
    last_name: "",
    e_mail: "",
    allowed_permissions: [],
    forbidden: "",
    designation: "",
    mobile: "",
    active: "",
  });
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);
  useEffect(async () => {
    if (adminToken === "") return;
    let user = JSON.parse(localStorage.getItem("userdata"));
    try {
      const permissionlist = await axios({
        method: "post",
        url: `${Constant?.baseUrl()}/listPermissions`,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        data: {
          customer_id: user?.id,
        },
      });
      setplist(permissionlist?.data);
    } catch (e) {
      console.log(e);
    }
  }, [adminToken]);

  useEffect(async () => {
    if (currentid === 0) return;
    if (plist === undefined) return;
    try {
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });
      const getformdata = await axios({
        method: "post",
        url: `${Constant?.baseUrl()}/editSubAccountFormData`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          entity_id: currentid,
        },
      });
      setNewSubAccountData({
        first_name: getformdata?.data[0]?.firstname,
        last_name: getformdata?.data[0]?.lastname,
        e_mail: getformdata?.data[0]?.email,
        allowed_permissions: getformdata?.data[0]?.availablePermissions,
        forbidden: getformdata?.data[0]?.forbidden_access,
        designation: getformdata?.data[0]?.designation,
        mobile: getformdata?.data[0]?.mobile_number,
        active: getformdata?.data[0]?.status === "1" ? "Yes" : "No",
        customer_id: getformdata?.data[0]?.customer_id,
      });
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  }, [currentid, plist]);

  const options = ["Yes", "No"];

  const [inputValidation, setInputValidation] = useState({
    first_name: "",
    last_name: "",
    e_mail: "",
    allowed_permissions: [],
    forbidden: "",
    designation: "",
    mobile: "",
    active: "",
  });
  const handleChangeInput = (event) => {
    setNewSubAccountData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    setInputValidation("");
  };
  const handleClickValidation = async (event) => {
    var errorHandle = false;
    if (!NewSubAccountData?.first_name) {
      document.getElementById("first_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        first_name: "Please enter the first name.",
      }));
      errorHandle = true;
    }
    if (!NewSubAccountData?.last_name) {
      document.getElementById("last_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        last_name: "Please enter the last name.",
      }));
      errorHandle = true;
    }
    if (!NewSubAccountData?.designation) {
      document.getElementById("designation")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        designation: "Please enter designation.",
      }));
      errorHandle = true;
    }
    if (!NewSubAccountData?.mobile) {
      document.getElementById("mobile")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        mobile: "Please enter mobile.",
      }));
      errorHandle = true;
    }
    if (!NewSubAccountData?.e_mail) {
      document.getElementById("e_mail")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        e_mail: "Please enter your email.",
      }));
      errorHandle = true;
    }
    if (!NewSubAccountData?.allowed_permissions.length) {
      document.getElementById("allowed_permissions")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        allowed_permissions: "Please add permissions.",
      }));
      errorHandle = true;
    }
    if (!NewSubAccountData?.active) {
      document.getElementById("active")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        active: "Please select status.",
      }));
      errorHandle = true;
    }
    if (!errorHandle) {
      try {
        let temp = [];
        NewSubAccountData?.allowed_permissions?.map((ap) =>
          temp.push(ap?.value)
        );
        let user = JSON.parse(localStorage.getItem("userdata"));
        dispatch({
          type: "SET_IS_LOADING",
          value: true,
        });
        const submituser = await axios({
          method: "post",
          url: `${Constant?.baseUrl()}/createSubAccount`,
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
          data: {
            data: {
              firstname: NewSubAccountData?.first_name,
              lastname: NewSubAccountData?.last_name,
              email: NewSubAccountData?.e_mail,
              designation: NewSubAccountData?.designation,
              mobile_number: NewSubAccountData?.mobile,
              forbidden_access: NewSubAccountData?.forbidden,
              available_permissions: temp,
              status: NewSubAccountData?.active === "Yes" ? 1 : 0,
              login_id: user?.id,
              entity_id: currentid ? currentid : 0,
              customer_id: NewSubAccountData?.customer_id,
            },
          },
        });
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        if (submituser?.data?.[0]?.status) {
          swal.fire({
            text: `Sub-Account Created Successfully`,
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
          setisSub(false);
          setisSubusers(true);
          setshowButton(true);
        } else {
          swal.fire({
            text: `${submituser?.data?.[0]?.message}`,
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      } catch (e) {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        console.log(e);
      }
    }
  };
  return (
    <div className="subaccount_main">
      <p className="sub_heading">Add New Sub-Account</p>
      <div className="new_sub_account_section">
        <div className="input_sections">
          <div className="input_sections1">
            <p>First Name</p>
            <TextField
              fullWidth
              id="first_name"
              name="first_name"
              className="inputfield-box roundedbox"
              placeholder="First Name"
              InputLabelProps={{
                shrink: false,
              }}
              value={NewSubAccountData?.first_name}
              onChange={handleChangeInput}
            />
            <InputLabel className="validation_error">
              {inputValidation?.first_name}
            </InputLabel>
          </div>
          <div className="input_sections1">
            <p>Last Name</p>
            <TextField
              fullWidth
              id="last_name"
              className="inputfield-box roundedbox"
              name="last_name"
              placeholder="Last Name"
              InputLabelProps={{
                shrink: false,
              }}
              value={NewSubAccountData?.last_name}
              onChange={handleChangeInput}
            />
            <InputLabel className="validation_error">
              {inputValidation?.last_name}
            </InputLabel>
          </div>
        </div>
        <div className="input_sections">
          <div className="input_sections1">
            <p>Designation</p>
            <TextField
              fullWidth
              id="designation"
              className="inputfield-box roundedbox"
              name="designation"
              placeholder="Designation"
              InputLabelProps={{
                shrink: false,
              }}
              value={NewSubAccountData?.designation}
              onChange={handleChangeInput}
            />
            <InputLabel className="validation_error">
              {inputValidation?.designation}
            </InputLabel>
          </div>
          <div className="input_sections1">
            <p>Mobile Number</p>
            <TextField
              fullWidth
              id="mobile"
              className="inputfield-box roundedbox"
              name="mobile"
              type="number"
              placeholder="Mobile"
              InputLabelProps={{
                shrink: false,
              }}
              value={NewSubAccountData?.mobile}
              onChange={handleChangeInput}
            />
            <InputLabel className="validation_error">
              {inputValidation?.mobile}
            </InputLabel>
          </div>
        </div>
        <div className="user_input">
          <p>Email Address</p>
          <TextField
            fullWidth
            id="e_mail"
            name="e_mail"
            className="inputfield-box roundedbox"
            placeholder="E-Mail Address"
            InputLabelProps={{
              shrink: false,
            }}
            value={NewSubAccountData?.e_mail}
            onChange={handleChangeInput}
          />
          <InputLabel className="validation_error">
            {inputValidation?.e_mail}
          </InputLabel>
        </div>
        <div className="user_permision">
          <p>Allowed Permission</p>
          <Autocomplete
            id="country-select-demo"
            options={plist ? plist : []}
            multiple
            value={
              NewSubAccountData?.allowed_permissions
                ? NewSubAccountData?.allowed_permissions
                : ""
            }
            getOptionLabel={(option) => (option.label ? option.label : "")}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            disableCloseOnSelect
            renderOption={(props, option, { selected }) => (
              <li {...props} style={{ padding: "0px" }}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{
                    marginRight: 8,
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                  checked={selected}
                />
                {option.label}
              </li>
            )}
            onChange={(event, newValue) => {
              setNewSubAccountData((prevState) => ({
                ...prevState,
                allowed_permissions: newValue,
              }));
              setInputValidation((prevState) => ({
                ...prevState,
                allowed_permissions: "",
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Allowed Permissions"
                className="inputfield-box"
                fullWidth
                InputLabelProps={{
                  shrink: false,
                }}
              />
            )}
          />
          <InputLabel className="validation_error">
            {inputValidation?.allowed_permissions}
          </InputLabel>
        </div>
        <div>
          <p>Forbidden Access</p>

          <TextField
            className="inputfield-box contact-form-inputfieldbox"
            fullWidth
            aria-label="comments"
            placeholder="Access"
            name="your_message"
            id="your_message"
            multiline
            rows={3}
            style={{ height: 100 }}
            value={NewSubAccountData?.forbidden}
            onChange={(e) =>
              setNewSubAccountData((prevState) => ({
                ...prevState,
                forbidden: e.target.value,
              }))
            }
            InputLabelProps={{
              shrink: true,
              required: true,
              classes: {
                asterisk: "asterisk",
              },
            }}
            variant="outlined"
          />
        </div>
        <div className="users_active_section">
          <p>Active</p>
          <Autocomplete
            value={NewSubAccountData?.active}
            id="controllable-states-demo"
            options={options ? options : []}
            className="auto_complete_input"
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                id="active"
                name="active"
                className="inputfield-box roundedbox"
                placeholder="Yes"
                InputLabelProps={{
                  shrink: false,
                }}
              />
            )}
            onChange={(event, newValue) => {
              setNewSubAccountData((prevState) => ({
                ...prevState,
                active: newValue,
              }));
              setInputValidation((prevState) => ({
                ...prevState,
                active: "",
              }));
            }}
          />
          <InputLabel className="validation_error">
            {inputValidation?.active}
          </InputLabel>
        </div>
      </div>
      <div className="my_profile_btns">
        <div className="my_profile_back">
          <div
            className="back_button"
            onClick={() => {
              setisSub(false);
              setisSubusers(true);
              setshowButton(true);
            }}
            style={{ cursor: "pointer" }}
          >
            <ArrowBackIosNew />
            <span className="back">Back</span>
          </div>
          {/* <Link
            to={`/${
              customnostore ? customnostore : geo?.country_name
            }/buyerdashboard/dashboard`}
            className="link"
          >
            <ArrowBackIosNew />
            <span>
              <p className="back">Back</p>
            </span>
          </Link> */}
        </div>
        <div className="user_btn_section">
          <button onClick={() => handleClickValidation()}>
            Save Sub-Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
