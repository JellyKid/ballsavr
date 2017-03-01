import React from 'react';
import { render } from 'react-dom';
import { Route,  IndexRoute} from 'react-router';

//Redux components
import Invite from './components/admin/InviteNewUser';
import Register from './components/Register';
import Login from './components/Login';
import User from './components/User';
import Tables from './components/Tables';

//ajax calls
import checkAuth from './helpers/checkAuth';

//redux actions
import { setUser } from './redux/actions';

function checkAuthentication(nextState, replace, done) {
  checkAuth().then(
    (res) => {
      console.log(res);
      if(!res.authenticated){
        replace('/login');
        return done();
      }

      this.dispatch(setUser(res.user));
      return done();
    }
  );
}

// function checkAdmin(nextState, replace, done) {
//   checkAuth().then(
//     (res) => {
//       console.log(res);
//       if(!res.authenticated){
//         replace('/login');
//         return done();
//       }
//       this.dispatch(setUser(res.user));
//       if(!res.user.meta.admin){
//         replace('/');
//         return done();
//       }
//       return done();
//     }
//   );
// }

function hookDispatch(dispatch){

  this.dispatch = dispatch;
  this.checkAuthentication = checkAuthentication.bind(this);

  return ([
    <Route path="/" component={User} onEnter={this.checkAuthentication}>
      <Route path="invite" component={Invite} />
      <Route path="tables" component={Tables} />
    </Route>,
    <Route path="/login" component={Login} />,
    <Route path="/register/:token" component={Register} />
  ]);
}

export default (dispatch) => new hookDispatch(dispatch);
//
// export default (store) => {
//   return hookStore(store);
// };
