import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from "apollo-client";
import { InMemoryCache } from 'apollo-cache-inmemory';

import Main from './Pages/main/Main';
import Modelling from './Pages/modelling/Modelling';

import { createHttpLink } from "apollo-link-http";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const cache = new InMemoryCache();

const link = createHttpLink({
  uri: 'http://localhost:8080/graphql'
});

const client = new ApolloClient({
  cache,
  link
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Main {...props} pageName="Main"/>} />
        </Switch>
        <Switch>
          <Route exact path="/modelling" render={(props) => <Modelling {...props}/>} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);