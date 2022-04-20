import React from "react";
import successlogo from "../../../../Assets/Productlist/gratitude_icon.png";
import "./styles.scss";
import { Link, useLocation } from "react-router-dom";

const SuccesMessage = ({ msg }) => {
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
        {location.state === "add" && (
          <h5>
            You have submitted the product registration form successfully. once
            your product has been registered, you will receive a mail
            notification.
          </h5>
        )}
        {location?.state === "update" && (
          <h5>You have updated the product details successfully.</h5>
        )}
        <Link to="/sellerdashboard/inventory">
          <p>Back To Inventory</p>
        </Link>
      </div>
    </div>
  );
};

export default SuccesMessage;
