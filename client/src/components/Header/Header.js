import React, { useEffect, useState } from 'react';
import './Header.css';
import { FcCalendar } from 'react-icons/fc';
import { ImMenu } from 'react-icons/im';
import { IconContext } from "react-icons";
import { BiChevronLeft } from 'react-icons/bi';
import { BiChevronRight } from 'react-icons/bi';
import { Avatar } from '@mui/material';

const Header = () => {
    const name="Rolit";
    const [isShown, setIsShown] = useState(false);
    return (
        <>
            <div className="HeaderContainer">
                <div className="Header">
                    <ImMenu style={{fontSize:"1.8rem"}} />
                    <div style={{marginLeft:"50px", marginRight:"50px"}}>
                        <FcCalendar style={{fontSize:"2.4rem"}} />
                        <span className="HeaderTitle">Meeting Scheduler</span>
                    </div>
                    <div className="Headersubpart">
                        <button className="HeaderTodayBtn DateButton">
                            Today
                        </button>
                        <div className="HeaderNavDateBtns">
                            <IconContext.Provider value={{className: "HeaderNavDateIcons"}}>
                            <BiChevronLeft  />
                            <BiChevronRight />
                            </IconContext.Provider>
                        </div>
                        <span className="HeaderDateselected">
                            08-11-2021
                        </span>
                    </div>
                    <div className="HeaderSelector">
                        <select className="HeaderDropdown">
                            <option value="day">Day</option>
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                        </select>
                    </div>
                    <Avatar style={{backgroundColor:"rgb(50, 53, 58)"}}>
                        {name.slice(0,1)}
                    </Avatar>
                </div>
            </div>
        </>
    )
}

export default Header;