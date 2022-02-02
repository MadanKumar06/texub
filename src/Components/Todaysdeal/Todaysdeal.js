import React from 'react'
import './Todaysdeal.css'
import './Todaydeal_media.css'
import Collect11 from '../../Assets/Homepage Assets/Group 71.png'
import Collect12 from '../../Assets/Homepage Assets/Group 72.png'

export const Todaysdeal = () => {
    return (
        // <div className='Todaysdeal'>
            <div className="Todaysdeal_Collections">
                <div className="Todaysdeal_Collections1_1st_div">
                  <img className="Todaysdeal_Collections1_1st_img" src={Collect11} alt="" />
                  <h3 className="Todaysdeal_View_collection">VIEW COLLECTION</h3>
                </div>

                <div className="Todaysdeal_Collections1_2nd_div">
                    <img src={Collect12} alt="" className="Todaysdeal_Collections1_2nd_img" />
                    <h3 className="Todaysdeal_Heading"> Today's Deal</h3>
                    <p className="Todaysdeal_Heading_paragraph"> Lorem Ipsum is simply dummy text of the printing and <br></br>
                        typesetting industry. Lorem Ipsum has been the industry's standards text.</p>
                    <button className="Todaysdeal_View_btn">View</button>
                </div>
            </div>
        // </div>
    )
}
