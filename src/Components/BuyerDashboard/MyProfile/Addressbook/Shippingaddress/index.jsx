import React, {useState}from 'react'
import TextField from '@mui/material/TextField';
import './styles.scss'
import { Checkbox, FormControlLabel } from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
import { useParams } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Index = ({address}) => {
  console.log("shipping address details",address)  
  let { type } = useParams();
  const options = ["Option 1", "Option 2"];
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  const [billing, setbilling] = useState(false)
  return (
    <div className='Shippingaddress_main'>
      <div className='Shippingaddress_heading_section'>
        <span className='Shippingaddress_Account_heading'> <p >EDIT DEFAULT SHIPPING ADDRESS</p></span>
        <FormControlLabel control={<Checkbox defaultValue={false} onClick={()=>setbilling(!billing)} />} label="Same As Billing Adress" />
      </div>
      <div className='Shippingaddress_information'>
        <form>
          <div className='inputfield_section'>
            <div className='inputfield'>
              <p>Organization Name</p>
              <TextField
                id="outlined-error"
                placeholder="Organization Name"
                value={billing? address[0].organization:""}
              />
            </div>
            <div className='inputfield'>
              <p>Address Line 1</p>
              <TextField
                id="outlined-error"
              placeholder="Flat/Building/Block"
              value={billing? address[0].no:""}
              />
            </div>
          </div>
          <div className='inputfield_section'>
            <div className='inputfield'>
              <p>Address Line 2</p>
              <TextField
                id="outlined-error"
                placeholder="Sub-urb/Town"
                value={billing? address[0].block:""}
              />
            </div>
            <div className='inputfield'>

              <p>Pincode</p>
              <TextField
                id="outlined-error"
                placeholder="Pincode"
                type="number"
                value={billing? address[0].pin:""}
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

                // className={auto_complete_input}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={billing? address[0].location:""}
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={billing? address[0].location:""}
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

                // className={auto_complete_input}
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
      <div className='my_profile_back'>
      <Link to="/buyerdashboard/dashboard" className="link">
        <ArrowBackIosNew /><span><p className='back'>Back</p></span>
          </Link>
      </div>
    </div>
  )
}
export default Index;