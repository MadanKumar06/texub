import React, { useState } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import "./styles.scss";
import * as XLSX from "xlsx";
import axios from "axios";
import Constant from "../../../../Constant";
import swal from "sweetalert2";

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
        handleJSONCreate(resp.cols, resp.rows);
      }
    });

    const handleJSONCreate = (cols, rows) => {
      var arrRowEven = [],
        arrRowOdd = [];
      for (var i = 0, length = rows.length; i < length; i++) {
        if (i % 2 === 0) {
          arrRowEven.push(rows[i]);
        } else {
          arrRowOdd.push(rows[i]);
        }
      }
      arrRowEven.shift();
      console.log(arrRowEven);
      arrRowOdd.shift();
      console.log(arrRowOdd);
      let EventData =
        arrRowEven?.length &&
        arrRowEven?.map((itm) => ({
          model_number: itm?.[0],
          main_category: itm?.[1],
          sub_category: itm?.[2],
          brand: itm?.[3],
          hsn_code: itm?.[4],
          sku: itm?.[5],
          upc_number: itm?.[6],
          description: itm?.[7],
        }));

      let OddData =
        arrRowOdd?.length &&
        arrRowOdd?.map((itm) => ({
          parentSku: itm?.[0],
          hub: itm?.[1],
          currency: itm?.[2],
          price: itm?.[3],
          quantity: itm?.[4],
          eta: itm?.[5],
          moq: itm?.[6],
          cgst: itm?.[7],
          igst: itm?.[8],
          sgst: itm?.[9],
          condition: itm?.[10],
          other_condition: itm?.[11],
          warranty_type: itm?.[12],
          warranty_country: itm?.[13],
          warranty_days: itm?.[14],
          packing_details: itm?.[15],
          pieces_per_pallet: itm?.[16],
          pieces_per_carton: itm?.[17],
          product_length: itm?.[18],
          product_width: itm?.[19],
          product_height: itm?.[20],
          product_weight: itm?.[21],
          restriction: itm?.[22],
          restriction_country: itm?.[23],
          restriction_region: itm?.[24],
          special_notes: itm?.[25],
        }));
      BulkUploadEvenData(EventData);
    };

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
  const [errorEvenData, setErrorEvenData] = useState([]);
  const BulkUploadEvenData = (EventData) => {
    EventData?.length &&
      EventData?.map((itm) => {
        let customerId = JSON.parse(localStorage.getItem("userdata"));
        let data = {
          product_data: {
            bulkupload: 1,
            customer_id: customerId?.id,
            main_category: itm?.main_category,
            other_main_category: "",
            sub_category: itm?.sub_category,
            other_sub_category: "",
            other_brand_number: "",
            name: itm?.model_number,
            texub_product_id: "",
            mgs_brand: itm?.brand,
            hsn_code: itm?.hsn_code,
            sku: itm?.sku,
            upc_number: itm?.upc_number,
            description: itm?.description,
          },
        };
        axios
          .post(Constant.baseUrl() + "/createSellerProduct", data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            debugger;
            setErrorEvenData((prev) => ({
              ...prev,
              response: res,
            }));
          })
          .catch((err) => {});
      });
  };

  console.log(errorEvenData);
  debugger;
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
