const styles = (theme) => ({
  main_container: {
    padding: "0 6% 2%",
    maxHeight: "max-content",
    position: "relative",
  },
  arrow_icon: {
    fill: "#ffffff !important",
    position: "absolute",
    top: "-62px",
    right: "32%",
    fontSize: "6.5rem !important",
  },
  input_textField: {
    display: "flex",
    paddingBottom: "2%",
    gap: "2em",

    "@media (max-width:580px)": {
      gap: "0.6em",
      display: "flex",
      paddingBottom: "2%",
      flexDirection: "column",
    },
  },
  auto_complete_input: {
    "& .MuiOutlinedInput-root": {
      padding: "5px !important",
    },
  },
  button_box: {
    textAlign: "end",
    "@media (max-width:580px)": { textAlign: "center" },
  },
  input_fields: {
    width: "100%",
    padding: "3%",
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    "@media (max-width:580px)": { padding: "6% 3%" },
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
    width: "46% !important",
  },
  asterisk: {
    color: "red",
  },
});
export default styles;
