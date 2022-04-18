import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Clear } from "@mui/icons-material";

import { SellerList, BuyerList } from "./image";
import logout from "../../Assets/sellerdashboard/InactiveDashboardPng/logout.png";

function Index({
  selectmenu,
  setcurrentmenu,
  currentmenu,
  currenttab,
  color,
  barstate,
  setbarstate,
}) {
  useEffect(() => {
    setcurrentmenu(SellerList[0]?.name);
  }, []);

  return (
    <div className={`${barstate ? "sidebaropen" : "sellerdashboard__sidebar"}`}>
      <Clear className="sidebar__close" onClick={() => setbarstate(false)} />
      <div className="sidebar_head_title">
        <p>
          <span className="sellerlabel">
            {color === "yellow" && "Seller ID"}
            {color === "blue" && "Buyer ID"}
          </span>
          <span className="sellervalue">
            {
              JSON.parse(localStorage.getItem("userdata"))
                ?.custom_attributes?.[7]?.value
            }
          </span>
        </p>
      </div>
      <ul>
        {color === "yellow" && (
          <>
            {SellerList?.map((data, i) => (
              <li
                className={`${
                  (currenttab === data.url &&
                    "sellerdashboard__currentselection" &&
                    color === "yellow" &&
                    "sellerbg") ||
                  (currenttab === data.url &&
                    "sellerdashboard__currentselection" &&
                    color === "blue" &&
                    "buyerbg")
                } `}
                key={i}
                onClick={() => selectmenu(data.url)}
              >
                <img
                  src={
                    currentmenu === data?.url
                      ? data.image_Active
                      : data.image_Inactive
                  }
                  alt=""
                />
                {data.name}
              </li>
            ))}
            <li>
              <img src={logout} alt="" />
              Logout
            </li>
          </>
        )}
        {color === "blue" && (
          <>
            {BuyerList?.map((data, i) => (
              <li
                className={`${
                  (currenttab === data.url &&
                    "sellerdashboard__currentselection" &&
                    color === "yellow" &&
                    "sellerbg") ||
                  (currenttab === data.url &&
                    "sellerdashboard__currentselection" &&
                    color === "blue" &&
                    "buyerbg")
                } `}
                key={i}
                onClick={() => selectmenu(data.url)}
              >
                <img
                  src={
                    currentmenu === data.url
                      ? data.image_Active
                      : data.image_Inactive
                  }
                  alt=""
                />
                {data.name}
              </li>
            ))}
            <li>
              <img src={logout} alt="" />
              Logout
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Index;
