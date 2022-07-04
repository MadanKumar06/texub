import React, { useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useStateValue } from "../../../store/state";
const PDPTable = ({ classes, tableData, setPdpSellerData }) => {
  let {
    table_container,
    pdp_middle_wapper,
    seller_price_title,
    seller_price_list,
    seller_price_list_view,
    price_list_info,
    price_list_action,
    price_list_seller,
    title,
    price_list_eta,
    price_list_price,
    price_list_stock,
    price_list_hub,
    price_list_moq,
    price_list,
    title_block,
    seller,
    list_block,
    list_action_input,
    price_list_hubblk,
    control,
    qty_change,
    input_text,
    item_increase,
    item_decrease,
    radio_btn_group,
    radio_button,
    price_indicator,
    price_value,
    seller_stock_value,
    seller_eta_value,
    table_title_container,
    sub_table_title,
    producttable_price,
    guest_login,
    check_price,
  } = classes;

  const [is_table_one, setIs_table_one] = useState(0);
  const [is_table_two, setIs_table_two] = useState(0);
  const [{ geo, customstore, customnostore }, dispatch] = useStateValue();
  //tableValues
  useEffect(() => {
    if (tableData?.tableone?.length) {
      let temp = tableData?.tableone?.map((itm) => ({
        ...itm,
        is_moq_valid: itm.moq,
      }));
      setIs_table_one(temp);
      handleRadioGroupChange(temp[0]);
      setPdpSellerData((prevState) => ({
        ...prevState,
        seller_code: tableData?.tableone?.[0]?.seller_code,
        seller_id: tableData?.tableone?.[0]?.seller_id,
        warranty_days: tableData?.tableone?.[0]?.warranty_days,
        packing_details: tableData?.tableone?.[0]?.packing_details,
        no_of_pieces: tableData?.tableone?.[0]?.no_of_pieces,
        is_table_one: is_table_one,
      }));
    }
    setIs_table_two(tableData?.tabletwo);
  }, [tableData]);

  const handleClick = (event) => {
    event.stopPropagation();
    dispatch({
      type: "SET_SIGNIN_OPEN_CLOSE",
      value: true,
    });
  };
  // update values of moq using increament and decreament
  const handleChangeValueTableone = (event, index) => {
    setIs_table_one(
      is_table_one?.map((item, ind) => {
        if (index === ind) {
          return {
            ...item,
            moq: event,
          };
        } else {
          return item;
        }
      })
    );
  };
  useEffect(() => {
    if (is_table_one) {
      setPdpSellerData((prevState) => ({
        ...prevState,
        is_table_one: is_table_one,
      }));
    }
  }, [is_table_one]);
  const handleClose = () => {
    dispatch({
      type: "SET_PDP_POPUP_OPEN_CLOSE",
      value: false,
    });
  };

  // const handleChangeValueTableTwo = (event, index) => {
  //   setIs_table_two(
  //     is_table_two?.map((item, ind) => {
  //       if (index === ind) {
  //         return {
  //           ...item,
  //           moq: event,
  //         };
  //       } else {
  //         return item;
  //       }
  //     })
  //   );
  // };

  const [dradio, setdradio] = useState();

  const handleRadioGroupChange = (event) => {
    setdradio(event.product_id);
    setPdpSellerData((prevState) => ({
      ...prevState,
      ...event,
      is_table_one: is_table_one,
    }));
  };
  function formatToCurrency(amount) {
    return amount
      .toString()
      .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }
  useEffect(() => {
    if (is_table_one.length) {
      // handleRadioGroupChange(is_table_one[0]);
    }
  }, [is_table_one]);

  return (
    <div className={table_container}>
      <div className={pdp_middle_wapper}>
        <div className={seller_price_title}>
          <span>Best Price List From The Sellers</span>
        </div>
        <div className={seller_price_list}>
          <ol className={seller_price_list_view}>
            <li className={table_title_container}>
              <div className={sub_table_title}>
                <span>Seller Price List</span>
              </div>
            </li>
            <li className={clsx(seller, price_list, title_block)}>
              <div className={price_list_info}>
                <div className={clsx(price_list_action, title)}>
                  <span></span>
                </div>
                <div className={clsx(price_list_seller, title)}>
                  <span>Seller ID</span>
                </div>

                <div className={clsx(price_list_price, title)}>
                  <span>Price/unit</span>
                </div>

                <div className={clsx(price_list_stock, title)}>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14.701"
                      height="10.353"
                      viewBox="0 0 21.701 15.353"
                    >
                      <path
                        id="Path_23"
                        data-name="Path 23"
                        d="M-2570.053,7068.5l5.726,5.726,11.732-11.732"
                        transform="translate(2572.175 -7060.373)"
                        fill="none"
                        stroke="#00b91c"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                      />
                    </svg>
                    {"  "}
                    In Stock
                  </span>
                </div>

                <div className={clsx(price_list_eta, title)}>
                  <span>ETA</span>
                </div>

                <div className={clsx(price_list_hub, title)}>
                  <span>Hub</span>
                </div>

                <div className={clsx(price_list_moq, title)}>
                  <span>MOQ</span>
                </div>
              </div>
            </li>

            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={tableData?.tableone[0].product_id}
              name="radio-buttons-group"
              className={radio_btn_group}
            >
              {is_table_one?.length > 0 &&
                is_table_one?.map((item, index) => (
                  <li
                    key={index}
                    className={clsx(seller, price_list, list_block)}
                  >
                    <div className={price_list_info}>
                      <div className={price_list_action}>
                        <div className={list_action_input}>
                          <FormControlLabel
                            value={item?.product_id}
                            label=""
                            // value={dradio}
                            defaultValue={dradio}
                            control={
                              <Radio
                                className={radio_button}
                                onClick={() =>
                                  handleRadioGroupChange({ ...item })
                                }
                              />
                            }
                          />
                        </div>
                      </div>
                      <div className={price_list_seller}>
                        <span>
                          <Link
                            to={`/${
                              customnostore ? customnostore : geo?.country_name
                            }/sellerprofile/${item.seller_code}/${
                              item.seller_id
                            }`}
                            onClick={() => handleClose()}
                          >
                            {item?.seller_code}
                          </Link>
                        </span>
                      </div>

                      {!localStorage.getItem("isLoggedIn_auth") ? (
                        <div
                          className={producttable_price}
                          onClick={(e) => handleClick(e)}
                        >
                          <p className={guest_login}>Login</p>
                          <p className={check_price}>to see the prices</p>
                        </div>
                      ) : (
                        <div className={price_list_price}>
                          <span className={price_indicator}>
                            {item?.currency}
                          </span>
                          <span className={price_value}>
                            {formatToCurrency(parseInt(item?.price))}
                          </span>
                        </div>
                      )}
                      <div className={price_list_stock}>
                        <span className={seller_stock_value}>
                          {item?.in_stock}
                        </span>
                      </div>
                      <div className={price_list_eta}>
                        <span className={seller_eta_value}>
                          {item?.eta} Days
                        </span>
                      </div>

                      <div className={price_list_hub}>
                        <div className={price_list_hubblk}>
                          <span>{item?.hub}</span>
                        </div>
                      </div>

                      <div className={price_list_moq}>
                        <div className={clsx(control, qty_change)}>
                          <RemoveIcon
                            // className={item_decrease}
                            className={`${
                              parseInt(item.moq) > parseInt(item.is_moq_valid)
                                ? item_increase
                                : item_decrease
                            }`}
                            onClick={() =>
                              handleChangeValueTableone(
                                parseInt(item?.moq) >
                                  parseInt(item?.is_moq_valid)
                                  ? parseInt(item?.moq) - 1
                                  : parseInt(item?.is_moq_valid),
                                index
                              )
                            }
                          />
                          <span className={input_text}>{item?.moq}</span>
                          <AddIcon
                            // className={item_increase}
                            className={`${
                              parseInt(item.moq) < parseInt(item.in_stock)
                                ? item_increase
                                : item_decrease
                            }`}
                            onClick={() =>
                              handleChangeValueTableone(
                                parseInt(item?.in_stock) > parseInt(item?.moq)
                                  ? parseInt(item?.moq) + 1
                                  : parseInt(item?.moq),
                                index
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              {/* <div className={seller_price_title}>
                <span>From The Nearest Hub</span>
              </div>
              {is_table_two?.length > 0 &&
                is_table_two?.map((item, index) => (
                  <li
                    key={index}
                    className={clsx(seller, price_list, list_block)}
                  >
                    <div className={price_list_info}>
                      <div className={price_list_action}>
                        <div className={list_action_input}>
                          <FormControlLabel
                            value={item?.seller_id}
                            control={
                              <Radio
                                className={radio_button}
                                onClick={() =>
                                  handleRadioGroupChange(item?.seller_id)
                                }
                              />
                            }
                            label={""}
                          />
                        </div>
                      </div>
                      <div className={price_list_seller}>
                        <span>
                          <a href="/">{item?.seller_id}</a>
                        </span>
                      </div>
                      <div className={price_list_price}>
                        <span className={price_indicator}>INR</span>
                        <span className={price_value}>
                          {item?.seller_price}
                        </span>
                      </div>

                      <div className={price_list_stock}>
                        <span className={seller_stock_value}>
                          {item?.seller_in_stock}
                        </span>
                      </div>
                      <div className={price_list_eta}>
                        <span className={seller_eta_value}>
                          {item?.seller_eta}
                        </span>
                      </div>

                      <div className={price_list_hub}>
                        <div className={price_list_hubblk}>
                          <span>{item?.seller_hub}</span>
                        </div>
                      </div>

                      <div className={price_list_moq}>
                        <div className={clsx(control, qty_change)}>
                          <RemoveIcon
                            className={item_decrease}
                            onClick={() =>
                              handleChangeValueTableTwo(
                                item?.seller_moq >= 2
                                  ? item?.seller_moq - 1
                                  : 1,
                                index
                              )
                            }
                          />
                          <span className={input_text}>{item?.seller_moq}</span>
                          <AddIcon
                            className={item_increase}
                            onClick={() =>
                              handleChangeValueTableTwo(
                                item?.seller_moq + 1,
                                index
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))} */}
            </RadioGroup>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(PDPTable);
