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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function effect(){
      const loggedIn = await IsSignedInAsync();
      setIsLoggedIn(loggedIn);
      setIsLoading(false);
    }
    effect();
  });

  // Need to use loading state to wait for log in callback to finish
  if (isLoading) {
    return <></>
  } else {
    return (
      <div style={{ display: "flex" }}>
        <Router>
          {isLoggedIn ? <Sidebar /> : <></>}
          <Switch>
            {/* Public Routes */}
            <Route exact path="/signin" render={(props) => <SignIn {...props} pageName="Sign In" />} />

            {/* Private Routes */}
            <PrivateRoute exact path={PAGES.newCustomer.route} auth={isLoggedIn} component={NewCustomer} pageName="New Customer" />
            <PrivateRoute exact path={PAGES.activeOrders.route} auth={isLoggedIn} component={ActiveOrders} pageName="Active Orders" />
            <PrivateRoute exact path={PAGES.routes.route} auth={isLoggedIn} component={Routes} pageName="Routes" />

            <Redirect from='*' to={PAGES.activeOrders.route} />
          </Switch>
        </Router>
      </div>
    );
  }
}

function PrivateRoute({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth ?
          <Component {...props} /> :
          <Redirect to="/signin" />
      }
    />
  );
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);