import React from 'react'
import TextField from '@mui/material/TextField';
import './styles.scss'
import { Checkbox, FormControlLabel } from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
import { useParams } from "react-router-dom";

const Index = (classes) => {
  let { type } = useParams();
  let {
    auto_complete_input,
  } = classes;
  const options = ["Option 1", "Option 2"];
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  return (
    <div className='Shippingaddress_main'>
      <div className='Shippingaddress_heading_section'>
        <span className='Shippingaddress_Account_heading'> <p >EDIT DEFAULT SHIPPING ADDRESS</p></span>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Same As Billing Adress" />
      </div>
      <div className='Shippingaddress_information'>
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
              <p>Address Line 1</p>
              <TextField
                id="outlined-error"
                defaultValue="Flat/Building/Block"
              />
            </div>
          </div>
          <div className='inputfield_section'>
            <div className='inputfield'>
              <p>Address Line 2</p>
              <TextField
                id="outlined-error"
                defaultValue="Sub-urb/Town"
              />
            </div>
            <div className='inputfield'>

              <p>Pincode</p>
              <TextField
                id="outlined-error"
                defaultValue="Pincode"
              />
            </div>
          </div>
          <div className='inputfield_section'>
            <div className='inputfield'>

              <p>City</p>
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

                    placeholder="City"
                    InputLabelProps={{
                      shrink: true,
                      required: true,

                    }}
                  />
                )}
              />
            </div>
            <div className='inputfield'>

              <p>State</p>
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

                    placeholder="State"
                    InputLabelProps={{
                      shrink: true,
                      required: true,

                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className='inputfield_btn'>
            <div className='inputfield'>

              <p>Country</p>
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

                    placeholder="State"
                    InputLabelProps={{
                      shrink: true,
                      required: true,

                    }}
                  />
                )}
              />
            </div>
            <div className='Shippingaddress_btn_section'>
              <button className='Shippingaddress_info_cancel'>Cancel</button>
              <button className='Shippingaddress_info_save'>Save Changes</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Index;