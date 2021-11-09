import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import IconButton from '@material-ui/core/IconButton';
import './Header.css';
import Sidedrawer from '../Sidedrawer/Sidedrawer';
import LoginModal from '../LoginModal/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT, selectUserData} from '../../reduxSlices/authSlice';
import Avatar from '@material-ui/core/Avatar';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import MenuIcon from '@mui/icons-material/Menu';
import { FcCalendar } from 'react-icons/fc';
const Header = () => {
  const [showSidedrawer, setShowSidedrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const closeShowSidedrawer = () => {
      setShowSidedrawer(false);
  }
  window.onscroll = () => {
      if(window.scrollY) {
          setScrolled(true);
      } else { 
          setScrolled(false);
      }
  }
  const [show, setShow] = useState(false);
  const toggle = () => setShow(prevState=>!prevState);
  const storeData = useSelector(selectUserData);
  const userName = storeData.userName;
  const token = storeData.token;
  const [loginVar, setLoginVar] = useState(true);
  const userEmail = storeData.userEmail;
  const ConditionalBtn = () => {
    if(loginVar) {
      return (
        <li className="nav-item text-start">
          <UncontrolledDropdown nav className="p-0">
            <DropdownToggle nav className="py-0">
              <div className="class-avatar pe-2">
                <Avatar style={{height:"35px",width:"35px"}}>{userName?.slice(0,1).toUpperCase()}</Avatar>
              </div>
            </DropdownToggle>
            <DropdownMenu className="my-0 py-0" right>
              <DropdownItem className="my-0 ml-0 pl-3">
                <div className="py-1 comp-nav mx-1 text-secondary fw-500" style={{fontsize:"0.6rem !important"}} disabled>rishab432</div>
              </DropdownItem>
              <DropdownItem className="my-0 ml-0 pl-3">
                <div className="py-1 comp-nav mx-1 text-secondary fw-500" style={{fontsize:"0.6rem !important"}} disabled>rishabgoyal@gmail.com</div>
              </DropdownItem>
              <DropdownItem className="my-0 ml-0 pl-3" divider />
              <DropdownItem className="my-0 ml-0 pl-3" onClick={() => setLoginVar(false)}>
                <Link to="/" className="py-1 mx-1 logout" style={{fontsize:"0.6rem !important"}}>Logout</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </li>
      );
    }
    else {
      return (
        <li className="nav-item mx-3"><button className="form-btn my-2" onClick={() => setShow(true)}>Login</button></li>
      );
    }
  }
  return (
    <>
      {
          showSidedrawer ? <Sidedrawer show={showSidedrawer} closeSidedrawer={closeShowSidedrawer} /> : null
      }
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <>
            <Link className="navbar-brand ms-5 fw-bold" href="#">
                <span className="HeaderTitle"><FcCalendar style={{fontSize:"27px"}} /> Meeting Scheduler</span>
            </Link>
              <MenuIcon className="d-block d-md-none"  style={{fontColor:"#fff"}} onClick={() => setShowSidedrawer(true)}/>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
                <ConditionalBtn/>
              </ul>
            </div>
          </>
        </div>
      </nav>
      <LoginModal isModalOpen={show} toggleModal={toggle} setShow={setShow}/>
    </>
  )
}

export default Header;