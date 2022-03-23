import React from 'react'
import './styles.scss'
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import { useParams } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Index = (classes) => {
  let { type } = useParams();
  let {
    auto_complete_input,
  } = classes;
  const options = ["Option 1", "Option 2"];
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div className='Billingaddress_main'>
      <span className='Billingaddress_Account_heading'> <p >EDIT DEFAULT BILLING ADDRESS</p></span>
      <div className='Billingaddress_information'>
        <form>
          <div className='inputfield_section'>
            <div className='inputfield'>
              <p>Organization Name</p>
              <TextField
                fullWidth
                id="outlined-error"
              placeholder="Organization Name"
              />
            </div>
            <div className='inputfield'>
              <p>Address Line 1</p>
              <TextField
                fullWidth
                id="outlined-error"
                placeholder="Flat/Building/Block"
              />
            </div>
          </div>
          <div className='inputfield_section'>
            <div className='inputfield'>
              <p>Address Line 2</p>
              <TextField
                fullWidth
                id="outlined-error"
                placeholder="Sub-urb/Town"
              />
            </div>
            <div className='inputfield'>

              <p>Pincode</p>
              <TextField
                fullWidth
                id="outlined-error"
                defaultValue="Pincode"
                type="number"
                placeholder='Pin Code'
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
                    className='text'
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
                    className='text'
                    placeholder="state"
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
                    fullWidth
                    placeholder="Country"
                    className='text'
                    InputLabelProps={{
                      shrink: true,
                      required: true,

                    }}
                  />
                )}
              />
            </div>
            <div className='Billingaddress_btn_section'>
              <button className='Billingaddress_info_cancel'>Cancel</button>
              <button className='Billingaddress_info_save'>Save Changes</button>
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
