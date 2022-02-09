const styles = (theme) => ({
  section_right: {
    marginBottom: "14px",
  },
  info_text_lineNote: {
    color: "#333333",
    fontSize: "16px",
    marginBottom: "0",
  },
  info_text_guest: {
    color: "#20639B",
    padding: "20px 0px 13px",
    fontSize: "24px",
    fontWeight: "600",
    "@media (max-width:767px)": {
      textAlign: "center",
    },
  },
  input_fields: {
    width: "100%",
    padding: "10% 5%",
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    "& .MuiFormControl-root": {
      "& ::placeholder": {
        textTransform: "capitalize",
        fontSize: "12px",
      },
      marginBottom: "20px",
      "& .MuiInputLabel-root": {
        fontWeight: "600",
        fontSize: "1.2rem",
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
    width: "80%",
  },
  asterisk: {
    color: "red",
  },
});
export default styles;
