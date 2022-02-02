import React from 'react'
import './SignIn.css'
import useForm from '../Register/useForm'
import Validate from '../Register/Validate'


export const SignIn = ({isSignin}) => {
    const { handleChange, values, handleSubmit, errors,Signin } = useForm(Validate)
    return (
        <div className='SignIn'>
            <div className='SignIn_popup_header'>
                <div className='SignIn_popup_close_block'>
                    <p   onClick={()=>isSignin(false)} className='SignIn_popup_close'>X</p>
                </div>
                <div className='Signin_welcome'>
                  <h3 className='SignIn_popup_header_tag' >Welcome !</h3>
                </div>
            </div>
            <div className='SignIn_popup_body'>
                <div className='SignIn_popup_body_sign'>
                    <div className='Signin_section'>
                        <p className='SignIn_Note'>Texub doesn't sell or ship to consumers.</p>
                        <p className='SignIn_Note_keep_connect '>To keep conected please login here</p>
                        <h3 className='SignIn_Note_sign_heading'>Sign-In</h3>
                        <div className='Sign_here'>
                            <form>
                                <div className='SignIn_form_block'>
                                    <div className='Signin_inputfield'>
                                        <lebel className="Signin_label">E-Mail Address</lebel>
                                        <input type="email" className='Signin_page_fields_input'
                                            name='email'
                                            value={values.EmailAddress}
                                            onChange={handleChange}
                                            placeholder='E-Mail Address' required />
                                        {errors.EmailAddress && <p>{errors.EmailAddress}</p>}<br></br>
                                    </div>
                                    <div className='Signin_inputfield'>
                                        <lebel className="Signin_label">Password</lebel>
                                        <input type="password" className='Signin_page_fields_input'
                                            name='Password'
                                            value={values.Password}
                                            onChange={handleChange}
                                            placeholder='Password' required />
                                        {errors.Password && <p>{errors.Password}</p>}<br></br>
                                    </div>
                                    <div className='Signin_checkbox'>
                                        <input type="checkbox" className='Signin_Check_box'></input>
                                        <span className='Checkmark'></span>
                                        <p className='Signin_checkbox_tag'>Keep me  signed in</p>
                                    </div>
                                    <div className='Signin_btn'>
                                        <button className='Signin_button'>Sign In</button>
                                    </div>
                                    <di className="Signin_forgot">
                                        
                                       <u> <p className='Signin_forgot_password'>Forgot Password ?</p></u>
                                    
                                    </di>
                                </div>


                            </form>
                        </div>
                    </div>

                </div>
                <div className='SignIn_popup_Guest'>
                    <div className='Guest_signin'>
                        <p className='SignIn_popup_Guest_note'>Get started here by entering the personal detail and <br></br>
                            get access as a guest
                        </p>
                    </div>
                    <div className='Guest_access'>
                        <h3 className='Guest_access_heading'>Guest Access</h3>
                    </div>
                    <div className='SignIn_Guest_block'>
                    <div className='Register_inputfield'>
                            <lebel className="Guest_label">First Name</lebel>
                            <input type="text" 
                             className='Guest_page_fields_input'
                             name='Firstname'
                             value={values.Firstname}
                             onChange={handleChange}
                             placeholder='First Name' required />
                             {errors.Firstname && <p>{errors.Firstname}</p>}<br></br>
                        </div>
                        <div className='Register_inputfield'>
                            <lebel className="Guest_label">E-Mail Address</lebel>
                            <input type="email" className='Guest_page_fields_input'
                                name='email'
                                value={values.EmailAddress}
                                onChange={handleChange}
                                placeholder='E-Mail Address' required />
                            {errors.EmailAddress && <p>{errors.EmailAddress}</p>}<br></br>
                        </div>
                        <div className='Register_inputfield'>
                            <lebel className="Guest_label">Password</lebel>
                            <input type="password" className='Guest_page_fields_input'
                                name='Password'
                                value={values.Password}
                                onChange={handleChange}
                                placeholder='Password' required />
                            {errors.Password && <p>{errors.Password}</p>}<br></br>
                        </div>
                        <div className='Register_inputfield'>
                            <lebel className="Guest_label">Confirm Password</lebel>
                            <input type="password" className='Guest_page_fields_input'
                             name='confirmpassword'
                             value={values.confirmpassword}
                              onChange={handleChange}
                            placeholder='Confirm Password' required />
                            {errors.confirmpassword && <p>{errors.confirmpassword}</p>}<br></br>
                        </div>
                        <div className='Guest_checkbox'>
                                        <input type="checkbox" className='Guest_Check_box'></input>
                                        <p className='Guest_checkbox_tag'>I confirm that i am a holesale buyer,<br></br> and 
                                         not a consumer or end user
                                        </p>
                        </div>
                        <div className='Guest_register_btn'>
                            <button className='Guest_register_button'>Register as Guest</button>
                        </div>



                    </div>

                </div>
            </div>
        </div>
    )
}
