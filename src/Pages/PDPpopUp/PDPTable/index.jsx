import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import clsx from "clsx";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
const PDPTable = ({ classes, tableData }) => {
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
    sub_table_title
  } = classes;
  const [is_table_one, setIs_table_one] = useState(0);
  const [is_table_two, setIs_table_two] = useState(0);
  useEffect(() => {
    setIs_table_one(tableData?.tableone);
    setIs_table_two(tableData?.tabletwo);
  }, [tableData]);
  const handleChangeValueTableone = (event, index) => {
    setIs_table_one(
      is_table_one?.map((item, ind) => {
        if (index === ind) {
          return {
            ...item,
            seller_moq: event,
          };
        } else {
          return item;
        }
      })
    );
  };
  const handleChangeValueTableTwo = (event, index) => {
    setIs_table_two(
      is_table_two?.map((item, ind) => {
        if (index === ind) {
          return {
            ...item,
            seller_moq: event,
          };
        } else {
          return item;
        }
      })
    );
  };

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
              defaultValue={""}
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
                            value={item?.seller_radio}
                            control={<Radio className={radio_button} />}
                            label={""}
                          />
                        </div>
                      </div>
                      <div className={price_list_seller}>
                        <span>{item?.seller_id}</span>
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
                              handleChangeValueTableone(
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
                              handleChangeValueTableone(
                                item?.seller_moq + 1,
                                index
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </RadioGroup>
            <div className={seller_price_title}>
              <span>From The Nearest Hub</span>
            </div>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={""}
              name="radio-buttons-group"
              className={radio_btn_group}
            >
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
                            value={item?.seller_radio}
                            control={<Radio className={radio_button} />}
                            label={""}
                          />
                        </div>
                      </div>
                      <div className={price_list_seller}>
                        <span>{item?.seller_id}</span>
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
                ))}
            </RadioGroup>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(PDPTable);
