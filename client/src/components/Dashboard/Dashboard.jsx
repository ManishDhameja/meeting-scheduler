import React, { useState, useEffect } from 'react';
import Sidedrawer from '../Sidedrawer/Sidedrawer'

const Dashboard = () => {
    const [showSidedrawer, setShowSidedrawer] = useState(true);
    const toggleSidedrawer = () => {
        setShowSidedrawer(prevState => !prevState);
    }
    return (
        <div>
            <Sidedrawer 
            show={showSidedrawer} 
            closeSidedrawer={() => {}}
            />
        </div>
    )
}

export default Dashboard;