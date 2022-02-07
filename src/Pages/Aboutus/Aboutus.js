import React from 'react'
import './Aboutus.css'
import './Aboutus_Media.css'
// import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import {KeyboardDoubleArrowLeft,KeyboardDoubleArrowRight } from  '@mui/icons-material';
// import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRightIcon';
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import Auction from '../../Assets/Aboutus/Trade_Auction.png'
import Secure from '../../Assets/Aboutus/Secure_get.png'
import Unlimit from '../../Assets/Aboutus/Unlimited.png'
import UnAccess from '../../Assets/Aboutus/Unlimited_access.png'
import Secured from '../../Assets/Aboutus/Secured.png'
import Easy from '../../Assets/Aboutus/Easy.png'
import Simplefied from '../../Assets/Aboutus/Simpliefied.png'
import Marketing from '../../Assets/Aboutus/Marketing.png'
import Tag1 from '../../Assets/Aboutus/Group 925.svg'
import Tag2 from '../../Assets/Aboutus/Group 926.svg'
import Tag3 from '../../Assets/Aboutus/Group 927.svg'
import Tag4 from '../../Assets/Aboutus/Group 777.svg'
import Tag5 from '../../Assets/Aboutus/Group 778.svg'
import Mission from '../../Assets/Aboutus/Group 924.svg'
import Logo from '../../Assets/Aboutus/Group 795.svg'


