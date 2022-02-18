import React from "react";
import "./styles.scss";
const PendingInvoice = () => {
  return (
    <div class="pending_invoice_main_container">
      <div class="invoice_image_block">
        <p>Pending Invoice</p>
      </div>

      {/* table content */}
      <div class="table_main_block">
        <table class="rwd_table">
          <tbody>
            <tr>
              <th>SELLER ID</th>
              <th>PRODUCTS</th>
              <th>HUB</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>SUBTOTAL</th>
            </tr>
            <tr>
              <td data_th="seller id">
                <span class="seller_id">220012</span>
              </td>

              <td data-th="Products">
                <div class="products">
                  <img
                    src="<?php echo $this->getViewFileUrl('images/apple.png'); ?>"
                    alt="User"
                  />

                  <div class="products-details">
                    <div class="products-title">
                      <p class="title"> PAVILION MODEL14-DV0054TU</p>
                      <p class="eta">ETA : 5 Days</p>
                    </div>

                    <p class="details">
                      Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core
                      I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows …
                    </p>
                  </div>
                </div>
              </td>
              <td data-th="hub">
                <span class="hub">Mumbai</span>
              </td>
              <td data-th="price">
                <span class="price-rupee">INR</span>
                <span class="price-value">66,999</span>
                <span class="price-unit">/Unit</span>
              </td>
              <td data-th="quantity">
                <span class="quantity">60</span>
              </td>
              <td data-th="sub total">
                <span class="price-rupee">INR </span>
                <span class="price-value">4,019,940</span>
              </td>
            </tr>
            <tr>
              <td data-th="seller id">
                <span class="seller-id">220012</span>
              </td>

              <td data-th="Products">
                <div class="products">
                  <img
                    src="<?php echo $this->getViewFileUrl('images/apple.png'); ?>"
                    alt="User"
                  />

                  <div class="products-details">
                    <div class="products-title">
                      <p class="title"> PAVILION MODEL14-DV0054TU</p>
                      <p class="eta">ETA : 5 Days</p>
                    </div>

                    <p class="details">
                      Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core
                      I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows …
                    </p>
                  </div>
                </div>
              </td>
              <td data-th="hub">
                <span class="hub">Mumbai</span>
              </td>
              <td data-th="price">
                <span class="price-rupee">INR</span>
                <span class="price-value">66,999</span>
                <span class="price-unit">/Unit</span>
              </td>
              <td data-th="quantity">
                <span class="quantity">60</span>
              </td>
              <td data-th="sub total">
                <span class="price-rupee">INR </span>
                <span class="price-value">4,019,940</span>
              </td>
            </tr>
            <tr>
              <td data-th="seller id">
                <span class="seller-id">220012</span>
              </td>

              <td data-th="Products">
                <div class="products">
                  <img
                    src="<?php echo $this->getViewFileUrl('images/apple.png'); ?>"
                    alt="User"
                  />

                  <div class="products-details">
                    <div class="products-title">
                      <p class="title"> PAVILION MODEL14-DV0054TU</p>
                      <p class="eta">ETA : 5 Days</p>
                    </div>

                    <p class="details">
                      Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core
                      I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows …
                    </p>
                  </div>
                </div>
              </td>
              <td data-th="hub">
                <span class="hub">Mumbai</span>
              </td>
              <td data-th="price">
                <span class="price-rupee">INR</span>
                <span class="price-value">66,999</span>
                <span class="price-unit">/Unit</span>
              </td>
              <td data-th="quantity">
                <span class="quantity">60</span>
              </td>
              <td data-th="sub total">
                <span class="price-rupee">INR </span>
                <span class="price-value">4,019,940</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* middle content */}
      <div class="middle_block">
        {/* summary content at left*/}
        <div class="section_left_container">
          <div class="section_left_sub_container">
            <div class="area_left_content">
              <p class="estimate">Estimated Shipping And Tax</p>
              <p class="apply_discount">Apply Discount Code</p>
            </div>
            <div class="area_right_content">
              <p class="title">
                Enter Your Destination To Get A Shipping Estimate
              </p>
              <div class="form_container">
                <div class="form_fields">
                  <label for="country">Country</label>
                  <select name="country" id="country" required>
                    <option value="" disabled selected>
                      Country
                    </option>
                    <option value="country_1">country 1</option>
                    <option value="country_2">country 2</option>
                  </select>
                </div>
                <div class="form_fields">
                  <label for="state_province">State/Province</label>
                  <select name="state_province" id="state_province" required>
                    <option value="" disabled selected>
                      Please Select A Region/State/Province
                    </option>
                    <option value="state_province_1">State/Province 1</option>
                    <option value="state_province_2">State/Province 2</option>
                  </select>
                </div>
                <div class="form_fields">
                  <label>Zip/Postal Code</label>
                  <input
                    class="postal_code_input"
                    placeholder="Please Enter Zip/Postal Code"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="section_left_container_footer">
            <div class="footer_main">
              <p class="footer_title">Free Shipping</p>
              <div class="footer_content">
                <input type="radio" name="radio" />
                <p class="footer_sub_title">Free</p>
                <p class="footer_value">
                  <span>INR</span> 0.00
                </p>
              </div>
            </div>
            <div class="footer_main">
              <p class="footer_title">Flat Rate</p>
              <div class="footer_content">
                <input type="radio" name="radio" />
                <p class="footer_sub_title">Fixed</p>
                <p class="footer_value">
                  <span>INR</span> 750.00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* summary content at right */}
        <div class="section_right_container">
          <div class="section_right_sub_container">
            <div class="summary_list">
              <p class="summary_list_title">Subtotal</p>
              <p class="summary_list_value">
                <span>INR</span> 10,729,830
              </p>
            </div>
            <div class="summary_list">
              <p class="summary_list_title">Tax</p>
              <p class="summary_list_value">
                <span>INR</span> 0.00
              </p>
            </div>
            <div class="summary_list">
              <p class="summary_list_title">Order Total</p>
              <p class="summary_list_value">
                <span>INR</span> 10,729,830
              </p>
            </div>
          </div>
          <p class="proceed_btn">Proceed To Checkout</p>
        </div>
      </div>
    </div>
  );
};

export default PendingInvoice;
