import React from 'react';
import { connect } from 'react-redux';
import Navigation from './user/Navigation';
import { Link } from 'react-router';
import { Alert, Grid, Col } from 'react-bootstrap';
import { clearMessage } from '../redux/actions';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.dismissAlert = this.dismissAlert.bind(this);
  }
  dismissAlert(index){
    this.props.dispatch(clearMessage(index));
  }
  render(){
    const messages = this.props.messages.map(
      (message, index) => (
        <Alert bsStyle={message.style} onDismiss={() => this.dismissAlert(index)} key={index}>
          <h4>{message.text}</h4>
        </Alert>
      )
    );
    const messageBox = messages.length > 0 ? (
      <Grid>
        <Col sm={8} smOffset={2}>
          {messages}
        </Col>
      </Grid>
    ) : "";

    return (
      <div>
        <Navigation admin={this.props.user.admin} initials={this.props.user.initials}/>
        {messageBox}
        {this.props.children}
      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    message: state.message,
    messages: state.messageBox.visible
  };
}

export default connect(mapStateToProps)(User);
