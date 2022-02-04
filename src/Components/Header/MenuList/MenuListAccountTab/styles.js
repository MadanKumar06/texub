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
      background: "#ebdec6",
      borderBottom: "1px solid #ffffff",
    },
    "& .MuiBox-root ": {
      padding: "12px",
    },
    "& .MuiList-root": {
      padding: "0",
    },
  },
  stackmenu_button: {
    padding: "24px 0px",
  },
  menuButton: {
    textDecoration: "none",
    textTransform: "capitalize !important",
    background: "#002d56 !important",
    color: "#ffffff !important",
    minWidth: "126px",
    padding: "8px 30px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000029",
    marginRight: "8px",
    fontWeight: "bold",
    letterSpacing: "1px",
    width: "50%",
  },
  dropdowm_list_menu: {
    "& .MuiListItemButton-root": {
      background: "#ebdec6",
      borderBottom: "1px solid #ffffff",
    },
    "& .MuiSvgIcon-root": {
      color: "#5C6369",
    },
  },
  dropdown_collapse_list: {
    "& .MuiListItemButton-root": {
      background: "#fbecd0",
      borderBottom: "1px solid #ffffff",
    },
  },
  dropdowm_list_menu_sub: {
    color: "#5C6369",
  },
});
export default styles;
