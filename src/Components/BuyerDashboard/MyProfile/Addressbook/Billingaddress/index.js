import React,{useState,useEffect}from 'react'
import './styles.scss'
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import { ArrowBackIosNew } from "@mui/icons-material";
import axios from "axios"
import Constants from '../../../../../../src/Constant'
import { Link } from "react-router-dom";

const Index = (classes, props) => {
  const city = ["Banglore", "Chennai","Hyderabad",];
  const state = ["Karnataka", "Tamilnadu","Telangana"];
  // const country = ["India", "USA","Dubai"];
  const [Value, setValue] = React.useState({
    city:"",
    state:"",
    country:"",
  });
   //Api
   const [CountryDropdown, setCountryDropdown] = useState([])
   useEffect(() => {
    const fetchCountryList = () => {
      axios
        .get(Constants.baseUrl() + "/getCountryList", {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((response) => {
          console.log('$%$%$%$%',response)
          setCountryDropdown(response?.data);
        })
        .catch((error) =>console.log(error));
    }
   fetchCountryList();
}, []);
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
                name='city'
                options={city}
                value={Value?.city}
                onChange={(event, newValue) => {
                  setValue((prevState) => ({
                    ...prevState,
                    city: newValue,
                  }));
                }}
                id="controllable-states-demo"
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
              name='state'
              value={Value?.state}
                options={state}
                onChange={(event, newValue) => {
                  setValue((prevState) => ({
                    ...prevState,
                    state: newValue,
                  }));
                }}
                id="controllable-states-demo"
                renderInput={(params) => (
                  <TextField
                    {...params}
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
              name='country'
                value={Value?.country}
                options={CountryDropdown}
                onChange={(event, newValue) => {
                  setValue((prevState) => ({
                    ...prevState,
                    country: newValue,
                  }));
                }}
                id="controllable-states-demo"
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
