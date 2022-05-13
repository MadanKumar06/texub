import React, { useEffect, useState } from "react";
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
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Index() {
  const [Row, setRow] = useState([]);
  //const [{}, dispatch] = useStateValue();
  const [saveuploadFile, setSaveUploadFile] = useState({ files: [] });
  const [uploadFile, setUploadFile] = useState({ files: [] });
  const [choosenFile, setChoosenFile] = useState({});
  const [file, setFile] = useState({});
  const [{ geo, customnostore }, dispatch] = useStateValue();

  const ExportXlsxDetails = async () => {
    const user = JSON.parse(localStorage.getItem("userdata"));
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    try {
      const exportProduct = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/productExport`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          product_data: {
            customer_id: user?.id,
          },
        },
      });

      if (exportProduct?.status === 200) {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        let link = exportProduct?.data?.[0]?.export_file_path;
        window.location.href = link;
      } else {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        swal.fire({
          text: `${exportProduct?.data?.[0]?.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  };
  const handleUploadApiCall = () => {
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });
      let t = workbook.Sheets[workbook.SheetNames?.[3]];
      var key1 = "A1";
      var key2 = "I1";
      delete t[key1];
      delete t[key2];
      var XL_row_object = XLSX.utils.sheet_to_json(t);

      handleJSONCreate(XL_row_object);
    };
    reader.readAsBinaryString(file);
  };
  const handleJSONCreate = async (rows) => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let requests = [];
    let RowCount = 3;
    rows.splice(0, 1);
    rows?.map((itm) => {
      if (
        itm?.__EMPTY ||
        itm?.__EMPTY_1 ||
        itm?.__EMPTY_2 ||
        itm?.__EMPTY_3 ||
        itm?.__EMPTY_4 ||
        itm?.__EMPTY_5 ||
        itm?.__EMPTY_6 ||
        itm?.__EMPTY_7
      ) {
        let customerId = JSON.parse(localStorage.getItem("userdata"));
        let data = {
          product_data: {
            bulkupload: 1,
            customer_id: customerId?.id,
            main_category: itm?.__EMPTY_1,
            other_main_category: "",
            sub_category: itm?.__EMPTY_2,
            other_sub_category: "",
            other_brand_number: "",
            name: itm?.__EMPTY,
            texub_product_id: "",
            mgs_brand: itm?.__EMPTY_3,
            hsn_code: itm?.__EMPTY_4,
            sku: itm?.__EMPTY_5,
            upc_number: itm?.__EMPTY_6,
            description: itm?.__EMPTY_7,
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
      } else if (
        itm?.__EMPTY_8 ||
        itm?.__EMPTY_9 ||
        itm?.__EMPTY_10 ||
        itm?.__EMPTY_11 ||
        itm?.__EMPTY_12 ||
        itm?.__EMPTY_13 ||
        itm?.__EMPTY_14 ||
        itm?.__EMPTY_15 ||
        itm?.__EMPTY_16 ||
        itm?.__EMPTY_17 ||
        itm?.__EMPTY_18 ||
        itm?.__EMPTY_19 ||
        itm?.__EMPTY_20 ||
        itm?.__EMPTY_21 ||
        itm?.__EMPTY_22
      ) {
        let customerId = JSON.parse(localStorage.getItem("userdata"));
        let data = {
          data: {
            bulk_upload: 1,
            customer_id: customerId?.id,
            product_id: itm?.__EMPTY_8,
            product_condition: itm?.__EMPTY_18,
            other_condition: itm?.__EMPTY_19,
            warranty_type: itm?.__EMPTY_20,
            warranty_country: itm?.__EMPTY_21,
            warranty_days: itm?.__EMPTY_22,
            packing_details: itm?.__EMPTY_23,
            no_pieces_per: itm?.__EMPTY_25 || itm?.__EMPTY_24,
            width: itm?.__EMPTY_27,
            height: itm?.__EMPTY_28,
            product_length: itm?.__EMPTY_26,
            weight: itm?.__EMPTY_29,
            restrictions: itm?.__EMPTY_30,
            restricted_region: itm?.__EMPTY_31,
            restricted_country: itm?.__EMPTY_32,
            description: itm?.__EMPTY_33,
            product_details: [
              {
                hub_id: itm?.__EMPTY_9,
                currency_id: itm?.__EMPTY_10,
                price: itm?.__EMPTY_11,
                in_stock: itm?.__EMPTY_12,
                eta: itm?.__EMPTY_13,
                moq: itm?.__EMPTY_14,
                cgst: itm?.__EMPTY_15,
                sgst: itm?.__EMPTY_17,
                igst: itm?.__EMPTY_16,
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
    // setSaveUploadFile({ files: [...uploadFile?.files, ...event.target.files] });
    setSaveUploadFile({ files: [...event.target.files] });
  };
  const handleSaveFile = () => {
    setRow([]);
    setFile({});
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

  const [samplefile, setsamplefile] = useState();
  useEffect(async () => {
    try {
      const sample = await axios({
        method: "get",
        url: `${Constant?.baseUrl()}/getBulkUploadFile`,
      });
      setsamplefile(sample?.data[0]?.bulkupload_sample);
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div className="bulk_upload">
      <div className="bulkUpload_container">
        <p className="title">Bulk Upload</p>
      </div>
      <div className="first_container">
        <p className="bulk_download">BULK DOWNLOAD</p>
        <p
          className="bulk_download_example"
          onClick={() => ExportXlsxDetails()}
        >
          Download XLSX Uploaded Product
        </p>
        <div className="image">
          <img src={downnload_image} alt="download" />
        </div>
      </div>

      <div className="first_container direction">
        <div className="download_content">
          <p className="bulk_download">BULK UPLOAD</p>
          <div className="bulk_xlsx_sample">
            <span className="bulk_xlsx_example">Example XLSX File</span>
            <div className="image">
              <img src={question_image} alt="question" />
            </div>

            <a
              className="bulk_download_example link"
              href={samplefile}
              download="Example.Xlsx"
            >
              Example.Xlsx{" "}
              <div className="image">
                <img src={downnload_image} alt="download" />
              </div>
            </a>
          </div>
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
        <div className="check_scroll">
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
      <Link
        className="inventory-page-back"
        to={`/${
          customnostore ? customnostore : geo?.country_name
        }/sellerdashboard/inventory`}
      >
        <ArrowBackIosNew />
        <span>Back</span>
      </Link>
    </div>
  );
}

export default Index;
