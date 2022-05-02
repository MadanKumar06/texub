
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

function Index() {
  const [Row, setRow] = useState([]);
  const [{}, dispatch] = useStateValue();
  const [saveuploadFile, setSaveUploadFile] = useState({ files: [] });
  const [uploadFile, setUploadFile] = useState({ files: [] });
  const [choosenFile, setChoosenFile] = useState({});
  const [file, setFile] = useState({});
  const handleUploadApiCall = () => {
    ExcelRenderer(file, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        handleJSONCreate(resp.rows);
      }
    });
  };
  const handleJSONCreate = async (rows) => {
    debugger;
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let requests = [];
    rows.splice(0, 2);
    let RowCount = 3;
    rows?.map((itm) => {
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
