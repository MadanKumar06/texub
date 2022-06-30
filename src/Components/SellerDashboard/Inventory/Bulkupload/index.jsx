import React, { useEffect, useState, useRef } from "react";
import "./styles.scss";
import { Button, TextField, Autocomplete } from "@mui/material";
import { Clear, CheckCircleOutline } from "@mui/icons-material";
import axios from "axios";
import Constant from "../../../../Constant";
import downnload_image from "../../../../Assets/CommonImage/download.png";
import question_image from "../../../../Assets/CommonImage/question.png";
import { useStateValue } from "../../../../store/state";
import swal from "sweetalert2";
import XLSX from "xlsx";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { SessionExpiredLogout } from "../../../../utilities";

function Index() {
  const [Row, setRow] = useState([]);
  //const [{}, dispatch] = useStateValue();
  const [saveuploadFile, setSaveUploadFile] = useState({ files: [] });
  const [uploadFile, setUploadFile] = useState({ files: [] });
  const [choosenFile, setChoosenFile] = useState({});
  const [file, setFile] = useState("");
  const [{ geo, customnostore }, dispatch] = useStateValue();
  const [trigger, setTrigger] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState({
    barOpenClose: false,
    barValue: 0,
  });
  const [finalValidateData, setFinalValidateData] = useState([]);
  const [apiCallLoop, setApiCallLoop] = useState([]);
  const i = useRef(0);
  const j = useRef(2);
  const k = useRef(0);
  const l = useRef(0);

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
      if (e.response.status === 401) {
        SessionExpiredLogout();
      }
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
      var key2 = "H1";
      delete t[key1];
      delete t[key2];
      var XL_row_object = XLSX.utils.sheet_to_json(t);
      XL_row_object.splice(0, 1);
      if (XL_row_object?.length) {
        setRow([]);
        i.current = 0;
        j.current = 2;
        k.current = 0;
        l.current = 0;
        setTrigger(false);
        setUploadPercentage({
          barOpenClose: true,
          barValue: 0,
        });
        setFinalValidateData(XL_row_object);
        setApiCallLoop([XL_row_object?.[0]]);
      } else {
        swal.fire({
          text: `Upload xlsx file with data`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    };
    reader.readAsBinaryString(file);
  };
  useEffect(() => {
    if (apiCallLoop?.length) {
      if (
        apiCallLoop?.[0]?.__EMPTY ||
        apiCallLoop?.[0]?.__EMPTY_1 ||
        apiCallLoop?.[0]?.__EMPTY_2 ||
        apiCallLoop?.[0]?.__EMPTY_3 ||
        apiCallLoop?.[0]?.__EMPTY_4 ||
        apiCallLoop?.[0]?.__EMPTY_5 ||
        apiCallLoop?.[0]?.__EMPTY_6
      ) {
        let customerId = JSON.parse(localStorage.getItem("userdata"));
        let data = {
          product_data: {
            bulkupload: 1,
            customer_id: customerId?.id,
            main_category: apiCallLoop?.[0]?.__EMPTY_1
              ? apiCallLoop?.[0]?.__EMPTY_1
              : "",
            other_main_category: "",
            sub_category: apiCallLoop?.[0]?.__EMPTY_2
              ? apiCallLoop?.[0]?.__EMPTY_2
              : "",
            other_sub_category: "",
            other_brand_number: "",
            name: apiCallLoop?.[0]?.__EMPTY ? apiCallLoop?.[0]?.__EMPTY : "",
            texub_product_id: "",
            mgs_brand: apiCallLoop?.[0]?.__EMPTY_3
              ? apiCallLoop?.[0]?.__EMPTY_3
              : "",
            sku: apiCallLoop?.[0]?.__EMPTY_4 ? apiCallLoop?.[0]?.__EMPTY_4 : "",
            upc_number: apiCallLoop?.[0]?.__EMPTY_5
              ? apiCallLoop?.[0]?.__EMPTY_5
              : "",
            description: apiCallLoop?.[0]?.__EMPTY_6
              ? apiCallLoop?.[0]?.__EMPTY_6
              : "",
          },
        };
        axios
          .post(Constant.baseUrl() + "/createSellerProduct", data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(async (res) => {
            j.current = j.current + 1;
            k.current = k.current + 1;
            l.current = l.current + 1;
            let temp = `Row ${j.current} ${res?.data?.[0]?.message}`;
            if (res?.data?.[0]?.status) {
              setRow((prev) => [
                ...prev,
                {
                  success_or_error: "success",
                  message: temp,
                },
              ]);
              i.current = i.current + 1;
              let t = finalValidateData[i.current];
              if (i.current < finalValidateData?.length) {
                setApiCallLoop([t]);
              }
            } else {
              setRow((prev) => [
                ...prev,
                {
                  success_or_error: "error",
                  message: temp,
                },
              ]);
              i.current = i.current + 1;
              let t = finalValidateData[i.current];
              if (i.current < finalValidateData?.length) {
                setApiCallLoop([t]);
              }
            }
          })
          .catch((err) => {
            if (err.response.status === 401) {
              SessionExpiredLogout();
            }
            setRow((prev) => [
              ...prev,
              {
                success_or_error: "error",
                message: "Network error try again !",
              },
            ]);
            i.current = i.current + 1;
            k.current = k.current + 1;
            l.current = l.current + 1;
            let t = finalValidateData[i.current];
            if (i.current < finalValidateData?.length) {
              setApiCallLoop([t]);
            }
          });
      } else if (
        apiCallLoop?.[0]?.__EMPTY_7 ||
        apiCallLoop?.[0]?.__EMPTY_8 ||
        apiCallLoop?.[0]?.__EMPTY_9 ||
        apiCallLoop?.[0]?.__EMPTY_10 ||
        apiCallLoop?.[0]?.__EMPTY_11 ||
        apiCallLoop?.[0]?.__EMPTY_12 ||
        apiCallLoop?.[0]?.__EMPTY_13 ||
        apiCallLoop?.[0]?.__EMPTY_14 ||
        apiCallLoop?.[0]?.__EMPTY_15 ||
        apiCallLoop?.[0]?.__EMPTY_16 ||
        apiCallLoop?.[0]?.__EMPTY_17 ||
        apiCallLoop?.[0]?.__EMPTY_18 ||
        apiCallLoop?.[0]?.__EMPTY_19 ||
        apiCallLoop?.[0]?.__EMPTY_20 ||
        apiCallLoop?.[0]?.__EMPTY_21 ||
        apiCallLoop?.[0]?.__EMPTY_22 ||
        apiCallLoop?.[0]?.__EMPTY_23 ||
        apiCallLoop?.[0]?.__EMPTY_24 ||
        apiCallLoop?.[0]?.__EMPTY_25 ||
        apiCallLoop?.[0]?.__EMPTY_26 ||
        apiCallLoop?.[0]?.__EMPTY_27 ||
        apiCallLoop?.[0]?.__EMPTY_28 ||
        apiCallLoop?.[0]?.__EMPTY_29 ||
        apiCallLoop?.[0]?.__EMPTY_30 ||
        apiCallLoop?.[0]?.__EMPTY_31 ||
        apiCallLoop?.[0]?.__EMPTY_32 ||
        apiCallLoop?.[0]?.__EMPTY_33 ||
        apiCallLoop?.[0]?.__EMPTY_34
      ) {
        let customerId = JSON.parse(localStorage.getItem("userdata"));
        let data = {
          data: {
            bulk_upload: 1,
            customer_id: customerId?.id,
            hsn_code: apiCallLoop?.[0]?.__EMPTY_8
              ? apiCallLoop?.[0]?.__EMPTY_8
              : "",
            product_id: apiCallLoop?.[0]?.__EMPTY_7
              ? apiCallLoop?.[0]?.__EMPTY_7
              : "",
            product_condition: apiCallLoop?.[0]?.__EMPTY_19
              ? apiCallLoop?.[0]?.__EMPTY_19
              : "",
            other_condition: apiCallLoop?.[0]?.__EMPTY_20
              ? apiCallLoop?.[0]?.__EMPTY_20
              : "",
            warranty_type: apiCallLoop?.[0]?.__EMPTY_21
              ? apiCallLoop?.[0]?.__EMPTY_21
              : "",
            warranty_country: apiCallLoop?.[0]?.__EMPTY_22
              ? apiCallLoop?.[0]?.__EMPTY_22
              : "",
            warranty_days: apiCallLoop?.[0]?.__EMPTY_23
              ? apiCallLoop?.[0]?.__EMPTY_23
              : "",
            packing_details: apiCallLoop?.[0]?.__EMPTY_24
              ? apiCallLoop?.[0]?.__EMPTY_24
              : "",
            no_pieces_per:
              apiCallLoop?.[0]?.__EMPTY_26 || apiCallLoop?.[0]?.__EMPTY_25
                ? apiCallLoop?.[0]?.__EMPTY_26 || apiCallLoop?.[0]?.__EMPTY_25
                : "",
            width: apiCallLoop?.[0]?.__EMPTY_28
              ? apiCallLoop?.[0]?.__EMPTY_28
              : "",
            height: apiCallLoop?.[0]?.__EMPTY_29
              ? apiCallLoop?.[0]?.__EMPTY_29
              : "",
            product_length: apiCallLoop?.[0]?.__EMPTY_27
              ? apiCallLoop?.[0]?.__EMPTY_27
              : "",
            weight: apiCallLoop?.[0]?.__EMPTY_30
              ? apiCallLoop?.[0]?.__EMPTY_30
              : "",
            restrictions: apiCallLoop?.[0]?.__EMPTY_31
              ? apiCallLoop?.[0]?.__EMPTY_31
              : "",
            restricted_region: apiCallLoop?.[0]?.__EMPTY_32
              ? apiCallLoop?.[0]?.__EMPTY_32
              : "",
            restricted_country: apiCallLoop?.[0]?.__EMPTY_33
              ? apiCallLoop?.[0]?.__EMPTY_33
              : "",
            description: apiCallLoop?.[0]?.__EMPTY_34
              ? apiCallLoop?.[0]?.__EMPTY_34
              : "",
            product_details: [
              {
                hub_id: apiCallLoop?.[0]?.__EMPTY_9
                  ? apiCallLoop?.[0]?.__EMPTY_9
                  : "",
                currency_id: apiCallLoop?.[0]?.__EMPTY_10
                  ? apiCallLoop?.[0]?.__EMPTY_10
                  : "",
                price: apiCallLoop?.[0]?.__EMPTY_11
                  ? apiCallLoop?.[0]?.__EMPTY_11
                  : "",
                in_stock: apiCallLoop?.[0]?.__EMPTY_12
                  ? apiCallLoop?.[0]?.__EMPTY_12
                  : "",
                eta: apiCallLoop?.[0]?.__EMPTY_13
                  ? apiCallLoop?.[0]?.__EMPTY_13
                  : "",
                moq: apiCallLoop?.[0]?.__EMPTY_14
                  ? apiCallLoop?.[0]?.__EMPTY_14
                  : "",
                cgst: apiCallLoop?.[0]?.__EMPTY_15
                  ? apiCallLoop?.[0]?.__EMPTY_15
                  : "",
                sgst: apiCallLoop?.[0]?.__EMPTY_17
                  ? apiCallLoop?.[0]?.__EMPTY_17
                  : "",
                igst: apiCallLoop?.[0]?.__EMPTY_16
                  ? apiCallLoop?.[0]?.__EMPTY_16
                  : "",
                vat_value: apiCallLoop?.[0]?.__EMPTY_18
                  ? apiCallLoop?.[0]?.__EMPTY_18
                  : "",
              },
            ],
          },
        };
        axios
          .post(Constant.baseUrl() + "/saveProductPrice", data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            j.current = j.current + 1;
            k.current = k.current + 1;
            l.current = l.current + 1;
            let temp = `Row ${j.current} ${res?.data?.[0]?.message}`;
            if (res?.data?.[0]?.status) {
              setRow((prev) => [
                ...prev,
                {
                  success_or_error: "success",
                  message: temp,
                },
              ]);
              i.current = i.current + 1;
              let t = finalValidateData[i.current];
              if (i.current < finalValidateData?.length) {
                setApiCallLoop([t]);
              }
            } else {
              setRow((prev) => [
                ...prev,
                {
                  success_or_error: "error",
                  message: temp,
                },
              ]);
              i.current = i.current + 1;
              let t = finalValidateData[i.current];
              if (i.current < finalValidateData?.length) {
                setApiCallLoop([t]);
              }
            }
          })
          .catch((err) => {
            if (err.response.status === 401) {
              SessionExpiredLogout();
            }
            setRow((prev) => [
              ...prev,
              {
                success_or_error: "error",
                message: "Network error try again !",
              },
            ]);
            i.current = i.current + 1;
            k.current = k.current + 1;
            l.current = l.current + 1;
            let t = finalValidateData[i.current];
            if (i < finalValidateData?.length) {
              setApiCallLoop([t]);
            }
          });
      }
    }
  }, [apiCallLoop]);

  useEffect(() => {
    if (
      k.current > 0 &&
      finalValidateData?.length > 0 &&
      k.current === finalValidateData?.length
    ) {
      setUploadPercentage({
        barOpenClose: true,
        barValue: 100,
      });
      setTimeout(() => {
        setTrigger(true);
      }, 1400);
    }
  }, [Row, finalValidateData]);

  const fileHandler = (event) => {
    setChoosenFile(event?.target?.files[0]);
    // setSaveUploadFile({ files: [...uploadFile?.files, ...event.target.files] });
    setSaveUploadFile({ files: [...event.target.files] });
  };
  const handleSaveFile = () => {
    setRow([]);
    setFile({});
    i.current = 0;
    j.current = 2;
    k.current = 0;
    setTrigger(false);
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
      if (e.response.status === 401) {
        SessionExpiredLogout();
      }
    }
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
  const handleCloseProgressBar = (event) => {
    setUploadPercentage({
      barOpenClose: event,
      barValue: 0,
    });
    l.current = 0;
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
              onClick={(event) => file !== "" && handleUploadApiCall(event)}
              disabled={uploadPercentage?.barOpenClose}
            >
              Validate File
            </Button>
          </div>
        </div>
      </div>
      {uploadPercentage?.barOpenClose && (
        <ProgressBar
          uploadPercentage={uploadPercentage}
          handleCloseProgressBar={handleCloseProgressBar}
          timestamp={(l.current / finalValidateData?.length) * 100}
        />
      )}
      <div className="validation_message">
        {trigger && Row?.length ? (
          <p className="head">
            Your file was successfully validated.
            <CheckCircleOutline />
          </p>
        ) : (
          ""
        )}
        <div className="check_scroll">
          {trigger && Row?.length
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
