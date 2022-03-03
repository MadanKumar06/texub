import React, { useState } from "react";
import "./styles.scss";
import EditIcon from "@mui/icons-material/Edit";
import Billingaddress from "./Billingaddress";
import Shippingadress from "./Shippingaddress";

const Index = (open) => {
  const [isBilling, setisBilling] = useState(false);
  const Billaddress = () => {
    setisBilling(true);
    setisShipping(false);
  };
  const [isShipping, setisShipping] = useState(false);
  const Shipadress = () => {
    setisShipping(!isShipping);
    setisBilling(false);
  };
  // const [isClose, setisClose]=useState(false)
  // const Addressclose=()=>{
  //     setisClose(!isClose)
  // }
  const BillingAdderess = [
    {
      id: 1,
      heading: "Default Billing Adress",
      name: "Ayush Raj",
      no: "302/1160,Tech World",
      block: "B-Block, HSR Layout",
      location: "Bangalore-Karnataka",
      pin: "560102",
    },
  ];
  const ShippingAddress = [
    {
      id: 1,
      heading: "Default Shipping Adress",
      name: "Ayush Raj",
      no: "302/1160,Tech World",
      block: "B-Block, HSR Layout",
      location: "Bangalore-Karnataka",
      pin: "560102",
    },
  ];

  return (
    <div className="Address_main">
      <span className="heading">
        <p className="heading">OFFICE ADDRESS</p>
      </span>
      <div className="Address_map">
        <div className="Address_Billing">
          {BillingAdderess.map((user) => (
            <ul key={user.id}>
              <li className="address_type">{user.heading}</li>
              <li className="address_name">{user.name}</li>
              <div>
                <li className="address_block">{user.no}</li>
                <li className="address_block">{user.block}</li>
                <li className="address_block">{user.location}</li>
                <li className="address_block">{user.pin}</li>
              </div>
            </ul>
          ))}
          <div className="edit_section">
            <EditIcon />
            <p className="profile_edit" onClick={() => Billaddress()}>
              Edit
            </p>
          </div>
        </div>
        <div class="vl"></div>
        <div className="Address_Shipping">
          {ShippingAddress.map((user) => (
            <ul key={user.id}>
              <li className="address_type">{user.heading}</li>
              <li className="address_name">{user.name}</li>
              <div>
                <li className="address_block">{user.no}</li>
                <li className="address_block">{user.block}</li>
                <li className="address_block">{user.location}</li>
                <li className="address_block">{user.pin}</li>
              </div>
            </ul>
          ))}
          <div className="edit_section">
            <EditIcon />
            <p className="profile_edit" onClick={() => Shipadress()}>
              Edit
            </p>
          </div>
        </div>
      </div>

      {isBilling && <Billingaddress />}
      {isShipping && <Shippingadress />}
    </div>
  );
};
export default Index;
