import React from 'react'
import '../Gratitude/Gratitude.css'
import './AfterGratitude.css'
import './SellerGratitude_Media.css'
import Grtitude from '../../../Assets/Productlist/gratitude_icon.png'

export const AfterGratitude = () => {
    return (
        
              <div className='AfterGratitude'>
               <div className='Gratitude_block'>
                <div className='Gratitude_block_icon'>
                    <img src={Grtitude} alt=""></img>
                </div>
                <div className='Gratitude_thank_you'>
                <h1 className='Gratitude_thank_you_tag'>Thank You !</h1>
                </div>
                <div className='Gratitude_dear'>
                <h2 className='Gratitude_dear_tag'>Dear Nikhil</h2>
                </div>
                <div className='Gratitude_request'> 
                <p className='AfterGratitude_request_tag'>You have submitted the KYCform  successfully.<br></br>
                and Our team will get back to you after Verification.<br></br>
                once your account has been approved, you will receive a mail notification 
                </p>
                </div>
                 
                <div className='Gratitude_to_homepage' >
                    <u><p className='Gratitude_to_homepage_tag'>Back to Homepage</p></u>
                </div>
                
               
            </div>
            
        </div>
        
    )
}
