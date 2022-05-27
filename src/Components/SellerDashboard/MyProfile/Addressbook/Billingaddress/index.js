import React, { useState, useEffect } from "react";
import "./styles.scss";
import TextField from "@mui/material/TextField";
import { Autocomplete, Button } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useStateValue } from "../../../../../store/state";
import axios from "axios";
import Constant from "../../../../../Constant";
import swal from "sweetalert2";

import { getAdminToken } from "../../../../../utilities";
const Index = ({ address, setisBilling, setisAddress }) => {
  const [{ geo, customnostore }, dispatch] = useStateValue();
  const [countryList, setCountryList] = useState([]);
  const [billingAddress, setBillingAddress] = useState({
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
      setBillingAddress({
        city: address?.[0]?.city,
        company: address?.[0]?.company,
        country_id: country,
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
          addressId: address?.[0]?.id,
          addressType: 0,
          address: {
            company: billingAddress?.company,
            country_id: billingAddress?.country_id?.[0]?.value,
            street1: billingAddress?.address_line1,
            street2: billingAddress?.address_line2,
            postcode: billingAddress?.postcode,
            city: billingAddress?.city,
          },
        },
      });
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });

      swal.fire({
        text: "Address Updated Successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
      setisBilling(false);
      setisAddress(true);
    } catch (e) {
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  };

  return (
    <div className="Billingaddress_main">
      <span className="Billingaddress_Account_heading">
        {" "}
        <p>EDIT DEFAULT BILLING ADDRESS</p>
      </span>
      <div className="Billingaddress_information">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="inputfield_section">
            <div className="inputfield">
              <p>Organization Name</p>
              <TextField
                fullWidth
                id="outlined-error"
                className="inputfield-box"
                placeholder="Organization Name"
                value={billingAddress?.company}
                onChange={(event) =>
                  setBillingAddress((prev) => ({
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
                value={billingAddress?.address_line1}
                onChange={(event) =>
                  setBillingAddress((prev) => ({
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
                value={billingAddress?.address_line2}
                onChange={(event) =>
                  setBillingAddress((prev) => ({
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
                value={billingAddress?.postcode}
                onChange={(event) =>
                  setBillingAddress((prev) => ({
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
                value={billingAddress?.city}
                onChange={(event) =>
                  setBillingAddress((prev) => ({
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
                  billingAddress?.country_id ? billingAddress?.country_id : ""
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
                setisBilling(false);
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
            setisBilling(false);
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
          }/sellerdashboard/dashboard`}
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
