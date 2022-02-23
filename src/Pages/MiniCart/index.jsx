import React, { useState, useEffect } from "react";
import { Drawer, Button, Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ShoppingBag } from "@material-ui/icons";
import "./styles.scss";
import MiniCartList from "./MiniCartList";

const MiniCartDrawer = () => {
  const [sideBar, setSideBar] = React.useState({
    left: false,
  });
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 767px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 767px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

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
      <MiniCartList handleSideBarClose={handleSideBarClose} />
    </div>
  );

  return (
    <div className="minicart_drawer_main">
      <React.Fragment key={"right"}>
        <Button onClick={toggleDrawer("right", true)}>
          <Link to="/mycart">
            <Badge badgeContent={1} className="badge">
              <ShoppingBag />
            </Badge>
            <li className="mini_cart_head">My Cart</li>
          </Link>
        </Button>
        <Drawer
          anchor={"right"}
          open={sideBar["right"]}
          onClose={toggleDrawer("right", false)}
          className="miniCart_drawer"
          PaperProps={
            matches
              ? { style: { height: "87.5vh", width: "600px" } }
              : { style: { height: "87.5vh", width: "100%" } }
          }
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default MiniCartDrawer;
