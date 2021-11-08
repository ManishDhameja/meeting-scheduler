import React from "react";
import { Modal, ModalBody } from "reactstrap";
import { getTimeFromTimestamp } from "../../utilities";
// import Button from '@material-ui/core/Button';
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import { margin } from "@mui/system";
import { Avatar } from "@material-ui/core";

const InfoModal = ({ show, handleClose }) => {
  const list = [
    {
      startTime: 1636362006000,
      endTime: 1636369206000,
      title: "Class Bunk",
      description: "Lets do it boys",
      type: "accepted",
      meetingLink: "https://meet.google.com/zpr-tczz-qnu",
    },
  ];

  return (
    <>
      {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header className="Modal-header">
                    Meeting Details
                    <IconButton onClick={handleClose}><ClearIcon /></IconButton>
                </Modal.Header>
<<<<<<< HEAD
                <ModalBody> */}
      <div className="Content">
        {list.map((card) => {
          return (
            <>
              <div className="container mt-3">
                <div className="row py-2">
                  <div className="col-12">
                    <span className="my-1 fs-2">{card.title}</span>
                    <div>
                      <span className="my-1 fs-5">{card.description}</span>
=======
                <Modal.Body>
                    <div className="Content">{list.map((card) => {
                        return (
                            <>
                                <p style={{ marginBottom: "-20px" }}>Timing: {getTimeFromTimestamp(card.startTime)} - {getTimeFromTimestamp(card.endTime)}</p>
                                <p style={{ marginBottom: "-20px" }}><b>Title: {card.title}</b></p>
                                <p style={{ marginBottom: "-10px" }}>Description: {card.decription}</p>
                                <a href={card.meetingLink} target="_blank"><p style={{ marginBottom: "-10px", color: "blue" }}>Link: {card.meetingLink}</p></a>
                            </>
                        );
                    })}
>>>>>>> 03710259f7f62139592f70989f72551c6aeeb347
                    </div>
                    <div>
                      <span className="my-3 fs-6">12:00pm - 3:00pm</span>
                    </div>
                    <div>
                      <a
                        href={card.meetingLink}
                        className="my-3 fs-6"
                        style={{ cursor: "pointer" }}
                      >
                        {card.meetingLink}
                      </a>
                    </div>
                  </div>
                  <hr style={{margin:'10px 0px 10px'}}/>
                  <div className="row ">
                      <div className="col-8">
                          Members
                      </div>
                      <hr></hr>
                  </div>
                  <div className="d-flex">
                      <Avatar>
                          M
                      </Avatar>
                        <div className="ms-2 mt-2 d-flex justify-content-between" style={{width:'100%'}}>
                            <div>
                                Manish Dhameja
                            </div>
                            <div className="text-danger">
                                Declined
                            </div>
                        </div>
                  </div>
                  <div className="d-flex mt-2">
                      <Avatar>
                          R
                      </Avatar>
                        <div className="ms-2 mt-2 d-flex justify-content-between" style={{width:'100%'}}>
                            <div>
                                Rishab Goyal
                            </div>
                            <div className="text-success">
                                Accepted
                            </div>
                        </div>
                  </div>
                  <div className="d-flex mt-2">
                      <Avatar>
                          JR
                      </Avatar>
                        <div className="ms-2 mt-2 d-flex justify-content-between" style={{width:'100%'}}>
                            <div>
                                Jatin Trivedi
                            </div>
                            <div className="text-primary">
                                Pending
                            </div>
                        </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      {/* </ModalBody>
            </Modal> */}
    </>
  );
};

export default InfoModal;
