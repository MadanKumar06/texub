import React, { useState } from 'react'
import './styles.scss'
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import Enquirydetails from '../../SellerDashboard/Directenqueries/Enquirydetails'


const Index = () => {

  const [isUopup,setisUopup] = useState(false)
  const Popup =() =>{
    setisUopup(true)
    console.log(isUopup)

  }
//   const ordertype = [
//     { name: "All Transaction" },
//     { name: "Open PO " },
//     { name: "Payment Done " },
//   ];

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
      transactionmode:"Offline Payment" ,
      status: "Failed",
      action: "View Details",
    },    
  ];

  const columns = [
    {
      name: "orderid",
      label: "Order ID",
      options: {
        customBodyRender: (value) => {
          return <div className="po__order_id">{value}</div>;
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
        return <div className="po__order_id">{value}</div>;
      },
    },
    },
    {
      name: "amount",
      label: "Amount",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="po_amount">
              <div className="po_product_amount">{value?.name}</div>
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
                  ? "po__failed"
                  : value === "Accepted"
                    ? "po__accepted"
                    : value === "Success"
                      ? "po__success"
                      : value === "Pending" && "po__pending"
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
    <div className="po_container">
      {/* <div className="paymentmethod__buttons">
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
      </div> */}

      <MUIDataTable
        
        title={""}
        data={table}
        columns={columns}
        options={options}
        className="po__table"
      />
      {isUopup && <Enquirydetails closePOPup={setisUopup}/> }

      <div className="po__footer">
        <div className="po__container">
          <Link to="/sellerdashboard/dashboard">
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
          {/* <Button className="rma_btn">Request RMA</Button> */}
        </div>
      </div>
    </div>
  );
}


export default Index;