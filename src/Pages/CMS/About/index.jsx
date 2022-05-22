import React from 'react'
import './styles.scss'

import topbanner from "../../../Assets/Aboutus/Group 765@2x.png";
import yellow from '../../../Assets/Aboutus/vision/yellow.png'
import blue from '../../../Assets/Aboutus/vision/blue.png'
import blue1 from '../../../Assets/Aboutus/vision/blue1.png'


import right from '../../../Assets/Aboutus/businessmodel/right.png'
import flow from '../../../Assets/Aboutus/businessmodel/flow.png'
import global from '../../../Assets/Aboutus/businessmodel/global.png'
import effieciency from '../../../Assets/Aboutus/businessmodel/effieciency.png'
import transparency from '../../../Assets/Aboutus/businessmodel/transparency.png'
import response from '../../../Assets/Aboutus/businessmodel/response.png'
import tracking from '../../../Assets/Aboutus/businessmodel/tracking.png'

import access from '../../../Assets/Aboutus/highlights/access.png'
import quotes from '../../../Assets/Aboutus/highlights/quotes.png'
import gateway from '../../../Assets/Aboutus/highlights/gateway.png'
import trade from '../../../Assets/Aboutus/highlights/trade.png'
import tech from '../../../Assets/Aboutus/highlights/tech.png'
import inventory from '../../../Assets/Aboutus/highlights/inventory.png'
import analytics from '../../../Assets/Aboutus/highlights/analytics.png'
import upload from '../../../Assets/Aboutus/highlights/upload.png'

import bottombanner from '../../../Assets/Aboutus/value_partner.png'
import map from '../../../Assets/Aboutus/banner/map.png'
import about_banner from '../../../Assets/Aboutus//banner/about_bg.png'


import board1 from '../../../Assets/Aboutus/members/board1.png'
import board2 from '../../../Assets/Aboutus/members/board2.png'
import board3 from '../../../Assets/Aboutus/members/board3.png'
import board_member1 from '../../../Assets/Aboutus/membersimg/board_member1.png'
import board_member2 from '../../../Assets/Aboutus/membersimg/board_member2.png'
import board_member3 from '../../../Assets/Aboutus/membersimg/board_member3.png'
import SuchitKumar from '../../../Assets/Aboutus/membersimg/SuchitKumar.png'

import susir from '../../../Assets/Aboutus/membersimg/susir.png'
import yasuo from '../../../Assets/Aboutus/membersimg/yasuo.png'
import vinay from '../../../Assets/Aboutus/membersimg/vinay.png'
import ahmed from '../../../Assets/Aboutus/membersimg/ahmed.png'
import dummy from '../../../Assets/Aboutus/membersimg/dummy.png'
import Zohra from '../../../Assets/Aboutus/membersimg/Zohra.png'
import aditya from '../../../Assets/Aboutus/membersimg/aditya.png'
import suchit from '../../../Assets/Aboutus/membersimg/suchit.png'
import tushar from '../../../Assets/Aboutus/membersimg/tushar.png'
import Neelesh from '../../../Assets/Aboutus/membersimg/Neelesh.png'
import william from '../../../Assets/Aboutus/membersimg/william.png'
import Inbarajan from '../../../Assets/Aboutus/membersimg/Inbarajan.png'
import suchit_shah from '../../../Assets/Aboutus/membersimg/suchit_shah.png'
import Tushar from '../../../Assets/Aboutus/membersimg/Tushar.png'

import vision_bg from '../../../Assets/Aboutus/vision_bg.png'
import vision_quote from '../../../Assets/Aboutus/vision_quote.png'
import mission_quote from '../../../Assets/Aboutus/mission_quote.png'
import values_quote from '../../../Assets/Aboutus/values_quote.png'
import board_member_quote_bg from '../../../Assets/Aboutus/board_member_quote_bg.png'
import board_member_bg_2 from '../../../Assets/Aboutus/board_member_bg_2.png'
import board_member_bg_3 from '../../../Assets/Aboutus/board_member_bg_3.png'


