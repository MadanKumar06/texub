

 const styles = (theme) => ({
    checkbox_label: {
        fontSize:'30px !important',
        letterSpacing: "0.6px",
        "@media (max-width:1024px)":{
          fontSize:'20px !important',
        },
        },  
    career_joinus_Check1: { 
        display: "flex",
        flexDirection: "column",
        gap: "25px",
      "@media (max-width:480px)":{
        career_joinus_Check1:{
            justifyContent: "center",
        },
      },
        
    "& .MuiFormControlLabel-root" :{
        "& .MuiCheckbox-root":{
            "& .MuiSvgIcon-root": {
                color:'goldenrod',
                fontSize:'35px'
            },
        }
    }


   }
});
export default styles;
