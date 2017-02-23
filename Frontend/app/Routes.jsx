import React from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router';

import MainApp from './MainApp';
import Admin from './components/Admin';
import Register from './components/Register';
import User from './components/User';


const routes = (
    <Route path="/" component={MainApp}>
      <Route path="admin" component={Admin}>

      </Route>
      <Route path="register/:token" component={Register}>

      </Route>

    </Route>
);

// const routes = (
//   <Route path="register" component={Register}>
//
//   </Route>
// );

export default routes;
