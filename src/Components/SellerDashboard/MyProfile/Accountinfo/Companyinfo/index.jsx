import React, { useState, useEffect } from 'react'
import './styles.scss'
import { TextField } from '@mui/material';
import  styles from './styles'
import { withStyles } from "@mui/styles";
import Autocomplete from "@mui/material/Autocomplete";
import { ArrowBackIosNew } from "@mui/icons-material";
import uploadImage from "../../../../../Assets/CommonImage/KYC Form/Icon.png";
import { Clear } from "@mui/icons-material";
import { InputLabel } from "@mui/material";
import { Link } from "react-router-dom";
import { useStateValue } from '../../../../../store/state';

const Index = ({classes}) => {
   const [{geo, customstore, customnostore}, dispatch] = useStateValue()
  let {
    auto_complete_input,
    input_image_name,
    input_image_name_clear_btn,
    validation_error,
  } = classes;
  const options = ["Option 1", "Option 2"];
  const [form,setform]=useState(false)
  const handleImageChange = (event) => {
    setform((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.files[0],
    }));
    setInputValidation("");
    handleSwitchCase([event.target.name], event.target?.files[0]?.name);
  };
  const [inputValidation, setInputValidation] = useState({
    Documents: "",
  });
  const handleSwitchCase = (fieldName, value) => {
    switch (fieldName[0]) {
      case "Documents":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            Documents: "Please attach GST id details.",
          }));
        }
        break;
      default:
        break;
    }
  };
   const userData = JSON.parse(localStorage.getItem('userdata'))
  let company_name = userData?.custom_attributes?.filter(
    (itm) => itm?.attribute_code === "customer_company_name");

  
 
  
  // const [value, setValue] = React.useState();
  // const [inputValue, setInputValue] = React.useState("");

  // const [CompanyInfoData, setCompanyInfoData] = useState({
  //   organization_name: "",
  //   organization_type: "",
  //   gst_number: "",
  //   speciality: "",
  //   no_of_branches: "",
  //   average_revenue: "",
  // });
  // const [inputValidation, setInputValidation] = useState({
  //   organization_name: "",
  //   organization_type:"",
  //   gst_number:"",
  //   speciality:"",
  //   no_of_branches:"",
  //   average_revenue:"",
  // });

  //   const handleClickValidation = (event) => {
  //     var errorHandle = false;
  //     if (!CompanyInfoData?.organization_name) {
  //       document.getElementById("organization_name")?.focus();
  //       setInputValidation((prevState) => ({
  //         ...prevState,
  //         organization_name: "Please enter the organization name.",
  //       }));
  //      errorHandle = true;
  //   }
  //   if (!CompanyInfoData?.organization_type) {
  //     document.getElementById("organization_type")?.focus();
  //     setInputValidation((prevState) => ({
  //       ...prevState,
  //       organization_type: "Please select the organization type.",
  //     }));
  //    errorHandle = true;
  // }
  // if (!CompanyInfoData?.gst_number) {
  //   document.getElementById("gst_number")?.focus();
  //   setInputValidation((prevState) => ({
  //     ...prevState,
  //     gst_number: "Please enter the gst number.",
  //   }));
  //  errorHandle = true;
  // }
  // if (!CompanyInfoData?.speciality) {
  //   document.getElementById("speciality")?.focus();
  //   setInputValidation((prevState) => ({
  //     ...prevState,
  //     speciality: "Please select the speciality.",
  //   }));
  //  errorHandle = true;
  // }
  // if (!CompanyInfoData?.no_of_branches) {
  //   document.getElementById("no_of_branches")?.focus();
  //   setInputValidation((prevState) => ({
  //     ...prevState,
  //     no_of_branches: "Please enter no of branches.",
  //   }));
  //  errorHandle = true;
  // }
  // if (!CompanyInfoData?.average_revenue) {
  //   document.getElementById("average_revenue")?.focus();
  //   setInputValidation((prevState) => ({
  //     ...prevState,
  //     average_revenue: "Please enter the average revenue.",
  //   }));
  //  errorHandle = true;
  // }
  // };

  return (
    <div className='companyinfo_main'>
      <span className='Account_heading'> <p >EDIT COMPANY INFORMATION</p></span>
      <div className='company_information'>
        <div className='form'>
          <div className='inputfield_section'>
            <div className='inputfield'>
              <p>Organization Name</p>
              <TextField
                id="organization_name"
                name='organization_name'
                placeholder='Organization Name'
                 className="inputfield-box"
                value={company_name?.[0]?.value}
              />
              {/* <InputLabel className={validation_error}>
              {inputValidation?.organization_name}
            </InputLabel> */}
            </div>
            <div className='inputfield'>

              <p>Organization Type</p>
              <Autocomplete
                // value={value}
                // onChange={(event, newValue) => {
                //   setValue(newValue);
                // }}
                className={auto_complete_input}
                // inputValue={inputValue}
                // onInputChange={(event, newInputValue) => {
                //   setInputValue(newInputValue);
                // }}
                id="controllable-states-demo"
                options={options}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="organization_type"
                    name='organization_type'
                     className="inputfield-box"
                    placeholder="Organization Type"
                    // value={CompanyInfoData?.organization_type}
                    InputLabelProps={{
                      shrink: true,
                      required: true,

                    }}
                  />
                )}
              />
              {/* <InputLabel className={validation_error}>
              {inputValidation?.organization_type}
            </InputLabel> */}
            </div>
          </div>
          <div className='inputfield_section'>
            <div className='inputfield'>
              <p>GST Number</p>
              <TextField
                id="gst_number"
                name="gst_number"
                 className="inputfield-box"
                placeholder='GST Number'
              // value={CompanyInfoData?.gst_number}
              />
              {/* <InputLabel className={validation_error}>
              {inputValidation?.gst_number}
            </InputLabel> */}
            </div>
            <div className='inputfield'>

              <p>Speciality</p>
              <Autocomplete
                // value={value}
                // onChange={(event, newValue) => {
                //   setValue(newValue);
                // }}
                className={auto_complete_input}
                // inputValue={inputValue}
                // onInputChange={(event, newInputValue) => {
                //   setInputValue(newInputValue);
                // }}
                id="controllable-states-demo"
                options={options}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="speciality"
                    name='speciality'
                     className="inputfield-box"
                    placeholder="Speciality"
                    // value={CompanyInfoData?.speciality}
                    InputLabelProps={{
                      shrink: true,
                      required: true,

                    }}
                  />
                )}
              />
              {/* <InputLabel className={validation_error}>
              {inputValidation?.speciality}
            </InputLabel> */}
            </div>
          </div>
          <div className='inputfield_section'>
            <div className='inputfield'>
              <p>Number Of Branches & Department</p>
              <TextField
                id="no_of_branches"
                 className="inputfield-box"
                name='no_of_branches'
                placeholder='Number Of Branches & Departments'
              // value={CompanyInfoData?.no_of_branches}
              />
              {/* <InputLabel className={validation_error}>
              {inputValidation?.no_of_branches}
            </InputLabel> */}
            </div>
            <div className='inputfield'>
              <p>Average Revenue</p>
              <TextField
                id="average_revenue"
                name='average_revenue'
                 className="inputfield-box"
                placeholder='Average Revenue'
              // value={CompanyInfoData?.average_revenue}
              />
              {/* <InputLabel className={validation_error}>
              {inputValidation?.average_revenue}
            </InputLabel> */}
            </div>
          </div>
          <div className='accountinfo_btn'>
            <div className="media_upload">
              <div className="sub_media_upload_container">
                <div className="sub_media_upload_part">
                  <div className='heading'>
                    <p>Upload Documents</p>
                    <small>(Supported format : .jpg/.png/.pdf)</small>
                  </div>
                  <div className='label_section'>
                    <p>GST Certificate</p>
                    <label
                      className="sub_media_upload_label"
                      htmlFor="icon-button-file"
                    >
                      <img
                        src={uploadImage}
                        alt="auth"
                        aria-label="upload picture"
                        component="span"
                      />
                      <input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        name="Documents"
                        onChange={handleImageChange}
                      />
                      
                    </label>
                    <InputLabel className={validation_error}>
            {inputValidation?.national_id_image}
          </InputLabel>
                  </div>
                </div>
              </div>
              {form?.Documents?.name && (
                <div className={input_image_name}>
                    <p>{form?.Documents?.name}</p>
                    <Clear
                      className={input_image_name_clear_btn}
                      onClick={() =>
                        setform((prevState) => ({
                          ...prevState,
                          Documents: "",
                        }))
                      }
                    />
                </div>
              )}
            </div>

            <div className='accountinfo_btn_section'>
              <button className='account_info_cancel'>Cancel</button>
              <button className='account_info_save'>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='my_profile_back'>
      <Link to={`/${customnostore ? customnostore : geo?.country_name}/buyerdashboard/dashboard`} className="link">
        <ArrowBackIosNew /><span><p className='back'>Back</p></span>
          </Link>
      </div>
    </div>
  )
}
export default withStyles(styles)(Index);