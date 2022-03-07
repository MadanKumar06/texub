import {  Input, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from './styles.scss'
import { withStyles } from "@mui/styles";
import {  DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import uploadImage from "../../../../Assets/CommonImage/KYC Form/Icon.png";

function Index({ setrequestform, formtype, classes }) {

  const hideform = () => {
    setrequestform(false)
  }

    let {
      asterisk,
    } = classes;

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    const [value, setValue] = useState(new Date());

  return (
    <div className='request'>
        <h2>{formtype === 'New' ? 'Create New Request' : 'Update Request'}</h2>
        <div className='request__form'>
          <p className='form__name'>
            <InputLabel>
              Name
            </InputLabel>
            <TextField
              id="email_address"
              fullWidth
              InputLabelProps={{
                shrink: false,
                required: true,
                classes: {
                  asterisk: asterisk,
                },
              }}
              value=""
              name="email_address"
              // onChange={handleChangeInput}
              variant="outlined"
            />
          </p>
          <p className='form__brand'>
          <InputLabel id="demo-simple-select-label">Brand</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </p>
          <p className='form__modelnumber'>
          <InputLabel id="demo-simple-select-label">Model Number</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </p>
          <p className='form__image'>
            <InputLabel>
              <span>Attach Product Image
                <label
                // className={sub_media_upload_label}
                htmlFor="icon-button-file"
              >
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                />
                <img
                  src={uploadImage}
                  alt="auth"
                  aria-label="upload picture"
                  component="span"
                />
              </label>
              </span>
              <span>(Supported format : .jpg/.png/.pdf)</span>
            </InputLabel>
            <span className='image__file'>Image</span>
          </p>
          <p className='form__startdate'>
            <InputLabel>
              Start Date
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </p>
          <p className='form__enddate'>
            <InputLabel>
              End Date
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
          </p>
          <p className='form__qty'>
            <InputLabel>
              Enter qty
            </InputLabel>
            <TextField
              id="email_address"
              fullWidth
              InputLabelProps={{
                shrink: false,
                required: true,
                classes: {
                  asterisk: asterisk,
                },
              }}
              value=""
              name="email_address"
              // onChange={handleChangeInput}
              variant="outlined"
            />
          </p>
          <p className='form__price'>
            <InputLabel>
              Price
            </InputLabel>
            <TextField
              id="email_address"
              fullWidth
              InputLabelProps={{
                shrink: false,
                required: true,
                classes: {
                  asterisk: asterisk,
                },
              }}
              value=""
              name="email_address"
              // onChange={handleChangeInput}
              variant="outlined"
            />
          </p>
          <p className='form__decsription'>
            <InputLabel>
              Product Description
            </InputLabel>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={5}
              style={{ width: '100%' }}
            />
          </p>
        </div>
        <div className='request__submit'>
          <p className='request__back'>Back</p>
          <p className='request__save' onClick={hideform}>Save Changes</p>
        </div>
    </div>
  )
}

export default withStyles(styles)(Index);