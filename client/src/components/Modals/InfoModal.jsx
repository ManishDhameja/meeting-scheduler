import React from 'react';
import Modal from 'react-bootstrap/Modal';

const InfoModal = () => {
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