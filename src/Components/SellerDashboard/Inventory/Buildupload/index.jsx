import React, { useState } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import "./styles.scss";
import axios from "axios";
import Constant from "../../../../Constant";
import { useStateValue } from "../../../../store/state";

function Index() {
  const [tableData, setTableDate] = useState(null);
  const [Row, setRow] = useState([]);
  const [{}, dispatch] = useStateValue();
  const fileHandler = (event) => {
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setTableDate({ cols: resp.cols, rows: resp.rows });
        handleJSONCreate(resp.rows);
      }
    });
  };
  const handleJSONCreate = async (rows) => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let requests = [];
    rows.splice(0, 2);
    rows?.map((itm, ind) => {
      if (itm?.length < 15) {
        let customerId = JSON.parse(localStorage.getItem("userdata"));
        let data = {
          product_data: {
            bulkupload: 1,
            customer_id: customerId?.id,
            main_category: itm?.[1],
            other_main_category: "",
            sub_category: itm?.[2],
            other_sub_category: "",
            other_brand_number: "",
            name: itm?.[0],
            texub_product_id: "",
            mgs_brand: itm?.[3],
            hsn_code: itm?.[4],
            sku: itm?.[5],
            upc_number: itm?.[6],
            description: itm?.[7],
          },
        };
        requests.push(
          axios
            .post(Constant.baseUrl() + "/createSellerProduct", data, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then(async (res) => {
              let temp = `Row ${ind} ${res?.data?.[0]?.message}`;

              if (res?.data?.[0]?.status) {
                return Promise.resolve({
                  success_or_error: "success",
                  message: temp,
                });
              } else {
                return Promise.resolve({
                  success_or_error: "error",
                  message: temp,
                });
              }
            })
            .catch((err) => {
              Promise.resolve(false);
              dispatch({
                type: "SET_IS_LOADING",
                value: false,
              });
            })
        );
      } else {
        let customerId = JSON.parse(localStorage.getItem("userdata"));
        let data = {
          data: {
            bulk_upload: 1,
            customer_id: customerId?.id,
            product_id: itm?.[8],
            product_condition: itm?.[18],
            other_condition: itm?.[19],
            warranty_type: itm?.[20],
            warranty_country: itm?.[21],
            warranty_days: itm?.[22],
            packing_details: itm?.[23],
            no_pieces_per: itm?.[24] || itm?.[25],
            width: itm?.[27],
            height: itm?.[28],
            product_length: itm?.[26],
            weight: itm?.[29],
            restrictions: itm?.[30],
            restricted_region: itm?.[32],
            restricted_country: itm?.[31],
            description: itm?.[33],
            product_details: [
              {
                hub_id: itm?.[9],
                currency_id: itm?.[10],
                price: itm?.[11],
                in_stock: itm?.[12],
                eta: itm?.[13],
                moq: itm?.[14],
                cgst: itm?.[15],
                sgst: itm?.[17],
                igst: itm?.[16],
              },
            ],
          },
        };
        requests.push(
          axios
            .post(Constant.baseUrl() + "/saveProductPrice", data, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              let temp = `Row ${ind} ${res?.data?.[0]?.message}`;
              if (res?.data?.[0]?.status) {
                return Promise.resolve({
                  success_or_error: "success",
                  message: temp,
                });
              } else {
                return Promise.resolve({
                  success_or_error: "error",
                  message: temp,
                });
              }
            })
            .catch((err) => {
              Promise.resolve(false);
              dispatch({
                type: "SET_IS_LOADING",
                value: false,
              });
            })
        );
      }
    });

    await Promise.all(requests).then((results) => {
      console.log("All requests finished!", results);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      setRow(results);
    });
  };

  // const BulkUploadOddData = async (OddData) => {
  //   dispatch({
  //     type: "SET_IS_LOADING",
  //     value: true,
  //   });
  //   let requests = [];
  //   let dummyCount = 3;
  //   OddData?.length &&
  //     OddData?.map((itm, ind) => {
  //       let customerId = JSON.parse(localStorage.getItem("userdata"));
  //       let data = {
  //         data: {
  //           bulk_upload: 1,
  //           customer_id: customerId?.id,
  //           product_id: itm?.parentSku,
  //           product_condition: itm?.condition,
  //           other_condition: itm?.other_condition,
  //           warranty_type: itm?.warranty_type,
  //           warranty_country: itm?.warranty_country,
  //           warranty_days: itm?.warranty_days,
  //           packing_details: itm?.packing_details,
  //           no_pieces_per: itm?.pieces_per_pallet || itm?.pieces_per_carton,
  //           width: itm?.product_width,
  //           height: itm?.product_height,
  //           product_length: itm?.product_length,
  //           weight: itm?.product_weight,
  //           restrictions: itm?.restriction,
  //           restricted_region: itm?.restricted_region,
  //           restricted_country: itm?.restricted_country,
  //           description: itm?.special_notes,
  //           product_details: [
  //             {
  //               hub_id: itm?.hub,
  //               currency_id: itm?.currency,
  //               price: itm?.price,
  //               in_stock: itm?.quantity,
  //               eta: itm?.eta,
  //               moq: itm?.moq,
  //               cgst: itm?.cgst,
  //               sgst: itm?.sgst,
  //               igst: itm?.igst,
  //             },
  //           ],
  //         },
  //       };
  //       requests.push(
  //         axios
  //           .post(Constant.baseUrl() + "/saveProductPrice", data, {
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             },
  //           })
  //           .then((res) => {
  //             let temp = `Row ${dummyCount} ${res?.data?.[0]?.message}`;
  //             dummyCount = dummyCount + 2;

  //             if (res?.data?.[0]?.status) {
  //               return Promise.resolve({
  //                 success_or_error: "success",
  //                 message: temp,
  //               });
  //             } else {
  //               return Promise.resolve({
  //                 success_or_error: "error",
  //                 message: temp,
  //               });
  //             }
  //           })
  //           .catch((err) => {
  //             Promise.resolve(false);
  //             dispatch({
  //               type: "SET_IS_LOADING",
  //               value: false,
  //             });
  //           })
  //       );
  //     });
  //   await Promise.all(requests).then((results) => {
  //     console.log("All requests finished!", results);
  //     dispatch({
  //       type: "SET_IS_LOADING",
  //       value: false,
  //     });
  //     setOddRow(results);
  //   });
  // };
  return (
    <div className="bulk_upload">
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
      {Row?.length
        ? Row?.map((itm) => {
            return (
              <div>
                {itm?.success_or_error === "success" ? (
                  <p className="success">{itm?.message}</p>
                ) : (
                  <p className="error">{itm?.message}</p>
                )}
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default Index;
