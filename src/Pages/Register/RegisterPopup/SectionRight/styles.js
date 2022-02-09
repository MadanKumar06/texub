const styles = (theme) => ({
  radio_btn_container: {
    height: "100%",
  },
  select_text: {
    color: "#333C42",
    fontSize: "22px !important",
    lineHeight: "31px",
    marginBottom: "4%",
    "@media (max-width:1190px) and (min-width:768px)": {
      fontSize: "18px !important",
    },
  },
  user_description: {
    fontSize: "18px",
    lineHeight: "30px",
    letterSpacing: "0.42px",
    color: "#333C42",
    textAlign: "justify",
    marginBottom: "30px",
    "@media (max-width:1190px) and (min-width:768px)": {
      fontSize: "14px",
    },
  },
  btn_link: {
    textDecoration: "none",
    color: "#ffffff",
    margin: "auto auto 0px !important",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  btn_user: {
    fontSize: "18px !important",
    borderRadius: "25px !important",
    background: "linear-gradient(180deg, #20639B 0%, #002D56 100%)",
    boxShadow: "0px 3px 6px #00000029 !important",
    borderWidth: "0px",
    transition: "transform .2s !important",
    fontWeight: "600 !important",
    width: "80%",
    textTransform: "capitalize !important",
  },
  radio_group: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "nowrap !important",
    "@media (max-width:767px)": {
      flexWrap: "wrap !important",
    },
    "& .MuiFormControlLabel-root": {
      width: "130px",
      height: "179px",

      "& .MuiTypography-root": {
        position: "relative",
        "& img ": {
          maxWidth: "100%",
        },
        "& p": {
          position: "absolute",
          bottom: "0px",
          left: "47px",
        },
      },
    },
  },
});
export default styles;
