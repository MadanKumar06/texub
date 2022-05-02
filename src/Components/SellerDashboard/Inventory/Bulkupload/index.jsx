import React, { useState } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import "./styles.scss";
import { Button, TextField, Autocomplete } from "@mui/material";
import { Clear } from "@mui/icons-material";
import axios from "axios";
import Constant from "../../../../Constant";
import downnload_image from "../../../../Assets/CommonImage/download.png";
import question_image from "../../../../Assets/CommonImage/question.png";
import { useStateValue } from "../../../../store/state";
import swal from "sweetalert2";
import XLSX from "xlsx";

function Index() {
  const [Row, setRow] = useState([]);
  const [{}, dispatch] = useStateValue();
  const [saveuploadFile, setSaveUploadFile] = useState({ files: [] });
  const [uploadFile, setUploadFile] = useState({ files: [] });
  const [choosenFile, setChoosenFile] = useState({});
  const [file, setFile] = useState({});
  const handleUploadApiCall = () => {
    // ExcelRenderer(file, (err, resp) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     handleJSONCreate(resp.rows);
    //   }
    // });
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });
      var XL_row_object = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames?.[3]]
      );
      handleJSONCreate(XL_row_object);
    };
    reader.readAsBinaryString(file);
  };
  const handleJSONCreate = async (rows) => {
    // dispatch({
    //   type: "SET_IS_LOADING",
    //   value: true,
    // });
    var result = rows?.map(function (o) {
      return convert(o);
    });
    function convert(obj) {
      const result = {};
      Object.keys(obj).forEach(function (key) {
        result[key.replace(/ /g, "_")] = obj[key];
      });

      return result;
    }
    let requests = [];
    let RowCount = 3;
    result?.map((itm) => {
      if (itm?.Brand || itm?.Description) {
        debugger;
        let customerId = JSON.parse(localStorage.getItem("userdata"));
        let data = {
          product_data: {
            bulkupload: 1,
            customer_id: customerId?.id,
            main_category: itm?.Main_Category,
            other_main_category: "",
            sub_category: itm?.Sub_Category,
            other_sub_category: "",
            other_brand_number: "",
            name: itm?.Model_Number,
            texub_product_id: "",
            mgs_brand: itm?.Brand,
            hsn_code: itm?.HSN_Code,
            sku: itm?.Sku,
            upc_number: itm?.UPC_Number,
            description: itm?.Description,
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
              let temp = `Row ${RowCount} ${res?.data?.[0]?.message}`;
              RowCount = RowCount + 1;
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
        debugger;
        let customerId = JSON.parse(localStorage.getItem("userdata"));
        let data = {
          data: {
            bulk_upload: 1,
            customer_id: customerId?.id,
            product_id: itm?.Parent_Product_Sku,
            product_condition: itm?.Condition,
            other_condition: itm?.Other_Condition,
            warranty_type: itm?.Warranty_Type,
            warranty_country: itm?.Warranty_Country,
            warranty_days: itm?.Warranty_Days,
            packing_details: itm?.Packing_Details,
            no_pieces_per: itm?.Pieces_Per_Carton || itm?.Pieces_Per_Pallet,
            width: itm?.Product_Width,
            height: itm?.Product_Height,
            product_length: itm?.Product_Length,
            weight: itm?.Product_Weight,
            restrictions: itm?.Restriction,
            restricted_region: itm?.Restriction_Region,
            restricted_country: itm?.Restriction_Country,
            description: itm?.Special_Notes,
            product_details: [
              {
                hub_id: itm?.Hub,
                currency_id: itm?.Currency,
                price: itm?.Price,
                in_stock: itm?.Quantity,
                eta: itm?.Eta,
                moq: itm?.Moq,
                cgst: itm?.Cgst,
                sgst: itm?.Sgst,
                igst: itm?.Igst,
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
              let temp = `Row ${RowCount} ${res?.data?.[0]?.message}`;
              RowCount = RowCount + 1;
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
              Promise.resolve({
                success_or_error: "error",
                message: err.response.data.message,
              });
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
  const fileHandler = (event) => {
    setChoosenFile(event?.target?.files[0]);
    setSaveUploadFile({ files: [...uploadFile?.files, ...event.target.files] });
  };
  const handleSaveFile = () => {
    if (choosenFile !== "") {
      swal.fire({
        text: `File has been uploaded successfully`,
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
      setChoosenFile("");
      setUploadFile(saveuploadFile);
    }
  };
  console.log(uploadFile);
  return (
    <div className="bulk_upload">
      <div className="bulkUpload_container">
        <p className="title">Bulk Upload</p>
      </div>
      <div className="first_container">
        <p className="bulk_download">BULK DOWNLOAD</p>
        <p className="bulk_download_example">Download XLSX Uploaded Product</p>
        <div className="image">
          <img src={downnload_image} alt="download" />
        </div>
      </div>

      <div className="first_container direction">
        <div className="download_content">
          <p className="bulk_download">BULK UPLOAD</p>
          <span className="bulk_xlsx_example">Example XLSX File</span>
          <div className="image">
            <img src={question_image} alt="question" />
          </div>

          <a
            className="bulk_download_example link"
            href="/LiveSheetFinal.xlsx"
            download="LiveSheetFinal.xlsx"
          >
            Example.Xlsx{" "}
            <div className="image">
              <img src={downnload_image} alt="download" />
            </div>
          </a>
        </div>

        <div className="upload_file_container">
          <p>
            <label>Upload File</label> <span>(Supported format : XLSX)</span>
          </p>
          <div className="file_upload">
            <div className="input_image_name">
              {choosenFile?.name ? (
                <p>{choosenFile?.name}</p>
              ) : (
                <label
                  className="sub_media_upload_label"
                  htmlFor="icon-button-file"
                >
                  <input
                    id="icon-button-file"
                    type="file"
                    name="xlxs_files"
                    multiple
                    accept=".xlsx"
                    onChange={fileHandler}
                    style={{ padding: "10px" }}
                  />
                  <p>No File Chosen</p>
                </label>
              )}
              <Clear
                className="input_image_name_clear_btn"
                onClick={() => setChoosenFile("")}
              />
            </div>
            <Button
              className="button-text btn-secondary btn"
              onClick={() => handleSaveFile()}
            >
              Upload
            </Button>
          </div>
        </div>
        <div className="upload_file_container">
          <p>Validate File</p>
          <div className="inputfields">
            <Autocomplete
              value={file}
              disablePortal={true}
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, newValue) => {
                setFile(newValue);
              }}
              options={uploadFile?.files?.length ? uploadFile?.files : []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="inputfield-box"
                  placeholder="Select Uploaded File"
                  fullWidth
                  InputLabelProps={{
                    shrink: false,
                  }}
                />
              )}
            />
            <Button
              className="button-text btn-secondary validate_btn"
              onClick={(event) => handleUploadApiCall(event)}
            >
              Validate File
            </Button>
          </div>
        </div>
      </div>
      <div className="validation_message">
        {Row?.length
          ? Row?.map((itm, ind) => {
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
    </div>
  );
}

export default Index;
