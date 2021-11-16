import React, { useState, useEffect} from 'react';
import { getDateFromTimestamp, getTimeFromTimestamp } from '../../utilities';
import './Sidedrawer.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../reduxSlices/authSlice';
import InfoModal from '../Modals/InfoModal';
import CircularProgress from "@material-ui/core/CircularProgress";

const Sidedrawer = () => {
    const [meetingList, setMeetingList] = useState([]);
    const [meetingId, setMeetingId] = useState("");
    const userData = useSelector(selectUserData);
    const [ loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const toggle = () => setShow(prevState=>!prevState);
    
    const showMeeting =(meetingId)=>{
        setShow(true);
        setMeetingId(meetingId);
    }

    useEffect(()=>{
        setLoading(true)
        if(!userData.loading){         
            axios.get('http://localhost:5000/meetings/upcomingMeetings/',{
                params:{username : userData.userName}
            })
            .then((res)=>{
                setMeetingList(res.data);
                setLoading(false)
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },[userData]);
    return (
        <>
            {(!loading)?(
            <div className="Sidedrawer px-4">
                <h1 style={{ fontSize: "1.7rem"}} className="pt-3">Upcomming Events</h1>                    
                <p style={{ fontSize: "1.1rem" }} className="text-center">Don't miss sheduled events</p>
                {(meetingList.length===0)?
                    <span className="d-flex justify-content-center fs-6 mt-2">No meetings due</span>:
                    <div className="content w-100"> {meetingList.map((card) => {
                        return (
                            <div className="eventCard p-3 pb-4 mb-4" onClick={()=>showMeeting(card._id)}>
                            <p style={{ fontSize:"1rem"}} className="mb-0"><span style={{fontWeight:"500"}}>{card.title}</span> </p>
                            <p style={{ fontSize:"1rem"}} className="mb-0"><span style={{fontSize:"0.8rem"}}>{card.description}</span></p>
                            <p style={{ fontSize:"0.8rem" }} className="mb-0">{getDateFromTimestamp(card.startTime)} {getTimeFromTimestamp(card.startTime)} - {getDateFromTimestamp(card.endTime)} {getTimeFromTimestamp(card.endTime)}</p>
                            <a href={card.meetingLink} target="_blank"><p style={{ marginBottom: "-10px", color: "#333", textDecoration:'none',fontSize:"0.8rem" }}>{card.meetingLink}</p></a>
                            
                        </div>
                    );    
                })} 
                </div>
            }
                <InfoModal
                    meetingId = {meetingId}
                    isModalOpen={show} 
                    toggleModal={toggle} 
                />
            </div>
            ):( 
                <div className="col-12 d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
                  <CircularProgress size={80} className="display-block"/>
                </div>
              )}
        </>
    );
}
export default Sidedrawer;



