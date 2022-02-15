const styles = (theme) => ({
  auto_complete_input: {
    "& .MuiOutlinedInput-root": {
      padding: "5px !important",
    },
  },
  section_right_container: {
    width: "100%",
    height: "max-content",
    marginTop: "40px",
    "@media (max-width:767px)": {
      width: "100%",
      marginTop: "0px",
    },
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
    fontSize: "22px",
    marginBottom: "37px",
    fontWeight: "600",
    "@media (max-width:767px)": {
      marginBottom: "0px",
    },
  },
  info_text_lineNote_two: {
    color: "#333333",
    fontSize: "22px",
    margin: "25px 0px 20px",
    fontWeight: "600",
  },
  input_fields: {
    width: "100%",
    borderRadius: "4px",
    "@media (max-width:767px)": {
      padding: "7% 5% 0%",
    },
    "& .MuiFormControl-root": {
      marginBottom: "20px",
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
    width: "100% !important",
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
