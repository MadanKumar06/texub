import React from "react";
import "./Auctions.scss";
import Collect21 from "../../../Assets/Homepage Assets/Group 706.png";
import Collect22 from "../../../Assets/Homepage Assets/Group 75.png";

export const Auctions = () => {
  return (
    <div className="Auctions">
      <div className="Auctions_div1">
        <img className="Auctions_div1_img" src={Collect21} alt="" />
        <span className="View_collection">VIEW COLLECTION</span>
      </div>
      <div className="Auctions_div2">
        <img src={Collect22} alt="" className="Auctions_div2_img" />
        <div className="Auctions__floatingcontent">
          <h3 className="Auctions_div2_img_heading"> Auctions</h3>
          <p className="Auctions_div2_img_heading_tag">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="Auctions_View_btn">View</button>
        </div>
      </div>
    </div>
  );
};
