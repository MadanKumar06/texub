import React from "react";
import "./Benfits.scss";

export const Benfits = ({ data }) => {
  debugger;
  return (
    <div className="Benfits">
      <div className="Benfits_1st_div">
        <h1 className="Benfits_Get">{data?.title} </h1>
        <p className="Benfits_Get_Tag">{data?.content}</p>
        <div className="button__learnmore">
          <button className="Benfits_Learnmore_btn" type="button">
            Learn More
          </button>
        </div>
      </div>
      <div className="Benfits_2nd_div">
        <img className="Benfits_img" src={data?.image} alt="" />
        <div className="Benfits__floatingcontent">
          <h2 className="Benfits_Offer">{data?.banner_content_1}</h2>
          <h5 className="Benfits_Offer_tag">{data?.banner_content_2}</h5>
        </div>
      </div>
    </div>
  );
};
