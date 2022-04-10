import React, { useState } from "react";
import "./Departments.scss";
import Departments1 from "../../Data";
import Apple from "../../../Assets/Homepage Assets/Placement Area [ASSEThero][SIZEDefault][STATEDEFAULT].png";
import Best from "../../../Assets/Homepage Assets/Group 705.png";
import { IconButton, InputBase, Paper } from "@mui/material";
import { Menu, Search } from "@mui/icons-material";

export const Departments = ({ data }) => {
  const [isActive, setIsActive] = useState(true);
  return (
    <div className="Departments">
      <div className="Departments_Body_Search">
        <div className="Departments_Body_Down_Pannel">
          <div
            className="Departments_Body_Down_Pannel_btn"
            onClick={(e) => setIsActive(!isActive)}
          >
            <p className="Department_heading">
              <Menu className="button_Icon" />
              CATEGORIES
            </p>
          </div>
          <div className="Departments_Dropdown_list">
            {/* {isActive && ( */}
            <ul
              className={`Body_Down_Pannel_btn_content1 ${
                isActive && "Body_Down_Pannel_btn_content"
              }`}
            >
              {Departments1.map((item, ind) => (
                <li
                  key={ind}
                  href={item.path}
                  className="Body_Down_Pannel_btn_items"
                >
                  {item.display}
                </li>
              ))}
            </ul>
            {/* )} */}
          </div>
        </div>
        <div className="search_bar">
          <div className="body__search_bar">
            <Paper
              className="search_bar_paper"
              component="form"
              sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
            >
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <Search />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Entire Store Here…"
                inputProps={{ "aria-label": "search google maps" }}
              />
            </Paper>
          </div>
          <div className="Body_Searchbar_Down_images">
            <div className="Body_Searchbar_Down_img1_div">
              <img
                className="Body_Searchbar_Down_img1"
                src={data?.mainbanner}
                alt=""
              />
              <div className="Offers">
                <h5 className="Products_offer">{data?.offer_content}</h5>
                <h2 className="Products_offer_per">{data?.flash_sale}</h2>
                <p className="Products_offer_per_graph">
                  {data?.main_content}
                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua. */}
                </p>
                <div className="Offers_buttons">
                  <button className="Learn_more_btn">Learn More</button>
                  <button className="Get_started_btn">Get Started</button>
                </div>
              </div>
            </div>
            <div className="Body_Searchbar_Down_img2_div">
              <img
                className="Body_Searchbar_Down_img2"
                src={data?.sidebanner}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
