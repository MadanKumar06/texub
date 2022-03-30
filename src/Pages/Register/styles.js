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
    fontSize: "24px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    paddingRight: "4%",
    "@media (max-width:1660px)": {
      fontSize: "24px",
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
      "@media (max-width:1660px)": {
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
    alignItems: "center",
    "& p": {
      fontSize: "18px",
      color: "#333C42",
      margin: "0",
      fontWeight: "600",
      "@media (max-width:1660px)": {
        fontSize: "16px",
      },
    },
    "& span": {
      fontSize: "22px",
      color: "#20639B",
      cursor: "pointer",
      fontWeight: "600",
      textDecoration: "underline",
      "@media (max-width:1660px)": {
        fontSize: "18px",
      },
    },
  },
  right_area: {
    width: "70%",
    display: "flex",
    justifyContent: " flex-end",
    "@media (max-width:767px)": {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  clicking_user: {
    boxShadow: "0px 0px 5px 2px rgba(32,99,155,0.49)",
    WebkitBoxShadow: "0px 0px 5px 2px rgba(32,99,155,0.49)",
    MozBoxShadow: "0px 0px 5px 2px rgba(32,99,155,0.49)",
  },
  radio_group: {
    flexWrap: "nowrap !important",
    position: "relative",
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
        fontSize: "26px",
        position: "absolute",
        left: "35px",
        bottom: "-15px",
        "@media (max-width:1660px)": {
          fontSize: "18px",
          left: "42px",
          bottom: "-6px",
        },
      },
      "& .MuiRadio-root": {
        display: "none",
      },
      "& .MuiTypography-root": {
        display: "none",
      },
    },
    // "&::after": {
    //   left: "73px",
    //   width: "0px",
    //   height: "0px",
    //   content: '""',
    //   position: "absolute",
    //   transform: "rotate(90deg)",
    //   borderTop: "23px solid transparent",
    //   borderRight: "23px solid #000000",
    //   borderBottom: "23px solid transparent",
    //   bottom: "-43px",
    // },
  },
  clicking_user_para: {
    color: "#20639B",
    fontWeight: "600",
  },
});
export default styles;
