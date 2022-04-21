import React, { useState } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import "./styles.scss";
import * as XLSX from "xlsx";

function Index() {
  const [tableData, setTableDate] = useState(null);
  const fileHandler = (event) => {
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setTableDate({ cols: resp.cols, rows: resp.rows });
        console.log({ cols: resp.cols, rows: resp.rows });
      }
    });
    // var reader = new FileReader();

    // reader.onload = function (e) {
    //   var data = e.target.result;
    //   var workbook = XLSX.read(data, {
    //     type: "binary",
    //   });

    //   // Here is your object
    //   debugger;
    //   var object = XLSX.utils;

    //   var XL_row_object = XLSX.utils.sheet_to_json(
    //     workbook.Sheets[workbook.SheetNames?.[3]]
    //   );
    //   // var json_object = JSON.stringify(XL_row_object);
    //   // console.log(JSON.parse(json_object));
    //   console.log(XL_row_object);
    //   debugger;
    // };

    // reader.onerror = function (ex) {
    //   console.log(ex);
    // };

    // reader.readAsBinaryString(fileObj);
  };
  return (
    <div className="bulkUpload_container">
      <button>
        <a href="/LiveSheetFinal.xlsx" download="LiveSheetFinal.xlsx">
          Download Sample File
        </a>
      </button>
      <input
        type="file"
        accept=".xlsx"
        onChange={fileHandler}
        style={{ padding: "10px" }}
      />
      {tableData && (
        <div className="table_container">
          <OutTable
            data={tableData?.rows}
            columns={tableData?.cols}
            tableClassName="ExcelTable2007"
            tableHeaderRowClass="heading"
          />
        </div>
      )}
    </div>
  );
}

export default Index;
