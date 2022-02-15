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
    maxHeight: "70px",
    position: "relative",
    "& p": {
      textAlign: "center",
      fontWeight: "600",
      color: "#FFFFFF",
      fontSize: "22px",
    },
  },
  clear_btn: {
    position: "absolute",
    top: "22px",
    right: "13px",
    color: "#ffffff",
    background: "#DDB363",
    borderRadius: "3px",
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
    padding: "0px 14px",
    "@media (max-width:767px)": {
      width: "100%",
    },
  },

  info_text: {
    fontSize: "24px",
    color: "#20639B",
    fontWeight: "600",
    padding: "20px 0px 10px",
    "@media (max-width:767px)": {
      textAlign: "center",
    },
  },
  info_text_lineNote_one: {
    color: "#333333",
    fontSize: "16px",
    marginBottom: "0",
    "& small": {
      color: "#FF0000",
      fontSize: "18px",
    },
  },
  info_text_lineNote_two: {
    color: "#333333",
    fontSize: "16px",
    margin: "0",
  },
  input_fields: {
    width: "100%",
    padding: "10% 5%",
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    "@media (max-width:767px)": {
      padding: "7% 5%",
      marginBottom: "30px",
    },
    "& .MuiFormControl-root": {
      marginBottom: "38px",
      "& ::placeholder": {
        textTransform: "capitalize",
        fontSize: "12px",
      },
      "& .MuiInputLabel-root": {
        fontWeight: "600",
        fontSize: "1.2rem",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& input": {
        padding: "12px",
        font: "unset",
      },
      "& fieldset": {
        "& legend": {
          fontSize: "0.9em",
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
    "& .MuiTypography-root": {
      color: "#5C6369",
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
    width: "80%",

  },
  forgot_password: {
    textAlign: "center",
    color: "#002D56",
    fontWeight: "600",
    textDecoration: "underline",
  },
  // section rigth css
  section_right: {
    width: "50%",
    padding: "0px 14px",
    background: "#F8F0E0",
    height: "fit-content",
    "@media (max-width:767px)": {
      width: "100%",
    },
  },
});
export default styles;
