import React from 'react'
import './Auctions.css'
import './Auctions_Media.css'
import Collect21 from '../../Assets/Homepage Assets/Group 706.png'
import Collect22 from '../../Assets/Homepage Assets/Group 75.png'

export const Auctions = () => {
    return (
        
             <div className="Auctions">
                <div className="Auctions_div1">
                  <img className="Auctions_div1_img" src={Collect21} alt="" />
                  <h3 className="View_collection">VIEW COLLECTION</h3>
                </div>
                <div className="Auctions_div2">
                    <img src={Collect22} alt="" className="Auctions_div2_img" />
                    <h3 className="Auctions_div2_img_heading"> Auctions</h3>
                    <p className="Auctions_div2_img_heading_tag"> Lorem Ipsum is simply dummy text of the printing and <br></br>
                        typesetting industry. Lorem Ipsum has been the industry's standards text.</p>
                    <button className="Auctions_View_btn">View</button>
                </div>
             </div>
        
    )
}
