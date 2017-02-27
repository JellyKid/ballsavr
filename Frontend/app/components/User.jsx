import React from 'react';
import { connect } from 'react-redux';
import Navigation from './user/Navigation';
import { Link } from 'react-router';


class User extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){

    if(this.props.children){
      return (
        <div>
          <Navigation admin={this.props.user.meta.admin}/>
          {this.props.children}
        </div>
      );
    }

    return (
      <div>
        <Navigation admin={this.props.user.meta.admin}/>
        <Link to="/invite">invite</Link>
      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(User);
