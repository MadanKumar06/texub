
const styles = (theme) => ({

    faqs_table: {
        display: "flex",
        flexDirection: "column",
        gap: "30px",
    },
    faqs_text_heading: {
        fontSize: "x-large",
        "@media (max-width:425px)":{
            fontSize: "larger",
        },
        "@media (max-width:320px)":{
            fontSize: "unset",
        },
    },
    // faqs_textarea: {
    //     "& .FAQ-faqs_textarea-20": {
    //         Height: "216px",
    //     }
    // },
    faqs_button: {
        width:"20%",
        padding:"10px 20px",
        textDecoration: "none !important",
        minWidth: "126px !important",
        borderRadius: "45px !important",
        border: "none !important",
        background: "linear-gradient(80deg, #20639B 0%, #002D56 100%)",
        color: "#ffffff !important",
        cursor: "pointer",
        boxShadow: "0px 3px 6px #00000029",
        marginRight: "8px !important",
        fontWeight: "600 !important",
        letterSpacing: "1px",
        textTransform: "capitalize !important",
        float:"right",
        fontSize:'large'
    }
});
export default styles;