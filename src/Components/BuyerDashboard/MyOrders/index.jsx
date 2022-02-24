import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import './styles.scss'

function Index() {

    const ordertype = [
        { name:  'All Orders'},
        { name:  'Open Invoice'},
        { name:  'On-Going Orders'},
        { name:  'Dispatched Orders'},
        { name:  'Full-Filled Orders'},
    ]

    const [type, settype] = useState()

    const selectorder = (value) => {
        settype(value)
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
              orderid: '000069',
              date: '11/09/22',
              sellercode: "220012",
              hub: 'Mumbai',
              ordertotal: '78999',
              status: 'Pending',
              action: 'View Order'
          },
          {
            orderid: '000088',
            date: '26/05/22',
            sellercode: "344598",
            hub: 'Chennai',
            ordertotal: '67999',
            status: 'Confirm',
            action: 'View Order'
        },
        {
            orderid: '000088',
            date: '26/05/22',
            sellercode: "344598",
            hub: 'Chennai',
            ordertotal: '67999',
            status: 'Delivered',
            action: 'View Order'
        },
        {
            orderid: '000088',
            date: '26/05/22',
            sellercode: "344598",
            hub: 'Chennai',
            ordertotal: '67999',
            status: 'Dispatched',
            action: 'View Order'
        },
      ]

      const columns = [
          { name: 'orderid', label: 'Order ID', options: {
            customBodyRender: (value) => {
                return (
                    <div className='myorders__orderid'>
                        {value}
                    </div>
                )}
            }
          },
          { name: 'date', label: 'Date' },
          { name: 'sellercode', label: 'Seller Code', options: {
            customBodyRender: (value) => {
                return (
                    <div className='myorders__sellercode'>
                        {value}
                    </div>
                )}
            }
          },
          { name: 'hub', label: 'HUB' },
          { name: 'ordertotal', label: 'Order Total', options: {
            customBodyRender: (value) => {
                return (
                    <div className='myorders__ordertotal'>
                        <span className='currency'>INR </span>
                        <span className='price'>{value}</span>
                    </div>
                )}
            }
          },
          { name: 'status', label: 'Status', options: {
            customBodyRender: (value) => {
                return (
                    <div className={`
                    ${value === 'Pending' && "myorders__pending"}
                    ${value === 'Confirm' && "myorders__confirm"}
                    ${value === 'Delivered' && "myorders__delivered"}
                    ${value === 'Dispatched' && "myorders__dispatched"}
                    `}>
                        {value}
                    </div>
                )}
            }
          },
          { name: 'action', label: 'Action', options: {
            customBodyRender: (value) => {
                return (
                    <div className='myorders__action'>
                        {value}
                    </div>
                )}
            }
          },
      ]
  return (
    <div className='myorders'>

        <div className='myorders__buttons'>
        {ordertype.map((data, i) => 
                <p className={`ordertypes ${type === i && "ordertype__selected"}`}
                key={i} onClick={() => selectorder(i)}
                >
                    {data.name}
                </p>
            )}
        </div>

        <MUIDataTable
        title={""}
        data={table}
        columns={columns}
        options={options}
        className="myorders__table"
      />
    </div>
  )
}

export default Index