export const Aboutus = () => {
    return (
        <div className='Aboutus_main'>
            <div className='Aboutus_Marketing'>
                <p className='Aboutus_Marketing_tag1'>A Secure,Safe and Seamless</p>
                <p className='Aboutus_Marketing_tag2'>Digital Marketplace</p>               
            </div>
            <div className='Aboutus_Mission'>
                <div className='Aboutus_Mission_Heding_Section'>
                    <h2 className='Aboutus_Mission_Heading'>About Us</h2>
                    <p className='Aboutus_Mission_Heading_tag'>TEXUB is a Digital B2B Marketplace that provides a Secure Technology for 
                     Global B2B ICT Trade. TEXUB offers a compelling journey into the ICT
                      business economy with our digital ecosystem. Buying & Selling experience is
                      enhanced through our Scalable Cloud Platform for Manufacturers,
                       Distributors, Resellers with the promise to maintain Trade Privacy.</p>
                </div>
                <div className='Aboutus_Mission_img'>
                     <img src={Mission} alt="" className='Aboutus_Mission_img1'/>
                     <h1 className='Aboutus_Mission_img1_Heading' >Mission Statement</h1>  
                     <p className='Aboutus_Mission_img1_Heading_tag'>To provide safe,secure and seamless global B2B trade<br></br>
                     ecosystem for brands, distributors and resellers of ICT</p>

                </div>
                <div></div>

            </div>
            <div className='Aboutus_Hightlits'>
                <div className='Aboutus_Hightlits_Heading'><h2 className='Aboutus_Headings'>Highlights</h2></div>
                <div className='Aboutus_Hightlits_Section'>
                    <div className='Aboutus_Hightlits_Section1'>
                     <img src={Auction} alt="" className='Aboutus_Hightlits_img'/>
                     <p className='Aboutus_Highlights_tags'>B2B Trade & Auctions</p>
                     {/* <KeyboardDoubleArrowLeftIcon className='Aboutus_Hightlits_Arrow'/> */}
                     <h2 className='Aboutus_Hightlits_Heading_number'>01</h2>
                    </div>
                    {/* <MoreVertIcon className='Aboutus_Hightlits_dots'/> */}
                    <div className='Aboutus_Hightlits_Section2'>
                    <h2 className='Aboutus_Hightlits_Heading_number'>02</h2>   
                     {/* <KeyboardDoubleArrowRightIcon className='Aboutus_Hightlits_Arrow'/> */}
                     <p className='Aboutus_Highlights_tags'>B2B Trade & Auctions</p>
                     <img src={Secure} alt="" className='Aboutus_Hightlits_img'/>
                    </div>
                    {/* <MoreVertIcon className='Aboutus_Hightlits_dots'/> */}
                    <div className='Aboutus_Hightlits_Section1'>
                     <img src={Unlimit} alt="" className='Aboutus_Hightlits_img' />
                     <p className='Aboutus_Highlights_tags'>B2B Trade & Auctions</p>
                     {/* <KeyboardDoubleArrowLeftIcon className='Aboutus_Hightlits_Arrow'/> */}
                     <h2 className='Aboutus_Hightlits_Heading_number'>03</h2>
                    </div>
                    {/* <MoreVertIcon className='Aboutus_Hightlits_dots'/> */}
                    <div className='Aboutus_Hightlits_Section2'>
                    <h2 className='Aboutus_Hightlits_Heading_number'>04</h2>
                    {/* <KeyboardDoubleArrowRightIcon className='Aboutus_Hightlits_Arrow'/> */}
                    <p className='Aboutus_Highlights_tags'>B2B Trade & Auctions</p>
                     <img src={UnAccess} alt=""  className='Aboutus_Hightlits_img'/>
                    </div>
                    {/* <MoreVertIcon className='Aboutus_Hightlits_dots'/> */}
                    <div className='Aboutus_Hightlits_Section1'>
                     <img src={Secured} alt=""  className='Aboutus_Hightlits_img'/>
                     <p className='Aboutus_Highlights_tags'>B2B Trade & Auctions</p>
                     {/* <KeyboardDoubleArrowLeftIcon className='Aboutus_Hightlits_Arrow'/> */}
                     <h2 className='Aboutus_Hightlits_Heading_number'>05</h2>
                    </div>
                    {/* <MoreVertIcon className='Aboutus_Hightlits_dots'/> */}
                    <div className='Aboutus_Hightlits_Section2'>
                    <h2 className='Aboutus_Hightlits_Heading_number'>06</h2>
                    {/* <KeyboardDoubleArrowRightIcon className='Aboutus_Hightlits_Arrow'/> */}
                    <p className='Aboutus_Highlights_tags'>B2B Trade & Auctions</p>
                     <img src={Easy} alt=""  className='Aboutus_Hightlits_img'/>
                    </div>
                    {/* <MoreVertIcon className='Aboutus_Hightlits_dots'/> */}
                    <div className='Aboutus_Hightlits_Section1'>
                     <img src={Simplefied} alt="" className='Aboutus_Hightlits_img' />
                     <p className='Aboutus_Highlights_tags'>B2B Trade & Auctions</p>
                     {/* <KeyboardDoubleArrowLeftIcon className='Aboutus_Hightlits_Arrow'/> */}
                     <h2 className='Aboutus_Hightlits_Heading_number'>07</h2>
                    </div>
                    {/* <MoreVertIcon className='Aboutus_Hightlits_dots'/> */}
                    <div className='Aboutus_Hightlits_Section2'>
                    <h2 className='Aboutus_Hightlits_Heading_number'>08</h2>
                    {/* <KeyboardDoubleArrowRightIcon className='Aboutus_Hightlits_Arrow'/> */}
                    <p className='Aboutus_Highlights_tags'>B2B Trade & Auctions</p>
                     <img src={Marketing} alt=""  className='Aboutus_Hightlits_img'/>
                    </div> 
                </div>
            </div>
            <div className='Valued_Assets'>
                <div className='Aboutus_Hightlits_Heading'><h2 className='Aboutus_Headings'>Valued Assets</h2></div>
                <div className='Valued_Assets_Tags_Section'>
                    <div className='Valued_Assets_img'>   
                         <p className='Valued_Assets_1'>01</p>
                         <p className='Valued_Assets_tag'>Integrity</p>
                         <img src={Tag1} alt="" className='Aboutus_Valued_img' /> 
                    </div> 
                    <div>
                        <p className='Valued_Assets_2'>02</p>
                        <p className='Valued_Assets_tag'>Commitment</p>
                        <img src={Tag2} alt="" className='Aboutus_Valued_img' />
                    </div>
                    <div>
                        <p className='Valued_Assets_3'>03</p>
                        <p className='Valued_Assets_tag'>Perseverance</p>
                        <img src={Tag3} alt="" className='Aboutus_Valued_img' />
                    </div>
                    <div>
                       <p className='Valued_Assets_4'>04</p>
                       <p className='Valued_Assets_tag'>Resilience</p>
                       <img src={Tag4} alt="" className='Aboutus_Valued_img' />
                    </div>
                    <div>
                        <p className='Valued_Assets_5'>05</p>
                        <p className='Valued_Assets_tag'>Action</p>
                        <img src={Tag5} alt="" className='Aboutus_Valued_img' />
                    </div>
                </div>

            </div>
            <div>
                <div>
                  <h2 className='Aboutus_Headings'>Our Worldwide Office</h2>
                </div>
               <div className='Aboutus_Worldwide'>
               <div>    
              <div><img src={Logo} alt="" className='Aboutus_Worldwide_Logo1' /></div>     
              <div> <img src={Logo} alt="" className='Aboutus_Worldwide_Logo2' /></div>
              <div>
                   <img src={Logo} alt="" className='Aboutus_Worldwide_Logo3' />
                  <img src={Logo} alt="" className='Aboutus_Worldwide_Logo4' /></div>
              {/* <div> </div> */}
              <div><img src={Logo} alt="" className='Aboutus_Worldwide_Logo5' /></div>
              <div><img src={Logo} alt="" className='Aboutus_Worldwide_Logo6' /></div>
               
              
              
              
               
               
               </div>
                   <div className='Aboutus_Worldwide_Section'>
                   <ul className='Aboutus_Worldwide_list'>
                       <li className='Aboutus_Worldwide_list1'>USA</li>
                       <li className='Aboutus_Worldwide_list2'>NIGERIA</li>
                       <li className='Aboutus_Worldwide_list3'>NETHERLAND</li>
                       <li className='Aboutus_Worldwide_list4'>UAE</li>
                       <li className='Aboutus_Worldwide_list5'>INDIA</li>
                       <li className='Aboutus_Worldwide_list6'>SINGAPORE</li>
                   </ul>
                   </div>

               </div>
            </div>
            
        </div>
    )
}
