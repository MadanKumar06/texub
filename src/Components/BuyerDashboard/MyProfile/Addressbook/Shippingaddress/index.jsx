import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import "./styles.scss";
import { Checkbox, FormControlLabel, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useParams } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useStateValue } from "../../../../../store/state";
import axios from "axios";
import Constant from "../../../../../Constant";
import swal from "sweetalert2";

import { getAdminToken } from "../../../../../utilities";

const Index = ({ address, setisAddress, setisShipping }) => {
  const [{ geo, customnostore }, dispatch] = useStateValue();
  const [countryList, setCountryList] = useState([]);
  const [shippingAddress, setshippingAddress] = useState({
    city: "",
    company: "",
    country_id: "",
    firstname: "",
    lastname: "",
    postcode: "",
    address_line1: "",
    address_line2: "",
  });
  useEffect(() => {
    if (address?.length && countryList?.length) {
      let country = countryList?.filter(
        (itm) => itm?.value == address?.[0]?.country_id
      );
      setshippingAddress({
        city: address?.[0]?.city,
        company: address?.[0]?.company,
        country_id: country?.[0],
        firstname: address?.[0]?.firstname,
        lastname: address?.[0]?.lastname,
        postcode: address?.[0]?.postcode,
        address_line1: address?.[0]?.street1,
        address_line2: address?.[0]?.street2,
      });
    }
  }, [address, countryList]);
  useEffect(() => {
    const fetchCountryData = () => {
      axios
        .get(Constant.baseUrl() + "/getCountryList", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setCountryList(res?.data);
        })
        .catch((err) => {});
    };
    fetchCountryData();
  }, []);
  const [adminToken, setAdminToken] = useState("");
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);
  const saveaddress = async () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    try {
      const addressadd = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/saveShippingAddress`,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        data: {
          customerId: user?.id,
          addressId: address?.[0]?.address_id,
          addressType: 0,
          address: {
            company: shippingAddress?.company,
            country_id: shippingAddress?.country_id?.value,
            street1: shippingAddress?.address_line1,
            street2: shippingAddress?.address_line2,
            postcode: shippingAddress?.postcode,
            city: shippingAddress?.city,
          },
        },
      });
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      if (addressadd?.data?.[0]?.status) {
        swal.fire({
          text: `${addressadd?.data?.[0]?.message}`,
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        swal.fire({
          text: `${addressadd?.data?.[0]?.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      }
      setisShipping(false);
      setisAddress(true);
    } catch (e) {
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  };

  // const [inputValue, setInputValue] = React.useState("");
  const [billing, setbilling] = useState(false);

  return (
    <div className="Shippingaddress_main">
      <div className="Shippingaddress_heading_section">
        <span className="Shippingaddress_Account_heading">
          {" "}
          <p>EDIT DEFAULT SHIPPING ADDRESS</p>
        </span>
        <FormControlLabel
          control={
            <Checkbox
              defaultValue={false}
              onClick={() => setbilling(!billing)}
            />
          }
          label="Same As Billing Adress"
        />
      </div>
      <div className="Shippingaddress_information">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="inputfield_section">
            <div className="inputfield">
              <p>Organization Name</p>
              <TextField
                fullWidth
                id="outlined-error"
                className="inputfield-box"
                placeholder="Organization Name"
                value={shippingAddress?.company}
                onChange={(event) =>
                  setshippingAddress((prev) => ({
                    ...prev,
                    company: event.target.value,
                  }))
                }
              />
            </div>
            <div className="inputfield">
              <p>Address Line 1</p>
              <TextField
                fullWidth
                id="outlined-error"
                className="inputfield-box"
                placeholder="Flat/Building/Block"
                value={shippingAddress?.address_line1}
                onChange={(event) =>
                  setshippingAddress((prev) => ({
                    ...prev,
                    address_line1: event.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="inputfield_section">
            <div className="inputfield">
              <p>Address Line 2</p>
              <TextField
                fullWidth
                id="outlined-error"
                className="inputfield-box"
                placeholder="Sub-urb/Town"
                value={shippingAddress?.address_line2}
                onChange={(event) =>
                  setshippingAddress((prev) => ({
                    ...prev,
                    address_line2: event.target.value,
                  }))
                }
              />
            </div>
            <div className="inputfield">
              <p>Pincode</p>
              <TextField
                fullWidth
                id="outlined-error"
                className="inputfield-box"
                placeholder="Pin Code"
                value={shippingAddress?.postcode}
                onChange={(event) =>
                  setshippingAddress((prev) => ({
                    ...prev,
                    postcode: event.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="inputfield_section">
            <div className="inputfield">
              <p>City</p>
              <TextField
                fullWidth
                id="outlined-error"
                className="inputfield-box"
                placeholder="City"
                value={shippingAddress?.city}
                onChange={(event) =>
                  setshippingAddress((prev) => ({
                    ...prev,
                    city: event.target.value,
                  }))
                }
              />
            </div>
            <div className="inputfield">
              <p>Country</p>
              <Autocomplete
                value={
                  shippingAddress?.country_id ? shippingAddress?.country_id : ""
                }
                name="country_id"
                id="controllable-states-demo"
                options={countryList?.length ? countryList : []}
                fullWidth
                filterOptions={(option) => option}
                getOptionLabel={(option) => (option.label ? option.label : "")}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                onChange={(event, newValue) =>
                  setshippingAddress((prev) => ({
                    ...prev,
                    country_id: newValue,
                  }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="inputfield-box"
                    placeholder="Country"
                    InputLabelProps={{
                      shrink: false,
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="button-box-container btn_container">
            <Button
              className="button-text btn-ternary btn_billing"
              onClick={() => {
                setisShipping(false);
                setisAddress(true);
              }}
            >
              Cancel
            </Button>
            <Button
              className="button-text btn-secondary btn_billing"
              onClick={() => saveaddress()}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
      <div className="my_profile_back">
        <div
          className="back_button"
          onClick={() => {
            setisShipping(false);
            setisAddress(true);
          }}
          style={{ cursor: "pointer" }}
        >
          <ArrowBackIosNew />
          <span className="back">Back</span>
        </div>
      </div>
      {/* <div className="my_profile_back">
        <Link
          to={`/${
            customnostore ? customnostore : geo?.country_name
          }/buyerdashboard/dashboard`}
          className="link"
        >
          <ArrowBackIosNew />
          <span>
            <p className="back">Back</p>
          </span>
        </Link>
      </div> */}
    </div>
  );
};
export default Index;
