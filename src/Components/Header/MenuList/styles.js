const styles = (theme) => ({
  drawerlist_container: {
    width: 300,
    background: "#F6F6F8",
    height: "100vh",
  },
  fullList: {
    width: "auto",
  },
  menu_list_drawer_main: {
    "& .MuiButton-root": {
      "@media (min-width:767px)": {
        minWidth: "0%",
        padding: "0",
      },
    },
    "@media (max-width:767px)": {
      "& .MuiButton-text": {
        padding: "0",
        minWidth: "0",
      },
    },
  },
  menu_list: {
    display: "none",
    "@media (max-width:768px)": {
      display: "block",
      marginRight: "18px",
    },
  },
});
export default styles;
