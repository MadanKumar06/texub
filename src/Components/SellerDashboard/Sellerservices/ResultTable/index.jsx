import React from 'react'
import './styles.scss'
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";

function Index() {
    const history = useNavigate()
    
    const back = () => {
        history('/')
    }

    const options = {
        filter: false,
        filterType: "dropdown",
        responsive: "vertical",
        selectableRows: "none",
        download: false,
        print: false,
        sort: false,
        viewColumns: false,
        search: false,
      };

    const table = [
        {
            auctionid: '000000006',
            buyercode: 'BU201200',
            pdetails: 'Pavilion Model14-Dv0054Tu',
            currentbid: '68,99900',
            buyerbid: '66,99900',
            action: ""
        },
        {
            auctionid: '000000007',
            buyercode: 'BU201201',
            pdetails: 'Acer Sf314-42 Swift 3',
            currentbid: '68,99900',
            buyerbid: '67,99900',
            action: ""
        }
    ]

    const columns = [
        { name: 'auctionid', label: 'Auction ID', options: {
            customBodyRender: (value) => {
                return (
                    <div className='resulttable__auctionid'>
                        {value}
                    </div>
                )}
            }
        },
        { name: 'buyercode', label: 'Buyer Code' },
        { name: 'pdetails', label: 'Product Details' },
        { name: 'currentbid', label: 'Current Bid' },
        { name: 'buyerbid', label: 'Buyer`s Bid' },
        { name: 'action', label: 'Action', options: {
            customBodyRender: (value) => {
                return (
                    <div className='resulttable__action'>
                         <span className='accept'>Accept</span>
                        <span className='reject'>Reject</span>
                    </div>
                )}
            }
        },
    ]

  return (
    <div className='resulttable'>
        <MUIDataTable
            title={""}
            data={table}
            columns={columns}
            options={options}
        />

        <div className='resulttable__submit'>
            <span className='resulttable__back' onClick={back}>Back</span>
            <p className='submit__new'>Create New Request</p>
        </div>
    </div>
  )
}

export default Index