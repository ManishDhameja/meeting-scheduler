import React, { useState } from "react";
import { Modal, ModalBody, TabContent, TabPane } from "reactstrap";
import ClearIcon from "@material-ui/icons/Clear";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Autocomplete
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

const AddEvent = () => {
  const friends = [
    "Jatin Bajaj",
    "Rishab Goyal",
    "Manish Dhameja",
    "Rolit Trivedi",
  ];
  const friendList = [
    "Jatin Bajaj",
    "Rishab Goyal",
    "Manish Dhameja",
    "Rolit Trivedi",
    "Jatin Bajaj",
    "Rishab Goyal",
    "Manish Dhameja",
    "Rolit Trivedi",
  ];

  const RenderFriends = () =>
    friends.map((friend, index) => {
      return (
        <span
          key="index"
          class="badge rounded-pill bg-secondary me-3 mb-3 fs-6"
        >
          {friend}
          <span style={{cursor:'pointer'}}>
            <ClearIcon></ClearIcon>
          </span>
        </span>
      );
    });
  const [friendName, setFriendName] = useState("");
  const [value, setValue] = useState("Controlled");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const handleChange = (event) => {
    setFriendName(event.target.value);
    setValue(event.target.value);
  };
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Add Event</h2>
        </div>
      </div>
      <div className="row py-2">
        <div className="col-3">
          <h5 className="my-3">Event Title :</h5>
        </div>
        <div className="col-9">
          <TextField
            id="standard-textarea"
            label="Event Title"
            required
            multiline
            variant="standard"
          />
        </div>
      </div>
      <div className="row py-2">
        <div className="col-3">
          <h5 className="my-3">Description :</h5>
        </div>
        <div className="col-9">
          <TextField
            id="standard-textarea"
            label="Event Description"
            required
            multiline
            variant="standard"
          />
        </div>
      </div>
      <div className="row py-2">
        <div className="col-3">
          <h5 className="my-3">Start Time :</h5>
        </div>
        <div className="col-9 mt-3">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(params) => <TextField {...params} />}
              label=""
              value={start}
              onChange={(newValue) => {
                setStart(newValue);
              }}
              minDateTime={new Date()}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="row py-2">
        <div className="col-3">
          <h5 className="my-3">End Time :</h5>
        </div>
        <div className="col-9 mt-3">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(params) => <TextField {...params} />}
              label=""
              value={end}
              onChange={(newValue) => {
              setEnd(newValue);
              }}
              minDateTime={new Date()}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="row py-2">
        <div className="col-3">
          <h5 className="my-3">Members :</h5>
        </div>
        <div className="col-9 mt-3">
          <div>
            <RenderFriends />
          </div>
        </div>
      </div>

      <div className="row py-2">
        <div className="col-3">
          <h5 className="my-3">Select Members :</h5>
        </div>
        <div className="col-9">
          
        </div>
      </div>
      <div className="row py-2">
        <div className="col-3">
          <h5 className="my-3">Meeting Place :</h5>
        </div>
        <div className="col-9">
          <TextField
            id="standard-textarea"
            label="Meeting Link or Location"
            multiline
            variant="standard"
          />
        </div>
      </div>
      <div className="row py-2">
        {/* <div className="d-flex justify-content-end">
                    <button type="button" class="btn-pay btn-outline-dark">Save</button>
                 </div> */}
      </div>
    </div>
  );
};

export default AddEvent;
