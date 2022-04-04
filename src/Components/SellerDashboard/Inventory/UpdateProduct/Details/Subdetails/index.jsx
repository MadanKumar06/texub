import { InputLabel, TextField } from '@mui/material'
import React from 'react'

function Index({ setpdetails }) {
  return (
    <div className="updateproduct__gst">
          <div className="updateproduct_info_form">
            <InputLabel>GST %</InputLabel>
            <TextField
              id="gst"
              name="gst"
              placeholder="18"
              className="inputfield-box"
              fullWidth
              autoComplete="off"
              // value={signInData?.email_address}
              InputLabelProps={{
                shrink: false,
              }}
              onChange={(e) => setpdetails(data => ({
                ...data,
                gst: e.target.value
              }))}
              variant="outlined"
            />
          </div>
          <div className="updateproduct_info_form">
            <InputLabel>IGST %</InputLabel>
            <TextField
              id="igst"
              name="igst"
              placeholder="18"
              fullWidth
              className="inputfield-box"
              autoComplete="off"
              // value={signInData?.email_address}
              InputLabelProps={{
                shrink: false,
              }}
              onChange={(e) => setpdetails(data => ({
                ...data,
                igst: e.target.value
              }))}
              variant="outlined"
            />
          </div>
          <div className="updateproduct_info_form">
            <InputLabel>SGST %</InputLabel>
            <TextField
              id="sgst"
              name="sgst"
              placeholder="18"
              fullWidth
              autoComplete="off"
              className="inputfield-box"
              // value={signInData?.email_address}
              InputLabelProps={{
                shrink: false,
              }}
              onChange={(e) => setpdetails(data => ({
                ...data,
                sgst: e.target.value
              }))}
              variant="outlined"
            />
          </div>
        </div>
  )
}

export default Index