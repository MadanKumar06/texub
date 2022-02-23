import { Select, MenuItem } from '@material-ui/core'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

function RegisterProduct() {

    const [maincat,setmaincat] = useState()
    const handleChange = () => {
        console.log(maincat)
    }
  return (
    <div className='registerproduct'>
        <h1>Register New Product</h1>

        <form className='registerproducts__form'>
            <p>
                <h5>Name</h5>
                <input placeholder='Enter Product Name' />
            </p>
            <div className='registerproduct__formflex'>
                <p>
                    <h5>Main Category</h5>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={maincat}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </p>
                <p>
                    <h5>Sub-Category</h5>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={maincat}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </p>
                <p>
                    <h5>Brand</h5>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={maincat}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </p>
                <p>
                    <h5>Model Number</h5>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={maincat}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </p>
                <p>
                    <h5>Vendor / Manufacturer part Number</h5>
                    <input placeholder='DE-B-0089' />
                </p>
                <p>
                    <h5>UPC Number</h5>
                    <input placeholder='3604929017' />
                </p>
                <p>
                    <h5>HSN Code</h5>
                    <input placeholder='22348765' />
                </p>
                <p>
                    <h5>GST %</h5>
                    <input placeholder='18' />
                </p>
            </div>  
            <p>
                <h5>Description</h5>
                <textarea  rows="4" />
            </p>
        </form>

        <div className='registerproduct__submit'>
            <Link to="/sellerdashboard/inventory"><span className='registerproduct__back'>Back</span></Link>
            <Link to="/sellerdashboard/registersuccess"><p className='registerproduct__submitbutton'>Submit</p></Link>
        </div>
    </div>
  )
}

export default RegisterProduct