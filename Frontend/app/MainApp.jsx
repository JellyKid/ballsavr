import React from 'react';
import Login from './components/Login';
import checkAuth from './helpers/checkAuth';
import { connect } from 'react-redux';
import {setUser, setAuth} from './redux/actions';

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.checkAuth = checkAuth.bind(this);
  }

  componentWillMount(){
    return this.checkAuth().then((res) => {
      if(res.authenticated && res.user){
        return this.props.dispatch(setUser(res.user));
      }
      return this.props.dispatch(setAuth(false));
    });
  }

  render(){
    const User = (
      <div>
        <h2>Authenticated</h2>

      </div>
    );

    if(this.props.authenticated === null){
      return <div></div>;
    }

    if(this.props.authenticated || this.props.location.pathname === "/register"){
      return (User);
    }
    return <Login />;
  }
}

function mapStateToProps(state){
  return {
    authenticated: state.authenticated
  };
}

export default connect(mapStateToProps)(MainApp);
