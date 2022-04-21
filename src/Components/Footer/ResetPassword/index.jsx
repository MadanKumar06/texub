import React, { useState,useEffect } from 'react'
import './styles.scss'
import { Clear } from "@mui/icons-material";
import reset from "../../../Assets/ResetPassword/Group 1526.svg"
import { isPasswordValid } from "../../../utilities";
import Gratitude from './Gratitude'
import info from '../../../Assets/ResetPassword/info (1).png'
import {
    InputLabel,
    TextField,
    Box,
    Button
} from "@mui/material";
const Index = () => {
    const [resetData, setresetData] = useState({
        new_password: "",
        confirm_new_password: "",
    });
    const [inputValidation, setInputValidation] = useState({
        new_password: "",
        confirm_new_password: "",
    });

    const [gratitude, setgratitude] = useState(false)
    const thankyou = () => {
        setgratitude(!gratitude)
        setfirst(false)
    }
    const [first, setfirst] = useState(true)
    const [signifier, setsignifier] = useState(false)
    const handleChangeInput = (event) => {
        setresetData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
        setInputValidation("");
        handleSwitchCase([event.target.name], event.target.value);
    };
    // const [valid, setValid] = useState(null);
    // useEffect(() => {
    //     if (valid) {
    //       handleCallValidation(valid);
    //     }
    //   }, [valid]);
    const handleClickValidation = (event) => {
        var errorHandle = false;
        if (!resetData?.new_password) {
            document.getElementById("new_password")?.focus();
            setInputValidation((prevState) => ({
                ...prevState,
                new_password: "Please enter the new password.",
            }));
            errorHandle = true;
        }
        if (!resetData?.confirm_new_password) {
            document.getElementById("confirm_new_password")?.focus();
            setInputValidation((prevState) => ({
                ...prevState,
                confirm_new_password: "Please enter the confirm new password.",
            }));
            errorHandle = true;
        } else if (
            !(setsignifier(true)?.resetData?.password === resetData?.confirm_new_password)
           
        ) {
            document.getElementById("confirm_new_password")?.focus();
            setInputValidation((prevState) => ({
                ...prevState,
                confirm_new_password: "Password and confirm password does not match",
            }));
            errorHandle = true;
        }
    }
    const handleSwitchCase = (value) => {
        switch (resetData) {
            case "new_password":
                if (!value) {
                    setInputValidation((prevState) => ({
                        ...prevState,
                        new_password: "Please enter your new password",
                    }));
                }
                // } else if (!isPasswordValid(value)) {
                //     setInputValidation((prevState) => ({
                //         ...prevState,
                //         new_password:
                //             "Minimum 8 characters and 1 Alphabet, 1 Number & 1 Special Character.",
                //     }));
                // }
                break;
            case "new_confrim_password":
                if (!value) {
                    setInputValidation((prevState) => ({
                        ...prevState,
                        new_confrim_password: "Please enter confirm new password",
                    }));
                }
                // } else if (!(resetData?.new_password === resetData?.confirm_new_password)) {
                //     setInputValidation((prevState) => ({
                //         ...prevState,
                //         confirm_new_password: "Password and confirm new password does not match",
                //     }));
                // }
                break;
            default:
                break;
        }
    }
    return (

        <div className='reset_password_main'>
            {first &&
                <div className='reset_pwd_section'>
                    <div className='reset_pwd_header'>
                        <Clear className="clear_btn" />
                        <p className='reset_heading'>Reset Password</p>
                    </div>
                    <div className='reset_left_section'>
                       {/* <form onSubmit={handleClickValidation}>  */}
                        <div className='reset_credetial'>
                            <p className='reset_pwd_heading'>Reset Your Password</p>
                            <div>
                                <TextField
                                    id="new_password"
                                    name="new_password"
                                    label="New Password"
                                    fullWidth
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="New Password"
                                    value={resetData?.new_password}
                                    onChange={handleChangeInput}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                                <InputLabel className="validation_error">
                                    {inputValidation?.new_password}
                                </InputLabel>
                            </div>
                            <div>
                                <div className='reset_signifire'>
                                    <TextField
                                        id="confirm_new_password"
                                        name="confirm_new_password"
                                        label="Confirm New Password"
                                        fullWidth
                                        type="password"
                                        placeholder="Confirm New Password"
                                        value={resetData?.confirm_new_password}
                                        onChange={handleChangeInput}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        className="validation_error"
                                    />
                                    {signifier && 
                                    <img src={info} alt="" className='signifier'/>
                                    }
                                </div>
                                <InputLabel className="validation_error">
                                    {inputValidation?.confirm_new_password}
                                    {/* <img src={info} alt=""></img> */}
                                </InputLabel>
                            </div>

                            <Box className='reset_box'>
                                <Button
                                    onClick={() => thankyou() 
                                    }
                                    className="reset_button"
                                    type="submit"
                                >
                                    Change My Password
                                </Button>
                            </Box>
                        </div>
                         {/* </form>    */}
                        <div className='reset_image_section'>
                            {/* <img src={reset} alt="" className='reset_image'></img> */}
                        </div>
                    </div>
                
                </div>
            }
            {gratitude && <Gratitude />}
        </div>


    )
}
export default Index;
