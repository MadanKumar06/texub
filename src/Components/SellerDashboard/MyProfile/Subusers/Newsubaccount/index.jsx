import React,{ useState, useEffect } from 'react'
import './styles.scss'
import{ TextField,TextareaAutosize,InputLabel, Checkbox }from '@mui/material';
import { isEmailValid, getAdminToken } from "../../../../../utilities";
import Autocomplete from "@mui/material/Autocomplete";
import { useParams } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useStateValue } from '../../../../../store/state';
import axios from 'axios';
import Constant from '../../../../../Constant';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import swal from "sweetalert2";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Index = ({ currentid, setisSub, setisSubusers }) => {
  console.log(currentid)
  const [{geo, customstore, customnostore}, dispatch] = useStateValue()
  const [adminToken, setAdminToken] = useState("");
  const [plist, setplist] = useState()

  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);
  useEffect(async() => {
    if(adminToken === '') return
    let user = JSON.parse(localStorage.getItem('userdata'))
    try {
      const permissionlist = await axios({
        method: 'post',
        url: `${Constant?.baseUrl()}/listPermissions`,
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        data: {
          "customer_id" : user?.id
        }       
      })
      setplist(permissionlist?.data)
    } catch(e) {
      console.log(e)
    }
  },[adminToken])

  useEffect(async() => {
    if(currentid === 0) return
    if(plist === undefined) return
    try {
      const getformdata = await axios({
        method: 'post',
        url: `${Constant?.baseUrl()}/editSubAccountFormData`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: {
          "entity_id" : currentid
       }       
      })
      console.log(getformdata?.data)
      let temp = []
      getformdata?.data[0]?.availablePermissions?.map(d => {
        plist?.map(p => {
          if(d === p?.value) {
            temp.push({
              label: p?.label,
              value: p?.value
            })
          }
        })
      })
      setNewSubAccountData({
        first_name: getformdata?.data[0]?.firstname,
        last_name: getformdata?.data[0]?.lastname,
        e_mail: getformdata?.data[0]?.email,
        allowed_permissions: temp,
        forbidden: "",
        designation: getformdata?.data[0]?.designation,
        mobile: getformdata?.data[0]?.mobile_number,
        active: getformdata?.data[0]?.status === "1" ? 'Yes' : 'No',
        customer_id: getformdata?.data[0]?.customer_id
      })
    } catch(e) {
      console.log(e)
    }
  }, [currentid, plist])

  
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
  // let {
  //   auto_complete_input,
  //   validation_error,
  // } = classes;
   const options = ["Yes", "No"];
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  const [NewSubAccountData, setNewSubAccountData] = useState({
    first_name: "",
    last_name: "",
    e_mail: "",
    allowed_permissions: [],
    forbidden: "",
    designation: '',
    mobile: '',
    active: "", 
  });
  const [inputValidation, setInputValidation] = useState({
    first_name: "",
    last_name: "",
    e_mail: "",
    allowed_permissions: [],
    forbidden: "",
    designation: '',
    mobile: '',
    active: "",
  });
  console.log(NewSubAccountData)
  
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
      case "designation":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            designation: "Please enter designation.",
          }));
        } 
        break;
      case "mobile":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            mobile: "Please enter mobile number.",
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
      case "forbidden":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            allowed_permissions: "Please allow Forbidden Access.",
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
  const handleClickValidation = async(event) => {
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
    if (!NewSubAccountData?.allowed_permissions) {
      document.getElementById("allowed_permissions")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        allowed_permissions: "Please add permissions.",
      }));
    errorHandle = true;
    }
    if (!NewSubAccountData?.forbidden) {
      document.getElementById("forbidden")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        allowed_permissions: "Please add forbidden access.",
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

    try {
      let temp = []
      NewSubAccountData?.allowed_permissions?.map(ap => temp.push(ap?.value))
      let user = JSON.parse(localStorage.getItem('userdata'))
      const submituser = await axios({
        method: 'post',
        url: `${Constant?.baseUrl()}/createSubAccount`,
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        data: {
          "data":{
              "firstname" : NewSubAccountData?.first_name,
              "lastname" : NewSubAccountData?.last_name,
              "email" : NewSubAccountData?.e_mail,
              "designation" : NewSubAccountData?.designation,
              "mobile_number" : NewSubAccountData?.mobile,
              "available_permissions" : temp,
              "status" : NewSubAccountData?.active === 'Yes' ? 1 : 0,
              "login_id" : user?.id,
              "entity_id": currentid ? currentid : 0,
              "customer_id": NewSubAccountData?.customer_id
          }
        }
      })
      swal.fire({
        text: `Sub-Account Created Successfully`,
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
      setisSub(false)
      setisSubusers(true)
    } catch(e) {
      console.log(e)
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
        <InputLabel className="validation_error">
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
        <InputLabel className="validation_error">
          {inputValidation?.last_name}
        </InputLabel>
      </div>
    </div>
    <div className='input_sections'>
      <div className='input_sections1'>
        <p>Designation</p>
        <TextField
          fullWidth
          id="designation"
          name='designation'
          placeholder='Designation'
          InputLabelProps={{
            shrink:false,
          }}
          value={NewSubAccountData?.designation}
          onChange={handleChangeInput}
        />
        <InputLabel className="validation_error">
          {inputValidation?.designation}
        </InputLabel>
      </div>
      <div className='input_sections1'>
        <p>Mobile Number</p>
        <TextField
          fullWidth
          id="mobile"
          name='mobile'
          type="number"
          placeholder='Mobile'
          InputLabelProps={{
            shrink:false,
          }}
          value={NewSubAccountData?.mobile}
          onChange={handleChangeInput}
        />
        <InputLabel className="validation_error">
          {inputValidation?.mobile}
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
      <InputLabel className="validation_error">
        {inputValidation?.e_mail}
      </InputLabel>
    </div>
    <div className='user_permision'>
      <p>Allowed Permission</p>
      <Autocomplete
        id="country-select-demo"
        options={plist ? plist : []}
        multiple
        value={NewSubAccountData?.allowed_permissions ? NewSubAccountData?.allowed_permissions : ""}
        getOptionLabel={(option) => option.label ? option.label : ""}
        disableCloseOnSelect
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
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
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder=""
            className="inputfield-box"
          />
        )}
      /> 
      <InputLabel className="validation_error">
        {inputValidation?.allowed_permissions}
      </InputLabel>
    </div>
    <div>
      <p>Forbidden Access</p>
      <TextareaAutosize
        placeholder='Access'
        value={NewSubAccountData?.forbidden}
        onChange={(e) => setNewSubAccountData(prevState => ({
          ...prevState,
          forbidden: e.target.value
        }))}
        aria-label="empty textarea"
        style={{height:100,
                width:"100%",}}
      />
    </div>
    <div className='users_active_section'>
      <p>Active</p>
      <Autocomplete
        value={NewSubAccountData?.active}
        inputValue={inputValue}
        id="controllable-states-demo"
        options={options ? options : []}
        className="auto_complete_input"
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
          />
        )}
        onChange={(event, newValue) => {
          setNewSubAccountData((prevState) => ({
            ...prevState,
            active: newValue,
          }));
        }}
      />
      <InputLabel className="validation_error">
        {inputValidation?.active}
      </InputLabel>
    </div>
    <div className='my_profile_btns'>
    <div className='my_profile_back'>
    <Link to={`/${customnostore ? customnostore : geo?.country_name}/buyerdashboard/dashboard`} className="link">
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