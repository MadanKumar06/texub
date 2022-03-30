import React from 'react'
import './styles.scss'

import topbanner from "../../../Assets/Aboutus/Group 765@2x.png";
import yellow from '../../../Assets/Aboutus/vision/yellow.png'
import blue from '../../../Assets/Aboutus/vision/blue.png'
import blue1 from '../../../Assets/Aboutus/vision/blue1.png'

import right from '../../../Assets/Aboutus/businessmodel/right.png'
import buyer from '../../../Assets/Aboutus/businessmodel/buyer.png'
import seller from '../../../Assets/Aboutus/businessmodel/seller.png'
import serviceprovider from '../../../Assets/Aboutus/businessmodel/serviceprovider.png'
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

import bottombanner from '../../../Assets/Aboutus/banner/bottombanner.png'
import map from '../../../Assets/Aboutus/banner/map.png'

import board1 from '../../../Assets/Aboutus/members/board1.png'
import board2 from '../../../Assets/Aboutus/members/board2.png'
import board3 from '../../../Assets/Aboutus/members/board3.png'

function Index() {

    const info = [
        {name: 'VISION', image: blue},
        {name: 'MISSION', image: yellow},
        {name: 'VALUES', image: blue1}
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
        {bg: board1, name: 'Niranjan Gidwani', position: 'DIRECTOR', content: 'Over 38 years of hardcore senior management experience with a strong exposure to handling international business. He had working stints in India, Hongkong, Germany, Singapore and Dubai. Expertise in business from different vantage points, including general management , strategy and implementation, building and scaling up teams and processes, grooming future leaders, international business development, handling international start- ups, marketing, global sourcing for various categories.'},
        {bg: board2, name: 'Axel Holst', position: 'MD EUROPE', content: 'International sales director having in-depth and broad experience in multiple industry domains and track-proven business development competences. Focussed leadership attitude and target driven on building and delivering success to enterprises and team based across industry. Dedicated, flexible, multi-faceted, open-minded and quinlingual.'},
        {bg: board3, name: 'Suchit Kumar', position: 'CO-FOUNDER & CEO', content: 'Over 30 years of experience in setting up business network globally. Accomplished leader with track record of success in bringing global and holistic perspective to enterprises in transformation.'},
    ]

  return (
    <div className='aboutus'>
        <div className='aboutus__banner'>
            <img src={topbanner} alt="" />
        </div>

        <div className='aboutus__info'>
            <h2>About Us</h2>
            <p>Texub is a global B2B marketplace that offers a secure technology for global B2B IT trade. Texub is a digital platform that allows business to exchange commerce by offering a list of best selling products for verified buyers through verified sellers and reduces analytical work. With our digital ecosystem, Texub provides a compelling journey into the IT business economy. Our scalable cloud platform for Brands, distributors, and resellers improves the buying and selling experience while maintaining trade privacy.</p>
        </div>

        <div className='aboutus__content'>
            <ul>
            {info.map(data => {
                <li key={data.image}>
                    <img src={data.image} alt="" />
                </li>
            })}
            </ul>
        </div>

        <div className='aboutus__businessmodel'>
            <div className='businessmodel__header'>
                <h2>Business Model</h2>
                <h5>Reach new markets with our global oppertunities</h5>
            </div>
            <div className='businessmodel__content'>
                <div className='content__left'>
                    <span className='left__top'>
                        <img className='sp' src={serviceprovider} alt="" />
                        <p>Safe, Stable And Seamless Digital Marketplace</p>
                        <span>Seller and Buyer are anonymous and operate with Customer ID</span>
                    </span>
                    <span className='left__middle'>
                        <img src={buyer} alt="" />
                    </span>
                    <span>
                        <img src={seller} alt="" />
                    </span>
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
                    <h4>{data.name}</h4>
                    <h2>{data.position}</h2>
                    <p style={{ backgroundImage: data.bg }}>{data.content}</p>
                </p>)}
            </div>
        </div>

        <div className='aboutus__advisary'>
            <h2>Advisary Board</h2>
        </div>

        <div className='aboutus__mgmt'>
            <h2>Management Team</h2>
        </div>

        <div className='aboutus__core'>
            <h2>Core Team</h2>
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