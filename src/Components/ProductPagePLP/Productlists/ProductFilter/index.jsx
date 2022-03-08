import React from "react";
import "./styles.scss";

import { Drawer, Button } from "@mui/material";
import { Tune } from "@mui/icons-material";
import FilterViewList from "./FilterViewList";

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
        <Button onClick={toggleDrawer("left", true)}>
          <Tune className="product_menu_filter" />
        </Button>
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
