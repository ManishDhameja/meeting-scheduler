import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { getTimeFromTimestamp, getDateFromTimestamp } from "../../utilities";
import { Avatar } from "@material-ui/core";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const InfoModal = (props) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.meetingId) {
      setLoading(true);
      axios
        .get("http://localhost:5000/meetings/meetingDetails", {
          params: { meetingId: props.meetingId },
        })
        .then((res) => {
          setDetails(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.meetingId]);

  console.log(details.attendees);

  return (
    <>
      {!loading ? (
        <Modal isOpen={props.isModalOpen} toggle={props.toggleModal}>
          <ModalHeader className="Modal-header">
            Meeting Details
            {/* <IconButton onClick={handleClose}><ClearIcon /></IconButton> */}
          </ModalHeader>
          <ModalBody>
            <div className="Content">
              <div className="container mt-3">
                <div className="row py-2">
                  <div className="col-12">
                    <span className="my-1 fs-2">{details.title}</span>
                    <div>
                      <span className="my-1 fs-5">{details.description}</span>
                    </div>
                    <div>
                      <span className="my-3 fs-6">
                        Start - {getDateFromTimestamp(details.startTime)}{" "}
                        {getTimeFromTimestamp(details.startTime)}
                        <br />
                        End -{getDateFromTimestamp(details.endTime)}{" "}
                        {getTimeFromTimestamp(details.endTime)}
                      </span>
                    </div>
                    <div>
                      <a
                        href={details.meetingLink}
                        className="my-3 fs-6"
                        style={{
                          cursor: "pointer",
                          textDecoration: "none",
                          color: "#333",
                        }}
                      >
                        {details.meetingLink}
                      </a>
                    </div>
                  </div>
                  <hr style={{ margin: "10px 0px 10px" }} />
                  <div className="row ">
                    <div className="col-8">Members</div>
                    <hr></hr>
                  </div>
                  {details.attendees &&
                    details.attendees.map((attendee) => {
                      return (
                        <div className="d-flex mb-2">
                          <Avatar>{attendee.username?.slice(0, 1)}</Avatar>
                          <div
                            className="ms-2 mt-2 d-flex justify-content-between"
                            style={{ width: "100%" }}
                          >
                            <div>{attendee.username}</div>
                            {attendee.status === "Accepted" && (
                              <div className="text-success">
                                {attendee.status}
                              </div>
                            )}
                            {attendee.status === "Pending" && (
                              <div className="text-primary">
                                {attendee.status}
                              </div>
                            )}
                            {attendee.status === "Declined" && (
                              <div className="text-danger">
                                {attendee.status}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      ) : (
        <div
          className="col-12 d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <CircularProgress size={80} className="display-block" />
        </div>
      )}
    </>
  );
};

export default InfoModal;
