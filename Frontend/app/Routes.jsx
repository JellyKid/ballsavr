import React from 'react';
import { render } from 'react-dom';
import { Route,  IndexRoute} from 'react-router';

//Redux components
import Invite from './components/admin/InviteNewUser';
import Register from './components/Register';
import Login from './components/Login';
import User from './components/User';
import Tables from './components/Tables';
import EditTables from './components/tables/EditTables';
import EditUsers from './components/admin/EditUsers';
import Setup from './components/Setup';
import Events from './components/Events';
import EditEvent from './components/event/EditEvent';

//ajax calls
import handleFetch from './helpers/handleFetch';

//redux actions
import { setUser } from './redux/actions';

function checkAuthentication(nextState, replace, done) {
  handleFetch('GET','/api/currentuser').then(
    (res) => {
      if(res.status === 202){
        replace('/setup');
      }
      if(res.status === 401){
        replace('/login');
      }
      if(res.user){
        this.dispatch(setUser(res.user));
      }
      return done();
    }
  ).catch((err) => {console.log("Routes.jsx",err);});
}

function hookDispatch(dispatch){

  this.dispatch = dispatch;
  this.checkAuthentication = checkAuthentication.bind(this);

  return ([
    <Route path="/" component={User} onEnter={this.checkAuthentication}>
      <Route path="tables/edit" component={EditTables} />
      <Route path="tables" component={Tables} />
      <Route path="users" component={EditUsers} />
      <Route path="invite" component={Invite} />
      <Route path="events" component={Events} />
      <Route path="events/add" component={EditEvent} />
    </Route>,
    <Route path="/setup" component={Setup} />,
    <Route path="/login" component={Login} />,
    <Route path="/register/:token" component={Register} />
  ]);
}

export default (dispatch) => new hookDispatch(dispatch);
