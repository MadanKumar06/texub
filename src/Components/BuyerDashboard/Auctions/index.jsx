import React, { useState } from 'react'
import './styles.scss'
import AuctionCard from './AuctionCard/Index'

function Index() {

    const auctiontype = [
        { name:  'All Auctions'},
        { name:  'Upcomming Auctions'},
        { name:  'Live Auctions'},
        { name:  'Completed Auctions'},
    ]

    const [type, settype] = useState()

    const selectorder = (value) => {
        settype(value)
    }

    const auctioncards = []

  return (
    <div className='auctions'>
        <div className='auctions__buttons'>
            {auctiontype.map((data, i) => 
                <p className={`ordertypes ${type === i && "auctions__selected"}`}
                key={i} onClick={() => selectorder(i)}
                >
                    {data.name}
                </p>
            )}
        </div>

        <div className='auctions__card'>
            <AuctionCard />
        </div>
    </div>
  )
}

export default Index