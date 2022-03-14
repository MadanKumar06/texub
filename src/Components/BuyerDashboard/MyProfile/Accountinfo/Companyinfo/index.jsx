import React,{useState} from 'react'
import './styles.scss'
import {TextField,InputLabel} from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
import { useParams } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";

const Index = (classes) => {
  
  let { type } = useParams();
  let {
    auto_complete_input,
    validation_error,
  } = classes;
  const options = ["Option 1", "Option 2"];
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  
  const [CompanyInfoData, setCompanyInfoData] = useState({
    organization_name: "",
    organization_type: "",
    gst_number: "",
    speciality: "",
    no_of_branches: "",
    average_revenue: "",

    

  });
  const [inputValidation, setInputValidation] = useState({
    organization_name: "",
    organization_type:"",
    gst_number:"",
    speciality:"",
    no_of_branches:"",
    average_revenue:"",
  });
  
  const handleClickValidation = (event) => {
    var errorHandle = false;
    if (!CompanyInfoData?.organization_name) {
      document.getElementById("organization_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        organization_name: "Please enter the organization name.",
      }));
     errorHandle = true;
  }
  if (!CompanyInfoData?.organization_type) {
    document.getElementById("organization_type")?.focus();
    setInputValidation((prevState) => ({
      ...prevState,
      organization_type: "Please select the organization type.",
    }));
   errorHandle = true;
}
if (!CompanyInfoData?.gst_number) {
  document.getElementById("gst_number")?.focus();
  setInputValidation((prevState) => ({
    ...prevState,
    gst_number: "Please enter the gst number.",
  }));
 errorHandle = true;
}
if (!CompanyInfoData?.speciality) {
  document.getElementById("speciality")?.focus();
  setInputValidation((prevState) => ({
    ...prevState,
    speciality: "Please select the speciality.",
  }));
 errorHandle = true;
}
if (!CompanyInfoData?.no_of_branches) {
  document.getElementById("no_of_branches")?.focus();
  setInputValidation((prevState) => ({
    ...prevState,
    no_of_branches: "Please enter no of branches.",
  }));
 errorHandle = true;
}
if (!CompanyInfoData?.average_revenue) {
  document.getElementById("average_revenue")?.focus();
  setInputValidation((prevState) => ({
    ...prevState,
    average_revenue: "Please enter the average revenue.",
  }));
 errorHandle = true;
}
};

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
                value={CompanyInfoData?.organization_name}
              />
              <InputLabel className={validation_error}>
              {inputValidation?.organization_name}
            </InputLabel>
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
                   id="organization_type"
                   name='organization_type'
                    placeholder="Organization Type"
                    value={CompanyInfoData?.organization_type}
                    InputLabelProps={{
                      shrink: true,
                      required: true,

                    }}
                  />
                )}
              />
              <InputLabel className={validation_error}>
              {inputValidation?.organization_type}
            </InputLabel>
            </div>
          </div>
          <div className='inputfield_section'>
            <div className='inputfield'>
              <p>GST Number</p>
              <TextField
                id="gst_number"
                name="gst_number"
                placeholder='GST Number'
                value={CompanyInfoData?.gst_number}
              />
              <InputLabel className={validation_error}>
              {inputValidation?.gst_number}
            </InputLabel>
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
                    id="speciality"
                    name='speciality'
                    placeholder="Speciality"
                    value={CompanyInfoData?.speciality}
                    InputLabelProps={{
                      shrink: true,
                      required: true,

                    }}
                  />
                )}
              />
              <InputLabel className={validation_error}>
              {inputValidation?.speciality}
            </InputLabel>
            </div>
          </div>
          <div className='inputfield_section'>
            <div className='inputfield'>
              <p>Number Of Branches & Department</p>
              <TextField
                id="no_of_branches"
                name='no_of_branches'
                placeholder='Number Of Branches & Departments'
                value={CompanyInfoData?.no_of_branches}
              />
              <InputLabel className={validation_error}>
              {inputValidation?.no_of_branches}
            </InputLabel>
            </div>
            <div className='inputfield'>
              <p>Average Revenue</p>
              <TextField
                id="average_revenue"
                name='average_revenue'
                placeholder='Average Revenue'
                value={CompanyInfoData?.average_revenue}
              />
              <InputLabel className={validation_error}>
              {inputValidation?.average_revenue}
            </InputLabel>
            </div>
          </div>
          <div className='accountinfo_btn'>
            <div className='documents'>
              <label >Upload Documents <span> (Sopported format:.jpg/.png/.pdf)</span></label>
              <input type="file" name="myfile" ></input>
            </div> 
            
            <div className='accountinfo_btn_section'>
              <button className='account_info_cancel'>Cancel</button>
              <button className='account_info_save' onClick={() => handleClickValidation()}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='my_profile_back'>
        <ArrowBackIosNew /><span><p className='back'>Back</p></span>
      </div>
    </div>
  )
}
export default Index;