const styles = (theme) => ({
  section_right: {
    marginBottom: "14px",
  },
  info_text_lineNote: {
    color: "#333333",
    fontSize: "20px",
    opacity: "1",
    marginBottom: "0",
    "@media(max-width:1600px)": {
      fontSize: "18px",
    },
    "@media(max-width:767px)": {
      fontSize: "14px",
      margin: "0",
    },
  },
  info_text_guest: {
    color: "#20639B",
    padding: "20px 0px 13px",
    fontSize: "30px",
    fontWeight: "600",
    "@media(max-width:1600px)": {
      fontSize: "28px",
    },
    "@media(max-width:1440px)": {
      fontSize: "26px",
    },
    "@media (max-width:767px)": {
      textAlign: "center",
      fontSize: "22px",
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
    paddingBottom: "2em",
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    "@media(max-width:1440px)": {
      padding: "0 2em",
      paddingBottom: "1em",
    },
    "@media (max-width:767px)": {
      paddingBottom: "1em !important",
    },
    "@media(max-width:425px)": {
      padding: "0 1em",
      paddingBottom: "1em !important",
    },
    "& .MuiFormControl-root": {
      marginTop: "2em",
      "& ::placeholder": {
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
        "& .MuiInputLabel-asterisk": {},
      },
    },
    "& .MuiOutlinedInput-root": {
      "& input": {
        padding: "12px",
        font: "unset",
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
  checkbox_label: {
    marginTop: "20px",
    width: "100%",
    "& .MuiTypography-root": {
      color: "#5C6369",
      fontSize: "20px",
      "@media(max-width:1600px)": {
        fontSize: "18px",
      },
      "@media(max-width:1440px)": {
        fontSize: "16px",
      },
      "@media(max-width:767px)": {
        fontSize: "14px",
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
  button_guest: {
    borderRadius: "25px !important",
    background: "linear-gradient(180deg, #20639B 0%, #002D56 100%)",
    boxShadow: "0px 3px 6px #00000029 !important",
    borderWidth: "0px",
    color: "#ffffff !important",
    transition: "transform .2s !important",
    fontWeight: "600 !important",
    textTransform: "capitalize !important",
    width: "80%",
    padding: "12px !important",
    fontSize: "18px !important",
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
  asterisk: {
    color: "red",
  },
});
export default styles;
