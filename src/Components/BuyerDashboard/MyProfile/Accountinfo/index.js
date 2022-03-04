import React, { useState } from 'react'
import './styles.scss'
import TextField from '@mui/material/TextField';
const index = () => {
  // const [AccountInfoData, setAccountInfoData] = useState({
  //   first_name: "",

  // });
  // const [isinputValidation, setisInputValidation] = useState({
  //   first_name: "",
  // });
  // const handleClickValidation = (event) => {
  //   var errorHandle = false;
  //   if (!AccountInfoData?.first_name) {
  //     document.getElementById("first_name")?.focus();
  //     setInputValidation((prevState) => ({
  //       ...prevState,
  //       first_name: "Please enter the first_name.",
  //     }));
  //     errorHandle = true;
  //   } else if (!isEmailValid(AccountInfoData?.first_name)) {
  //     document.getElementById("email_address")?.focus();
  //     setInputValidation((prevState) => ({
  //       ...prevState,
  //       email_address: "Please enter the valid e-mail.",
  //     }));
  //     errorHandle = true;
  //   }
  // };
    return (
      <div className='account_ifo_main'>
        <span className='Account_heading'> <p>EDIT PROFILE INFORMATION</p></span>
        <div className='account_info_edit' >
          {/* <TextField
          error
          id="outlined-error"
          label="Error"
          defaultValue="Hello World"
        /> */}
          <form>
            <div className='inputfield_section'>
              <div className='inputfield'>
                <p>First Name</p>
                <TextField
                  id="first_name"
                  name="first_name"
                  defaultValue="Ayush"
                />
              </div>
              <div className='inputfield'>
                <p>Last Name</p>
                <TextField
                  id="outlined-error"
                  defaultValue="Raj"
                />
              </div>
            </div>
            <div className='inputfield_section'>
              <div className='inputfield'>
                <p>Mobile Number</p>
                <TextField
                  id="outlined-error"
                  defaultValue="8844886739"
                />
              </div>
              <div className='inputfield'>
                <p>Email Address</p>
                <TextField
                  id="outlined-error"
                  defaultValue="ayush@ymail.com"
                />
              </div>
            </div>
            <div className='inputfield_section'>
              <div className='inputfield'>
                <p>New password</p>
                <TextField
                  id="outlined-error"
                  defaultValue="**********"
                />
              </div>
              <div className='inputfield'>
                <p>Confirm New password</p>
                <TextField
                  id="outlined-error"
                  defaultValue="**********"
                />
              </div>

            </div>
            <div className='accountinfo_btn'>
              <button className='account_info_cancel'>Cancel</button>
              <button className='account_info_save'>Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
 
export default index;