import React from "react";
import { TextField } from "@mui/material";

import "./styles.scss";

function WantToBuy() {
  return (
    <div className="want_to_buy__container">
      <div className="block_1">
        <TextField
          id="outlined-textarea"
          label="Password"
          fullWidth
          type="password"
          placeholder="Password"
          InputLabelProps={{
            shrink: true,
            required: true,
            classes: {
              asterisk: "asterisk",
            },
          }}
          variant="outlined"
        />

        <TextField
          id="outlined-textarea"
          label="Password"
          fullWidth
          type="password"
          placeholder="Password"
          InputLabelProps={{
            shrink: true,
            required: true,
            classes: {
              asterisk: "asterisk",
            },
          }}
          variant="outlined"
        />
      </div>
      <div className="block_2">
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          fullWidth
          placeholder="Password"
          multiline
          rows={4}
          defaultValue="1"
          maxRows={10}
          InputLabelProps={{
            shrink: true,
            required: true,
            classes: {
              asterisk: "asterisk",
            },
          }}
          variant="outlined"
        />
      </div>
      <div className="block_3">
        <div className="input_field">
          <TextField
            id="outlined-textarea"
            label="Password"
            fullWidth
            type="password"
            placeholder="Password"
            InputLabelProps={{
              shrink: true,
              required: true,
              classes: {
                asterisk: "asterisk",
              },
            }}
            variant="outlined"
          />

          <TextField
            id="outlined-textarea"
            label="Password"
            fullWidth
            type="password"
            placeholder="Password"
            InputLabelProps={{
              shrink: true,
              required: true,
              classes: {
                asterisk: "asterisk",
              },
            }}
            variant="outlined"
          />
        </div>

        <div className="input_field">
          <TextField
            id="outlined-textarea"
            label="Password"
            fullWidth
            type="password"
            placeholder="Password"
            InputLabelProps={{
              shrink: true,
              required: true,
              classes: {
                asterisk: "asterisk",
              },
            }}
            variant="outlined"
          />

          <TextField
            id="outlined-textarea"
            label="Password"
            fullWidth
            type="password"
            placeholder="Password"
            InputLabelProps={{
              shrink: true,
              required: true,
              classes: {
                asterisk: "asterisk",
              },
            }}
            variant="outlined"
          />
        </div>
      </div>
      <div className="block_4">
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          fullWidth
          placeholder="Password"
          multiline
          rows={4}
          defaultValue="1"
          maxRows={10}
          InputLabelProps={{
            shrink: true,
            required: true,
            classes: {
              asterisk: "asterisk",
            },
          }}
          variant="outlined"
        />
      </div>
    </div>
  );
}

export default WantToBuy;
