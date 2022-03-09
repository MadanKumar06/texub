import React, { useState } from 'react'
// import MUIDataTable from "mui-datatables";
import './styles.scss'
import { Clear } from "@mui/icons-material";
import { Button, Box } from "@mui/material";
const Index = ({ closePOPup }) => {
    // let {
    //     // clear_btn,
    //     // button_signin,
    //     // modal,
    //     button_decline,
    //     button_accept,
    //     button_box,
    // } = classes
    // const [open, setOpen] = useState(true);
    // const options = {
    //     filter: false,
    //     filterType: "popup",
    //     responsive: "column",
    //     selectableRows: "none",
    //     download: false,
    //     print: false,
    //     sort: false,
    //     viewColumns: false,
    //     search: false,
    // };
    // const table = [
    //     {
    //         id: 1,
    //         enquirynumber: "000000006",
    //         buyercode: "BU201201",
    //         partno: "RT-5700U",
    //         modelname: "Lenovo Dpin Yoga..",
    //         productdescription: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.",
    //         maincategory: "Laptop",
    //         quantity: "50",
    //         hub: "Mumbai",
    //         enquirydte: "",
    //         closingdate: "Open",
    //         notes: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.",
    //     },
    // ]

    // const rows = [
    //     { name: "buyercode", label: "Buyer Code" },
    //     { name: "partno", label: "Part Number" },
    //     { name: "modelname", label: "Mobile Name/Number" },
    //     { name: "productdescription", label: "Product Description" },
    //     { name: "maincategory", label: "Main Category" },
    //     { name: "quantity", label: "Quantity" },
    //     { name: "hub", label: "Hub" },
    //     { name: "enquirydte", label: "Enquiry Date" },
    //     { name: "closingdate", label: "Closing Date" },
    //     { name: "notes", label: "Notes" },
    // ]
    return (
        //     <Modal
        //     aria-labelledby="transition-modal-title"
        //     aria-describedby="transition-modal-description"
        //     className={modal}
        //     open={open}
        //     closeAfterTransition
        //     // BackdropComponent={Backdrop}
        //     BackdropProps={{
        //       timeout: 500,
        //     }}
        //   >
        <div className='enquirydetails_main'>
            <div className='enquirydetails_box'>
                <div className='enquirydetails_heading'>
                    <p>Enquiry No.<span> 0000000006</span></p>
                    <Clear onClick={() => closePOPup(false)} />
                </div>
                {/* <MUIDataTable
                title={""}
                data={table}
                columns={rows}
                options={options}
                className="enquirydetails__table"
            /> */}
                <p className='p1'>12 Sellers are viewing at this enquiry right now.</p>
                <div className='enquirydetails_section'>
                    <div className='enquirydetails'>
                        <p className='heading'>Buyer Code</p>        
                        <p className='details'>BU201201</p>
                    </div>
                    <div className='enquirydetails'>
                        <p className='heading'>Part Number</p>
                        <p className='details'>RT-5700U</p>
                    </div>

                    <div className='enquirydetails'>
                        <p className='heading'>Mobile Name/Number</p>
                        <p className='details'>Lenovo Dpin Yoga..</p>
                    </div>
                    <div className='enquirydetails'>
                        <p className='heading'>Product Description</p>
                        <p className='details'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.</p>
                    </div>
                    <div className='enquirydetails'>
                        <p className='heading'>Main Category</p>
                        <p className='details'>Laptop</p>
                    </div>
                    <div className='enquirydetails'>
                        <p className='heading'>Quantity</p>
                        <p className='details'>50</p>
                    </div>
                    <div className='enquirydetails'>
                        <p className='heading'>Hub</p>
                        <p className='details'>Mumbai</p>
                    </div>
                    <div className='enquirydetails'>
                        <p className='heading'>Enquiry Date</p>
                        <p className='details'>12/03/22</p>
                    </div>
                    <div className='enquirydetails'>
                        <p className='heading'>Closing Date</p>
                        <p className='details'>23/03/22</p>
                    </div>
                    <div className='enquirydetails'>
                        <p className='heading'>Notes</p>
                        <p className='details'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.</p>
                    </div>
                    <Box className="button_box">
                        <Button className="button_decline">
                            Decline
                        </Button>
                        <Button className="button_accept">
                            Accept
                        </Button>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Index;