import React, { useState } from 'react'
import './Heder.css'
import './Header_Media.css'
import { Link } from 'react-router-dom'
import { SignIn } from '../SignIn/SignIn'
import INR from '../../Assets/Homepage Assets/Flag-India.png'
import AED from '../../Assets/Homepage Assets/Dubai_Flag.png'
import USD from '../../Assets/Homepage Assets/USD_flag.png'
// import Register from '../Register/Sellerregister'




export const Header = () => {
  const [isSignin, setisSignin] = useState(false)
  const Signin = () => {
    setisSignin(!isSignin)
  }
  const [isCurrency, setisCurrency] = useState(false)
  const Currency = () => {
    setisCurrency(!isCurrency)
  }

   const [selectedOption, setSelectedOption] = useState(null);
   const onOptionClicked = (id) => {
    setSelectedOption(id);
    
    
   };
  // const [isSelectCountry,setisSelectCountry]=useState(false)
  // const SelectCountry=() =>{
  //   setisSelectCountry(!isSelectCountry)
  // }
  
  const Currencyjs=[
    {
      id:1,
       image:INR,
      
      display:'INR'
    },
    {
      id:2,
      image:AED,
      
      display:'AED'
    },
    {
      id:3,
      image:USD,
      display:'USD'
    },

  ]

  // const [POP_up, setPOP_up] = useState(false)
  // const Toggle = () => {
  //   setPOP_up(!POP_up)
  // }
  // const [Currency, setCurrency] = useState(false)

  // const [Clickregister,setClickregister] = useState(false)
  //const Toggle  = () => {
  //setClickregister(!Clickregister)
  //}
  // const Country =[
  //   {
  //     id:1,
  //     Icon:INR,
  //     Value:"INR"
  //   }
  // ]
  const handleItemClick = (id) => {
    selectedOption === id ? setSelectedOption(null) : setSelectedOption(id);
    setisCurrency(false);
  }

  return (

    <div className='Header'>
      <div className='Header_1st_bar'>
        <ul className = 'Header_1st_bar_list'>
          <Link to='/aboutus' className='Header__list'>
            <li>About Us</li> </Link>
          <Link to='/Products' className='Header__list'>
            <li >Products<sup className='Products_Super'>New</sup></li>
          </Link>
          <Link to='/Sellontexhub' className='Header__list' >
            <li>Sell On TEXUB</li>
          </Link>
          <Link to='/Buyontexhub' className='Header__list'>
            <li>Buy On TEXUB</li>
          </Link>
          <Link to='/Contactus' className='Header__Contactus'>
            <li >Contact Us</li>
          </Link>

        </ul>
        <div className='Header_buttons'>

          <Link to='/register'>
            <button className='Header_Register_btn' type="button"> Register</button>
          </Link>
          {/* <Link>   */}
          <button onClick={Signin} className='Header_Signin_btn' type="button">Sign In</button>
          {isSignin && (<SignIn isSignin={setisSignin} />)}
          {/* </Link>  */}

        </div>
        
        <div className='Header_Currency_dropdown_style'>
          {/* <div className="Currency_Select"   > */}
             <p className='Currency_Select_tag'
             onClick={Currency}>
             {selectedOption ?<div className='Currency_Check'>{ <img src={ Currencyjs.find(id => id.display === selectedOption).image}
              alt="" className='Currency_img' ></img> } { Currencyjs.find(id => id.display === selectedOption).display} </div> : "Select Currency" }
             
            </p> 
            </div>
             
             {isCurrency &&
                <ul className='Currency_Dropdown'>
                        {Currencyjs.map(((id) => (       
                         <li  key={id.id} className='Currency_Dropdown_Content'
                         onClick={e => handleItemClick(e.target.id)} id={id.display}>
                         <img src={id.image} alt="" className='Currency_img' ></img>{id.display}  
                          </li>
                       
                           
                         )))}
                 </ul>
}
          
             
            {/* <p>Sellect Currency</p> */}
            {/* <select type='button'
          onMouseOver={(e)=>setCurrency(!Currency)}
          >
               </select> */}
            {/* <ul>
               {Country.map(((item) => (
                 <li href="/">{item.Icon} {item.Value}</li>
               )))}
               </ul> */}
            {/* {Currency && */}
            {/* <div className='Currency_dropdown'> */}
            {/* <div className="Currency_Select_india">
              <img className="Currency_Select_india_icon" src={INR} alt="" />
              <p className='Currency_Select_india_icon_tag'>INR</p>
            </div>
            <div className="Currency_Select_india">
                <img className="Currency_Select_india_icon" src={AED} alt="" />
                <p className='Currency_Select_india_icon_tag'>AED</p>
              </div>
              <div className="Currency_Select_india">
                <img className="Currency_Select_india_icon" src={USD} alt="" />
                <p className='Currency_Select_india_icon_tag'>USD</p>
              </div>
              </div>
           }  */}



            {/* <form action='' className='Currency_Dropdown'>  */}
            {/* <img className="Currency_select_inr" src={INR}alt="" /> */}
            {/* <select  className='Country_select'> */}
          
          {/* {isCurrency &&
          
            <div className='Country_select'>
              <form className='Country_select_form'>
              {isINR ||
                <div className='INR_Currency'>
                  <img className="Currency_select_inr" src={INR} alt="" />
                  <p value="India"
                    onClick={INRselect}
                    className="Country_options">
                    INR</p>
                </div>
              }
              
              {isAED ||
                <div className='INR_Currency'>
                  <img className="Currency_select_inr" src={AED} alt="" />
                  <p value="Dubai"
                    onClick={AEDselect}
                    className="Country_options">AED</p>
                </div>
              }
              {isUSD ||
                <div className='INR_Currency'>
                  <img className="Currency_select_inr" src={USD} alt="" />
                  <p value="America"
                    onClick={USDselect}
                    className="Country_options">USD</p>
                </div>
              }
              
              </form>
            </div>
            
          } */}
          {/* </form>   */}
          {/* <button onClick={Toggle}
            className='Country_Option'>Select Country</button>


          {POP_up && (
           
            <div className='POP_up'>
              <div className='POP_up_Overlay'>
                <div  onClick={Toggle}className="POP_up_Overlay_content">
                <div className='POP_up_closing'>
                  <button onClick={Toggle}
                    className='close_btn'>X</button>
                  </div>
                <div className='POP_up_Country_select' >
                  
                  
                  <h5 className='POP_up_Country_select_Heading' >Select your Country</h5>
                </div>
                <div className="POP_up_Currency_INR">
                  <div className='POP_up_Flags'>
                    <img src={USD} alt="" className='POP_up_INR_icon' />

                  </div>
                  <div className='POP_up_Flags'>
                    <img src={INR} alt="" className='POP_up_INR_icon' />
                    <h4 className='Select_Country'>India</h4>
                  </div>
                  <div className='POP_up_Flags'>
                    <img src={AED} alt="" className='POP_up_INR_icon' />

                  </div>
                </div>

                <div className='Horizental_line'>
                  <hr className="Currency_hr_styel"></hr>
                </div>
                <div className='language_select_heading'>
                  <h6 className='Language_selection'>Select Language</h6>
                </div>
                <div className='Select_language'>
                  <input type="radio" value="English" defaultChecked></input>English
                </div>
                <div className='Select_language_Button'>
                  <button type='button' className='Save_Button'>Save</button>
                </div>
                </div>
              </div>
            </div>
            
          
          )} */}




          {/* </div> */}


        </div>

      </div>
    // </div>

  )
}
