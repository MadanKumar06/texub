const styles = (theme) => ({
  header_toolbar: {
    "@media (max-width:768px)": {
      display: "flex",
      // flexWrap: "wrap",
    },
  },
  header_main: {
    flexGrow: 1,
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
      padding: "0px 35px",
      "@media (max-width:1060px) and (min-width:768px)": {
        padding: "0px 20px",
      },
      "@media (max-width:768px)": {
        padding: "12px 20px",
      },
    },
  },
  company_logo: {
    display: "none",
    "& img": {
      maxWidth: "70%",
      "@media (max-width:360px)": {
        maxWidth: "60%",
      },
    },
    "@media (max-width:768px)": {
      display: "block",
      width: "auto",
      // margin: "0px 80px 0px 0px",
    },
  },
  title_main: {
    flexGrow: "1",
    display: "flex",
    maxWidth: "40rem",
    "@media (max-width:1060px) and (min-width:767px)": {
      maxWidth: "32rem",
      gap: "10px",
    },
    "& a": {
      textDecoration: "none",
      color: "#5C6369",
    },
    "@media (max-width:768px)": {
      display: "none",
      // flexWrap: "wrap",
      // width: "100%",
      // maxWidth: "100%",
      // justifyContent: "space-around",
    },
  },
  title: {
    fontSize: "18px",
    letterSpacing: "0.45px",
    fontWeight: "600",
    marginRight: theme.spacing(3),
    "@media (max-width:818px) and (min-width:768px)": {
      fontSize: "12px",
      fontWeight: "600",
    },
    "@media (max-width:1060px) and (min-width:768px)": {
      fontSize: "14px",
      marginRight: "8px",
    },
    "@media (max-width:1148px) and (min-width:1059px)": {
      fontSize: "13px",
    },
    "@media (max-width:768px)": {
      fontSize: "14px",
      width: "fit-content",
      display: "block",
      marginRight: "0",
      whiteSpace: "nowrap",
      padding: "5px 15px 10px 15px !important",
    },
  },
  header_button_main: {
    display: "flex",
    "@media (max-width:768px)": {
      margin: "auto",
      display: "none",
    },
  },
  header_button_register: {
    textDecoration: "none",
    minWidth: "126px",
    padding: "8px 30px",
    borderRadius: "45px",
    border: "none",
    background: "linear-gradient(80deg, #20639B 0%, #002D56 100%)",
    color: "white",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000029",
    marginRight: "8px",
    fontWeight: "bold",
    letterSpacing: "1px",
    textTransform: "capitalize",
    "& a": {
      textDecoration: "none",
      color: "#ffffff",
    },
    "@media (max-width:1060px) and (min-width:768px)": {
      padding: "4px 16px",
      minWidth: "88px",
    },
    "@media (max-width:768px)": {
      minWidth: "128px",
    },
    "@media (max-width:480px)": {
      minWidth: "115px",
    },
  },
  header_button_signin: {
    textDecoration: "none",
    minWidth: "126px",
    padding: "8px 30px",
    marginLeft: "8px",
    borderRadius: "45px",
    border: "none",
    background: "linear-gradient(180deg, #ffd788 0%, #ad7c20 100%)",
    color: "white",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000029",
    fontWeight: "bold",
    letterSpacing: "1px",
    textTransform: "capitalize",
    "@media (max-width:1060px) and (min-width:768px)": {
      padding: "4px 16px",
      minWidth: "88px",
    },
    "@media (max-width:768px)": {
      minWidth: "128px",
    },
    "@media (max-width:480px)": {
      minWidth: "115px",
    },
  },
});
export default styles;
