import React, { useState, useEffect } from 'react'
import './styles.scss'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ReviewCard from './ReviewCard'
import RMATable from './RMATable'

function Index() {

    const reviewcarddata = [
        {
            rating: 3.5,
            time: "2 min ago",
            name: 'John Doe',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata',
            replies: 2
        },
        {
            rating: 4,
            time: "10 min ago",
            name: 'John Doe',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata iam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et',
            replies: 6
        },
        {
            rating: 1.5,
            time: "an hour ago",
            name: 'John Doe',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata',
            replies: 22
        },
        {
            rating: 5,
            time: "12 hour ago",
            name: 'John Doe',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata iam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et',
            replies: 56
        },
        {
            rating: 2,
            time: "22 hour ago",
            name: 'John Doe',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata',
            replies: 0
        },
        {
            rating: 3,
            time: "22 hour ago",
            name: 'John Doe',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata iam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et',
            replies: 25
        },
    ]

    const sellerservicestype = [
        { name:  'My Rating Review'},
        { name:  'RMA'},
        { name:  'Request for Auction'},
        { name:  'My Auction Results'}
    ]
    const [type, settype] = useState(0)

    const selectorder = (value) => {
        settype(value)
    }

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    useEffect(() => {
        selectorder(0)
    }, [])

    console.log(type)

  return (
      <div className='sellerservices'>
        <div className='sellerservices__buttons'>
            {sellerservicestype.map((data, i) => 
                <p className={`sellerservicestypes ${type === i && "sellerservices__selected"}`}
                key={i} onClick={() => selectorder(i)}
                >
                    {data.name}
                </p>
            )}
        </div>

        {type === 0 && <div className='sellerservices__review'>
            <div className='sellerservices__dropdown'>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">All Reviews</InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <span>318 Total</span>
            </div>
            <div className='sellerservices__reviewbox'>
                <div className='reviewbox__date'>
                    <span className='date__label'>Today</span>
                    <span className='date__value'>Thursday, 17 Feb 2022</span>
                </div>

                <div className='reviewbox__card'>
                    {reviewcarddata.map((data, i) => <ReviewCard key={i} data={data} />)}
                </div>
            </div>
        </div>}

        {type === 1 && <RMATable />}
    </div>
  )
}

export default Index