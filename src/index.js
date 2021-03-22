import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import { Sidebar, PAGES } from './Components/Sidebar';
import NewCustomer from './Pages/newcustomer/NewCustomer';
import ActiveOrders from './Pages/activeorders/ActiveOrders';
import Routes from './Pages/routes/Routes';
import SignIn from './Pages/sign/SignIn';
import { IsSignedInAsync } from './Components/Helpers/Authenticator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function effect(){
      const loggedIn = await IsSignedInAsync();
      setIsLoggedIn(loggedIn);
    }
    effect();
  });

  if (!isLoggedIn){
    return (
      <Router>
          <Switch>
            {/* Public Routes */}
            <Route exact path="/signin" render={(props) => <SignIn {...props} pageName="Sign In" setIsLoggedIn={setIsLoggedIn} />} />

            <Redirect from='*' to='/signin' />
          </Switch>
        </Router>
    )
  } else {
    return (
      <div style={{ display: "flex" }}>
        <Router>
          <Sidebar />
          <Switch>

            {/* Private Routes */}
            <Route exact path={PAGES.newCustomer.route} component={NewCustomer} pageName="New Customer" />
            <Route exact path={PAGES.activeOrders.route} component={ActiveOrders} pageName="Active Orders" />
            <Route exact path={PAGES.routes.route} component={Routes} pageName="Routes" />

            <Redirect from='*' to={PAGES.activeOrders.route} />
          </Switch>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);