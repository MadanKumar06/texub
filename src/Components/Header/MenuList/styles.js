const styles = (theme) => ({
  drawerlist_container: {
    width: "50vw",
    background: "#F6F6F8",
    minHeight: "100vh",
    "@media (max-width:580px)": {
      width: "80vw",
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
    },
  },
});
export default styles;
