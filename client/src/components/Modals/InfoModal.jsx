import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { getTimeFromTimestamp } from '../../utilities';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

const InfoModal = ({ show, handleClose }) => {
    const list = [
        {
            startTime: 1636362006000,
            endTime: 1636369206000,
            title: "Class Bunk",
            decription: "Lets do it boys",
            type: "accepted",
            meetingLink: "https://meet.google.com/zpr-tczz-qnu",
        }
    ];

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="Modal-header">
                    <Modal.Title>Meeting Details</Modal.Title>
                    <IconButton onClick={handleClose}><ClearIcon /></IconButton>
                </Modal.Header>
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

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} className="Modal-button">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default InfoModal;