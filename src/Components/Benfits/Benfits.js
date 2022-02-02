import React from 'react'
import Learn from '../../Assets/Homepage Assets/Group 73.png'
import './Benfits.css'
import './Benfits_Media.css'

export const Benfits = () => {
    return (

             <div className="Benfits">
                <div className='Benfits_1st_div'>
                    <h1 className="Benfits_Get">Get </h1>
                    <h1 className="Benfits_Get">Benefits& </h1>
                    <h1 className="Benfits_Get">Advantages</h1>
                    <p className="Benfits_Get_Tag">Lorem Ipsum is simply dummy text of the printing and <br></br>
                        typesetting industry. Lorem Ipsum has been the industry's <br></br>
                        standard  text.</p>
                    <button className='Benfits_Learnmore_btn' type="button">Learn More</button>
                </div>
                <div className='Benfits_v1'></div>
                <div className="Benfits_2nd_div">
                    <img className="Benfits_img" src={Learn} alt="" />
                    <h2 className="Benfits_Offer">Sava Up to 60%</h2>
                    <h5 className="Benfits_Offer_tag">On all gaming products</h5>

                </div>

            </div>
        
    )
}
