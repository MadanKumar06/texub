import React, { useState } from 'react'
import './styles.scss'
import { Select, MenuItem } from '@mui/material'

function Index({ checkselection }) {

    const [test, settest] = useState()

    const [checkmumbai, setcheckmumbai] = useState()

    const handleChange = (value) => {
        setcheckmumbai(value)
    }

  return (
      <>
        <div className='updateproduct__bgform'>
            <p>
                <h5>Hub</h5>
                <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={test}
                        label="Age"
                        onChange={(e) => handleChange(e.target.value)}
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
        {checkmumbai === 10 && <div className='updateproduct__gst'>
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
        </div>}
    </>
  )
}

export default Index