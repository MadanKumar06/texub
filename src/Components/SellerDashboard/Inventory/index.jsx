import React from 'react'
import MUIDataTable from "mui-datatables";
import './styles.scss'

import hp from '../../../Assets/sellerdashboard/inventory/hp.png'

function index({registerproduct}) {

  const options = {
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: "none",
    download: false,
    print: false,
    sort: false,
    viewColumns: false,
    search: false,
  };

  const columns = [
    {
      name: 'logo',
      label: ' ',
      options: {
        customBodyRender: (value) => {
          return (
            <img src={value} alt="" />
          )
        }
      }
    },
    {
      name: 'pname',
      label: 'PRODUCT NAME'
    },
    {
      name: 'category',
      label: 'CATEGORY'
    },
    {
      name: 'sku',
      label: 'SKU'
    },
    {
      name: 'instock',
      label: 'IN STOCK',
      options: {
        customBodyRender: (value) => {
          return (
            <div className='inventory__instock'>
              {value}
            </div>
          )
        }
      }
    },
    
    {
      name: 'moq',
      label: 'MOQ',
      options: {
        customBodyRender: (value) => {
          return (
            <div className='inventory__moq'>
              {value}
            </div>
          )
        }
      }
      
    },
    {
      name: 'myprice',
      label: 'MY PRICE',
      options: {
        customBodyRender: (value) => {
          return (
            <div className='inventory__myprice'>
              <p>
              <span className='label'>INR</span>
                <span className='value'>{value}</span>
              </p>
            </div>
          )
        }
      }
      
    },
    {
      name: 'lowestprice',
      label: 'LOWEST PRICE',
      options: {
        customBodyRender: (value) => {
          return (
            <div className='inventory__lowestprice'>
              <p>
                <span className='label'>INR</span>
                <span className='value'>{value}</span>
              </p>
            </div>
          )
        }
      }
      
    },
    {
      name: 'hub',
      label: 'HUB'
    },
    {
      name: 'rank',
      label: 'RANK',
      options: {
        customBodyRender: (value) => {
          return (
            <div className='inventory__rank'>
              {value}
            </div>
          )
        }
      }
    },
    {
      name: 'action',
      label: 'ACTION',
      options: {
        customBodyRender: (value) => {
          return (
            <div className='inventory__action' onClick={() => registerproduct('updateproduct')}>
              {value}
            </div>
          )
        }
      }
      
    },
  ]

  const table = [
    {
      logo: hp,
      pname: 'pname1',
      category: 'cat1',
      sku: 'sku1',
      instock: 100,
      moq: 30,
      myprice: 500,
      lowestprice: 450,
      hub: "Chennai",
      rank: '6th',
      action: 'Update'
    },
    {
      logo: hp,
      pname: 'pname2',
      category: 'cat2',
      sku: 'sku2',
      instock: 500,
      moq: 100,
      myprice: 5000,
      lowestprice: 4050,
      hub: "Hydrebad",
      rank: '13th',
      action: 'Update'
    },
  ]
  return (
    <div className='inventory'>
      <MUIDataTable
        title={""}
        data={table}
        columns={columns}
        options={options}
        className="inventory__table"
      />
      <div className='inventory__products'>
        <span className='inventory__back'>Back</span>
        <div class="inventory__buttons">
          <p className='inventory_register' onClick={() => registerproduct('registerproduct')}>Register New Product</p>
          <p className='inventory_adddetails' onClick={() => registerproduct('addproduct')}>Add Product Details</p>
        </div>
      </div>
    </div>
  )
}

export default index