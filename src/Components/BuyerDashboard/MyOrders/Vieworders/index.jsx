import React from 'react'
import './styles.scss'
import MUITable from '../../../MUITable'
import image from '../../../../Assets/buyerdashboard/auctions/hp.png'
import { shippingaddress, billingaddress, total ,totalamount} from './viewordersjson'
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
          productname: {
              
              modal:"Pavilion Model14-Dv0054Tu",
              content:"Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)",
          },
        sku: "SK-3102",
        quantity: "50",
        unitprice: "66,999/",
        subtotal: "33,44,950/",

    },
]
const columns = [
    {
        name: "productname",
        label: "PRODUCT NAME",
        options: {
            customBodyRender: (value) => {
                return (
                    <div className="productname">
                        <img src={image} alt='' className='image'></img>
                        <div className="product">
                            <span className='modal_name'>{value?.modal}</span>
                            <span className='modal_content'>{value?.content}</span>
                            
                           
                        </div>
                        
                    </div>
                );
            },
        },
    },
    {
        name: "sku",
        label: "SKU",
        options: {
            customBodyRender: (value) => {
                return <div className="vieworers_sky">{value}</div>;
            },
        },
    },
    {
        name: "quantity",
        label: "QUANTITY",
        options: {
            customBodyRender: (value) => {
                return <div className="vieworders_quantity">{value}</div>;
            },
        },
    },
    {
        name: "unitprice",
        label: "UNIT PRICE",
        options: {
            customBodyRender: (value) => {
                return <div className="vieworders_price">
                    <span className='inr'>INR</span>
                    <span className='price'>{value}</span>
                    <span className='inr'>unit</span>
                </div>;
            },
        },
    },
    {
        name: "subtotal",
        label: "SUB-TOTAL",
        options: {
            customBodyRender: (value) => {
                return <div className="vieworders_total">
                    <span className='inr'>INR</span>
                    <span className='price'>{value}</span>
                    <span className='inr'>unit</span>
                </div>;
            },
        },
    },
]
const Index = () => {
    return (
        <div className='vieworders_main'>
            <div className='vieworders_heading_section'>
                <p className='id_heading'>Order ID #</p>
                <p className='id'>000000021</p>
                <span><p className='status'>Confirm</p></span>
            </div>
            <MUITable columns={columns} table={table}
                options={options}
                className="vieworders__table" />
            {/* <hr></hr>     */}
            <div className='vieworders_detail_section'>
                <p className='heading'>Order Details</p>
                <div className='details'>
                    <div className='hr_line'>
                        <hr></hr>
                    </div>
                    <div className='vieworder_address'>
                        <div className='address_section'>
                        <div className='vieworders_shippingaddress_section'>
                            <div className='vieworders_shippingaddress'>
                                {shippingaddress.map((item) => (
                                    <li key={item.id} className="vieworders_list">
                                        <span className='heading'>{item.heading}</span>
                                        <span className='name'> {item.name}</span>
                                        <span className='address'>{item.address}</span>


                                    </li>
                                ))}
                            </div>
                            <div className='vieworders_payment_section'>
                                <p className='payment_heading'>Shipping Method</p>
                                <p className='payment_type'>Flat Rate-Fixed</p>
                            </div>
                        </div>
                        <div className='vieworders_shippingaddress_section'>
                            <div className='vieworders_shippingaddress'>
                                {billingaddress.map((item) => (
                                    <li key={item.id} className="vieworders_list">
                                        <span className='heading'>{item.heading}</span>
                                        <span className='name'> {item.name}</span>
                                        <span className='address'>{item.address}</span>
                                    </li>
                                ))}
                            </div>
                            <div className='vieworders_payment_section'>
                                <p className='payment_heading'>Payment Method</p>
                                <p className='payment_type'>Check (Off-Line)</p>
                            </div>
                        </div>
                        </div>
                        <div className='vieworders_total'>
                            {total.map((item) => (
                                <li key={item.id} className="vieworders_list">
                                   <span className='total_heading'> {item.subtotal}</span>
                                    <span className='total_amount'><span className='currency'>INR</span>{item.amount}</span>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                </li>
                            ))}
                            <hr className='hr'></hr>
                            {totalamount.map((item) => (
                                <li key={item.id} className="vieworders_list">
                                   <div className='taxes'>
                                   <span className='total_amount_heading'> {item.subtotal} </span>
                                     <span className='gst'>(incl.GST)</span>
                                     </div> 
                                    <span className='total_amount'><span className='currency'>INR</span>{item.amount}</span>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                </li>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Index;