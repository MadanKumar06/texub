const styles = (theme) => ({
  auto_complete_input: {
    "& .MuiOutlinedInput-root": {
      padding: "5px !important",
    },
    "& .MuiAutocomplete-input": {
      padding: "7.5px 4px 7.5px 6px !important",
    },
  },
  section_right_container: {
    width: "100%",
    height: "max-content",
    marginTop: "40px",
    padding: "2% 5%",
    "@media (max-width:767px)": {
      width: "100%",
      marginTop: "0px",
    },
  },
  category_select_option: {
    "& .MuiSelect-select ": {
      // padding: "12.5px 14px",
    },
  },
  validation_error: {
    whiteSpace: "unset !important",
    marginLeft: "4px !important",
    fontSize: "14px !important",
    color: "#FF0000 !important",
    width: "100%",
  },
  textFlied_separate: {
    width: "100%",
  },
  input_div: {
    display: "flex",
    gap: "20px",
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
    fontSize: "36px",
    margin: "0",
    fontWeight: "600",
    letterSpacing: "1.08px",
    "@media (max-width:1600px)": {
      fontSize: "30px",
    },
    "@media (max-width:1440px)": {
      fontSize: "26px",
    },
    "@media (max-width:767px)": {
      marginBottom: "0px",
    },
  },
  info_text_lineNote_two: {
    color: "#333333",
    letterSpacing: "1.08px",
    fontSize: "36px",
    margin: "1.5em 0 1em 0",
    fontWeight: "600",
    "@media (max-width:1600px)": {
      fontSize: "30px",
    },
    "@media (max-width:1440px)": {
      fontSize: "26px",
    },
  },
  input_fields: {
    width: "100%",
    borderRadius: "4px",
    "& .MuiFormControl-root": {
      marginTop: "2.5em",
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
        fontSize: "18px",
        fontWeight: "600",
        color: "#3E3E3E",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& input": {
        // padding: "12.5px 14px",
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
  button_guest: {
    borderRadius: "30px !important",
    background: "linear-gradient(180deg, #20639B 0%, #002D56 100%)",
    boxShadow: "0px 3px 6px #00000029 !important",
    borderWidth: "0px",
    color: "#ffffff !important",
    transition: "transform .2s !important",
    fontWeight: "600 !important",
    textTransform: "capitalize !important",
    marginTop: "60px !important",
    width: "100% !important",
    padding: "14px !important",
    fontSize: "18px !important",
    "@media (max-width:1600px)": {
      padding: "8px !important",
    },
  },
  button_box: {
    paddingBottom: "30px",
    "& a": {
      textDecoration: "none",
    },
    "@media (max-width:580px)": { textAlign: "center" },
  },
  asterisk: {
    color: "red",
  },
});
export default styles;