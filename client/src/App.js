import React, {useEffect} from 'react';
import { Route, useLocation, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import AddEvent from './components/AddEvent/AddEvent';
import Dashboard from './components/Dashboard/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { AUTOLOGIN, selectUserData } from './reduxSlices/authSlice';
const App = () => {
  const pathname = useLocation().pathname;
  const userData = useSelector(selectUserData);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AUTOLOGIN());
  }, []);
  if(pathname === '/') {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return <Redirect to={"calendar/" + year + "/" + month + "/" + day} />
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path = "/calendar/:year/:month/:date" exact component={Dashboard}/>
        <Route path = "/addevent" exact component={AddEvent}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;