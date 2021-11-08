import React, { useState, useEffect } from 'react';
import './Calendar.css';
import { shortWeeks, getDateUtil, getFirstLastDayOfWeek, getLastDateOfMonth, getCompleteMonth, getDateStr, getTimeAMPM, getFirstDayOfMonth } from '../../utilities';
// import ScheduleModal from '../ScheduleModal/ScheduleModal';
import { BsTrash } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { FiExternalLink } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { useParams } from 'react-router-dom';

const getWeekInfoList = (currYear, currMonth, currDate) => {
    console.log(currYear, currMonth, currDate);
    let weekInfo = getFirstLastDayOfWeek(currYear, currMonth, currDate);
    let day = getDateUtil(weekInfo[0].year, weekInfo[0].month, weekInfo[0].date).getDay();
    let date = weekInfo[0].date;
    let month = weekInfo[0].month;
    let year = weekInfo[0].year;
    let weekList = [];
    for(let i=0; i<7; i++) {
        weekList.push({
            day: shortWeeks[day],
            date: date,
            month: month,
            year: year
        })
        day++;
        date++;
        if(day === 7) day = 0;
        if(date === getLastDateOfMonth(year, month) + 1) {
            month++;
            date = 1;
        }
        if(month === 12) {
            year++;
            month = 0;
        }
    }
    return weekList;
}

const getTimings = () => {
    let timings = [];
    timings.push({
        num: 12,
        detail: "AM",
        hours: 0
    });
    for(let i=1; i<12; i++) {
        timings.push({
            num: i,
            detail: "AM",
            hours: i
        });
    }
    timings.push({
        num: 12,
        detail: "PM",
        hours: 12
    });
    for(let i=1; i<12; i++) {
        timings.push({
            num: i,
            detail: "PM",
            hours: i + 12
        });
    }
    return timings;
}

const Calendar = () => {
    const year = useParams().year;
    const month = useParams().month;
    const date = useParams().date;
    console.log(useParams());

    const weekList = getWeekInfoList(parseInt(year), parseInt(month)-1, parseInt(date));
    console.log(weekList);
    const timings = getTimings();
    console.log("timings: ", timings);
    const [meetList, setMeetList] = useState([]);

    useEffect(() => {
        setMeetList([
            {
                meetingId: "https://meet.google.com/zpr-tczz-qnu",
                startTime: 1636342200000,
                endTime: 1636349400000,
                type: "pending",
                _id: "rwdewjo21233nkm2143",
                title: "Design Team"
            },
            {
                meetingId: "https://meet.google.com/zpr-tczz-qnu",
                startTime: 1636342200000,
                endTime: 1636349400000,
                type: "denied",
                _id: "rwdewjo21233nkm3143",
                title: "Feature Discussion"
            },
            {
                meetingId: "https://meet.google.com/zpr-tczz-qnu",
                startTime: 1636342200000,
                endTime: 1636349400000,
                type: "accepted",
                _id: "rwdewjo212r3nkm2143",
                title: "UI/UX team"
            },
            {
                meetingId: "https://meet.google.com/zpr-tczz-qnu",
                startTime: 1636410600000,
                endTime: 1636417800000,
                type: "accepted",
                _id: "rwdewjo212rwnkm2143",
                title: "UI/UX team"
            }
        ])
    }, [])

    return (
        <div className="Calendar">
            <div className="Schedule">
                <div className="Schedule_Timings ">
                    <div className="Schedule_Field Light_BorderB Light_BorderR">
                        <h5>GMT + 05:30</h5>
                    </div>
                    <ul className="Light_BorderR p-0">
                        {
                            timings.map(time => {
                                return <li className="Schedule_Timing_Cell Light_BorderB">{time.num + " " + time.detail}</li>;
                            })
                        }
                    </ul>
                </div>
                <div className="Schedule_Table">
                    {
                        weekList.map(week => {
                            return (
                                <div className="Schedule_Week">
                                    <div className="Schedule_Field Light_BorderB Light_BorderR">
                                        <h2>{week.date}</h2>  <h3>{week.day}</h3>
                                    </div>
                                    <ul className="p-0">
                                        {
                                            timings.map(time => {
                                                let meetings = [];

                                                meetList.forEach(meet => {
                                                    let startTime = new Date(meet.startTime);
                                                    if(startTime.getHours() === time.hours && 
                                                        startTime.getFullYear() === week.year && 
                                                        startTime.getMonth() === week.month &&
                                                        startTime.getDate() === week.date) {
                                                        meetings.push(meet); 
                                                    }
                                                })

                                                return <li
                                                onClick={(event) => {console.log("Create Meeting Modal")}} 
                                                className="Schedule_Cell_Week Light_BorderB Light_BorderR">
                                                    {
                                                        meetings.map(meet => {
                                                            let startTime = new Date(meet.startTime);
                                                            let startT = getTimeAMPM(startTime.getHours(), startTime.getMinutes());
                                                            
                                                            let endTime = new Date(meet.endTime);
                                                            let endT = getTimeAMPM(endTime.getHours(), endTime.getMinutes());

                                                            return <div className="Meet">
                                                                <div className="Meet_Options">
                                                                    <IconContext.Provider value={{className: "Meet_Update"}}>
                                                                        <FiEdit onClick={(event) => {}}/>
                                                                    </IconContext.Provider>
                                                                    <IconContext.Provider value={{className: "Meet_Delete"}}>
                                                                        <FiExternalLink onClick={() => {}} />
                                                                    </IconContext.Provider>
                                                                </div>
                                                                <p className="Meet_Title">{meet.title.length > 14 ? meet.title.substr(0, 14) + "..." : meet.title}</p>
                                                                <p className="Meet_Timings">{startT} to {endT}</p>
                                                            </div>
                                                        })
                                                    }
                                                </li>;
                                            })
                                        }
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Calendar;