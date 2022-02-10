// import { Sell } from '@material-ui/icons';
import React from 'react';
import Sellera from '../../../Assets/Selleradvantage/Group 929.png'
import './Selleradvantage.scss'

export const Selleradvantage = () => {
  return (
  <div className='Selleradvantage_main'>
     
      
      <div className='Selleradvantage_img_section'>
      <div className='Selleradvantage_business_section'>
        <h4 className='Selleradvantage_business_Heading'>Enhance Bussiness</h4>
        <p className='Selleradvantage_business_tag'>Grow your Revenues & Customer Base</p>
      </div>
      <div className='Selleradvantage_clock_section'>
        <h4 className='Selleradvantage_clock_Heading'>Round The Clock</h4>
        <p className='Selleradvantage_clock_Tag'>24*7,365 Days Engagement</p>
      </div>
        <h3 className='Selleradvantage_Heading'>Seller <br></br>
         Advantages
        </h3>
        <img src={Sellera} alt="" className='Selleradvantage_img' /> 
        <div className='Selleradvantage_network_section'>
        <h4 className='Selleradvantage_network_Heading'>Global Network</h4>
        <p className='Selleradvantage_network_tag'>Trade Beyond Boundaries</p>
      </div>
      <div className='Selleradvantage_Buyer_section'>
        <h4 className='Selleradvantage_Buyer_Heading'>Verified Buyers</h4>
        <p className='Selleradvantage_Buyer_tag'>Robust Onboarding Process</p>
      </div>
      </div>
      
      
  </div>
  )
};
export default Selleradvantage;
