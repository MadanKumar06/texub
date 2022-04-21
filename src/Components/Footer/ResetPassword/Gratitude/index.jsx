import React from 'react'
import { Clear } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
    Box,
    Button
} from "@mui/material";
import check from "../../../../Assets/ResetPassword/check-mark.png"
import './styles.scss'

 const Index = () => {
  return (
    <div className='gratitude_main'>
                <div className='gratitude_header'>
                    <Clear className="clear_btn" />
                    <p className='update_heading'>Password Updated</p>
                </div>
                <div className='gratitude_body_section'>
                    <div className='gratitude_content'>
                        <img src={check} alt="" className='gratitude_image'/>
                        <p className='gratitude_text'>Your password has been updated successfully. Use new password to login into the portal.</p>
                        <Box className='update_box'>
                            <Link to="/" className='gratitude_go_home'>
                            <Button
                                className="signin_button"
                                type="submit"
                            >
                                Sign In
                            </Button>
                            </Link>
                        </Box>
                    </div>
                </div>
            </div>
  )
}
export default Index;
