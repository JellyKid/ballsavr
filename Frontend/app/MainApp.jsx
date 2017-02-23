import React from 'react';
import Login from './components/Login';
import { connect } from 'react-redux';

class MainApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    console.log(this.props);

    const User = (
      <div>
        <h2>Authenticated</h2>
        {this.props.children}
      </div>
    );

    if(this.props.authenticated || this.props.location.pathname === "/register"){
      return User;
    }
    return <Login />;
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated
  };
}

export default connect(mapStateToProps)(MainApp);
