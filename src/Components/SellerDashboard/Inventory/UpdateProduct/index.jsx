import React, { useState } from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'
import Details from './Details'

function Index({type}) {

    const [count, setcount] = useState([0])
    const [test, settest] = useState(1)

    const countincrease = () => {
        settest(test + 1)
        count.push(test)
    }

    const deleterow = (i) => {
        console.log(i)
        // let dummy = [...count]
        // dummy.splice(i, 1)
        // setcount(dummy)
        setcount(count.filter(item => item !== i))
    }

    console.log(count)


  return (
    <div className='updateproduct'>
        <h1>{type}</h1>
        
        <div className='updateproduct__topform'>
            
        {count.map((data, i) => 
        <div className='topform__details'>
            <Details key={i} countincrease={countincrease} i={i} deleterow={deleterow} /> 
            </div>
        )}
            
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