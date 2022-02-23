import React, { useState } from 'react'
import './styles.scss'
import MUIDataTable from "mui-datatables";
import { Link } from 'react-router-dom'

function Index() {

    const ordertype = [
        { name:  'All Orders'},
        { name:  'Purchase Orders'},
        { name:  'Full-Filled Orders'},
        { name:  'Cancelled Orders'}
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
          order: "#000000006",
          date: '02/04/2022',
          buyercode: 220120,
          hub: 'Delhi',
          ordertotal: 67999,
          status: 'Dispatched',
          action: 'View Order'
        },
        {
            order: "#000000007",
            date: '05/05/2022',
            buyercode: 220145,
            hub: 'Pune',
            ordertotal: 75112,
            status: 'Confirm',
            action: 'View Order'
          },
    ]

    const columns = [
        { name: 'order', label: 'Order' },
        { name: 'date', label: 'Date' },
        { name: 'buyercode', label: 'Buyer Code', options: {
            customBodyRender: (value) => {
                return (
                    <div className='orders__buyercode'>
                        {value}
                    </div>
                )}
            }
        },
        { name: 'hub', label: 'HUB' },
        { name: 'ordertotal', label: 'Order Total', options: {
            customBodyRender: (value) => {
                return (
                    <div className='orders__ordertotal'>
                        <span className='label'>INR</span>
                        <span className='value'>{value}</span>
                    </div>
                )}
            } },
        { name: 'status', label: 'Status', options: {
            customBodyRender: (value) => {
                return (
                    <div className={`${value === "Dispatched" && "orders__dispatched"} ${value === "Confirm" && "orders__confirmed"}`}>
                        {value}
                    </div>
                )}
            } },
        { name: 'action', label: 'Action', options: {
            customBodyRender: (value) => {
                return (
                    <div className='orders__action'>
                        {value}
                    </div>
                )}
            } },
    ]

  return (
    <div className='orders'>
        <div className='orders__buttons'>
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
        className="orders__table"
      />

      <div className='orders__back'>
      <Link to="/sellerdashboard/dashboard"><span>Back</span></Link>
      </div>
    </div>
  )
}

export default Index