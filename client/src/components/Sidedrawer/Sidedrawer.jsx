import React, { useState, useEffect } from 'react';
import './Sidedrawer.css';

const Sidedrawer = ({ show, closeSidedrawer }) => {
    // const [closing, setClosing] = useState(false);
    // const [stime, setstime] = useState(0);
    // const [etime, setetime] = useState(0);
    // const [title, settitle] = useState("Class");
    // const [description, setdescription] = useState("Urgent Meeting");


    // const closeSidedrawerUtil = () => {
    //     setClosing(true);
    //     setTimeout(() => closeSidedrawer(), 340);
    // }
    // useEffect(() => {
    //     if (!show) {
    //         closeSidedrawerUtil();
    //     }
    //     return () => {
    //         setClosing(false);
    //     }
    // }, [show])

    return (
        <>
            <div className={"Sidedrawer"}>
                {/* <h1>Upcomming Events</h1>
                <p style={{ marginTop: "-15px" }}>Don't miss sheduled events</p>
                <div className="eventCard">
                    <p>{stime}-{etime}</p>
                    <p className="eventTitle"><b>{title}</b></p>
                    <p>{description}</p>
                </div> */}
            </div>
        </>
    );
}
export default Sidedrawer;