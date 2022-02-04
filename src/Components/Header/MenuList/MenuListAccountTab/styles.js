const styles = (theme) => ({
  tab_conatainer: {
    "& .MuiButtonBase-root ": {
      width: "50%",
      backgroundColor: "#ddb363",
      color: "#002d56",
      fontSize: "16px",
      fontWeight: "600",
    },
    "& .Mui-selected": {
      background: "#002d56",
      color: "#ffffff !important",
    },
  },
  link_in_tab: {
    textDecoration: "none",
    color: "#5C6369",
  },
  sub_tab_conatainer: {
    "& .MuiListItem-button": {
      gap: "12px",
    },
  },
  menuButton:{
    textDecoration: "none",
    color: "#002d56 !important",
    background: "none !important",
    minWidth: "126px",
    padding: "8px 30px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000029",
    marginRight: "8px",
    fontWeight: "bold",
    letterSpacing: "1px",
    textTransform: "capitalize",
    width: "50%",
  }
});
export default styles;
