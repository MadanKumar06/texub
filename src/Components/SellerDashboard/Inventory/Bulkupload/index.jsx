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
  const [Row, setRow] = useState([{ Validation: "", ErrorAndSuccess: "" }]);
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
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  };
  const handleUploadApiCall = () => {
    setRow([{ Validation: "", ErrorAndSuccess: "" }]);
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });
      let t = workbook.Sheets[workbook.SheetNames?.[3]];
      var key1 = "A1";
      var key2 = "H1";
      delete t[key1];
      delete t[key2];
      var XL_row_object = XLSX.utils.sheet_to_json(t);
      handleBulkUpload(XL_row_object);
    };
    reader.readAsBinaryString(file);
  };

  async function handleBulkUpload(rows) {
    rows.splice(0, 1);
    for (let i = 0; i < rows?.length; i++) {
      handleJSONCreate(rows, i);
    }
  }

  const handleJSONCreate = async (rows, i) => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let Count = i + 3;
    if (
      rows[i]?.__EMPTY ||
      rows[i]?.__EMPTY_1 ||
      rows[i]?.__EMPTY_2 ||
      rows[i]?.__EMPTY_3 ||
      rows[i]?.__EMPTY_4 ||
      rows[i]?.__EMPTY_5 ||
      rows[i]?.__EMPTY_6
    ) {
      let customerId = JSON.parse(localStorage.getItem("userdata"));
      let data = {
        product_data: {
          bulkupload: 1,
          customer_id: customerId?.id,
          main_category: rows[i]?.__EMPTY_1,
          other_main_category: "",
          sub_category: rows[i]?.__EMPTY_2,
          other_sub_category: "",
          other_brand_number: "",
          name: rows[i]?.__EMPTY,
          texub_product_id: "",
          mgs_brand: rows[i]?.__EMPTY_3,
          sku: rows[i]?.__EMPTY_4,
          upc_number: rows[i]?.__EMPTY_5,
          description: rows[i]?.__EMPTY_6,
        },
      };
      await axios
        .post(Constant.baseUrl() + "/createSellerProduct", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          let temp = `Row ${Count} ${res?.data?.[0]?.message}`;
          if (res?.data?.[0]?.status) {
            setRow((prev) => [
              ...prev,
              { Validation: temp, ErrorAndSuccess: "success" },
            ]);
          } else {
            setRow((prev) => [
              ...prev,
              { Validation: temp, ErrorAndSuccess: "error" },
            ]);
          }
          dispatch({
            type: "SET_IS_LOADING",
            value: false,
          });
        })
        .catch((err) => {
          dispatch({
            type: "SET_IS_LOADING",
            value: false,
          });
        });
    } else if (
      rows[i]?.__EMPTY_7 ||
      rows[i]?.__EMPTY_8 ||
      rows[i]?.__EMPTY_9 ||
      rows[i]?.__EMPTY_10 ||
      rows[i]?.__EMPTY_11 ||
      rows[i]?.__EMPTY_12 ||
      rows[i]?.__EMPTY_13 ||
      rows[i]?.__EMPTY_14 ||
      rows[i]?.__EMPTY_15 ||
      rows[i]?.__EMPTY_16 ||
      rows[i]?.__EMPTY_17 ||
      rows[i]?.__EMPTY_18 ||
      rows[i]?.__EMPTY_19 ||
      rows[i]?.__EMPTY_20 ||
      rows[i]?.__EMPTY_21 ||
      rows[i]?.__EMPTY_22
    ) {
      let customerId = JSON.parse(localStorage.getItem("userdata"));
      let data = {
        data: {
          bulk_upload: 1,
          customer_id: customerId?.id,
          hsn_code: rows[i]?.__EMPTY_8,
          product_id: rows[i]?.__EMPTY_7,
          product_condition: rows[i]?.__EMPTY_18,
          other_condition: rows[i]?.__EMPTY_19,
          warranty_type: rows[i]?.__EMPTY_20,
          warranty_country: rows[i]?.__EMPTY_21,
          warranty_days: rows[i]?.__EMPTY_22,
          packing_details: rows[i]?.__EMPTY_23,
          no_pieces_per: rows[i]?.__EMPTY_25 || rows[i]?.__EMPTY_24,
          width: rows[i]?.__EMPTY_27,
          height: rows[i]?.__EMPTY_28,
          product_length: rows[i]?.__EMPTY_26,
          weight: rows[i]?.__EMPTY_29,
          restrictions: rows[i]?.__EMPTY_30,
          restricted_region: rows[i]?.__EMPTY_31,
          restricted_country: rows[i]?.__EMPTY_32,
          description: rows[i]?.__EMPTY_33,
          product_details: [
            {
              hub_id: rows[i]?.__EMPTY_9,
              currency_id: rows[i]?.__EMPTY_10,
              price: rows[i]?.__EMPTY_11,
              in_stock: rows[i]?.__EMPTY_12,
              eta: rows[i]?.__EMPTY_13,
              moq: rows[i]?.__EMPTY_14,
              cgst: rows[i]?.__EMPTY_15,
              sgst: rows[i]?.__EMPTY_17,
              igst: rows[i]?.__EMPTY_16,
            },
          ],
        },
      };

      await axios
        .post(Constant.baseUrl() + "/saveProductPrice", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          let temp = `Row ${Count} ${res?.data?.[0]?.message}`;
          if (res?.data?.[0]?.status) {
            setRow((prev) => [
              ...prev,
              { Validation: temp, ErrorAndSuccess: "success" },
            ]);
          } else {
            setRow((prev) => [
              ...prev,
              { Validation: temp, ErrorAndSuccess: "error" },
            ]);
          }
          dispatch({
            type: "SET_IS_LOADING",
            value: false,
          });
        })
        .catch((err) => {
          dispatch({
            type: "SET_IS_LOADING",
            value: false,
          });
        });
    }
  };
  const fileHandler = (event) => {
    setChoosenFile(event?.target?.files[0]);
    // setSaveUploadFile({ files: [...uploadFile?.files, ...event.target.files] });
    setSaveUploadFile({ files: [...event.target.files] });
  };
  const handleSaveFile = () => {
    setRow([{ Validation: "", ErrorAndSuccess: "" }]);
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
    } catch (e) {}
  }, []);

  const sampleFile = () => {
    if (samplefile === "") {
      swal.fire({
        text: `Example.Xlsx file does not exist. Please try again later`,
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      window.location.href = samplefile;
    }
  };
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

            <div
              className="bulk_download_example link"
              onClick={() => sampleFile()}
            >
              Example.Xlsx{" "}
              <div className="image">
                <img src={downnload_image} alt="download" />
              </div>
            </div>
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
                    {itm?.ErrorAndSuccess === "success" ? (
                      <p className="success">{itm?.Validation}</p>
                    ) : (
                      <p className="error">{itm?.Validation}</p>
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
