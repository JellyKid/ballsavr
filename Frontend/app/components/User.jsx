import React from 'react';
import { connect } from 'react-redux';
import Navigation from './user/Navigation';
import MessageBox from './user/MessageBox';
import { Link } from 'react-router';
import { Alert, Grid, Col, Image } from 'react-bootstrap';
import { clearMessage } from '../redux/actions';
import logoImage from '../assets/logo.png';
import UpcomingEvents from './user/UpcomingEvents';
import Disabled from './Disabled';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.dismissAlert = this.dismissAlert.bind(this);
  }
  dismissAlert(index){
    this.props.dispatch(clearMessage(index));
  }
  render(){
    if(!this.props.user.enabled || !this.props.user.meta.activated){
      return <Disabled />;
    }

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

    const logo = (
      <Grid className="fadein">
        <Col sm={12} lg={8} lgOffset={2}>
          <Image src={logoImage} responsive />
        </Col>
      </Grid>
    );


    let view = this.props.children;

    if(!view){
      view = (
        <div>
          {logo}
          <UpcomingEvents />
        </div>
      );
    }

    return (
      <div>
        <Navigation admin={this.props.user.admin} initials={this.props.user.initials}/>
        <div className="app-window">
          <Grid>
            <Col sm={8} smOffset={2}>
              <MessageBox />
            </Col>
          </Grid>
          {view}
        </div>
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
