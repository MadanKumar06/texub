import React, { useState, useEffect } from 'react'
import './styles.scss'

import hp from '../../../../Assets/buyerdashboard/auctions/hp.png'
import bidden from '../../../../Assets/buyerdashboard/auctions/bidden.png'

function Index({ data }) {

  const [bid, setbid] = useState(0)

  useEffect(() => {
    setbid(parseFloat(data?.yourbid))
  }, [])

  console.log(bid)

  return (
    <div className='auctioncard'>
      <div className='auctioncard__detail'>

        <div className='auctioncard__productdetails'>
          <div className='auctioncard__image'>
            <img src={hp} alt="" />
          </div>
          <div className='auction__text'>
            <h4>{data?.name}</h4>
            <p>{data?.content}</p>
            <span>More Details</span>
          </div>
        </div>

        <div className='auctioncard__info'>
          <div className='info__starting'>
            <p className='value'>{data?.auctionstart}</p>
            <p className='label'>Auction Starting</p>
          </div>
          <div className='info__ending'>
          <p className='value'>{data?.auctionend}</p>
            <p className='label'>Auction Ending</p>
          </div>
          <div className='info__active'>
          <p className='value'>{data?.active}</p>
            <p className='label'>Active Bids</p>
          </div>
          <div className='info__current'>
          <p className='value'>INR {data?.current}</p>
            <p className='label'>Current Bids</p>
          </div>
        </div>

      </div>
      <div className='auctioncard__bid'>
        <span className='bid__status'>{data?.status}</span>
        <span className={
          `
            bid__color
            ${data?.status === 'Yet to Start' && 'bid__yettostart'}
            ${data?.status === 'Active' && 'bid__active'}
            ${data?.status === 'InActive' && 'bid__inactive'}
          `
          }></span>
        <p className='bid__lot'>{data?.lot}</p>
        <input
          placeholder="Enter Your Bid (Minimum INR 50,999 )"
          value={bid}
          disabled={data?.yourbid === undefined ? false : true}
          type="number"
          onChange={e => setbid(e.target.value)}
        />
        {data?.bid === true && data?.status === 'Active' ? <p className='bid__bidden'>
            <img src={bidden} alt="" />
          </p>
        :
          <p className={`${data?.status === 'InActive' ? "bud__inactive" : "bid__button" }`}>Place Bid</p>  
        }
      </div>
    </div>
  )
}

export default Index