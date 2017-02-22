import React from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router';

import Login from './components/Login';
import Admin from './components/Admin';

const routes = (
    <Route path="/" component={Login}>
      <Route path="admin" component={Admin}>

      </Route>
    </Route>
);

export default routes;
