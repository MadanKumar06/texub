import React from "react";
import Learn from "../../../Assets/Homepage Assets/Group 73.png";
import "./Benfits.scss";

export const Benfits = () => {
  return (
    <div className="Benfits">
      <div className="Benfits_1st_div">
        <h1 className="Benfits_Get">Get </h1>
        <h1 className="Benfits_Get">Benefits& </h1>
        <h1 className="Benfits_Get">Advantages</h1>
        <p className="Benfits_Get_Tag">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="button__learnmore">
          <button className="Benfits_Learnmore_btn" type="button">
            Learn More
          </button>
        </div>
      </div>
      <div className="Benfits_2nd_div">
        <img className="Benfits_img" src={Learn} alt="" />
        <div className="Benfits__floatingcontent">
          <h2 className="Benfits_Offer">Save Up to 60%</h2>
          <h5 className="Benfits_Offer_tag">On all gaming products</h5>
        </div>
      </div>
    </div>
  );
};
