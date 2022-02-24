import React from "react";
import { Drawer, Button } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Menu } from "@mui/icons-material";
import MenuListAccountTab from "./MenuListAccountTab";
import styles from "./styles";

const MenuListDrawer = ({ classes }) => {
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
      className={classes.drawerlist_container}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <MenuListAccountTab handleSideBarClose={handleSideBarClose} />
    </div>
  );
  return (
    <div className={classes.menu_list_drawer_main}>
      <React.Fragment key={"left"}>
        <Button onClick={toggleDrawer("left", true)}>
          <Menu className={classes.menu_list} />
        </Button>
        <Drawer
          anchor={"left"}
          open={sideBar["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default withStyles(styles)(MenuListDrawer);
