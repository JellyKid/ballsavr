import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { clearMessage } from '../../redux/actions';

class MessageBox extends React.Component {
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

    return messages.length > 0 ? <div>{messages}</div> : null;

  }
}

function mapStateToProps(state) {
  return {
    messages: state.messageBox.visible
  };
}

export default connect(mapStateToProps)(MessageBox);
