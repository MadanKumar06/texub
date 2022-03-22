const styles = (theme) => ({
    input_image_name: {
        width: "fit-content",
        display: "flex",
        position: "relative",
        flexWrap: "wrap",
        background: "#E8E8E8",
        alignItems: "center",
        borderRadius: "4px",
        flexDirection: "row",
        justifyContent: "center",
        padding: "13px",
        marginTop: "24px",
        "& p": {
          margin: "0",
        },
    },
      input_image_name_clear_btn: {
        position: "absolute",
        top: "-6px",
        fontSize: "17px !important",
        right: "-6px",
        background: "#DDB363",
        color: "#ffffff",
        borderRadius: "14px",
      },
})
export default styles;