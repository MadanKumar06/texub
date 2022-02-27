const styles = (theme) => ({
  drawerlist_container: {
    width: "286px",
    background: "#F6F6F8",
    minHeight: "100vh",
    display: "none",
    "@media (max-width:768px)": {
      display: "block",
    },
    "@media (max-width:580px)": {
      width: "70vw",
      display: "block",
    },
  },
  fullList: {
    width: "auto",
  },
  menu_list_drawer_main: {
    display: "none",
    "@media (max-width:768px)": {
      display: "block",
      marginRight: "12px",
      "& .MuiButton-text": {
        padding: "0",
        minWidth: "0",
      },
    },
    "& .MuiButton-root": {
      "@media (max-width:768px)": {
        minWidth: "0%",
        padding: "0",
      },
    },
    "& .MuiSvgIcon-root": {
      "@media (max-width:768px)": {
        width: "1.5em",
        height: "1.5em",
      },
      "@media (max-width:380px)": {
        width: "1.3em",
        height: "1.3em",
      },
    },
  },
});
export default styles;
