import React, { useState, useEffect } from 'react';
import { getTimeFromTimestamp } from '../../utilities';
import './Sidedrawer.css';

const Sidedrawer = ({ show, closeSidedrawer }) => {
    const [closing, setClosing] = useState(false);
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

    const closeSidedrawerUtil = () => {
        setClosing(true);
        setTimeout(() => closeSidedrawer(), 340);
    }
    useEffect(() => {
        if (!show) {
            closeSidedrawerUtil();
        }
        return () => {
            setClosing(false);
        }
    }, [show])

    return (
        <>
            <div className={"Sidedrawer " + (closing ? "Sidedrawer_Close" : (show ? "Sidedrawer_Open" : ""))}>
                <h1 style={{ fontSize: "4rem", marginBottom: "-20px" }}>Upcomming Events</h1>
                <p style={{ fontSize: "2rem" }}>Don't miss sheduled events</p>
                <div className="content"> {list.map((card) => {
                    return (
                        <div className="eventCard">
                            <p style={{ marginBottom: "-20px" }}>{getTimeFromTimestamp(card.startTime)} - {getTimeFromTimestamp(card.endTime)}</p>
                            <p style={{ marginBottom: "-20px" }}><b>{card.title}</b></p>
                            <p style={{ marginBottom: "-10px" }}>{card.decription}</p>
                            <a href={card.meetingLink} target="_blank"><p style={{ marginBottom: "-10px", color: "blue" }}>{card.meetingLink}</p></a>
                        </div>
                    );
                })}
                </div>
            </div>
        </>
    );
}
export default Sidedrawer;