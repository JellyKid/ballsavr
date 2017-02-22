import React from 'react';
import { Alert } from 'react-bootstrap';

class AlertBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <Alert bsStyle={this.props.type || "warning"}>{this.props.message}</Alert>
    );
  }
}

export default AlertBox;
