import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import { TextField, Autocomplete } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

const WorkingHour = (props) => {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  return (
    <Modal className="auth-inner"
      isOpen={props.isModalOpen}
      toggle={props.toggleModal}>
      <Modal.Header className="Modal-header">
        <Modal.Title> Add Working Hours</Modal.Title>
        <IconButton onClick={()=>props.toggleModal}>
          <ClearIcon />
        </IconButton>
      </Modal.Header>
      <Modal.Body>
        <div className="container mt-3">
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
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="Modal-button">
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WorkingHour;
