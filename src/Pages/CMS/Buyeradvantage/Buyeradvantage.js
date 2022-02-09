import React from 'react';
import Buyer from '../../../Assets/Buyeradvantage/Group 928.png'
import './Buyeradvantage.scss'

export const Buyeradvantage = () => {
  return( 
  <div className='buyeradvantage_main'>
      <div className='Buyeradvantage_img_section'>
      <di className='Buyeradvantage_tailor_section'>
        <h4 className='Buyeradvantage_tailor_Heading'>Tailor Made</h4>
        <p className='Buyeradvantage_tailor_tag'>Tell Supplier What You Need</p>
      </di>
      <div className='Buyeradvantage_secure_section'>
        <h4 className='Buyeradvantage_secure_Heading'>Secure & Easy</h4>
        <p className='Buyeradvantage_secure_Tag'>Easy Trading On Secured E-Commerce Portal</p>
      </div>
        <h3 className='Buyeradvantage_Heading'>Buyer <br></br>
         Advantages
        </h3>
        <img src={Buyer} alt="" className='Buyeradvantage_img' /> 
        <div className='Buyeradvantage_confidence_section'>
        <h4 className='Buyeradvantage_confidence_Heading'>Confidence</h4>
        <p className='Buyeradvantage_confidence_tag'>Trade With Confidence</p>
      </div>
      <div className='Buyeradvantage_Seller_section'>
        <h4 className='Buyeradvantage_Seller_Heading'>Verified Sellers</h4>
        <p className='Buyeradvantage_Seller_tag'>Robust Onboarding Process</p>
      </div>
      </div>
  </div>
    )
};