import advisory_board_bg from '../../../Assets/Aboutus/advisory_board_bg.png'
import advisory_board_bg2 from '../../../Assets/Aboutus/advisory_board_bg2.png'

import management_team_bg from '../../../Assets/Aboutus/advisory_board_bg2.png'
import management_team_bg2 from '../../../Assets/Aboutus/advisory_board_bg2.png'







function Index() {

    const info = [
        {name: 'VISION', image: blue, color: '#002D56', bg:vision_bg, quote:vision_quote , quote1: 'One World - One Market',
            quote2:'Business Without Borders'},
        {name: 'MISSION', image: yellow, color: '#DDB363', bg:vision_bg, quote:mission_quote, mission1:'To Provide Safe,', mission2: 'Stable And Seamless', mission3:'Global B2b Trade Ecosystem For', mission4:'Brands, Distributors And Resellers Of It.'},
        {name: 'GOVERNANCE', image: blue1, color: '#002D56', bg:vision_bg, quote:vision_quote , value1:'People', value2:"Purpose" , value3: "Process", value4: "Pereformance"}
    ]

    console.log(info)

    const keyhighlights = [
        {image: access, content: 'Unlimited Access To Buying And Selling', color: '#336397'},
        {image: quotes, content: 'Unlimited Quotes', color: '#5daca3'},
        {image: gateway, content: 'Secured Gateway And Crypto Options', color: '#dd5f46'},
        {image: trade, content: 'B2B Trade And Auction', color: '#336397'},
        {image: tech, content: 'Secured Technology', color: '#336397'},
        {image: inventory, content: 'Easy Inventory Management', color: '#5daca3'},
        {image: analytics, content: 'Report Analytics', color: '#dd5f46'},
        {image: upload, content: 'Simplified Product Upload', color: '#336397'},
    ]

    const board = [
        {image: SuchitKumar, bg: board3, quote_bg:board_member_quote_bg, name: 'Suchit Kumar', position: 'CO-FOUNDER & CEO', content: 'Over 30 years of experience in setting up business network globally. Accomplished leader with track record of success in bringing global and holistic perspective to enterprises in transformation.'},
        {image: board_member1, bg: board1, quote_bg:board_member_quote_bg, name: 'Niranjan Gidwani', position: 'CONSULTING DIRECTOR', content: 'Has over 38 years of hardcore top management experience, including extensive business exposure in places such as India, Hong Kong, Germany, Singapore, and Dubai. General management, strategy and implementation, building and scaling up teams, grooming future leaders, international business development, handling international start-ups, marketing, and worldwide sourcing for diverse categories are among his areas of expertise.'},
        {image: board_member2, bg: board2, quote_bg:board_member_quote_bg, name: 'Axel Holst', position: 'MANAGING DIRECTOR EUROPE', content: 'International sales director having in-depth and broad experience in multiple industry domains and track-proven business development competences. Focussed leadership attitude and target driven on building and delivering success to enterprises and team based across industry. Dedicated, flexible, multi-faceted, open-minded and quinlingual.'}
    ]

    const advisary = [
        {image: susir, quote_bg:advisory_board_bg,  name: 'Susir Kumar', designation: 'STRATEGY & CORPORATE GOVERNANCE', content: 'Founded the successful global BPO venture. Delivered significant profitability and value to all key stakeholders. Over 30 years of service sector expertise, focusing in new venture formation, M&A advising, and business structure. VSF worldwide chairman and board member of TaskUs, Refyne, Sports Village, and Ingroup consulting.'},
        {image: Neelesh, quote_bg:advisory_board_bg, name: 'Neelesh Bhatnagar', designation: 'BUSINESS & FINANCE', content: 'Founded the most successful global BPO venture. Delivered significant profitability and value to all key stakeholders : employees, clients and PE. Over 3o years of experience in the services industry specializing in setting up new ventures, M&A advisory and corporate structuring. Chairman & Board member of VSF global, board member TaskUs, Refyne, Sports Village & Ingroup consulting.'},
        {image: yasuo, quote_bg:advisory_board_bg, name: 'Yasuo Okada', designation: 'TECHNICAL', content: 'IT Strategist and specialist in Information security, Data privacy, Compliances and Digital transformation. Expert in overseeing changes to enterprise-wide technology, cyber and risk management, culture, skills and behaviours.'}

    ]

    const mgmt = [
        {image: vinay, quote_bg:advisory_board_bg, name: 'Vinay Pagare', designation: 'HEAD OF OPERATIONS & TECHNOLOGY', content: 'IT Engineer Turned Entrepreneur with 12 Years of Experience in IT, DigitalTransformation Space. Vinay has Proven management experience in Setting up new ventures & building system driven businesses. Worked withTCS, BNI globally.' },
        {image: ahmed, quote_bg:advisory_board_bg, name: 'Ahmed Rayyan', designation: 'DIRECTOR, INDIA & SOUTH ASIA', content: 'Dedicated business development professional with over 20 years of experience in market research, team management and global marketing in the Middle East and Africa. Speciality in market trends and IT development in the US. Led multiple projects for business initiatives worldwide with a focus on e-commerce.'},
    ]

    const core = [
        {image: aditya, name: 'Aditya Shah', designation: 'HEAD STRATEGY & CORPORATE FINANCE'},
        {image: william, name: 'William Ebenezer', designation: 'CISO'},
        {image: Inbarajan, name: 'Inbarajan S.', designation: 'CHIEF MARKETING OFFICER'},
        {image: Zohra, name: 'Zohra Kapasi', designation: 'FINANCE HEAD'},
        {image: suchit_shah, name: 'Suchit Shah', designation: 'TAX & ACCOUNTING INDIA BUSINESS'},      
        {image: Tushar, name: 'Tushar Patil', designation: 'TAX & ACCOUNTING AMERICAS'},
        // {image: suchit, name: 'Suchit Shah', designation: 'TAX & ACCOUNTING INDIA BUSINESS'},
        // {image: tushar, name: 'Tushar Patil', designation: 'TAX & ACCOUNTING AMERICAS'}
    ]

  return (
    <div className='aboutus'>
        <div className='aboutus__banner'>
            <img src={topbanner} alt="" />
             <div className="aboutus__topbanner__floatingtext">
                <p className="topbanner__text1">Pioneering The Future Of IT Trade</p>
                <p className="topbanner__text2">Global B2B Marketplace</p>
            </div>
        </div>

        <div className='aboutus__info'>
            <div className='about_info_content'>
                {/* <img src={about_banner} alt="" /> */}
                <div className='content'>
                    <h2>About Us</h2>
                    <p>TEXUB is a trusted Digital Marketplace for Global IT trade. TEXUB offers an enthralling journey into the IT business by digitally connecting verified B2B sellers and buyers from all around the world.  We are end-to-end enabler that creates cost efficiencies and support sustainable growth. With a strong digital ecosystem and scalable cloud platform, TEXUB offers a global perspective on the IT B2B Trade with offices in multiple countries.</p>
                </div>
            </div>
        </div>

        <div className='aboutus__content'>
            <ul>
            {info.map(data => 
                <li key={data.name} className='vision_quote_section'>
                    <img src={data.image} alt="" />
                    <p style={{color: data.color}}>{data.name}</p>
                    <div className='about_content_bg'>
                        <img src={data.bg} alt="" />
                        <div className='quote_section'>
                            <div className='quote_block'>
                                <img src={data.quote} alt="" />
                                <div className='quote_msg'>
                                    <span className='quote_word1'>{data.quote1}</span>
                                    <span className='quote_word2'>{data.quote2}</span>
                                    <span className='quote_word3'>{data.quote3}</span>
                                    <span className='quote_word3'>{data.mission1} <span className='mission_special quote_word1'>{data.mission2}</span></span>
                                    <span className='quote_word3'>{data.mission3}</span>
                                    <span className='quote_word3'>{data.mission4}</span>
                                    <span className='quote_word1'>{data.value1}</span>
                                    <span className='quote_word1'>{data.value2}</span>
                                    <span className='quote_word1'>{data.value3}</span>
                                    <span className='quote_word1'>{data.value4}</span>

                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            )}
            </ul>
        </div>

        <div className='aboutus__businessmodel'>
            <div className='businessmodel__header'>
                <div className="business_header_section">
                    <h2>Business Model</h2>
                    <h5>Reach new markets with our global opportunities</h5>
                </div>
            </div>
            <div className='businessmodel__content'>
                <div className='content__left'>
                    <img src={flow} alt="" />
                    <p className='left__content1'><span>Safe, Stable And Seamless</span> Digital Marketplace</p>
                    <p className='left__content2'>Seller and Buyer are anonymous and operate with Customer ID</p>
                </div>
                <div className='content__right'>
                    <img src={right} alt="" />
                </div>
            </div>
            <div className='businessmodel__footer'>
                <p>
                    <img src={global} alt="" />
                    <span>Global Presence</span>
                </p>
                <p>
                    <img src={effieciency} alt="" />
                    <span>Efficiency</span>
                </p>
                <p>
                    <img src={transparency} alt="" />
                    <span>Transparency</span>
                </p>
                <p>
                    <img src={response} alt="" />
                    <span>Quick Response</span>
                </p>
                <p>
                    <img src={tracking} alt="" />
                    <span>Order Tracking</span>
                </p>
            </div>
        </div>

        <div className='aboutus__highlights'>
            <h2>Key Highlights</h2>

            <ul>
                {keyhighlights.map(data => 
                    <li className='highlights__image' key={data.image}>
                        <img src={data.image} alt="" />
                        <p style={{color: data?.color}}>{data.content}</p>
                    </li>
                )}
            </ul>
        </div>

        <div className='aboutus__members'>
            <h2>Board Members</h2>
            <div className='members__content'>
                {board.map(data => <p>
                     <div className='advisory__top'>
                        <div className='board_member_info'>
                         <img src={data.image} alt="" />
                        </div>
                        <h4>{data.name}</h4>
                        <h2>{data.position}</h2>
                    </div>
                    <div className='quote_bg'>
                        {/* <img src={data.quote_bg} alt="" /> */}
                        <p style={{ backgroundImage: data.bg }}>{data.content}</p>
                    </div>
                </p>)}
            </div>
        </div>

        <div className='aboutus__advisary'>
            <h2>Advisary Board</h2>
            <div className='advisory__content'>
                <ul>
                    {advisary.map(data => <li>
                        <div className='advisory__top'>
                            <div className='advisory__top_image'>
                                <img src={data.image} alt="" />
                            </div>
                            <h5>{data.name}</h5>
                            <h2>{data.designation}</h2>
                        </div>
                       <div className='quote_bg'>
                            {/* <img src={data.quote_bg} alt="" /> */}
                            <p style={{ backgroundImage: data.bg }}>{data.content}</p>
                        </div>
                    </li>)}
                </ul>
            </div>
        </div>

        <div className='aboutus__mgmt'>
            <h2>Management Team</h2>
            <div className='mgmt__content'>
                <ul>
                    {mgmt.map(data => <li>
                        <div className='mgmt__top'>
                            <div className='mgmt__top_image'>
                                <img src={data.image} alt="" />
                            </div>
                            <h5>{data.name}</h5>
                            <h2  className='position_title'>{data.designation}</h2>
                        </div>
                         <div className='quote_bg'>
                            {/* <img src={data.quote_bg} alt="" /> */}
                            <p style={{ backgroundImage: data.bg }}>{data.content}</p>
                        </div>
                    </li>)}
                </ul>
            </div>
        </div>

        <div className='aboutus__core'>
            <h2>Core Team</h2>
            <div className='core__content'>
                <ul>
                    {core.map(data => <li>
                        <div className='core__image'>
                            <img src={data.image} alt="" />
                        </div>
                        <h5 className='position_person'>{data.name}</h5>
                        <h2 className='position_title'>{data.designation}</h2>
                    </li>)}
                </ul>
            </div>
        </div>

        <div className='aboutus__banner bottom'>
            <img src={bottombanner} alt="" />
        </div>

        <div className='aboutus__banner bottom map'>
            <img src={map} alt="" />
        </div>
    </div>
  )
}

export default Index