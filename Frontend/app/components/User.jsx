import React from 'react';
import { connect } from 'react-redux';
import Navigation from './user/Navigation';


class User extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    console.log(this.props);

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
        <h1>Nothing here</h1>
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
