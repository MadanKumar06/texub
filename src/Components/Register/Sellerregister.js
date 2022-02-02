import React,{useState} from 'react'
import './Register.css'
import Seller from '../../Assets/Productlist/Seller_icon.png'
import Buyer from '../../Assets/Productlist/buyer.png'
import useForm from './useForm'
import Validate from './Validate'
// import Recaptcha from 'react-recaptcha'
import {Buyerregister}  from '../Register/Buyerregister'
// import { Gratitude } from './Gratitude/Gratitude'
import { Link } from 'react-router-dom'
// import './Register.css'
import './SellerRegister_Media.css'


export const Register = () => {
     const {handleChange, values, handleSubmit, errors } = useForm(Validate)
    const [isbuyerClick, setisbuyerClick] = useState(false)
    const BuyerClick =()=>{
        setisbuyerClick(true)
        setisSeller(false)
    }
    const [isSeller, setisSeller] = useState(true)
    const SellerClick=()=>{
        setisSeller(true)
        setisbuyerClick(false)
    }
    const [isThank, setisThank] = useState(true)
    const KYC = () => {
        setisThank(!isThank)
    }
    // const [sellerClick, setsellerClick] = useState(true)
    
    // const [Form, setForm] = useState(false)
    // const RegisterData=[
    //     {
    //         id:1,
    //         Firstname:'',
    //         Lastname:'',
    //         EmailAddress:'',
    //         Mobilenumber:'',
    //         Password:'',
    //         confirmpassword:'',
    //         Companyname:'',
    //         Designation:'',
    //         Role:'',
    //         Country:'',
    //         Region:'',
    //     }
    // ]
    // const {   Firstname, 
    //           Lastname,
    //           EmailAddress,
    //           Mobilenumber,
    //           Password,
    //           confirmpassword,
    //           Companyname,
    //           Designation,
    //           Role,
    //           Country,
    //           Region
    //           }= Form;
    return (
        <div className='Register_page'>
            <div className='Register_head'>
                
                <div className="user">
                    <div>
                        <h3 className='User_account'>Create An Account</h3>
                    </div>
                    <div className='SIGN_in_optiopn'>
                      <p className="user_p">Already an user?</p>
                      <u><h4 className="user_s">Sign In</h4></u>
                    </div>
                </div>
                <div className='Buyer_Seller_register'> 
                <h3 className='Buyer_Seller_select'>Select User type</h3>

                 
                  <div className='Buyer_register'>
                    <p className='Buyer_register_tag' onClick={BuyerClick}
                        >Buyer</p>
                    <img className="Buyer_img" src={Buyer} alt="" />
                           
                  </div>
                 
                   <div className='Seller_register'>
                    <p className='Seller_register_tag'
                     onClick={SellerClick}>Seller</p>
                    <img className="" src={Seller} 
                   
                    alt="" />
                  </div>
                </div>
                
            </div>
            {isbuyerClick && <Buyerregister/>}
             {isSeller && 
                <div className='Register_form'>
                    <form action=''     className='Form' onSubmit={handleSubmit}>
                    <div className='Register_page_fields'>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label">First Name</lebel>
                            <input type="text" 
                             className='Register_page_fields_input'
                             name='Firstname'
                             value={values.Firstname}
                             onChange={handleChange}
                             placeholder='First Name'  />
                              {errors.Firstname && <p>{errors.Firstname}</p>}<br></br> 
                        </div>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label">E-Mail Address</lebel>
                            <input type="email" className='Register_page_fields_input'
                              name='email'
                              value={values.EmailAddress}
                              onChange={handleChange}
                             placeholder='E-Mail Address'  />
                             {errors.EmailAddress && <p>{errors.EmailAddress}</p>}<br></br>
                        </div>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label">Password</lebel>
                            <input type="password" className='Register_page_fields_input'
                              name='Password'
                              value={values.Password}
                              onChange={handleChange}
                            placeholder='Password' />
                            {errors.Password && <p>{errors.Password}</p>}<br></br>
                        </div>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label">Company Name</lebel>
                            <input type="text" className='Register_page_fields_input'
                              name='Companyname'
                              value={values.Companyname}
                              onChange={handleChange}
                            placeholder='Company Name'  />
                             {errors.Companyname && <p>{errors.Companyname}</p>}<br></br>
                        </div>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label">Role</lebel>
                            <input type="text" className='Register_page_fields_input'
                             name='Role'
                             value={values.Role}
                              onChange={handleChange}
                            placeholder='Role'  />
                            <i class="fa fa-angle-down Seller_Angle_down"></i>
                            {errors.Role && <p>{errors.Role}</p>}<br></br>
                        </div>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label">Region</lebel>
                            <input type="text" className='Register_page_fields_input' 
                             name='Region'
                             value={values.Region}
                              onChange={handleChange}
                            placeholder='Region'  />
                            <i class="fa fa-angle-down Seller_Angle_down"></i>
                            {errors.Region && <p>{errors.Region}</p>}<br></br>
                        </div>
                        <div className='Register_checkbox'>
                            <input type="checkbox" className='Seller_Register_Check_box'></input>
                            <p className='Register_checkbox_tag'>RememberMe</p>
                        </div>
                    </div>
                    
                    <div className='Register_page_fields'>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label_2">Last Name</lebel>
                            <input type="text" className='Register_page_fields_input'
                            name='Lastname'
                            value={values.Lastname}
                              onChange={handleChange}
                            placeholder='Last Name'  />
                            {errors.Lastname && <p>{errors.Lastname}</p>}<br></br>
                        </div>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label_2">Mobile Number</lebel>
                            <input type="text" className='Register_page_fields_input'
                              name='Mobilenumber'
                              value={values.Mobilenumber}
                              onChange={handleChange}
                            placeholder='Mobile Number'  />
                            {errors.Mobilenumber && <p>{errors.Mobilenumber}</p>}<br></br>
                        </div>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label_2">Confirm Password</lebel>
                            <input type="password" className='Register_page_fields_input'
                             name='confirmpassword'
                             value={values.confirmpassword}
                              onChange={handleChange}
                            placeholder='Confirm Password'  />
                            {errors.confirmpassword && <p>{errors.confirmpassword}</p>}<br></br>
                        </div>
                        <div className='Register_inputfield'>
                            <lebel className="Register_label_2">Designation</lebel>
                            <input type="text" className='Register_page_fields_input'
                             name='Designation'
                             value={values.Designation}
                              onChange={handleChange}
                             placeholder='Designation'  />
                             {errors.Designation && <p>{errors.Designation}</p>}<br></br>
                        </div >
                        <div className='Register_inputfield'>
                            <lebel className="Register_label_2">Country</lebel>
                            <input type="text" className='Register_page_fields_input'
                             name='Country'
                             value={values.Country}
                              onChange={handleChange}
                            placeholder='Country'  />
                            <i class="fa fa-angle-down Seller_Angle_down"></i>
                            {errors.Country && <p>{errors.Country}</p>}<br></br>
                            
                        </div>
                        <div class="recaptcha" data-sitekey="6LcBdPAdAAAAAOiu90VtnTtVG9VHQJjuRkRWsVH1"></div>
                        <div className='Register_inputfield'>
                            <Link to='/Gratitude'>
                            <button type="submit"   onClick={KYC} className='Seller_Register_btn' >Register</button>
                            </Link>
                            {/* {isKYC && <Gratitude/>} */}
                        </div>
                    </div>
                    </form>
                    
                </div>
}
            
            {/* <form action=''>
                <input type="text" name="Firstname" value={Firstname}/><br/>
                <input type="text" name="Lastname" value={Lastname}/><br/>
                <input type="email" name="EmailAddress" value={EmailAddress}/><br/>
                <input type="number" name="Mobilenumber" value={Mobilenumber}/><br/>
                <input type="text" name="Password" value={Password}/><br/>
                <input type="text" name="confirmpassword" value={confirmpassword}/><br/>
                <input type="text" name="Companyname" value={Companyname}/><br/>
                <input type="text" name="Designation" value={Designation}/><br/>
                <input type="text" name="Role" value={Role}/><br/>
                <input type="text" name="Country" value={Country}/><br/>
                <input type="text" name="Region" value={Region}/><br/>
                <input type="submit" name="submit">Register</input>
            </form>  */}
        </div>
    )
}
export default Register;