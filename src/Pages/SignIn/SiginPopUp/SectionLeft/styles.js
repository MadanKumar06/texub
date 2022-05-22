const styles = (theme) => ({
  section_main: {
    minHeight: "70vh",
    height: "87vh",
    // backgroundImage: "url('/Images/Group 76.png')",
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center",
    // backgroundSize: "cover",
    backgroundColor: "#f5f5f5",
    zIndex: "1",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    borderRadius: "3px",
    "@media (min-width:1600px)": {
      height: "92vh",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 22%",
    "@media (max-width:1440px)": {
      margin: "0 15%",
    },
    "@media (max-width:780px)": {
      margin: "0 5%",
    },
    "@media (max-width:580px)": {
      margin: "0 2%",
    },
  },
  // header section  css
  header_section: {
    borderRadius: "3px",
    width: "100%",
    background: "#333C42",
    minHeight: "94px",
    position: "relative",
    "@media (min-width:1800px)": {
      minHeight: "70px !important",
    },
    "@media (min-width:1600px)": {
      minHeight: "60px",
    },
    "@media (max-width:1599px)": {
      minHeight: "58px",
    },
    "& p": {
      margin: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "94px",
      fontSize: "30px",
      opacity: "1",
      fontWeight: "600",
      color: "#FFFFFF",
      "@media(min-width:1800px)": {
        minHeight: "70px !important",
      },
      "@media(min-width:1600px)": {
        minHeight: "60px",
      },
      "@media(max-width:1599px)": {
        minHeight: "58px",
        fontSize: "24px",
      },
    },
    "& svg": {
      width: "1.5em",
      height: "1.5em",
      "@media(max-width:1660px)": {
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
    "@media(max-width:1660px)": {
      top: "16px",
    },
  },

  sections: {
    display: "flex",
    flexDirection: "row",
    overflowY: "auto",
    "@media (max-width:767px)": {
      flexDirection: "column",
    },
  },
  // section left css
  section_left: {
    width: "50%",
    padding: "1.2em",
    "@media (max-width:767px)": {
      width: "100%",
    },
  },

  info_text: {
    fontSize: "24px",
    color: "#20639B",
    fontWeight: "600",
    padding: "16px 0",
    "@media(min-width:1600px)": {
      padding: "5px 0",
    },
    "@media(max-width:1599px)": {
      fontSize: "22px",
    },
    "@media (max-width:767px)": {
      textAlign: "center",
      padding: "0 0 16px",
    },
  },
  info_text_lineNote_one: {
    color: "#333333",
    fontSize: "20px",
    margin: "0",
    display: 'flex',
    "& small": {
      color: "#FF0000",
      fontSize: "18px",
      "@media(max-width:767px)": {
        fontSize: "14px",
      },
    },
    "@media(max-width:1660px)": {
      fontSize: "16px",
    },
    "@media(max-width:767px)": {
      fontSize: "14px",
    },
  },
  info_text_lineNote_two: {
    color: "#333333",
    fontSize: "20px",
    padding: "12px 0",
    margin: "5px 12px",
    "@media(min-width:1600px)": {
      padding: "8px 0",
    },
    "@media(max-width:1599px)": {
      padding: "8px 0",
    },
    "@media(max-width:1660px)": {
      fontSize: "16px",
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
    "@media(min-width:1600px)": {
      paddingBottom: "1em",
    },
    "@media(max-width:1599px)": {
      padding: "0 2em",
      paddingBottom: "1em",
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
    },
  },
  asterisk: {
    color: "red",
  },
  checkbox_label: {
    marginTop: "6px",
    "& .MuiTypography-root": {
      color: "#5C6369",
      fontSize: "20px",
      "@media(max-width:1660px)": {
        fontSize: "16px",
      },
      "@media(max-width:780px)": {
        fontSize: "14px",
      },
    },
    "& svg": {
      width: "1.3em",
      height: "1.3em",
      "@media(max-width:1660px)": {
        width: "1em",
        height: "1em",
      },
    },
  },
  logo_svg: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2em",
  },
  button_box: {
    margin: "20px 0px",
    textAlign: "center",
    "@media(min-width:1600px)": {
      margin: "10px 0px",
    },
    "@media(max-width:1599px)": {
      margin: "10px 0px",
    },
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
    width: "100%",
    "@media(max-width:1660px)": {
      padding: "8px !important",
      fontSize: "16px !important",
    },
    "@media(max-width:780px)": {
      padding: "8px !important",
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
    "@media(max-width:1660px)": {
      fontSize: "18px",
    },
  },
  // section rigth css
  section_right: {
    width: "50%",
    padding: "1.2em",
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

  // forgot password
  forgotpassword: {
    backgroundColor: "White",
    minWidth: "60%",
    "@media (max-width: 768px)": {
      minWidth: "100%",
    },
  },

  forgotpassword__title: {
    fontSize: "40px",
    fontWeight: "600",
    backgroundColor: "#333C42",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "2em",
    position: "relative",
    "@media (max-width: 1660px)": {
      fontSize: "24px",
    },
  },

  forgotpassword__clearbtn: {
    position: "absolute",
    right: "16px",
    top: "16px",
    color: "#ffffff",
    background: "#DDB363",
    cursor: "pointer",
    borderRadius: "3px",
  },

  forgotpassword__container: {
    backgroundImage: "url('/Images/Group 76.png')",
    padding: "2em",
  },

  forgotpassword__content: {
    padding: "4em 2em",
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    boxShadow: "0px 3px 6px #00000029",
    "@media (max-width: 580px)": {
      padding: "2em 1em",
      flexDirection: "column",
    },
  },

  forgotpassword__email: {
    width: "54%",
    display: "flex",
    flexDirection: "column",
    padding: "2em",
    "@media (max-width: 580px)": {
      width: "100%",
      padding: "10px 15px",
    },
  },

  forgotpassword__image: {
    width: "45%",
  },

  forgotpassword__para: {
    color: "#333333",
    fontSize: "16px",
  },

  forgot_password_container: {
    paddingTop: "2em",
  },

  forgotpassword__submit: {
    marginTop: "2em !important",
    width: "100% !important",
    padding: "0.5em !important",
  },
});
export default styles;
