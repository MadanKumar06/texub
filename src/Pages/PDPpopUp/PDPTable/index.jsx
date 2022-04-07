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
import Constant from "../../../Constant";
import axios from "axios";
import { useStateValue } from "../../../store/state";
const PDPTable = ({ classes, tableData, setPdpSellerData, pdpSellerData }) => {
  //styles
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
  } = classes;

  const [is_table_one, setIs_table_one] = useState(0);
  const [is_table_two, setIs_table_two] = useState(0);
  const [{}, dispatch] = useStateValue();
  //tableValues
  useEffect(() => {
    if (tableData?.tableone?.length) {
      let temp = tableData?.tableone?.map((itm) => ({
        ...itm,
        // in_stock: 20,
        is_moq_valid: itm.moq,
      }));
      setIs_table_one(temp);
      handleRadioGroupChange(temp[0])
      setPdpSellerData((prevState) => ({
        ...prevState,
        seller_id: tableData?.tableone?.[0]?.seller_code,
        warranty_days: tableData?.tableone?.[0]?.warranty_days,
        packing_details: tableData?.tableone?.[0]?.packing_details,
        no_of_pieces: tableData?.tableone?.[0]?.no_of_pieces,
      }));
    }
    setIs_table_two(tableData?.tabletwo);
  }, [tableData]);

  // update values of moq
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
  const handleClose = () => {
    dispatch({
      type: "SET_PDP_POPUP_OPEN_CLOSE",
      value: false,
    });
  };

  const handleChangeValueTableTwo = (event, index) => {
    setIs_table_two(
      is_table_two?.map((item, ind) => {
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

  const [dradio, setdradio] = useState()

  const handleRadioGroupChange = (event) => {
    console.log(event)
    setdradio(event.seller_code)
    setPdpSellerData((prevState) => ({
      ...prevState,
      ...event,
      // seller_id: event?.seller_code,
      // warranty_days: event?.warranty_days,
      // packing_details: event?.packing_details,
      // no_of_pieces: event?.no_of_pieces,
    }));
  };

  console.log(dradio)

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
                  <span>In Stock</span>
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
              defaultValue={
                is_table_one?.length ? is_table_one?.[0]?.seller_code : ""
              }
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
                            value={item?.seller_code}
                            // value={dradio}
                            defaultValue={dradio}
                            control={
                              <Radio
                                className={radio_button}
                                onClick={() =>
                                  handleRadioGroupChange({
                                    // seller_code: item?.seller_code,
                                    // warranty_days: item?.warranty_days,
                                    // packing_details: item?.packing_details,
                                    // no_of_pieces: item?.no_of_pieces,
                                    ...item,
                                  })
                                }
                              />
                            }
                            label={""}
                          />
                        </div>
                      </div>
                      <div className={price_list_seller}>
                        <span>
                          <Link
                            to={`/sellerprofile/${item.seller_code}`}
                            onClick={() => handleClose()}
                          >
                            {item?.seller_code}
                          </Link>
                        </span>
                      </div>
                      <div className={price_list_price}>
                        <span className={price_indicator}>
                          {item?.currency}
                        </span>
                        <span className={price_value}>{item?.price}</span>
                      </div>

                      <div className={price_list_stock}>
                        <span className={seller_stock_value}>
                          {item?.in_stock}
                        </span>
                      </div>
                      <div className={price_list_eta}>
                        <span className={seller_eta_value}>{item?.eta}</span>
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
                            className={`${item.moq > item.is_moq_valid ? item_increase : item_decrease}`}
                            onClick={() =>
                              handleChangeValueTableone(
                                parseInt(item?.moq) > item?.is_moq_valid
                                  ? parseInt(item?.moq) - 1
                                  : item?.is_moq_valid,
                                index
                              )
                            }
                          />
                          <span className={input_text}>{item?.moq}</span>
                          <AddIcon
                            // className={item_increase}
                            className={`${item.moq < item.in_stock ? item_increase : item_decrease}`}
                            onClick={() =>
                              handleChangeValueTableone(
                                parseInt(item?.in_stock) > item?.moq
                                  ? parseInt(item?.moq) + 1
                                  : item?.moq,
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
