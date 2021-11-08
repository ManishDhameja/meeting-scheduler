import React, { useState, useEffect } from 'react';
import Sidedrawer from '../Sidedrawer/Sidedrawer';
import Calendar from '../Calendar/Calendar';
import Header from '../Header/Header';

const Dashboard = () => {
    const [showSidedrawer, setShowSidedrawer] = useState(true);
    const toggleSidedrawer = () => {
        setShowSidedrawer(prevState => !prevState);
    }

    return (
        <>
            <Header />
            <div className="Dashboard d-flex" style={{ height: "100vh", background: "#f4f4f4" }}>
                <Sidedrawer
                    show={showSidedrawer}
                    closeSidedrawer={() => { }}
                />
                <Calendar />
            </div>
        </>
    )
}

export default Dashboard;