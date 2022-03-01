import React from 'react'
import './styles.scss'
import MUIDataTable from "mui-datatables";

function Index() {
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
              orderid: '00006',
              orderdate: '11/09/21',
              returnreqdate: '23/09/21',
              pdetails: 'HP Business Laptop',
              buyercode: 'BU201200',
              returnqty: '56',
              action: ""
          },
          {
            orderid: '00007',
            orderdate: '09/05/21',
            returnreqdate: '25/05/21',
            pdetails: 'Apple Macbook Pro',
            buyercode: 'BU201201',
            returnqty: '60',
            action: ""
        },
      ]

      const columns = [
          { name: 'orderid', label: 'Order ID', options: {
            customBodyRender: (value) => {
                return (
                    <div className='rmatable__orderid'>
                        {value}
                    </div>
                )}
            }
          },
          { name: 'orderdate', label: 'Order Date' },
          { name: 'returnreqdate', label: 'Return Req. Date' },
          { name: 'pdetails', label: 'Product Details', options: {
            customBodyRender: (value) => {
                return (
                    <div className='rmatable__pdetails'>
                        {value}
                    </div>
                )}
            }
          },
          { name: 'buyercode', label: 'Buyer Code', options: {
            customBodyRender: (value) => {
                return (
                    <div className='rmatable__buyercode'>
                        {value}
                    </div>
                )}
            }
          },
          { name: 'returnqty', label: 'Return Qty', options: {
            customBodyRender: (value) => {
                return (
                    <div className='rmatable__returnqty'>
                        {value}
                    </div>
                )}
            }
          },
          { name: 'action', label: 'Action', options: {
            customBodyRender: (value) => {
                return (
                    <div className='rmatable__action'>
                        <span className='accept'>Accept</span>
                        <span className='reject'>Reject</span>
                    </div>
                )}
            }
          },
      ]

  return (
    <div className='rmatable'>
        <MUIDataTable
            title={""}
            data={table}
            columns={columns}
            options={options}
            className="orders__table"
        />
    </div>
  )
}

export default Index