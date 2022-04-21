const styles = (theme) => ({
  section_right: {
    marginBottom: "14px",
  },
   "@media(min-width:1600px)": {
      marginBottom: "7px",
    },
     "@media(max-width:1599px)": {
      marginBottom: "7px",
    },
  info_text_lineNote: {
    color: "#333333",
    fontSize: "20px",
    opacity: "1",
    marginBottom: "0",
    "@media(max-width:1660px)": {
      fontSize: "16px",
      marginTop :"10px",
    },
    "@media(max-width:767px)": {
      margin: "0",
      fontSize: "14px",
    },
  },
  info_text_guest: {
    color: "#20639B",
    padding: "16px 0px",
    fontSize: "24px",
    fontWeight: "600",
     "@media(min-width:1600px)": {
       padding: "5px 0",
    },
    "@media(max-width:1599px)": {
      fontSize: "22px",
    },
    "@media (max-width:767px)": {
      textAlign: "center",
    },
    "@media (max-width:567px)": {
      fontSize: "18px",
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
     "@media(min-width:1600px)": {
       paddingBottom: "0.5em",
    },
    "@media(max-width:1599px)": {
      padding: "0 2em",
      paddingBottom: "0.5em",
    },
    "@media (max-width:767px)": {
      paddingBottom: "1em !important",
    },
    "@media(max-width:425px)": {
      padding: "0 1em",
      paddingBottom: "1em !important",
    },
    "& .MuiFormControl-root": {
      marginTop: "1.5em",
    },
  },
  checkbox_label: {
    marginTop: "10px",
    width: "100%",
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
  button_box: {
    margin: "20px 0px",
    textAlign: "center",
    "@media(min-width:1600px)": {
      margin: "6px 0px",
    },
     "@media(max-width:1599px)": {
      margin: "6px 0px",
    },
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
    width: "100%",
    padding: "12px !important",
    fontSize: "18px !important",
    "@media(max-width:1660px)": {
      padding: "8px !important",
      fontSize: "16px !important",
    },
  },
  asterisk: {
    color: "red",
  },
});
export default styles;
