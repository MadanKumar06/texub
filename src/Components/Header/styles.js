const styles = (theme) => ({
  header_toolbar: {
    "@media (max-width:768px)": {
      display: "flex",
    },
  },
  header_main: {
    "& .MuiPaper-root": {
      backgroundColor: "#F6F6F8",
      padding: "0 3%",
    },
    "& .MuiPaper-elevation4": {
      boxShadow: "unset",
    },
    "& .MuiToolbar-regular": {
      minHeight: "74px",
    },
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "#F6F6F8",
      color: "#5C6369",
    },
    "& .MuiToolbar-gutters": {
      padding: 0,
    },
  },
  company_logo: {
    display: "none",
    "& img": {
      maxWidth: "100%",
    },
    "@media (max-width:768px)": {
      display: "block",
    },
    "@media (max-width:768px) and (min-width:380px)": {
      width: "147px",
    },
    "@media (max-width:380px) and (min-width:320px)": {
      width: "109px",
    },
  },
  title_main: {
    display: "flex",
    gap: "30px",
    "& a": {
      textDecoration: "none",
      color: "#5C6369",
    },
    "@media (max-width:965px) and (min-width:768px)": {
      gap: "10px",
    },
    "@media (max-width:768px)": {
      display: "none",
    },
  },
  title: {
    fontSize: "20px !important",
    letterSpacing: "0.45px !important",
    fontWeight: "600 !important",
    marginRight: "24px",
    position: "relative",
    "& span": {
      position: "absolute",
      fontSize: "9px",
      background: "#20639B",
      borderRadius: "9px",
      padding: "0px 5px",
      color: "#ffffff",
      top: "-10px",
      right: "-14px",
    },
    "@media (max-width:850px) and (min-width:768px)": {
      fontSize: "12px !important",
      fontWeight: "600 !important",
    },
    "@media (max-width:1240px) and (min-width:850px)": {
      fontSize: "16px !important",
      marginRight: "8px",
    },
    "@media (max-width:768px)": {
      display: "block",
    },
  },
  header_button_main: {
    display: "flex",
    marginLeft: "30px",
    "@media (max-width:965px) and (min-width:768px)": {
      marginLeft: "16px",
    },
    "@media (max-width:768px)": {
      display: "none",
    },
  },
  header_button_register: {
    textDecoration: "none !important",
    minWidth: "126px !important",
    borderRadius: "45px !important",
    border: "none !important",
    background: "linear-gradient(180deg, #20639B 0%, #002D56 100%)",
    color: "#ffffff !important",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000029",
    marginRight: "8px !important",
    fontWeight: "600 !important",
    fontSize: "18px !important",
    letterSpacing: "1px",
    textTransform: "capitalize !important",
    "& a": {
      textDecoration: "none",
      color: "#ffffff",
    },
    "@media (max-width:1240px) and (min-width:768px)": {
      minWidth: "90px !important",
    },
  },
  header_button_signin: {
    textDecoration: "none",
    minWidth: "126px !important",
    marginLeft: "8px !important",
    borderRadius: "45px !important",
    border: "none !important",
    background: "linear-gradient(180deg, #ffd788 0%, #ad7c20 100%)",
    color: "#ffffff !important",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000029 !important",
    fontWeight: "600 !important",
    letterSpacing: "1px !important",
    textTransform: "capitalize !important",
    fontSize: "18px !important",
    "@media (max-width:1240px) and (min-width:768px)": {
      minWidth: "90px !important",
    },
  },
});
export default styles;
