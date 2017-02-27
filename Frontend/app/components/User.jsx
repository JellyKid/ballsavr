import React from 'react';
import { connect } from 'react-redux';
import Navigation from './user/Navigation';
import { Link } from 'react-router';


class User extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){

    return (
      <div>
        <Navigation admin={this.props.user.meta.admin} initials={this.props.user.initials}/>
        {this.props.children}
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
