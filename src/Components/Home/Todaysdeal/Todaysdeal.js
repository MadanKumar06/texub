import React from "react";
import "./Todaysdeal.scss";
import Collect11 from "../../../Assets/Homepage Assets/Group 71.png";
import Collect12 from "../../../Assets/Homepage Assets/Group 72.png";

export const Todaysdeal = ({ data }) => {
  return (
    // <div className='Todaysdeal'>
    <div className="Todaysdeal_Collections">
      <div className="Todaysdeal_Collections1_1st_div">
        <img
          className="Todaysdeal_Collections1_1st_img"
          src={data?.sidebanner_image}
          alt=""
        />
        <span className="Todaysdeal_View_collection">VIEW COLLECTION</span>
      </div>
      <div className="Todaysdeal_Collections1_2nd_div">
        <img
          src={data?.image}
          alt=""
          className="Todaysdeal_Collections1_2nd_img"
        />
        <div className="Todaysdeal__floatingcontent">
          <h3 className="Todaysdeal_Heading">{data?.title}</h3>
          <p className="Todaysdeal_Heading_paragraph">{data?.content}</p>
          <button className="Todaysdeal_View_btn">View</button>
          <div />
        </div>
      </div>
    </div>
  );
};
