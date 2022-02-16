const styles = (theme) => ({
  register_main_container_buyer: {
    backgroundImage: "url('/Images/user_selection_bg.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  register_main_container_seller: {
    backgroundImage: "url('/Images/buyer_regirtration_bg.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  area_container: {
    display: "flex",
    padding: "25px 6% 30px",
    "@media (max-width:767px)": {
      flexDirection: "column",
    },
  },
  select_text: {
    color: "#333C42",
    fontSize: "22px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    paddingRight: "4%",
    "@media (max-width:1440px) and (min-width:768px)": {
      fontSize: "18px",
    },
  },
  left_area: {
    width: "30%",
    "& h6": {
      color: "#333C42",
      fontSize: "32px",
      marginBottom: "7px",
      marginTop: "7%",
      fontWeight: "600",
      "@media (max-width:1440px) and (min-width:768px)": {
        fontSize: "24px",
      },
    },
    "@media (max-width:767px)": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  user_signin: {
    display: "flex",
    gap: "34px",
    "& p": {
      fontSize: "18px",
      color: "#333C42",
      margin: "0",
      fontWeight: "400",
      "@media (max-width:1440px) and (min-width:768px)": {
        fontSize: "16px",
      },
    },
    "& span": {
      fontSize: "18px",
      color: "#20639B",
      textDecoration: "underline",
      "@media (max-width:1440px) and (min-width:768px)": {
        fontSize: "16px",
      },
    },
  },
  right_area: {
    width: "70%",
    display: "flex",
    justifyContent: "end",
    "@media (max-width:767px)": {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  clicking_user: {
    boxShadow: "0px 0px 5px 6px rgba(32,99,155,0.49)",
    WebkitBoxShadow: "0px 0px 5px 6px rgba(32,99,155,0.49)",
    MozBoxShadow: "0px 0px 5px 6px rgba(32,99,155,0.49)",
  },
  radio_group: {
    flexWrap: "nowrap !important",
    "& .MuiFormControlLabel-root": {
      width: "130px",
      position: "relative",
      "& img ": {
        width: "100%",
      },
      "& img": {
        width: "100%",
      },
      "& p": {
        position: "absolute",
        bottom: "0px",
        left: "47px",
      },
      "& .MuiRadio-root": {
        display: "none",
      },
      "& .MuiTypography-root": {
        display: "none",
      },
    },
  },
  clicking_user_para: {
    color: "#20639B",
    fontWeight: "600",
  },
});
export default styles;