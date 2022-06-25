import React, { useState, useEffect } from "react";
import "./styles.scss";
import Newsubaccount from "./Newsubaccount";
import { ArrowBackIosNew } from "@mui/icons-material";
import Allowedpermissions from "./Popups/Allowedpermissions";
import Forbidden from "./Popups/Forbidden";
import MUITable from "../../../Common/MUITable";
import { Link } from "react-router-dom";
import { useStateValue } from "../../../../store/state";
import axios from "axios";
import Constant from "../../../../Constant";
import { getAdminToken, SessionExpiredLogout } from "../../../../utilities";
import Pagination from "../../../Pagination";

import moment from "moment";

const Index = ({ setshowButton, searchdata, searchupdate }) => {
  const [{ geo, customstore, customnostore }, dispatch] = useStateValue();
  const [isSub, setisSub] = useState(false);
  const [sublist, setsublist] = useState([]);
  const [direct, setdirect] = useState([]);
  const [filtereddirect, setfiltereddirect] = useState([]);
  const [isNotMatched, setisNotMatched] = useState(false);

  let [currentid, setcurrentid] = useState(0);
  const Newsubacc = () => {
    setcurrentid(0);
    setisSub(!isSub);
    setisSubusers(false);
  };

  const editaccount = (value) => {
    setcurrentid(value);
    setisSub(!isSub);
    setisSubusers(false);
  };
  const [isPermissions, setisPermissions] = useState(false);
  const [cid, setcid] = useState();
  const permission = (value) => {
    setcid(value);
    setisPermissions(true);
    setisForbidden(false);
  };
  const [isForbidden, setisForbidden] = useState(false);
  const [Forbidden_Access, setForbidden_Access] = useState("");
  const forbidden = (forbiden_text) => {
    setisForbidden(true);
    setisPermissions(false);
    setForbidden_Access(forbiden_text);
  };

  useEffect(() => {
    if (sublist?.length === 0) return;
    if (searchdata === "") {
      setfiltereddirect(sublist);
    } else {
      let temp = sublist?.filter((td) =>
        td?.name?.toLowerCase()?.includes(searchdata?.toLowerCase())
      );
      setfiltereddirect(temp);
    }
    setisNotMatched(!isNotMatched);
  }, [searchupdate, sublist]);

  const PaginateDataSplit = (event) => {
    if (sublist?.length === 0) return setdirect([]);
    setdirect(event);
  };

  useEffect(() => {
    if (filtereddirect.length === 0) {
      setdirect([]);
    }
  }, [isNotMatched]);

  const [isSubusers, setisSubusers] = useState(true);
  const options = {
    filter: false,
    filterType: "dropdown",
    pagination: false,
    responsive: "vertical",
    selectableRows: "none",
    download: false,
    print: false,
    sort: false,
    viewColumns: false,
    search: false,
    textLabels: {
      body: {
        noMatch: (
          <div className="no_data_found">
            {/* <img src={NodataFound} alt="No data Found" /> */}
            <p>No data Found...</p>
          </div>
        ),
      },
    },
  };

  const [adminToken, setAdminToken] = useState("");
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);

  useEffect(async () => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    if (adminToken === "") return;
    let user = JSON.parse(localStorage.getItem("userdata"));
    try {
      const list = await axios({
        method: "post",
        url: `${Constant?.baseUrl()}/listSubAccounts`,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        data: {
          customer_id: user?.id,
        },
      });
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      setsublist(list?.data);
    } catch (e) {
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      if (e.response.status === 401) {
        SessionExpiredLogout();
      }
    }
  }, [adminToken, isSub]);

  const columns = [
    {
      name: "name",
      label: "User Name",
      options: {
        customBodyRender: (value) => {
          return <div className="directenquiries__order_id">{value}</div>;
        },
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="users_status">
              <span className="value">
                {value === "1" ? "Active" : "InActive"}
              </span>
            </div>
          );
        },
      },
    },
    // { name: "orderid", label: "Order ID",
    // options: {
    //   customBodyRender: (value) => {
    //     return (
    //       <div className="users_orderid">
    //         <span className="value">{value}</span>
    //       </div>
    //     );
    //   },
    // },

    // },
    // {
    //   name: "hub",
    //   label: "Hub",
    // },
    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="users_date">
              <span className="value">
                {moment(value).format("DD/MM/YYYY")}
              </span>
            </div>
          );
        },
      },
    },
    {
      name: "entity_id",
      label: "Permissions",
      options: {
        customBodyRender: (value, tablemeta) => {
          return (
            <div className="users_permissions">
              <span
                className="value"
                onClick={() => permission(tablemeta?.rowData[5])}
              >
                View
              </span>
            </div>
          );
        },
      },
    },
    {
      name: "forbidden_access",
      label: "Forbidden",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="users_permissions">
              <span className="value" onClick={() => forbidden(value)}>
                {/* {value} */}
                {value === null ? " " : "View"}
              </span>
            </div>
          );
        },
      },
    },
    {
      name: "entity_id",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="users_action">
              {/* <div className="users_action_name">Login</div> */}
              <div
                className="users_action_name"
                onClick={() => editaccount(value)}
              >
                Edit
              </div>
              {/* <div className="users_action_name">Delete</div> */}
            </div>
          );
        },
      },
    },
  ];

  return (
    <>
      {isSubusers && (
        <div className="users_main">
          <div className="user_sub-account">
            <button
              onClick={() => {
                Newsubacc();
                setshowButton(false);
              }}
            >
              Add New Sub-Account
            </button>
          </div>
          <MUITable
            columns={columns}
            // table={sublist}
            table={direct?.length ? direct : []}
            options={options}
            className="subusers__table"
          />

          {filtereddirect?.length > 0 ? (
            <Pagination
              PaginateData={PaginateDataSplit}
              DataList={filtereddirect}
              PagePerRow={10}
            />
          ) : (
            ""
          )}

          <div className="my_profile_btns">
            <div className="my_profile_back">
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/buyerdashboard/dashboard`}
                className="link"
              >
                <ArrowBackIosNew />
                <span>
                  <p className="back">Back</p>
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
      {isSub && (
        <Newsubaccount
          currentid={currentid}
          setisSub={setisSub}
          setisSubusers={setisSubusers}
          setshowButton={setshowButton}
        />
      )}
      {isPermissions && (
        <Allowedpermissions
          closePOPup={setisPermissions}
          cid={cid}
          sublist={sublist}
        />
      )}
      {isForbidden && (
        <Forbidden
          closePOPup={setisForbidden}
          Forbidden_Access={Forbidden_Access}
        />
      )}
    </>
  );
};
export default Index;
