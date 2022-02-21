import React from 'react'
import bgimage from '../../../../Assets/Career/Rectangle 1277.svg'
import icon from '../../../../Assets/Career/Group 930.png'
import close from '../../../../Assets/Career/Group 55.svg'
import './styles.scss'

const index = ({closePOPup}) => {
    // const Cookies = [
    //     {
    //         id: 1,
    //         bgimage:bgimage,
    //         icon:icon,
    //         description: "We use cookies to make your experience better on this website",
    //         policies:"Cookies policies",
    //         accept:"Accept Cookies",
    //     }
    // ]
  return (
    <div className='cookies_main'>
        <div  className='cookies_bgimage_section' >
        <img src={bgimage} alt='/' className='cookies_bgimage'/>   
        <img src={icon} alt='/' className='cookies_icon'/> 
        <img src={close} alt='/' className='cookies_close' onClick={()=> closePOPup(false)}/>
        <p className='cookies_description'>We use cookies to make your experience better on this website</p>
        <p className='cookies_policies'><a href="/">Cookies Policies</a></p>
        <button className='cookies_btn'>Accept Cookies</button>
        </div>
      {/* <div className='cookies_bgimage_section'> 
      {Cookies.map((item) =>
         <li key={item.id}  className="cookies_list">
            <img src={item.bgimage} alt='/' className='cookies_bgimage'/>         </li>
       )}
      </div>  
      <div className='cookies_icon_section'>
       {Cookies.map((item) =>
         <li key={item.id} >
            <img src={item.icon} alt='/' className="cookies_icon"/>         </li>
       )}   
      </div>
      <div className='cookies_description_section'>
      {Cookies.map((item) =>
         <li key={item.id}  className="cookies_list">
            {item.description}       </li>
       )}
      </div>
      <div className='cookies_policies_section' >
      {Cookies.map((item) =>
         <li key={item.id} className="cookies_list" >
            {item.policies}       </li>
       )}
      </div>
      <div className='cookies_btn_section'>
      {Cookies.map((item) =>
         <li key={item.id} className="cookies_list" >
            {item.accept}       </li>
       )}
      </div> */}
    </div>
  )
}

export default index;
