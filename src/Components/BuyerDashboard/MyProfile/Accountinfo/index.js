import React, { useState } from 'react'
import './styles.scss'
import { TextField,InputLabel }from '@mui/material';
const Index = (classes) => {
  let {
    validation_error
  }=classes;
  const [AccountInfoData, setAccountInfoData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    email_address: "",
    new_password: "",
    new_confrim_password: "",

  });
  
  // const [value, setValue] = React.useState();
  // const [inputValue, setInputValue] = React.useState("");
  const [inputValidation, setInputValidation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    email_address: "",
    new_password: "",
    new_confrim_password: "",
  });

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
    document.getElementById("mobile_number")?.focus();
    setInputValidation((prevState) => ({
      ...prevState,
      mobile_number: "Please enter the mobile number.",
    }));
   errorHandle = true;
  } else if (AccountInfoData?.mobile_number?.length !== 10) {
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

return (
  <div className='account_ifo_main'>
    <span className='Account_heading'> <p>EDIT PROFILE INFORMATION</p></span>
    <div className='account_info_edit' >
      {/* <form> */}
    <div className='form'>
        <div className='inputfield_section'>
          <div className='inputfield'>
            <p>First Name</p>
            <TextField
              id="first_name"
              name="first_name"
               value={AccountInfoData?.first_name}
               InputLabelProps={{
                shrink: true,
                required: true,
              }}
            />
           <InputLabel className={validation_error}
            >
              {inputValidation?.first_name}
            </InputLabel>
          </div>
          <div className='inputfield'>
            <p>Last Name</p>
            <TextField
              id="last_name"
              name="last_name"
              value={AccountInfoData?.last_name}
              InputLabelProps={{
                shrink: true,
                required: true,
              }}
            />
            <InputLabel className={validation_error}>
              {inputValidation?.last_name}
            </InputLabel>
          </div>
        </div>
        <div className='inputfield_section'>
          <div className='inputfield'>
            <p>Mobile Number</p>
            <TextField
              id="mobile_number"
              name="mobile_number"
              value={AccountInfoData?.mobile_number}
              InputLabelProps={{
                shrink: true,
                required: true,
              }}
            />
            <InputLabel className={validation_error}>
              {inputValidation?.mobile_number}
            </InputLabel>
          </div>
          <div className='inputfield'>
            <p>Email Address</p>
            <TextField
              id="email_address"
              name="email_address"
              value={AccountInfoData?.email_address}
              InputLabelProps={{
                shrink: true,
                required: true,
              }}
            />
            <InputLabel className={validation_error}>
              {inputValidation?.email_address}
            </InputLabel>
          </div>
        </div>
        <div className='inputfield_section'>
          <div className='inputfield'>
            <p>New password</p>
            <TextField
              id="new_password"
              name="new_password"
              value={AccountInfoData?.new_password}
              InputLabelProps={{
                shrink: true,
                required: true,
              }}
            />
             <InputLabel className={validation_error}>
              {inputValidation?.new_password}
            </InputLabel>
            
          </div>
          <div className='inputfield'>
            <p>Confirm New password</p>
            <TextField
              id="new_confrim_password"
              name="new_confrim_password"
              value={AccountInfoData?.new_confrim_password}
              InputLabelProps={{
                shrink: true,
                required: true,
              }}
            />
             <InputLabel className={validation_error}>
              {inputValidation?.new_confrim_password}
            </InputLabel>
            {/* <InputLabel className={validation_error}>
              {inputValidation?.first_name}
            </InputLabel> */}
          </div>

        </div>
        <div className='accountinfo_btn'>
          <button className='account_info_cancel'>Cancel</button>
          <button className='account_info_save' onClick={() => handleClickValidation()}>Save Changes</button>
        </div>
      {/* </form> */}
      </div>
    </div>
  </div>
    )
  }
export default Index;