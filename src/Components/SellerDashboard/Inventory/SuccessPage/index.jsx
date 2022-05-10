import React from "react";
import successlogo from "../../../../Assets/Productlist/gratitude_icon.png";
import "./styles.scss";
import { Link, useLocation } from "react-router-dom";
import { useStateValue } from "../../../../store/state";

const SuccesMessage = ({ msg }) => {
  const [{ geo, customstore, customnostore }, dispatch] = useStateValue();
  let userDetails = JSON.parse(localStorage.getItem("userdata"));
  const location = useLocation();
  return (
    <div className="successpagemain">
      <div className="successpage">
        <img src={successlogo} alt="" />
        <h3>Thank You !</h3>
        <h4>
          Dear {userDetails?.firstname} {userDetails?.lastname}
        </h4>
        {/* <h5>{msg}</h5> */}
        {location.state === "register" && (
          <>
            <p>
              You have submitted the product registration form successfully.
            </p>
            <p>
              Once your product has been registered, you will receive a mail
              notification
            </p>
            <p>to update product details.</p>
          </>
        )}
        {location.state === "add" && (
          <>
            <p>You have Added the product details successfully.</p>
          </>
        )}
        {location?.state === "update" && (
          <p>You have updated the product details successfully.</p>
        )}
        <Link
          to={`/${
            customnostore ? customnostore : geo?.country_name
          }/sellerdashboard/inventory`}
        >
          <p className="link">Back To Inventory</p>
        </Link>
      </div>
    </div>
  );
};

export default SuccesMessage;
