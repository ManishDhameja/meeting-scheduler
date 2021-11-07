import React from 'react';
import Sidedrawer from '../Sidedrawer/Sidedrawer';
import Calendar from '../Calendar/Calendar';

const Dashboard = () => {
    return (
        <div className="d-flex">
            <Sidedrawer/>
            <Calendar />
        </div>
    )
}

export default Dashboard;