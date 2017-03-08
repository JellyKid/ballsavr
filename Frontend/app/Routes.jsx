import React from 'react';
import { render } from 'react-dom';
import { Route,  IndexRoute} from 'react-router';

//Redux components
import Invite from './components/admin/InviteNewUser';
import Register from './components/Register';
import Login from './components/Login';
import User from './components/User';
import Tables from './components/Tables';
import EditCollection from './components/admin/EditCollection';
import EditUsers from './components/admin/EditUsers';
import Setup from './components/Setup';

//ajax calls
import checkAuth from './helpers/checkAuth';
import handleGet from './helpers/handleGet';

//redux actions
import { setUser, addInfoMsg } from './redux/actions';

function checkAuthentication(nextState, replace, done) {
  handleGet('/api/currentuser').then(
    (res) => {
      if(res.status === 202){
        replace('/setup');
        return done();
      }
      if(res.user){
        this.dispatch(setUser(res.user));
        return done();
      }
      replace('/login');
      return done();
    }
  );

}

function hookDispatch(dispatch){

  this.dispatch = dispatch;
  this.checkAuthentication = checkAuthentication.bind(this);

  return ([
    <Route path="/" component={User} onEnter={this.checkAuthentication}>
      <Route path="tables/edit" component={EditCollection} />
      <Route path="tables" component={Tables} />
      <Route path="users" component={EditUsers} />
      <Route path="invite" component={Invite} />
    </Route>,
    <Route path="/setup" component={Setup} />,
    <Route path="/login" component={Login} />,
    <Route path="/register/:token" component={Register} />
  ]);
}

export default (dispatch) => new hookDispatch(dispatch);
