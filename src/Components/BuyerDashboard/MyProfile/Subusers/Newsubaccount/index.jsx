import React from 'react'
import './styles.scss'
import{ TextField,TextareaAutosize }from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
import { useParams } from "react-router-dom";
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
    //   const flatProps = {
    //     options: List.map((option) => option.title),
    //   };
      
    let { type } = useParams();
  let {
    auto_complete_input,
  } = classes;
   const options = ["Option 1", "Option 2"];
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  return (
    <div className='subaccount_main'>
    <p className='sub_heading'>Add New Sub-Account</p>
    <div className='input_sections'>
        <div>
        <p>First Name</p>
              <TextField
              fullWidth
                id="outlined-error"
                defaultValue="Ayush"
              />
        </div>
        <div>
        <p>Last Name</p>
              <TextField
              fullWidth
                id="outlined-error"
                defaultValue="Raj"
              />
        </div>
    </div>
    <div className='user_input'>
    <p>Email Address</p>
              <TextField
              fullWidth
                id="outlined-error"
                defaultValue="ayush@ymail.com"
              />
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
          
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    /> 
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
      
      aria-label="empty textarea"
      style={{height:100,
              width: 1300}}
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
                placeholder="Yes"
                InputLabelProps={{
                  shrink: true,
                  required: true,
                 
                }}
              />
            )}
          />
    </div>
    <div className='user_btn_section'>
        <button>Save Sub-Account</button>
    </div>
    </div>
  )
}

export default Index;
