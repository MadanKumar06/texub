import React, {useState}from 'react'
import TextField from '@mui/material/TextField';
import './styles.scss'
import { useStateValue } from "../../../../../../src/store/state";
import { Checkbox, FormControlLabel } from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
import { useParams } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Index = ({address}) => {  
  const [{}, dispatch] = useStateValue();
  let { type } = useParams();
  const city = ["Banglore", "Chennai","Hyderabad",];
  const state = ["Karnataka", "Tamilnadu","Telangana"];
  const country = ["India", "USA","Dubai"];
  const [value, setValue] = React.useState(city[0]);
  const [inputValue, setInputValue] = React.useState("");
  const [billing, setbilling] = useState(false)
  const [shippingAddressdata, setshippingAddressdata] = useState({
    organization_name: "",
    address_line_1: "",
    address_line_2: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });
  const handleChangeInput = (event) => {
    setshippingAddressdata((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value, 
    }));
  };
  const handleChangeCityInput = (event) => {
    setshippingAddressdata((prevState) => ({
      ...prevState,
      city: event
    }));
    console.log(city)
  };

  const handleChangeStateInput = (event) => {
    setshippingAddressdata((prevState) => ({
      ...prevState,
      state: event  
    }));
  };
  const handleChangeCountryInput = (event) => {
    setshippingAddressdata((prevState) => ({
      ...prevState,
      country: event 
    }));
  };
  
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
                id="organization_name"
                name="organization_name"
                onChange={handleChangeInput}
                placeholder="Organization Name"
                value={billing? address[0].organization:shippingAddressdata?.organization_name}
              />
            </div>
            <div className='inputfield'>
              <p>Address Line 1</p>
              <TextField
                id="address_line_1"
                name='address_line_1'
              placeholder="Flat/Building/Block"
              value={billing? address[0].no:shippingAddressdata?.address_line_1}
              onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className='inputfield_section'>
            <div className='inputfield'>
              <p>Address Line 2</p>
              <TextField
                id="address_line_2"
                name='address_line_2'
                placeholder="Sub-urb/Town"
                value={billing? address[0].block:shippingAddressdata?.address_line_2}
                onChange={handleChangeInput}
              />
            </div>
            <div className='inputfield'>

              <p>Pincode</p>
              <TextField
                id="pincode"
                name='pincode'
                placeholder="Pincode"
                type="number"
                value={billing? address[0].pin:shippingAddressdata?.pincode}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className='inputfield_section'>
            <div className='inputfield'>

              <p>City</p>
              <Autocomplete
                value={value}              
                inputValue={inputValue}
                name='city'
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                id="controllable-states-demo"
                options={city}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="City"
                    name='city'
                    id='city'
                    value={billing? address[0].city:""}
                    onChange={handleChangeCityInput}
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
                options={state}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id='state'
                    name='state'
                    value={billing? address[0].location:""}
                    onChange={handleChangeStateInput}
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
                options={country}

                // className={auto_complete_input}
                renderInput={(params) => (
                  <TextField
                    {...params}
                     id='country'
                     name='country'
                    placeholder="State"
                    onChange={handleChangeCountryInput}
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