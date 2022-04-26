import React from 'react'
import './styles.scss'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MUITable from '../../Components/Common/MUITable'

function Index() {

  const tableData = [
    {
      sellerid: 'INDS20222',
      description: 'TEST',
      // description: {
      //     image: '',
      //     title: 'PAVILION MODEL14-DV0054TU',
      //     desc: 'Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)',
      // },
      hub: 'Mumbai',
      unitprice: '66,999',
      quantity: '60',
      totalprice: '40,23,490'
    },
    {
      sellerid: 'INDS2023',
      description: 'TEST',
      // description: {
      //     image: '',
      //     title: 'ACER SF314-42 SWIFT 3',
      //     desc: 'Acer Sf314-42 Swift 3 Laptop (Amd R5-4500U/8 Gb/512 Gb Hdd/…',
      // },
      hub: 'Mumbai',
      unitprice: '65,999',
      quantity: '30',
      totalprice: '19,84,490'
    }
  ]

  const options = {
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: false,
    download: false,
    print: false,
    sort: false,
    viewColumns: false,
    search: false,
  };

  const columns = [
    { name: "sellerid", label: 'SELLER ID',
      options: {
        customBodyRender: (value) => {
          return <div className="table__sellerid">{value}</div>;
        },
      },
    },
    { name: "description", label: 'PRODUCT DESCRIPTION',
      options: {
        customBodyRender: (value) => {
          return <div className="table__description">{value}</div>;
        },
      },
    },
    { name: "hub", label: 'HUB',
      options: {
        customBodyRender: (value) => {
          return <div className="table__hub">{value}</div>;
        },
      },
    },
    { name: "unitprice", label: 'UNIT PRICE',
      options: {
        customBodyRender: (value) => {
          return <div className="table__unitprice">INR {value}</div>;
        },
      },
    },
    { name: "quantity", label: 'QUANTITY',
      options: {
        customBodyRender: (value) => {
          return <div className="table__quantity">{value}</div>;
        },
      },
    },
    { name: "totalprice", label: 'TOTAL PRICE',
      options: {
        customBodyRender: (value) => {
          return <div className="table__price ">INR {value}</div>;
        },
      },
    },
  ]
  return (
    <div className='pendinginvoice'>
      <div className="pendinginvoice__top">
        <div className='top__header'>
          <ArrowBackIosIcon />
          <span>
            <p className='label'>Order ID</p>
            <p className='value'>28739822</p>
          </span>
          <span>
            <p className='label'>Total Amount</p>
            <p className='value'>INR 10,729,830</p>
          </span>
          <span>
            <p className='label'>Order Status</p>
            <p className='value'>Pending</p>
          </span>
          <p>Continue Shopping</p>
        </div>
        <div className='top__orderinfo'>
          <div  className='orderingo__logo'></div>
          <div className='orderinfo__data'>
            <p>
              <span className='label'>Order ID</span>
              <span className='value'>28739822</span>
            </p>
            <p>
              <span className='label'>Date</span>
              <span className='value'>02/10/2022</span>
            </p>
            <p>
              <span className='label'>Due Date</span>
              <span className='value'>13/10/2022</span>
            </p>
            <p>
              <span className='label'>Buyer ID</span>
              <span className='value'>INDB2025</span>
            </p>
          </div>
        </div>
        <div className='top__address'>
          <div className='address__bill'>
            <h4>BILL TO</h4>
            <p>Ayush Raj</p>
            <p>302/1160, Trinity enclave , B-Block, HSR Layout Bangalore-Karanataka 560102</p>
          </div>
          <div className='address__pickup'>
            <h4>PICK UP ADDRESS</h4>
            <p>Xyz Ltd.</p>
            <p>11 A/2, Upvan Marg , B-Block, Grant Road Mumbai, Maharashtra 400007</p>
          </div>
        </div>
      </div>
      <div className="pendinginvoice__middle">
        <div className='middle__table'>
          <MUITable
            columns={columns}
            table={tableData}
            options={options}
            className="approve__cart__table"
          />
        </div>
        <div className='middle__tableinfo'>
          <div className='tableinfo__details'>
            <p>Beneficiary Bank</p>
            <p>
              <span className='label'>Bank Name : </span>
              <span className='value'>India Overseas Bank</span>
            </p>
            <p>
              <span className='label'>Bank Address : </span>
              <span className='value'>61/234, HRBR Layout Bangalore - 560043</span>
            </p>
            <p>
              <span className='label'>Account Routing (ABA) : </span>
              <span className='value'>001234587</span>
            </p>
            <p>
              <span className='label'>ACH : </span>
              <span className='value'>001234587</span>
            </p>
            <p>
              <span className='label'>SWIFT/BIC CODE : </span>
              <span className='value'>CNBFUS3M</span>
            </p>
            <p>
              <span className='label'>ACCOUNT NUMBER : </span>
              <span className='value'>32170023400</span>
            </p>
            <p>BENIFICIARY COMPANY</p>
            <p>
              <span className='label'>BENIFICIARY NAME : </span>
              <span className='value'>TEXUB LLC</span>
            </p>
            <p>
              <span className='label'>BENIFICIARY ADDRESS : </span>
              <span className='value'>61/234, HRBR LAYOUT BANGALORE - 560043</span>
            </p>
          </div>
          <div className='tableinfo__orderdata'>
            <p>
              <span className='label'>Sub-Total</span>
              <span className='value'>INR 94,05,510</span>
            </p>
            <p>
              <span className='label'>Tax</span>
              <span className='value'>INR 00.00</span>
            </p>
            <p>
              <span className='label'>Freight</span>
              <span className='value'>INR 00.00</span>
            </p>
            <p>
              <span className='label'>Payment Processing Charge</span>
              <span className='value'>INR 00.00</span>
            </p>
            <p>
              <span className='label'>Total Order value</span>
              <span className='value'>INR 94,05,510</span>
            </p>
            <h5>Remarks</h5>
            <p>FWD & Pick up / R&A International logistics / 61/234, HRBR Layout Bangalore - 560043 DOCS Needed. Provide actual DIMS / provide copy of the invoice and serials, FWD Pick up / R&A internal.</p>
          </div>
        </div>
      </div>
      <div className="pendinginvoice__bottom">
        <div className='bottom__terms'>
          <h4>TERMS & CONDITIONS*</h4>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod temp or invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
        </div>
        <div className='bottom__buttons'>
          <p className='button__cancel'>Cancel</p>
          <p className='button__checkout'>Proceed To Checkout</p>
        </div>
      </div>
    </div>
  )
}

export default Index