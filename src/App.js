import React from 'react';
import './assets/vendor/fontawesome-free/css/all.min.css';
import './assets/css/sb-admin-2.min.css';

import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
import NotFoundPage from './components/notfound';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <UnPrivateRoute exact path="/" component={Login} />
        <UnPrivateRoute path="/login" component={Login} />
        <UnPrivateRoute path="/register" component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="*" component={NotFoundPage}/>
      </Switch>
    </Router>
  );
}

export default App;
