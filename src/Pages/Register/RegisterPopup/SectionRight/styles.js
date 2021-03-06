const styles = (theme) => ({
  radio_btn_container: {
    height: "100%",
  },
  select_text: {
    color: "#333C42 !important",
    fontSize: "22px !important",
    opacity: "1",
    lineHeight: "31px",
    marginBottom: "4%",
    "@media (max-width:1190px)": {
      fontSize: "18px !important",
    },
  },
  user_description: {
    fontSize: "14px",
    lineHeight: "24px",
    letterSpacing: "0.42px",
    color: "#333C42",
    textAlign: "justify",
    marginBottom: "30px",
    width: "95%",
    opacity: "1",
    "@media (max-width:1190px)": {
      fontSize: "14px",
    },
    "& ol": {
      textTransform: "capitalize",
    },
    "& p": {
      display: "flex",
      flexDirection: "column",
    },
  },
  btn_link: {
    textDecoration: "none",
    color: "#ffffff",
    width: "100%",
    textAlign: "center",
    "@media (max-width:580px)": {
      display: "flex",
      justifyContent: "center",
    },
  },
  register_popup: {
    margin: 0,
  },
  btn_user: {
    fontSize: "18px !important",
    borderRadius: "35px !important",
    background: "linear-gradient(180deg, #20639B 0%, #002D56 100%)",
    boxShadow: "0px 3px 6px #00000029 !important",
    borderWidth: "0px",
    transition: "transform .2s !important",
    fontWeight: "600 !important",
    padding: "12px 0",
    width: "60%",
    textTransform: "capitalize !important",
    "@media (max-width:1660px)": {
      fontSize: "16px !important",
    },
  },
  radio_group: {
    display: "flex",
    gap: "4em",
    justifyContent: "center",
    alignItem: "center",
    flexWrap: "nowrap !important",
    "@media (max-width:767px)": {
      flexWrap: "wrap !important",
      gap: "1em",
    },
    "@media (max-width:425px)": {
      justifyContent: "center",
      gap: "1em !important",
    },
    "@media (max-width:1200px)": {
      gap: "4em",
      justifyContent: "space-around",
    },
    "& .MuiFormControlLabel-root": {
      margin: "0",
      "@media (max-width:1440px)": {
        width: "130px",
        height: "179px",
      },

      "& .MuiTypography-root": {
        position: "relative",
        "& img ": {
          maxWidth: "100%",
        },
        "& p": {
          position: "absolute",
          bottom: "11px",
          left: "57px",
          fontSize: "24px",
          color: "#5C6369",
          opacity: "1",
          fontWeight: "600",
          letterSpacing: "0.72px",
          margin: "0",
          "@media (max-width:1600px)": {
            bottom: "24px",
            left: "63px",
            fontSize: "20px",
          },
          "@media (max-width:1440px)": {
            bottom: "18px",
            left: "40px",
            fontSize: "20px",
          },
        },
      },
    },
  },
});
export default styles;
