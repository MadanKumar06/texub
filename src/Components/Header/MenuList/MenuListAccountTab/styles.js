const styles = (theme) => ({
  tab_conatainer: {
    "& .MuiButtonBase-root ": {
      width: "50%",
      background: "linear-gradient(180deg, #ffd788 0%, #ad7c20 100%)",
      color: "#002d56",
      fontSize: "16px",
      fontWeight: "600",
      textTransform: "capitalize",
    },
    "& .Mui-selected": {
      background: "linear-gradient(180deg, #20639B 0%, #002D56 100%)",
      color: "#ffffff !important",
    },
  },
  link_in_tab: {
    textDecoration: "none",
    color: "#5C6369",
  },
  sub_tab_conatainer: {
    "& img": {
      width: "24px",
    },
    "& MuiBadge-badge": {
      transform:"translate(100% 0)",
     
     
    },
    "& .MuiListItemButton-root": {
      display: "flex",
      gap: "10px",
      background: "#ebdec6",
      borderBottom: "1px solid #ffffff",
      "& img": {
        width: "24px",
      },
    },
    "& .MuiListItem-button": {
      gap: "12px",
      background: "#ebdec6",
      borderBottom: "1px solid #ffffff",
    },
    "& .MuiTypography-root": {
      fontWeight: "600",
      fontSize: "14px",
      color: "#5C6369",
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
  SigninPopup: {
    textDecoration: "none",
    textTransform: "capitalize !important",
    background: "linear-gradient(180deg, #ffd788 0%, #ad7c20 100%) !important",
    color: "#ffffff !important",
    minWidth: "126px",
    padding: "8px 30px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000029",
    marginRight: "8px",
    letterSpacing: "1px",
    width: "50%",
    fontWeight: "600 !important",
  },
  SignoutMenu : {
    textDecoration: "none",
    textTransform: "capitalize !important",
    background: "linear-gradient(180deg, #ffd788 0%, #ad7c20 100%) !important",
    color: "#ffffff !important",
    minWidth: "126px",
    padding: "8px 30px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000029",
    marginRight: "8px",
    letterSpacing: "1px",
    width: "50%",
    fontWeight: "600 !important",
  },
  menuButton: {
    textDecoration: "none",
    textTransform: "capitalize !important",
    background: "linear-gradient(180deg, #20639B 0%, #002D56 100%) !important",
    color: "#ffffff !important",
    minWidth: "126px",
    padding: "8px 30px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000029",
    marginRight: "8px",
    letterSpacing: "1px",
    width: "50%",
    fontWeight: "600 !important",
  },
  dropdowm_list_menu: {
    "& .MuiListItemButton-root": {
      background: "#ebdec6",
      borderBottom: "1px solid #ffffff",
    },
    "& .MuiTypography-root": {
      fontWeight: "600",
      fontSize: "14px",
    },
    "& .MuiSvgIcon-root": {
      color: "#5C6369",
    },
  },
  dropdown_collapse_list: {
    "& .MuiListItemButton-root": {
      background: "#fbecd0",
      borderBottom: "1px solid #ffffff",
      paddingLeft: "40px",
      display: "flex",
      gap: "10px",
      "& img": {
        width: "24px",
      },
      "@media(max-width:400px)":{
        paddingLeft: "20px"
      }
    },
    "& .MuiTypography-root": {
      fontWeight: "400",
    },
  },
  dropdowm_list_menu_sub: {
    color: "#5C6369",
  },
});
export default styles;
