import React ,{useState} from 'react'

import Grtitude from '../../../Assets/Productlist/gratitude_icon.png'
import BuyerKYC from '../BuyerKYC/BuyerKYC'
import '../Gratitude/Gratitude.css'

export const BuyerGratitude = () => {
    const [isBuyerKYC, setisBuyerKYC] = useState(false)
    const buyerKYC = () =>{
        setisBuyerKYC(!isBuyerKYC)
    
    }
    return (
        <div className='Gratitude'>
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
            <p className='Gratitude_request_tag'>You have submitted the Registration form successfully.<br></br>
            Kindly login into your account to complete the KYC.
            </p>
            </div>
             <div className='Gratitude_kyc_signin'>
                 
                <button onClick={buyerKYC} className='Gratitude_kyc_signin_btn' type="button">Sign In</button>
                </div> 
                {isBuyerKYC && <BuyerKYC isBuyerKYC={setisBuyerKYC}/>}
            
            <div className='Gratitude_to_homepage' >
                <u><p className='Gratitude_to_homepage_tag'>Back to Homepage</p></u>
            </div>
            
           
        </div>
        
    </div>
    )
}
