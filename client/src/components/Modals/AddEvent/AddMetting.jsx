import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import { TextField, Autocomplete } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import './AddEvent.css';
import axios from 'axios';
import { useSelector } from "react-redux";
import {selectUserData} from '../../../reduxSlices/authSlice'

const AddMeeting = (props) => {
  const [selectedMembers, setSelectedMembers]= useState([]);
  const userData = useSelector(selectUserData);
  const [members, setMembers] = useState([]);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  useEffect(() => {
    axios.get('http://localhost:5000/users/')
      .then((res)=>{
        setMembers(res.data);
      })
      .catch(err =>{
        console.log(err);
      })
  }, [setMembers])

  const handleSubmit= (e)=>{
    e.preventDefault();
    const userArray = selectedMembers.map((item)=>{
      return{
        username : item.username,
        status : 'Pending'
      } 
    })
    userArray.push({
      username : userData.userName,
      status : 'Accepted'
    })
    axios.post('http://localhost:5000/meetings/createMeeting' , {
      startTime : startTime,
      endTime : endTime,
      title : title,
      description : description,
      meetingLink : meetingLink, 
      attendees : userArray,
      host : userData.userName
    })
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  const options = members.map((option) => {
    const firstLetter = option.username[0].toUpperCase();
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
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
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
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
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
                  value={startTime}
                  onChange={(newValue) => {
                    setStartTime(newValue);
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
                  value={endTime}
                  onChange={(newValue) => {
                    setEndTime(newValue);
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
                getOptionLabel={(option) => option.username}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Members"
                    placeholder="Add Member"
                  />
                )}
                value={selectedMembers}
                onChange={(_event, selectedMembers) => {
                  setSelectedMembers(selectedMembers)
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
                value={meetingLink}
                onChange={(e) => {
                  setMeetingLink(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="form-btn" onClick={handleSubmit}>
          Add
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default AddMeeting;
