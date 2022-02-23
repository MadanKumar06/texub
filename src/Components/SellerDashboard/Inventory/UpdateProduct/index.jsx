import React, { useState } from 'react'
import './styles.scss'
import { Select, MenuItem } from '@material-ui/core'
import { Link } from 'react-router-dom'

function Index({type}) {

    const [test, settest] = useState()

    const handleChange = () => {
        console.log(test)
    }
  return (
    <div className='updateproduct'>
        <h1>{type}</h1>
        
        <div className='updateproduct__topform'>
            <div className='updateproduct__bgform'>
                <p>
                    <h5>Hub</h5>
                    <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={test}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                </p>
                <p>
                    <h5>Price USD</h5>
                    <input placeholder="$" />
                </p>
                <p>
                    <h5>Price Base Currency</h5>
                    <input placeholder="INR" />
                </p>
                <p>
                    <h5>In Stock</h5>
                    <input placeholder="250" />
                </p>
                <p>
                    <h5>ETA</h5>
                    <input placeholder="90 Days" />
                </p>
                <p>
                    <h5>MOQ</h5>
                    <input placeholder="MOQ" />
                </p>
            </div>
            <div className='updateproduct__addmore'>
                <p>
                    <span className='addmore__plus'></span>
                    <span className='addmore__text'>Add More</span>
                </p>
            </div>
        </div>

        <div className='updateproduct__gst'>
            <p>
                <h5>CGST%</h5>
                <input placeholder='18' />
            </p>
            <p>
                <h5>IGST%</h5>
                <input placeholder='18' />
            </p>
            <p>
                <h5>SGST%</h5>
                <input placeholder='18' />
            </p>
        </div>

        <div className='updateproduct__specifications'>
            <p>
                <h5>Conditions</h5>
                <input placeholder='Select Conditions' />
            </p>
            <p>
                <h5>Warranty Type</h5>
                <input placeholder='Select Warranty Type' />
            </p>
            <p>
                <h5>Warranty Days</h5>
                <input placeholder='90 Days' />
            </p>
            <p>
                <h5>Packing days</h5>
                <input placeholder='2 Days' />
            </p>
            <p>
                <h5>Dimensions</h5>
                <input placeholder='Length x width x Height' />
            </p>
            <p>
                <h5>Restrictions</h5>
                <input placeholder='18' />
            </p>
            <p>
                <h5>CGST%</h5>
                <input placeholder='18' />
            </p>
            <p>
                <h5>Region</h5>
                <input placeholder='Select Region' />
            </p>
            <p className='updateproduct__textarea'>
                <h5>Country</h5>
                <textarea rows="5" />
            </p>
        </div>

        <div className='updateproduct__buttons'>
            <Link to="/sellerdashboard/inventory"><span className='updateproduct__back'>Back</span></Link>
            <Link to={`${type === "Add Product Details" ? '/sellerdashboard/updatesuccess' : '/sellerdashboard/addsuccess'}`}>
                <p className='updateproduct__submit'>
                    Submit
                </p>
            </Link>
        </div>
    </div>
  )
}

export default Index