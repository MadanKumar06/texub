const styles = (theme) => ({
  main_container: {
    padding: "0 6% 2%",
    maxHeight: "max-content",
    position: "relative",
  },
  validation_error: {
    whiteSpace: "unset !important",
    marginLeft: "4px !important",
    fontSize: "14px !important",
    color: "#FF0000 !important",
  },
  text_field_container: {
    width: "100%",
  },
  input_textField: {
    display: "flex",
    paddingBottom: "2%",
    gap: "2em",
    "@media (max-width:580px)": {
      gap: "25px",
      display: "flex",
      flexDirection: "column",
      paddingBottom: "0",
    },
  },
  auto_complete_input: {
    "& .MuiOutlinedInput-root": {
      padding: "5px !important",
    },
  },
  recaptcha_info: {
    width: "100%",

    "& div div": {
      width: "100% !important",
    },
    "& iframe": {
      width: "100% !important",
    },
    "& #rc-anchor-container": {
      width: "100% !important",
    },
    "& #rc-anchor-normal": {
      with: "100% !important",
    },
  },
  button_box: {
    textAlign: "end",
    "& a": {
      textDecoration: "none",
    },
    "@media (max-width:580px)": { textAlign: "center" },
  },
  input_fields: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    width: "100%",
    padding: "3%",
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    "@media (max-width:580px)": { padding: "6% 3%", gap: "25px" },
    "& .MuiFormControl-root": {
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
        fontSize: "18px",
        fontWeight: "600",
        color: "#3E3E3E",
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
          fontSize: "0.9em",
        },
      },
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #DDB363",
    },
  },
  checkbox_label: {
    width: "100%",
    "& .MuiTypography-root": {
      color: "#5C6369",
      fontSize: "20px",
      fontWeight: "600",
      "& p": {
        "& span": {
          color: "#20639b",
          textDecoration: "underline",
          letterSpacing: "0.45px",
          margin: "0 4px",
        },
      },
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
  button_guest: {
    borderRadius: "25px !important",
    background: "linear-gradient(180deg, #20639B 0%, #002D56 100%)",
    boxShadow: "0px 3px 6px #00000029 !important",
    borderWidth: "0px",
    color: "#ffffff !important",
    transition: "transform .2s !important",
    fontWeight: "600 !important",
    textTransform: "capitalize !important",
    marginTop: "20px !important",
    width: "46% !important",
    fontSize: "18px !important",
    padding: "12px 0 !important",
    "@media(max-width:1600px)": {
      padding: "8px !important",
    },
    "@media(max-width:1440px)": {
      padding: "6px !important",
      fontSize: "16px !important",
    },
    "@media (max-width:767px)": {
      padding: "10px !important",
      fontSize: "16px !important",
    },
  },
  asterisk: {
    color: "red",
  },
});
export default styles;
