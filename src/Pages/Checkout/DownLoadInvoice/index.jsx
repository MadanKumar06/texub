import React from "react";
const Invoice = () => {
  const onPrint = () => {
    // window.onbeforeprint = function (event) {
    //   debugger;
    //   document.getElementById("pendinginvoice").classList.remove("pendinginvoice");
    //   document
    //     .getElementById("pendinginvoice")
    //     .classList.add("pendinginvoice_no_display");
    // };
    // window.onafterprint = function (event) {
    //   debugger;
    //   document
    //     .getElementById("pendinginvoice")
    //     .classList.remove("pendinginvoice_no_display");
    //   document.getElementById("pendinginvoice").classList.add("pendinginvoice");
    // };
    // debugger;
    // window.print();
  };
  return (
    <div className="checkoutlist__download" onClick={() => onPrint()}>
      <svg
        id="Icon"
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 40 40"
      >
        <rect id="Area" width="40" height="40" fill="#fff" opacity="0" />
        <g id="Icon-2" data-name="Icon" transform="translate(4.5 4.5)">
          <path
            id="Path"
            d="M35.5,22.5v6a3.245,3.245,0,0,1-3.444,3H7.944a3.245,3.245,0,0,1-3.444-3v-6"
            transform="translate(-4.5 -0.5)"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          <path
            id="Path-2"
            data-name="Path"
            d="M10.5,15,20,22.5,29.5,15"
            transform="translate(-4.5 -2.346)"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          <line
            id="Line"
            y1="18"
            transform="translate(15.5)"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />{" "}
        </g>
      </svg>
    </div>
  );
};

export default Invoice;
