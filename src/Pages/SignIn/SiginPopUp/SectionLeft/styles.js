const styles = (theme) => ({
  section_main: {
    minHeight: "70vh",
    height: "77vh",
    backgroundImage: "url('/Images/Group 76.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    zIndex: "1",
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "8%",
  },
  // header section  css
  header_section: {
    width: "100%",
    background: "#333C42",
    minHeight: "94px",
    position: "relative",
    "@media (max-width:1600px)": {
      minHeight: "84px",
    },
    "@media(max-width:1440px)": {
      minHeight: "74px",
    },
    "@media(max-width:1024px)": {
      minHeight: "64px",
    },
    "@media (max-width:767px)": {
      minHeight: "54px",
    },
    "& p": {
      margin: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "94px",
      fontSize: "40px",
      opacity: "1",
      fontWeight: "600",
      color: "#FFFFFF",
      "@media(max-width:1600px)": {
        minHeight: "84px",
        fontSize: "34px",
      },
      "@media(max-width:1440px)": {
        minHeight: "74px",
        fontSize: "30px",
      },
      "@media(max-width:1024px)": {
        minHeight: "64px",
        fontSize: "26px",
      },
      "@media (max-width:767px)": {
        minHeight: "54px",
        fontSize: "22px",
      },
    },
    "& svg": {
      width: "1.5em",
      height: "1.5em",
      "@media(max-width:1440px)": {
        width: "1em",
        height: "1em",
      },
    },
  },
  clear_btn: {
    position: "absolute",
    top: "22px",
    right: "13px",
    color: "#ffffff",
    background: "#DDB363",
    cursor: "pointer",
    borderRadius: "3px",
    "@media(max-width:1600px)": {
      top: "24px",
    },
    "@media(max-width:1440px)": {
      top: "28px",
    },
    "@media(max-width:1024px)": {
      top: "21px",
    },
    "@media (max-width:767px)": {
      top: "16px",
    },
  },

  sections: {
    display: "flex",
    flexDirection: "row",
    overflowY: "scroll",
    "@media (max-width:767px)": {
      flexDirection: "column",
    },
  },
  // section left css
  section_left: {
    width: "50%",
    padding: "2em 1.5em",
    "@media (max-width:767px)": {
      width: "100%",
    },
    "@media(max-width:767px)": {
      padding: "1em 1.5em",
    },
    "@media(max-width:425px)": {
      padding: "1em 0.7em",
    },
  },

  info_text: {
    fontSize: "30px",
    color: "#20639B",
    fontWeight: "600",
    padding: "20px 0 16px",
    "@media(max-width:1600px)": {
      fontSize: "28px",
    },
    "@media(max-width:1440px)": {
      fontSize: "26px",
    },
    "@media (max-width:767px)": {
      textAlign: "center",
      fontSize: "22px",
      padding: "0 0 16px",
    },
  },
  info_text_lineNote_one: {
    color: "#333333",
    fontSize: "20px",
    margin: "0",
    "& small": {
      color: "#FF0000",
      fontSize: "18px",
      "@media(max-width:767px)": {
        fontSize: "14px",
      },
    },
    "@media(max-width:1600px)": {
      fontSize: "18px",
    },
    "@media(max-width:767px)": {
      fontSize: "14px",
    },
  },
  info_text_lineNote_two: {
    color: "#333333",
    fontSize: "20px",
    padding: "12px 0",
    margin: "0",
    "@media(max-width:1600px)": {
      fontSize: "18px",
    },
    "@media(max-width:767px)": {
      fontSize: "14px",
    },
  },
  validation_error: {
    whiteSpace: "unset !important",
    marginLeft: "4px !important",
    fontSize: "14px !important",
    color: "#FF0000 !important",
  },
  input_fields: {
    width: "100%",
    padding: "0 3em",
    paddingBottom: "3em",
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    "@media(max-width:1440px)": {
      padding: "0 2em",
      paddingBottom: "3em",
    },
    "@media (max-width:767px)": {
      marginBottom: "30px",
      paddingBottom: "1em !important",
    },
    "@media(max-width:425px)": {
      padding: "0 1em",
      paddingBottom: "1em !important",
    },
    "& .MuiFormControl-root": {
      marginTop: "2em",
      "& ::placeholder": {
        textTransform: "capitalize",
        fontSize: "20px",
        color: "#CDD5DD",
        opacity: "1",
        "@media(max-width:1440px)": {
          fontSize: "18px",
        },
        "@media (max-width:767px)": {
          fontSize: "16px",
        },
      },
      "& .MuiInputLabel-root": {
        fontWeight: "600",
        fontSize: "18px",
        color: "#3E3E3E",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& input": {
        padding: "12.5px 14px",
        font: "unset",
        // "@media (max-width:767px)": {
        //   padding: "8px",
        // },
      },
      "& fieldset": {
        "& legend": {
          fontSize: "1em",
        },
      },
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #DDB363",
    },
  },
  asterisk: {
    color: "red",
  },
  checkbox_label: {
    marginTop: "12px",
    "& .MuiTypography-root": {
      color: "#5C6369",
      fontSize: "20px",
      "@media(max-width:1600px)": {
        fontSize: "18px",
      },
      "@media(max-width:1440px)": {
        fontSize: "16px",
      },
    },
    "& svg": {
      width: "1.3em",
      height: "1.3em",
      "@media(max-width:1440px)": {
        width: "1em",
        height: "1em",
      },
      "@media(max-width:425px)": {
        width: "0.9em",
        height: "0.9em",
      },
    },
  },
  button_box: {
    margin: "20px 0px",
    textAlign: "center",
    "@media(max-width:425px)": {
      margin: "6px 0px",
    },
  },
  button_signin: {
    borderRadius: "45px !important",
    border: "none !important",
    background: "linear-gradient(180deg, #ffd788 0%, #ad7c20 100%)",
    color: "#ffffff !important",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000029 !important",
    fontWeight: "600 !important",
    letterSpacing: "1px !important",
    textTransform: "capitalize !important",
    transition: "transform .2s !important",
    padding: "12px !important",
    fontSize: "18px !important",
    width: "80%",
    "@media(max-width:1600px)": {
      padding: "8px !important",
    },
    "@media(max-width:1440px)": {
      padding: "6px !important",
      fontSize: "16px !important",
    },
    "@media (max-width:767px)": {
      padding: "3px !important",
      fontSize: "14px !important",
    },
  },
  forgot_password: {
    textAlign: "center",
    fontSize: "20px",
    color: "#002D56",
    fontWeight: "600",
    margin: "20px 0px",
    cursor: "pointer",
    textDecoration: "underline",
    "@media(max-width:1600px)": {
      fontSize: "16px",
    },
  },
  // section rigth css
  section_right: {
    width: "50%",
    padding: "0px 14px",
    background: "#F8F0E0",
    height: "fit-content",
    "@media (max-width:767px)": {
      width: "100%",
      padding: "1em 1.5em",
    },
    "@media(max-width:425px)": {
      padding: "1em 0.7em",
    },
  },
});
export default styles;
