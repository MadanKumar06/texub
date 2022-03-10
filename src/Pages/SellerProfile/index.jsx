import React from 'react'
import './styles.scss'
import bg from '../../Assets/sellerdashboard/bg.png'
import { Paper, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import notification from '../../Assets/sellerdashboard/notification.png'
import hp from '../../Assets/sellerdashboard/inventory/hp.png'
import MUITable from '../../Components/MUITable'

function Index() {
    const sidemenu = [
        { label: 'Seller Code', value: 'INDS20222' },
        { label: 'Seller Country', value: 'INDIA' },
        { label: 'Completed Orders', value: 118 },
    ]


      const columns = [
          { name: 'logo', label: ' ', options: {
            customBodyRender: (value) => {
                return (
                    <div className='sellerprofile__image'>
                        <img src={value} alt="" />
                    </div>
                )}
            }
        },
          { name: 'productname', label: 'PRODUCT NAME' },
          { name: 'category', label: 'CATEGORY' },
          { name: 'sku', label: 'SKU' },
          { name: 'instock', label: 'IN STOCK', options: {
            customBodyRender: (value) => {
                return (
                    <div className='sellerprofile__instock'>
                        {value}
                    </div>
                )}
            }
        },
          { name: 'moq', label: 'MOQ', options: {
            customBodyRender: (value) => {
                return (
                    <div className='sellerprofile__moq'>
                        {value}
                    </div>
                )}
            }
        },
          { name: 'myprice', label: 'MY PRICE', options: {
            customBodyRender: (value) => {
                return (
                    <div className='sellerprofile__myprice'>
                        {value}
                    </div>
                )}
            }
        },
          { name: 'hub', label: 'HUB' },
          { name: 'rank', label: 'RANK', options: {
            customBodyRender: (value) => {
                return (
                    <div className='sellerprofile__rank'>
                        {value}
                    </div>
                )}
            }
        },
      ]

      const table = [
          {
              logo: hp,
              productname: 'pname1',
              category: 'Laptop',
              sku: 'sku1',
              instock: 2000,
              moq: 50,
              myprice: 65999,
              hub: 'Mumbai',
              rank: '4th'
          },
          {
            logo: hp,
            productname: 'pname2',
            category: 'Desktop',
            sku: 'sku5',
            instock: 4500,
            moq: 200,
            myprice: 55699,
            hub: 'Banglore',
            rank: '4th'
        },
      ]

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
    
  return (
    <div className='sellerprofile'>
        {/* <img src={bg} alt="" /> */}
        <div className='sellerprofile__bg'>
            <div className='sellerprofile__sidebar'>
                <ul>
                {sidemenu.map((data, i) => 
                    <li key={i} className={`${data.label === "Seller Code" && 'bgcolor1'}
                    ${data.label === 'Seller Country' && 'bgcolor2'}
                    ${data.label === "Completed Orders" && 'bgcolor3'}
                    `}>
                        <p className='sellerprofile__label'>{data.label}</p>
                        <p className='sellerprofile__value'>{data.value}</p>
                    </li>
                )}
                </ul>
            </div>
            <div className='sellerprofile__main'>
                <div className='sellerprofile__search'>
                <Paper className='sellerprofile__searchinput'  component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search google maps' }}
                            className="sellerprofile__input"
                        />
                        
                    </Paper>
                    <div className='sellerprofile__notiIcon'>
                        <img src={notification} alt="" />
                    </div>
                    <span>Notification</span>
                </div>
                <MUITable columns={columns} table={table} options={options} className="sellerprofile__table" />
            </div>
        </div>
        
    </div>
  )
}

export default Index