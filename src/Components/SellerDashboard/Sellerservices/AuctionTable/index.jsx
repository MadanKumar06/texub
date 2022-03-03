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
            auctionid: '000006',
            startdate: '25 Dec 21 / 09:00 am',
            enddate: '05 Jan 22 / 09:00 am',
            pdetails: {
                title: 'Pavilion Model14-Dv0054Tu',
                content: 'Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)'
            },
            qty: '100',
            price: '68,99900',
            status: 'Active',
            Action: 'Update'
        },
        {
            auctionid: '000007',
            startdate: '05 July 21 / 09:00 am',
            enddate: '17 July 22 / 09:00 am',
            pdetails: {
                title: 'Apple Macbook Pro',
                content: 'Apple Macbook Pro Mvvj2Hn/A 2.6Ghz 6-Core 9Th-Gen I7, 16Gb'
            },
            qty: '80',
            price: '68,99900',
            status: 'Active',
            Action: 'Update'
        }
    ]

    const columns = [
        { name: 'auctionid', label: 'Auction ID', options: {
            customBodyRender: (value) => {
                return (
                    <div className='auctiontable__auctionid'>
                        {value}
                    </div>
                )}
            }
        },
        { name: 'startdate', label: 'Start Date & Time'},
        { name: 'enddate', label: 'End Date & Time'},
        { name: 'pdetails', label: 'Product Details', options: {
            customBodyRender: (value) => {
                return (
                    <div className='auctiontable__pdetails'>
                        {value.title}
                        {value.content}
                    </div>
                )}
            }
        },
        { name: 'qty', label: 'Qty'},
        { name: 'price', label: 'Price', options: {
            customBodyRender: (value) => {
                return (
                    <div className='auctiontable__price'>
                        <span className='label'>INR </span>
                        <span className='value'>{value}</span>
                    </div>
                )}
            }
        },
        { name: 'status', label: 'Status', options: {
            customBodyRender: (value) => {
                return (
                    <div className='auctiontable__status'>
                        {value}
                        <span className='status__active'></span>
                    </div>
                )}
            }
        },
        { name: 'Action', label: 'Action', options: {
            customBodyRender: (value) => {
                return (
                    <div className='auctiontable__action'>
                        {value}
                    </div>
                )}
            }
        },
    ]

  return (
    <div className='auctiontable'>
        <MUIDataTable
            title={""}
            data={table}
            columns={columns}
            options={options}
        />

        <div className='auctiontable__submit'>
            <span className='auctiontable__back' onClick={back}>Back</span>
            <p className='submit__new'>Create New Request</p>
        </div>
    </div>
  )
}

export default Index