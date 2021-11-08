import React from 'react';
import { Route, useLocation, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import InfoModal from './components/Modals/InfoModal';

const App = () => {
  const pathname = useLocation().pathname;

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
        <Route path = "/infomodal" exact component={InfoModal}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;