import React from "react";
import "./styles.scss";

import { Drawer, Button } from "@mui/material";
import { Tune } from "@mui/icons-material";
import FilterViewList from "./FilterViewList";

//basic need
import filter_option from "../../../../Assets/BasicNeeded/PLPIcons/filter.png";
const ProductFilterDrawer = () => {
  const [sideBar, setSideBar] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSideBar({ ...sideBar, [anchor]: open });
  };

  const handleSideBarClose = (event, boolean) => {
    setSideBar({ ...sideBar, [event]: boolean });
  };
  const list = (anchor) => (
    <div
      className=""
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <FilterViewList handleSideBarClose={handleSideBarClose} />
    </div>
  );

  return (
    <div className="filter_drawer_main">
      <React.Fragment key={"left"}>
        <img
          src={filter_option}
          alt="filter"
          className="product_menu_filter"
          onClick={toggleDrawer("left", true)}
        />
        <Drawer
          anchor={"left"}
          open={sideBar["left"]}
          onClose={toggleDrawer("left", false)}
          className="filter_drawer"
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default ProductFilterDrawer;
