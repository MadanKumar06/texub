import React from "react";
import "./styles.scss";
import report from "../../../Assets/buyerdashboard/notactived/report.png";
import { Button } from "@mui/material";


const Index = () => {
  return (
    <div className="notactived_dashboard">
      <div className="dashboard__top">
        <div className="report_image">
          <img src={report} alt="" />
        </div>
        <div className="report_msg common-block">
          <span className="msg">Not Activated !</span>
        </div>
        <div className="logged_user common-block">
          <span className="msg">Dear Customer</span>
        </div>
        <div className="custom_msg common-block">
          <span className="msg">
            Your Account is not yet actived, so kindly visit again once you
            receive the account activation email{" "}
          </span>
        </div>
        <div className="backto_home_btn common-block">
          <Button className="home_to_home btn-secondary button-text">
            Go Back To Homepage
          </Button>
        </div>
      </div>
    </div>
  );


};

export default Index;
