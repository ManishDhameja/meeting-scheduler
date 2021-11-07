import React, { useState } from 'react';
import Sidedrawer from '../Sidedrawer/Sidedrawer';
import Calendar from '../Calendar/Calendar';

const Dashboard = () => {
    const [showSidedrawer, setShowSidedrawer] = useState(true);
    const toggleSidedrawer = () => {
        setShowSidedrawer(prevState => !prevState);
    }
    
    return (
        <div className="d-flex">
            <Sidedrawer/>
            <Calendar />
        </div>
    )
}

export default Dashboard;