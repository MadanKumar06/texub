import React from 'react'
import useForm from './useForm'
import Validate from './Validate'
import './Register.css'
import './Buyerregister.css'
import './BuyerRegister_Media.css'
import './SellerRegister_Media.css'
import { Link } from 'react-router-dom'
// import Sellerregister from './Sellerregister'

export const Buyerregister = () => {
    const {handleChange, values, handleSubmit, errors} = useForm(Validate)
    return (
        // {isbuyer &&
             <div className='Buyer_Register_form'>
                    <form action='' className='Form' onSubmit={handleSubmit}>
                    <div className='Register_page_fields'>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label_1st">First Name</lebel>
                            <input type="text" 
                             className='Register_page_fields_input'
                             name='Firstname'
                             value={values.Firstname}
                             onChange={handleChange}
                             placeholder='First Name' required />
                             {errors.Firstname && <p>{errors.Firstname}</p>}<br></br>
                        </div>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label_1st">E-Mail Address</lebel>
                            <input type="email"
                             className='Register_page_fields_input'
                              name='email'
                              value={values.EmailAddress}
                              onChange={handleChange}
                             placeholder='E-Mail Address' required />
                             {errors.EmailAddress && <p>{errors.EmailAddress}</p>}<br></br>
                        </div>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label_1st">Password</lebel>
                            <input type="password" 
                            className='Register_page_fields_input'
                              name='Password'
                              value={values.Password}
                              onChange={handleChange}
                            placeholder='Password' required />
                            {errors.Password && <p>{errors.Password}</p>}<br></br>
                        </div>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label_1st">Company Name</lebel>
                            <input type="text" 
                          className='Register_page_fields_input'
                              name='Companyname'
                              value={values.Companyname}
                              onChange={handleChange}
                            placeholder='Company Name' required />
                             {errors.Companyname && <p>{errors.Companyname}</p>}<br></br>
                        </div>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label_1st">Country</lebel>
                            <input type="text" 
                            className='Register_page_fields_input'
                             name='Country'
                             value={values.Country}
                              onChange={handleChange}
                            placeholder='Country' required />
                            <i class="fa fa-angle-down Angle_down"></i>
                            {errors.Country && <p>{errors.Country}</p>}<br></br>
                            
                        </div>
                        {/* <div className='Register_inputfield'>
                            <lebel className="Register_label_role">Role</lebel>
                            <input type="text" className='Register_page_fields_input'
                             name='Role'
                             value={values.Role}
                              onChange={handleChange}
                            placeholder='Role' required />
                            {errors.Role && <p>{errors.Role}</p>}<br></br>
                        </div> */}
                        {/* <div className='Register_inputfield'>
                            <lebel className="Register_label_region">Region</lebel>
                            <input type="text" className='Register_page_fields_input' 
                             name='Region'
                             value={values.Region}
                              onChange={handleChange}
                            placeholder='Region' required />
                            {errors.Region && <p>{errors.Region}</p>}<br></br>
                        </div> */}
                        <div className='Register_checkbox'>
                            <input type="checkbox" className='Seller_Register_Check_box'></input>
                            <p className='Register_checkbox_tag'>RememberMe</p>
                        </div>
                    </div>
                    
                    <div className='Register_page_fields'>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label_2nd">Last Name</lebel>
                            <input type="text" 
                            className='Register_page_fields_input'
                            name='Lastname'
                            value={values.Lastname}
                              onChange={handleChange}
                            placeholder='Last Name' required />
                            {errors.Lastname && <p>{errors.Lastname}</p>}<br></br>
                        </div>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label_2nd">Mobile Number</lebel>
                            <input type="text" 
                           className='Register_page_fields_input'
                              name='Mobilenumber'
                              value={values.Mobilenumber}
                              onChange={handleChange}
                            placeholder='Mobile Number' required />
                            {errors.Mobilenumber && <p>{errors.Mobilenumber}</p>}<br></br>
                        </div>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label_2nd">Confirm Password</lebel>
                            <input type="password" 
                            className='Register_page_fields_input'
                             name='confirmpassword'
                             value={values.confirmpassword}
                              onChange={handleChange}
                            placeholder='Confirm Password' required />
                            {errors.confirmpassword && <p>{errors.confirmpassword}</p>}<br></br>
                        </div>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label_2nd">Designation</lebel>
                            <input type="text" 
                           className='Register_page_fields_input'
                             name='Designation'
                             value={values.Designation}
                              onChange={handleChange}
                             placeholder='Designation' required />
                             {errors.Designation && <p>{errors.Designation}</p>}<br></br>
                        </div >
                        
                        <div class="g-recaptcha" data-sitekey="6LduIeYdAAAAAAHQZ4LH0eKFLK6IYlU896APwTXU"></div> 
                        <div className='Register_inputfield'>
                            <Link to='/BuyerGratitude'> 
                            <button type="submit" className='Buyer_Register_btn' >Register</button><br></br>
                            </Link> 
                        </div>
                    </div>
                    </form>
                </div>
                    // }
        
        
    )
}
export default Buyerregister;
