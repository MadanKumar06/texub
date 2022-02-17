import React, { useState } from "react";
import "./Departments.css";
import Departments1 from "../../Data";
import Apple from "../../../Assets/Homepage Assets/Placement Area [ASSEThero][SIZEDefault][STATEDEFAULT].png";
import Best from "../../../Assets/Homepage Assets/Group 705.png";

export const Departments = () => {
  const [isActive, setIsActive] = useState(true);
  return (
    <div className="Departments">
      <div className="Departments_Body_Search">
        <div className="Departments_Body_Down_Pannel">
          <div
            className="Departments_Body_Down_Pannel_btn"
            onClick={(e) => setIsActive(!isActive)}
          >
            <i className="fa fa-reorder  button_Icon2"></i>
            <i className="fa fa-search Search_Icon2"></i>
            <p className="Department_heading">
              <i className="fa fa-reorder  button_Icon"> </i> DEPARTMENTS
            </p>
          </div>
          <div className="Departments_Dropdown_list">
            {isActive && (
              <ul className="Body_Down_Pannel_btn_content">
                {Departments1.map((item) => (
                  <li href={item.path} className="Body_Down_Pannel_btn_items">
                    {item.display}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="Search_bar">
          <div>
            <form>
              <input
                className="Body__search_bar"
                type="search"
                name="search"
                placeholder="Search entire Store here.."
              />
              <i className="fa fa-search Search_Icon"></i>
            </form>
          </div>
          <div className="Body_Searchbar_Down_images">
            <div className="Body_Searchbar_Down_img1_div">
              <img className="Body_Searchbar_Down_img1" src={Apple} alt="" />
              <div className="Offers">
                <h5 className="Products_offer">Christmas Offer</h5>
                <h2 className="Products_offer_per">FLASH SALE OF 70%</h2>
                <p className="Products_offer_per_graph">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="Offers_buttons">
                  <button className="Learn_more_btn">Learn More</button>
                  <button className="Get_started_btn">Get Started</button>
                </div>
              </div>
            </div>
            <div className="Body_Searchbar_Down_img2_div">
              <img className="Body_Searchbar_Down_img2" src={Best} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
