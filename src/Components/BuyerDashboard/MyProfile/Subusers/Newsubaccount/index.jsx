import React,{useState} from 'react'
import './styles.scss'
import{ TextField,TextareaAutosize,InputLabel }from '@mui/material';
import {isEmailValid} from "../../../../../utilities";
import Autocomplete from "@mui/material/Autocomplete";
import { useParams } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
const Index = (classes) => {
    const List =[
        {title:"Cart Approval Required",},
        {title:"Can Approve Carts",},
        {title:"Can Place Orders",},
        {title:"Force Usage Main Account Address",},
        {title:"Can Add To Main Wishlist",},
        {title:"Can Remove From Main Wishlist",},
        {title:"Can View Main Account Order List",},
        {title:"Can View Main Account Order Details",},
        {title:"Can View Sub Account Order List",},
    ];
    const defaultProps = {
        options: List,
        getOptionLabel: (option) => option.title,
      };
      
    let { type } = useParams();
  let {
    auto_complete_input,
    validation_error,
  } = classes;
   const options = ["Option 1", "Option 2"];
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  const [NewSubAccountData, setNewSubAccountData] = useState({
    first_name: "",
    last_name: "",
    e_mail: "",
    allowed_permissions: "",
    active: "", 
  });
  const [inputValidation, setInputValidation] = useState({
    first_name: "",
    last_name: "",
    e_mail: "",
    allowed_permissions: "",
    active: "",
  });
  const handleChangeInput = (event) => {
    
    setNewSubAccountData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    setInputValidation("");
    handleSwitchCase([event.target.name], event.target.value);
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
      case "allowed_permissions":
      if (!value) {
        setInputValidation((prevState) => ({
          ...prevState,
          allowed_permissions: "Please allow permissions.",
        }));
      }
      break;
      case "e_mail":
      if (!value) {
        setInputValidation((prevState) => ({
          ...prevState,
          e_mail: "Please enter your e-mail",
        }));
      }else if (!isEmailValid(value)) {
        setInputValidation((prevState) => ({
          ...prevState,
          e_mail: "Please enter the valid e-mail.",
        }));
      }
      break;
      case "active":
      if (!value) {
        setInputValidation((prevState) => ({
          ...prevState,
          new_password: "Please select your status",
        }));
      }
      break; 
    default:
      break;
  }
};
  const handleClickValidation = (event) => {
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
if (!NewSubAccountData?.e_mail) {
  document.getElementById("e_mail")?.focus();
  setInputValidation((prevState) => ({
    ...prevState,
    e_mail: "Please enter your email.",
  }));
 errorHandle = true;
}
if (!NewSubAccountData?.allowed_permissions) {
  document.getElementById("allowed_permissions")?.focus();
  setInputValidation((prevState) => ({
    ...prevState,
    allowed_permissions: "Please allow permissions.",
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
}
  return (
    <div className='subaccount_main'>
    <p className='sub_heading'>Add New Sub-Account</p>
    <div className='input_sections'>
        <div className='input_sections1'>
        <p>First Name</p>
              <TextField
              fullWidth
                id="first_name"
                name='first_name'
                placeholder='First Name'
                InputLabelProps={{
                  shrink:false,
                }}
                value={NewSubAccountData?.first_name}
                onChange={handleChangeInput}
              />
               <InputLabel className={validation_error}>
              {inputValidation?.first_name}
            </InputLabel>
        </div>
        <div className='input_sections1'>
        <p>Last Name</p>
              <TextField
              fullWidth
                id="last_name"
                name='last_name'
                placeholder='Last Name'
                InputLabelProps={{
                  shrink:false,
                }}
                value={NewSubAccountData?.last_name}
                onChange={handleChangeInput}
              />
              <InputLabel className={validation_error}>
              {inputValidation?.last_name}
            </InputLabel>
        </div>
    </div>
    <div className='user_input'>
    <p>Email Address</p>
              <TextField
              fullWidth
                id="e_mail"
                name="e_mail"
                placeholder='E-Mail Address'
                InputLabelProps={{
                  shrink:false,
                }}
                value={NewSubAccountData?.e_mail}
                onChange={handleChangeInput}
              />
              <InputLabel className={validation_error}>
              {inputValidation?.e_mail}
            </InputLabel>
    </div>
    <div className='user_permision'>
        <p>Allowed Permission</p>
     <Autocomplete
      id="country-select-demo"
      options={List}
      autoHighlight
      
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField
           
          {...params}
          fullWidth
          id="allowed_permissions"
          name='allowed_permissions'
          placeholder='Allow Permissions'
          InputLabelProps={{
            shrink:false,
          }}
          value={NewSubAccountData?.allowed_permissions}
          onChange={handleChangeInput}
          inputProps={{
            
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    /> 
    <InputLabel className={validation_error}>
              {inputValidation?.allowed_permissions}
            </InputLabel>
    {/* <Autocomplete
        {...defaultProps}
        id="disable-close-on-select"
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField {...params}  variant="standard" />
        )}
      /> */}
    </div>
    <div>
    <p>Fobidden Access</p>
    <TextareaAutosize
      placeholder='Access'
      aria-label="empty textarea"
      style={{height:100,
              width:"100%",}}
    />
    </div>
    <div className='users_active_section'>
    <p>Active</p>
            <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            className={auto_complete_input}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                id="active"
                name="active"
                placeholder="Yes"
                InputLabelProps={{
                  shrink:false,                 
                }}
                value={NewSubAccountData?.active}
                onChange={handleChangeInput}
              />
            )}
          />
          <InputLabel className={validation_error}>
              {inputValidation?.active}
            </InputLabel>
    </div>
    <div className='my_profile_btns'>
    <div className='my_profile_back'>
    <Link to="/buyerdashboard/dashboard" className="link">
        <ArrowBackIosNew /><span><p className='back'>Back</p></span>
          </Link>
      </div>
    <div className='user_btn_section'>
        <button  onClick={() => handleClickValidation()}>Save Sub-Account</button>
    </div>
    </div>
    </div>
  )
}

export default Index;
