import React,{useState} from 'react'
import './styles.scss'
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";

 const Index = () => {
  
    const ordertype = [
      { name: "All Enquiries" },
      { name: "Open Enquiries " },
      { name: "Accepted Enquiries " },
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
        order: "000000006",
        date: "BU201201",
        seller_id: "RT-5700U",
        product_details: {
          name: "Lenovo Dpin Yoga..",
        },
        return_quantity: "Mumbai",
        status: "Completed",
        action:"View Details",
      },
      {
        order: "0000000021",
        date: "BU201201",
        seller_id: "RT-5700U",
        product_details: {
          name: "Acer Sf314-42 Swift 3...",
        },
        return_quantity: "Mumbai",
        status: "Rejected",
        action:"View Details",
      },
      {
        order: "0000000022",
        date: "BU201201",
        seller_id: "RT-5700U",
        product_details: {
          name: "Apple Macbook Pro...",

        },
        return_quantity: "Mumbai",
        status: "Pending",
        action:"View Details",
      },
      {
        order: "0000000023",
        date: "BU201201",
        seller_id: "RT-5700U",
        product_details: {
          name: "Hp Business Laptop...",
        },
        return_quantity: "Mumbai",
        status: "Accepted",
        action:"View Details",
      },
      // {
      //   order: "0000000024",
      //   date: "BU201201",
      //   seller_id: "RT-5700U",
      //   product_details: {
      //     name: "Hp Business Laptop...",
      //   },
      //   return_quantity: "Mumbai",
      //   status: "Accepted",
      //   action:"View Details",
      // },
    ];
  
    const columns = [
      {
        name: "order",
        label: "Enq. No.",
        options: {
          customBodyRender: (value) => {
            return <div className="rma__order_id">{value}</div>;
          },
        },
      },
      { name: "date", label: "Buyer Code" },
      { name: "seller_id", label: "Part No." },
      {
        name: "product_details",
        label: "Model Name/No.",
        options: {
          customBodyRender: (value) => {
            return (
              <div className="rma_products">
                
                <div className="rma_product_name">{value?.name}</div>
              </div>
            );
          },
        },
      },
      {
        name: "seller_id",
        label: "Qty.",
      },
      {
        name: "return_quantity",
        label: "Hub",
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
      {
        name: "status",
        label: "Status",
        options: {
          customBodyRender: (value) => {
            return (
              <div
                className={`${
                  value === "Completed"
                    ? "rma__completed"
                    : value === "Accepted"
                    ? "rma__accepted"
                    : value === "Rejected"
                    ? "rma__rejected"
                    : value === "Pending" && "rma__pending"
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
              <div
                className={`${
                  value === "Completed"
                    ? "rma__completed"
                    : value === "Accepted"
                    ? "rma__accepted"
                    : value === "Rejected"
                    ? "rma__rejected"
                    : value === "Pending" && "rma__pending"
                } `}
              >
                {value}
              </div>
            );
          },
        },
      },
    ];
  
    return (
      <div className="rma_container">
        <div className="rma__buttons">
          {ordertype.map((data, i) => (
            <div className="rma__btton_content">
              <p
                className={`rmatypes ${type === i && "rmatype__selected"}`}
                key={i}
                onClick={() => selectorder(i)}
              >
                {data.name}
              </p>
            </div>
          ))}
        </div>
  
        <MUIDataTable
          title={""}
          data={table}
          columns={columns}
          options={options}
          className="rma__table"
        />
  
        <div className="rma__footer">
          <div className="rma__container">
            <Link to="/buyerdashboard/dashboard">
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