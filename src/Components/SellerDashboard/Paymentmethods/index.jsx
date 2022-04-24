import React, { useState } from 'react'
import './styles.scss'
import MUITable from '../../Common/MUITable'
import { Link } from "react-router-dom";
import {useStateValue} from '../../../store/state'
import { ArrowBackIosNew } from "@mui/icons-material";
import Enquirydetails from '../../SellerDashboard/Directenqueries/Enquirydetails'
import paypal_image from '../../../Assets/sellerdashboard/dashboard/paypal (1).png'
import braintree_image from '../../../Assets/sellerdashboard/dashboard/paypal (1).png'

const Index = () => {
  const [{geo, customstore}, dispatch] = useStateValue()
  const [isUopup,setisUopup] = useState(false)
  const Popup =() =>{
    setisUopup(true)
  }
  const ordertype = [
    { name: "All Transaction" },
    { name: "Open PO " },
    { name: "Payment Done " },
  ];

  const [type, settype] = useState(0);

  const selectorder = (value) => {
    settype(value);
  };

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
      orderid: "000000006",
      date: "11/03/22",
      transactionid: "VADEOB248934",
      amount: {
        name: "207,999",
      },
      transactionmode: "Offline Payment",
      status: "Pending",
      action: "View Details",
    },
    {
      orderid: "000000006",
      date: "11/03/22",
      transactionid: "VADEOB248934",
      amount: {
        name: "207,999",
      },
      transactionmode:paypal_image ,
      status: "Failed",
      action: "View Details",
    },
    {
      orderid: "000000006",
      date: "11/03/22",
      transactionid: "VADEOB248934",
      amount: {
        name: "207,999",
      },
      transactionmode: braintree_image,
      status: "Success",
      action: "View Details",
    },
    {
      orderid: "000000006",
      date: "11/03/22",
      transactionid: "VADEOB248934",
      amount: {
        name: "207,999",
      },
      transactionmode: "Offline Payment",
      status: "Pending",
      action: "View Details",
    },
    {
      orderid: "000000006",
      date: "11/03/22",
      transactionid: "VADEOB248934",
      amount: {
        name: "207,999",
      },
      transactionmode: paypal_image,
      status: "Success",
      action: "View Details",
    },
    
  ];

  const columns = [
    {
      name: "orderid",
      label: "Order ID",
      options: {
        customBodyRender: (value) => {
          return <div className="paymentmethod__order_id">{value}</div>;
        },
      },
    },
    {
      name: "date", label: "Date",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="return_quantity">
              <span className="value">{value}</span>
            </div>
          );
        },
      },
    },
    { name: "transactionid", label: "Transaction ID",
    options: {
      customBodyRender: (value) => {
        return <div className="paymentmethod__order_id">{value}</div>;
      },
    },
    },
    {
      name: "amount",
      label: "Amount",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="paymentmethod_amount">
              <div className="paymentmethod_product_amount">{value?.name}</div>
            </div>
          );
        },
      },
    },
    {
      name: "transactionmode",
      label: "Transaction Mode",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="return_quantity">
              <img src={braintree_image} alt=''></img>
            </div>
          );
        },
      },
    },
    
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <div
              className={`${value === "Failed"
                  ? "paymentmethod__failed"
                  : value === "Accepted"
                    ? "paymentmethod__accepted"
                    : value === "Success"
                      ? "paymentmethod__success"
                      : value === "Pending" && "paymentmethod__pending"
                } `}
            >
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="actions" onClick={() => Popup()}
            >
              <span className="value">{value}</span>
            </div>
          );
        },
      },
    },
    
  ];

  return (
    <div className="paymentmethod_container">
      <div className="paymentmethod__footer">
        <div className="paymentmethod__container">
          <Link to={`/${customstore ? customstore : geo?.country_name}/sellerdashboard/dashboard`}>
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
          {/* <Button className="rma_btn">Request RMA</Button> */}
        </div>
      </div>
      
      <div className="paymentmethod__buttons">
        {ordertype.map((data, i) => (
          <div className="paymentmethod__btton_content">
            <p
              className={`paymentmethodtypes ${type === i && "paymentmethod__selected"}`}
              key={i}
              onClick={() => selectorder(i)}
            >
              
              {data.name}
            </p>
            
          </div>
        ))}
      </div>

      <MUITable columns={columns} table={table} options={options} className="paymentmethod__table" />
      {isUopup && <Enquirydetails closePOPup={setisUopup}/> }

      
    </div>
  );
}


export default Index;