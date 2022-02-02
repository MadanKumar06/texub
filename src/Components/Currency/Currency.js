import React from 'react'
import INR from '../../Assets/Homepage Assets/Flag-India.png'
import AED from '../../Assets/Homepage Assets/Dubai_Flag.png'
import USD from '../../Assets/Homepage Assets/USD_flag.png'
import './Currency.css'

export const Currency = ({isShowCurrency}) => {
    return (
        <div className={'${!isShowCurrency ? "active" : ""} "POP_up"'}>
            <div className='POP_up_Country_select' >
                <h5 className='POP_up_Country_select_Heading' >Select your Country</h5>
            </div>
            <div className="POP_up_Currency_INR">
                <div className='POP_up_Flags'>
                    <img src={USD} alt="" className='POP_up_INR_icon' />
                    {/* <h4>Dubai</h4> */}
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
                <input type="radio" value="English"></input>English
            </div>
            <div className='Select_language_Button'>
                <button type='button' className='Save_Button'>Save</button>
            </div>
        </div>


    )
}
export default Currency;
