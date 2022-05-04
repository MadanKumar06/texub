import React, { useState } from "react";
import "./styles.scss";
import Billingaddress from "./Billingaddress";
import Shippingadress from "./Shippingaddress";
import Edit_image from "../../../../Assets/CheckoutPage/Group 913.png";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useStateValue } from "../../../../store/state";
// import axios from "axios";

const Index = () => {
  const [{ geo, customstore, customnostore }, dispatch] = useStateValue();
  // data state //storage
  //  const [data, setData] = useState([]);
  //  useEffect(() => {
  //      axios.get('https://jsonplaceholder.typicode.com/posts/1/comments')
  //         .then(
  //             res => {
  //                 setData(res.data)
  //             })
  //         .catch(err => console.log(err));
  //       //loadData();
  //      // getData();
  //  }, [])
  //  console.log(data)
  // const loadData=()=>{
  //     fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
  //     .then(res=> res.data)
  //     .then(receivedData => setData(receivedData))
  // }

  //  return(
  //      <>
  //      {data.map((post)=>
  //      <div key={post.id}>
  //         {post.mail}
  //      </div>
  //          )}
  //      </>
  //  );

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
  const billingAdderess = [
    {
      id: 1,
      organization: "Tech World",
      heading: "Default Billing Adress",
      name: "Ayush Raj",
      no: "302/1160,Tech World",
      block: "B-Block, HSR Layout",
      location: "Bangalore-Karnataka",
      pin: "560102",
    },
  ];
  const shippingAddress = [
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
              {billingAdderess.map((user) => (
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
                <img src={Edit_image} alt="" style={{ height: "34px" }} />
                <p className="profile_edit" onClick={() => Billaddress()}>
                  Edit
                </p>
              </div>
            </div>
            <div className="vl"></div>
            <div className="Address_Shipping">
              {shippingAddress.map((user) => (
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
                <img src={Edit_image} alt="" style={{ height: "34px" }} />
                <p className="profile_edit" onClick={() => Shipadress()}>
                  Edit
                </p>
              </div>
            </div>
          </div>
          <div className="my_profile_back">
            <Link
              to={`/${
                customstore ? customstore : geo?.country_name
              }/buyerdashboard/dashboard`}
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
      {isBilling && <Billingaddress />}
      {isShipping && <Shippingadress address={billingAdderess} />}
    </>
  );
};
export default Index;
