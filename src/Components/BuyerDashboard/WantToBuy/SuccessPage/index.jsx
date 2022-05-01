import React from "react";
import successlogo from "../../../../Assets/Productlist/gratitude_icon.png";
import "./styles.scss";
import { Link } from "react-router-dom";
import { useStateValue } from "../../../../store/state";

const SuccesMessage = ({ msg }) => {
  const [{ geo, customnostore }, dispatch] = useStateValue();
  let userDetails = JSON.parse(localStorage.getItem("userdata"));
  return (
    <div className="successpagemain">
      <div className="successpage">
        <img src={successlogo} alt="" />
        <h3>Thank You !</h3>
        <h4>
          Dear {userDetails?.firstname} {userDetails?.lastname}
        </h4>
        <>
          <p>You have submitted the Want To Buy request successfully.</p>
          <p>
            You will be notified through email once your product is added with
            the
          </p>
          <p> quotation by the seller.</p>
        </>

        <Link
          to={`/${
            customnostore ? customnostore : geo?.country_name
          }/buyerdashboard/dashboard`}
        >
          <p className="link">Back To Dashboard</p>
        </Link>
      </div>
    </div>
  );
};

export default SuccesMessage;
