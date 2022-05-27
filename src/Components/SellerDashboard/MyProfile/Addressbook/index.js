import React, { useState, useEffect } from "react";
import "./styles.scss";
import Billingaddress from "./Billingaddress";
import Shippingadress from "./Shippingaddress";
import Edit_image from "../../../../Assets/CheckoutPage/Group 913.png";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useStateValue } from "../../../../store/state";
import axios from "axios";
import Constant from "../../../../Constant";

// import axios from "axios";

const Index = () => {
  const [{ geo, customstore, customnostore }, dispatch] = useStateValue();
  const [isBilling, setisBilling] = useState(false);
  const Billaddress = () => {
    setisBilling(true);
    setisShipping(false);
    setisAddress(false);
  };
  const [isShipping, setisShipping] = useState(false);
  const Shipadress = () => {
    setisShipping(!isShipping);
    setisBilling(false);
    setisAddress(false);
  };
  const [isAddress, setisAddress] = useState(true);

  const [billingAdderess, setBillingAdderess] = useState([]);
  const [shippingAddress, setShippingAddress] = useState([]);
  useEffect(async () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    try {
      const dashdata = await axios({
        method: "post",
        url: `${Constant?.baseUrl()}/listAddressesForCustomer`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          customerId: user?.id,
        },
      });
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      if (dashdata?.data?.length) {
        let temp = dashdata?.data?.filter(
          (itm) => (itm?.default_billing && itm?.default_shipping) === 1
        );
        let temp1 = dashdata?.data?.filter(
          (itm) => (itm?.default_billing && itm?.default_shipping) !== 1
        );
        setShippingAddress(temp);
        setBillingAdderess(temp1);
      }
    } catch (e) {
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  }, []);
  return (
    <>
      {isAddress && (
        <div className="Address_main">
          <span className="heading">
            <p className="heading">OFFICE ADDRESS</p>
          </span>
          <div className="Address_map">
            <div className="Address_Billing">
              {/* <div>
                                <p>Default Billing Address</p>
                                {data.map(d => (
                                    <>
                                        <ul key={d.id}>
                                            <li className='address_block'>{d.name}</li>
                                        </ul>
                                    </>
                                ))}
                            </div> */}

              <ul>
                <li className="address_type">Default Billing Address</li>
                <li className="address_name">
                  {billingAdderess?.[0]?.firstname}{" "}
                  {billingAdderess?.[0]?.lastname}
                </li>
                <div>
                  <li className="address_block">
                    {billingAdderess?.[0]?.street1}
                  </li>
                  <li className="address_block">
                    {billingAdderess?.[0]?.street2}
                  </li>
                  <li className="address_block">
                    {billingAdderess?.[0]?.city}
                    {" - "}
                    {billingAdderess?.[0]?.country_code}
                  </li>

                  <li className="address_block">
                    {billingAdderess?.[0]?.postcode}
                  </li>
                </div>
              </ul>
              {billingAdderess?.length ? (
                <div className="edit_section">
                  <img
                    src={Edit_image}
                    alt=""
                    style={{ height: "34px", cursor: "pointer" }}
                    onClick={() => Billaddress()}
                  />
                  <p
                    className="profile_edit"
                    style={{ cursor: "pointer" }}
                    onClick={() => Billaddress()}
                  >
                    Edit
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="vl"></div>
            <div className="Address_Shipping">
              <ul>
                <li className="address_type">Default Shipping Address</li>
                <li className="address_name">
                  {shippingAddress?.[0]?.firstname}{" "}
                  {shippingAddress?.[0]?.lastname}
                </li>
                <div>
                  <li className="address_block">
                    {shippingAddress?.[0]?.street1}
                  </li>
                  <li className="address_block">
                    {shippingAddress?.[0]?.street2}
                  </li>
                  <li className="address_block">
                    {shippingAddress?.[0]?.city}
                    {" - "}
                    {shippingAddress?.[0]?.country_code}
                  </li>

                  <li className="address_block">
                    {billingAdderess?.[0]?.postcode}
                  </li>
                </div>
              </ul>

              {shippingAddress?.length ? (
                <div className="edit_section">
                  <img
                    src={Edit_image}
                    alt=""
                    style={{ height: "34px", cursor: "pointer" }}
                    onClick={() => Shipadress()}
                  />
                  <p
                    className="profile_edit"
                    style={{ cursor: "pointer" }}
                    onClick={() => Shipadress()}
                  >
                    Edit
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="my_profile_back">
            <Link
              to={`/${
                customstore ? customstore : geo?.country_name
              }/sellerdashboard/dashboard`}
              className="link"
            >
              <ArrowBackIosNew />
              <span>
                <p className="back">Back</p>
              </span>
            </Link>
          </div>
        </div>
      )}
      {isBilling && (
        <Billingaddress
          address={billingAdderess}
          setisBilling={setisBilling}
          setisAddress={setisAddress}
        />
      )}
      {isShipping && (
        <Shippingadress
          address={shippingAddress}
          setisShipping={setisShipping}
          setisAddress={setisAddress}
        />
      )}
    </>
  );
};
export default Index;
