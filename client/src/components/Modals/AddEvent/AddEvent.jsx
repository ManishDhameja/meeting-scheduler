import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import { TextField, Autocomplete } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import './AddEvent.css';

const AddEvent = (props) => {
  console.log(props);

  const friends = [
    { name: "Jatin Bajaj" },
    { name: "Rishab Goyal" },
    { name: "Manish Dhameja" },
    { name: "Rolit Trivedi" },
  ];
  const friendList = [
    { name: "Jatin Bajaj" },
    { name: "Rishab Goyal" },
    { name: "Manish Dhameja" },
    { name: "Rolit Trivedi" },
    { name: "Bajaj Honda" },
    { name: "Goya" },
    { name: "Tanish Malhotra" },
    { name: "Jolit chaturvedi" },
  ];

  const [selectedMember, setSelectedMember] = useState([]);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const options = friendList.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  // return <h1>Hello</h1>

  return (
    <Modal className="auth-inner AddEventModal"
      isOpen={props.isModalOpen}
      toggle={props.toggleModal}>
      <ModalHeader className="Modal-header">
        {/* <ModalTitle> Add Event</ModalTitle> */}
        {/* <IconButton onClick={props.toggleModal}>
          <ClearIcon />
        </IconButton> */}
        Add Event
      </ModalHeader>
      <ModalBody>
        <div className="container mt-3">
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
              <h5 className="my-3">Select Members :</h5>
            </div>
            <div className="col-8">
              <Autocomplete
                multiple
                limitTags={5}
                id="tags-standard"
                options={options.sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Members"
                    placeholder="Add Member"
                  />
                )}
                value={selectedMember}
                onChange={(_event, selectedMember) => {
                  setSelectedMember(selectedMember);
                }}
              />
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
        </div>
      </ModalBody>
      <ModalFooter>
        <Button className="Modal-button">
          Add
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddEvent;
