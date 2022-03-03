import React from 'react'
import './styles.scss'
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import { useParams } from "react-router-dom";
import { Clear } from "@mui/icons-material";
import uploadImage from "../../../../../Assets/CommonImage/KYC Form/Icon.png";
import styles from '../../../../../Pages/Register/BuyerKYCform/SectionLeft/styles'

const Index = (classes) => {
  // let {
  //   auto_complete_input,
  //   media_upload,
  //   sub_media_upload_container,
  //   sub_media_upload_part,
  //   sub_media_upload_label,
  //   input_image_name,
  //   input_image_name_clear_btn,
  // } = classes;
  let { type } = useParams();
  let {
    auto_complete_input,
  } = classes;
  const options = ["Option 1", "Option 2"];
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  return (
    <div className='companyinfo_main'>
      <span className='Account_heading'> <p >EDIT COMPANY INFORMATION</p></span>
      <div className='company_information'>
        <form>
          <div className='inputfield_section'>
            <div className='inputfield'>
              <p>Organization Name</p>
              <TextField
                id="outlined-error"
                defaultValue="Organization Name"
              />
            </div>
            <div className='inputfield'>

              <p>Organization Type</p>
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                className={auto_complete_input}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}

                    placeholder="Country"
                    InputLabelProps={{
                      shrink: true,
                      required: true,

                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className='inputfield_section'>
            <div className='inputfield'>
              <p>GST Number</p>
              <TextField
                id="outlined-error"
                defaultValue="29Aabcu9604R1Zj"
              />
            </div>
            <div className='inputfield'>
              
              <p>Speciality</p>
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                className={auto_complete_input}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}

                    placeholder="Speciality"
                    InputLabelProps={{
                      shrink: true,
                      required: true,

                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className='inputfield_section'>
            <div className='inputfield'>
              <p>Number Of Branches & Department</p>
              <TextField
                id="outlined-error"
                defaultValue="00"
              />
            </div>
            <div className='inputfield'>
              <p>Average Revenue</p>
              <TextField
                id="outlined-error"
                defaultValue="12030596"
              />
            </div>
          </div>
          <div className='accountinfo_btn'>
            <div className='documents'>
              <label >Upload Documents <span> (Sopported format:.jpg/.png/.pdf)</span></label>
              <input type="file" name="myfile" ></input>
            </div> 
            {/* <div className={media_upload}>
                <div className={sub_media_upload_container}>
                  <div className={sub_media_upload_part}>
                    <p>Attatch National ID</p>
                    <span>*</span>
                    <label
                      className={sub_media_upload_label}
                      htmlFor="icon-button-file"
                    >
                      <input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                      />
                      <img
                        src={uploadImage}
                        alt="auth"
                        aria-label="upload picture"
                        component="span"
                      />
                    </label>
                  </div>

                  <small>(Supported format : .jpg/.png/.pdf)</small>
                </div>
                <div className={input_image_name}>
                  <p>Adhaar_20456.Jpg</p>
                  <Clear
                    className={input_image_name_clear_btn}
                    // onClick={() => handleClose()}
                  />
                </div> */}
              {/* </div> */}
            <div className='accountinfo_btn_section'>
              <button className='account_info_cancel'>Cancel</button>
              <button className='account_info_save'>Save Changes</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Index;