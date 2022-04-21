import React from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";

function index() {
  const fileHandler = (event) => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        console.log({ cols: resp.cols, rows: resp.rows });
      }
    });
  };
  return (
    <input type="file" onChange={fileHandler} style={{ padding: "10px" }} />
  );
}

export default index;
