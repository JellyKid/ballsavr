import React from 'react';
import { connect } from 'react-redux';
import Navigation from './user/Navigation';
import { Link } from 'react-router';
import { Alert, Grid, Col } from 'react-bootstrap';
import { setMessage } from '../redux/actions';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.dismissAlert = this.dismissAlert.bind(this);
  }
  dismissAlert(){
    this.props.dispatch(setMessage(""));
  }
  render(){
    const message = this.props.message ? (
      <Grid>
        <Col sm={8} smOffset={2}>
          <Alert bsStyle="success" onDismiss={this.dismissAlert} >
            <h4>{this.props.message}</h4>
          </Alert>
        </Col>
      </Grid>
    ) : "";

    return (
      <div>
        <Navigation admin={this.props.user.meta.admin} initials={this.props.user.initials}/>
        {message}
        {this.props.children}
      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    message: state.message
  };
}

export default connect(mapStateToProps)(User);
