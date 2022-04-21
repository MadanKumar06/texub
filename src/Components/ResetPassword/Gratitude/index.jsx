import React from "react";
import { Clear } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import check from "../../../Assets/ResetPassword/check-mark.png";
import "./styles.scss";

import { useStateValue } from "../../../store/state";

const Index = () => {
  const [{}, dispatch] = useStateValue();
  const SigninPopUP = () => {
    dispatch({
      type: "SET_SIGNIN_OPEN_CLOSE",
      value: true,
    });
  };
  return (
    <div className="gratitude_main">
      <div className="gratitude_header">
        <Clear className="clear_btn" />
        <p className="update_heading">Password Updated</p>
      </div>
      <div className="gratitude_body_section">
        <div className="gratitude_content">
          <img src={check} alt="" className="gratitude_image" />
          <p className="gratitude_text">
            Your password has been updated successfully. Use new password to
            login into the portal.
          </p>
          <Box className="update_box">
            <div className="gratitude_go_home">
              <Button
                className="signin_button"
                type="submit"
                onClick={() => SigninPopUP()}
              >
                Sign In
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};
export default Index;
