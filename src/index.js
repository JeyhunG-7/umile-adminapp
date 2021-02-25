import React, { useState } from 'react';
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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);


  return (
    <div style={{ display: "flex" }}>
      <Router>
        {isLoggedIn ? <Sidebar /> : <></>}
        <Switch>
          {/* Public Routes */}
          {/* <Route exact path="/signin" render={(props) => <SignIn {...props} pageName="Sign In" />} />

        {/* Private Routes */}
          <PrivateRoute exact path={PAGES.newCustomer.route} auth={isLoggedIn} component={NewCustomer} pageName="New Customer" />
          <PrivateRoute exact path={PAGES.activeOrders.route} auth={isLoggedIn} component={ActiveOrders} pageName="Active Orders" />
          <PrivateRoute exact path={PAGES.routes.route} auth={isLoggedIn} component={Routes} pageName="Routes" />

          <Redirect from='*' to='/activeorders' />
        </Switch>
      </Router>
    </div>
  );
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