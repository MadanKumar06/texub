import React from "react";
import successlogo from "../../../../Assets/Productlist/gratitude_icon.png";
import "./styles.scss";
import { Link } from "react-router-dom";

function index({ msg }) {
 let userDetails =JSON.parse(localStorage.getItem("userdata"))
  debugger
  return (
    <div className="successpagemain">
      <div className="successpage">
        <img src={successlogo} alt="" />
        <h3>Thank You !</h3>
        <h4>
          Dear {userDetails?.firstname}{" "}
          {userDetails?.lastname}
        </h4>
        <h5>{msg}</h5>
        {/* <h5>You have submitted the product registration form successfully. once your product has been registered, you will receive a mail notification.</h5>
          <h5>You have updated the product details successfully.</h5>         */}
        <Link to="/sellerdashboard/inventory">
          <p>Back to Inventory</p>
        </Link>
      </div>
    </div>
  );
}

export default index;
