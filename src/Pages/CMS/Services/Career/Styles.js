

 const Styles = (theme) => ({
    checkbox_label: {
        fontSize:'30px !important',
        "@media (max-width:1024px)":{
          fontSize:'20px !important',
        },
        },  
    career_joinus_Check1: { 
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      "@media (max-width:480px)":{
        career_joinus_Check1:{
            justifyContent: "center",
        },
      },
        
    "& .MuiFormControlLabel-root" :{
        "& .MuiCheckbox-root":{
            "& .MuiSvgIcon-root": {
                color:'goldenrod',
                fontSize:'25px'
            },
        }
    }


   }
});
export default Styles;