import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Drawer, Button, Badge } from "@mui/material";
import MiniCartList from "./MiniCartList";

import mycart_image from "../../Assets/User/shopping-bag (2).png";
import { useStateValue } from "../../store/state";

const MiniCartDrawer = () => {
  const [{ miniCartOpenClose, cart }, dispatch] = useStateValue();
  const [sideBar, setSideBar] = React.useState({
    left: false,
  });
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 580px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 580px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  useEffect(() => {
    if (miniCartOpenClose?.open) {
      setSideBar({ ...sideBar, right: true });
    } else {
      setSideBar({ ...sideBar, right: false });
    }
  }, [miniCartOpenClose]);
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
    dispatch({
      type: "SET_MINICART_OPEN_CLOSE",
      value: false,
      open: false,
    });
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
        <Button onClick={toggleDrawer("right", true)} disableRipple>
          <Badge
            showZero={true}
            badgeContent={
              cart?.[0]?.invoice_items?.length
                ? cart?.[0]?.invoice_items?.length
                : 0
            }
            className="badge"
          >
            <div className="mycart_image">
              <img src={mycart_image} alt="" />
            </div>
          </Badge>
          <li className="mini_cart_head">My Cart</li>
        </Button>
        <Drawer
          anchor={"right"}
          open={sideBar["right"]}
          onClose={toggleDrawer("right", false)}
          className="miniCart_drawer"
          PaperProps={
            matches
              ? {
                  style: {
                    height: "100vh",
                    minWidth: "350px",
                    width: "min-content",
                  },
                }
              : { style: { height: "100vh", minWidth: "350px", width: "100%" } }
          }
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default MiniCartDrawer;
