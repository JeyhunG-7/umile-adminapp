import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Main from './Pages/main/Main';


import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import Sidebar from './Components/Sidebar';

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
          <PrivateRoute exact path="/" auth={isLoggedIn} component={Main} pageName="Main" />
          {/* <PrivateRoute exact path="/profile" auth={this.state.isLoggedIn} component={Profile} pageName="Profile" />
        <PrivateRoute exact path="/orders" auth={this.state.isLoggedIn} component={Orders} pageName="Orders" />
        <PrivateRoute exact path="/neworder" auth={this.state.isLoggedIn} component={NewOrder} pageName="New Order" /> */}

          <Redirect from='*' to='/' />
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