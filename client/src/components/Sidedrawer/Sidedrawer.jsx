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
            <div className="Sidedrawer px-4">
                <h1 style={{ fontSize: "1.7rem"}} className="pt-3">Upcomming Events</h1>                    
                <p style={{ fontSize: "1.1rem" }} className="text-center">Don't miss sheduled events</p>
                <div className="content w-100"> {list.map((card) => {
                    return (
                        <div className="eventCard p-3 pb-4">
                            <p style={{ fontSize:"0.8rem" }} className="mb-0">{getTimeFromTimestamp(card.startTime)} - {getTimeFromTimestamp(card.endTime)}</p>
                            <p style={{ fontSize:"1rem"}} className="mb-0"><span style={{fontWeight:"500"}}>{card.title}</span> - <span style={{fontSize:"0.8rem"}}>{card.decription}</span></p>
                            <a href={card.meetingLink} target="_blank"><p style={{ marginBottom: "-10px", color: "blue",fontSize:"0.8rem" }}>{card.meetingLink}</p></a>
                        </div>
                    );
                })}
                </div>
            </div>
        </>
    );
}
export default Sidedrawer;