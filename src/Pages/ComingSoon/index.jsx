import React from "react";
import "./styles.scss";

import company_logo from "../../Assets/Homepage Assets/Group.png";

const index = () => {
  return (
    <div className="coming_soon_container">
      <div className="coming_soon_sub_container">
        <div className="company_logo">
          <img src={company_logo} alt="company logo" />
        </div>
        <p className="title">Website</p>
        <p className="coming_soon_text">Coming Soon !</p>
      </div>
    </div>
  );
};

export default index;
