import React from 'react';
import Login from './components/Login';
import checkAuth from './helpers/checkAuth';

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated : false
    };
    this.checkAuth = checkAuth.bind(this);
  }

  componentWillMount(){
    return this.checkAuth();
  }

  render(){
    const User = (
      <div>
        <h2>Authenticated</h2>

      </div>
    );

    if(this.state.authenticated || this.props.location.pathname === "/register"){
      return (User);
    }
    return <Login />;
  }
}

export default MainApp;
