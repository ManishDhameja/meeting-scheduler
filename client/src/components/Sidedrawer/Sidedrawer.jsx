import React, { useState, useEffect } from 'react';
import './Sidedrawer.css';

const Sidedrawer = ({ show, closeSidedrawer }) => {
    const [closing, setClosing] = useState(false);
    const [stime, setstime] = useState(0);
    const [etime, setetime] = useState(0);
    const [title, settitle] = useState("Class");
    const [description, setdescription] = useState("Urgent Meeting");


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
                <div className="eventCard">
                    <p style={{ marginBottom: "-20px" }}>{stime}-{etime}</p>
                    <p style={{ marginBottom: "-20px" }}><b>{title}</b></p>
                    <p>{description}</p>
                </div>
            </div>
        </>
    );
}
export default Sidedrawer;