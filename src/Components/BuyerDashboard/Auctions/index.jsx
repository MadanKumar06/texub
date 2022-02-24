import React, { useState } from 'react'
import './styles.scss'
import AuctionCard from './AuctionCard/Index'

function Index() {


    const auctiondata = [
        {
            name: 'Pavilion Model14-Dv0054Tu',
            content: 'Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)',
            auctionstart: '25 Dec 21 / 09:00 am',
            auctionend: '05 Jan 22 / 09:00 am',
            active: 0,
            current: '68,999',
            bid: false,
            status: "Yet to Start",
            lot: "Lot # AC-234"
        },
        {
            name: 'Acer Sf314-42 Swift 3',
            content: 'Acer Sf314-42 Swift 3 Laptop (Amd R5-4500U/8 Gb/512 Gb Hdd/…',
            auctionstart: '03 Sep 21 / 09:00 am',
            auctionend: '21 Sep 21 / 09:00 am',
            active: 50,
            current: '68,999',
            bid: true,
            status: 'Active',
            yourbid: '55999',
            lot: "Lot # AC-258"
        },
        {
            name: 'Acer Sf314-42 Swift 3',
            content: 'Acer Sf314-42 Swift 3 Laptop (Amd R5-4500U/8 Gb/512 Gb Hdd/…',
            auctionstart: '03 Sep 21 / 09:00 am',
            auctionend: '21 Sep 21 / 09:00 am',
            active: 50,
            current: '68,999',
            bid: true,
            status: 'InActive',
            lot: "Lot # AC-355"
        }
    ]

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
            {/* <AuctionCard /> */}
            <ul>
                {auctiondata.map((data, i) => 
                    <li key={i}>
                        <AuctionCard data={data} />
                    </li>
                )}
            </ul>
            
        </div>
    </div>
  )
}

export default Index