import React from 'react';
import { Col, Form, FormGroup, FormControl, Checkbox, Button, ButtonToolbar, ControlLabel, Alert} from 'react-bootstrap';
import handlePost from '../../helpers/handlePost';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { clearAllMessages } from '../../redux/actions';

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitDisabled : false,
      alertMessage : ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePost = handlePost.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    if(this.state.submitDisabled == false){
      this.setState({submitDisabled: true});
      this.handlePost(
        '/api/login',
        e.target
      ).then(
        (res) => {
          if(res.status === 200){
            this.props.dispatch(clearAllMessages());
            browserHistory.push('/');
            return;
          }
          return this.setState({
            submitDisabled: false,
            alertMessage: "Incorrect username or password"
          });
        }
      );
    }
  }
  render(){
    const alert = this.state.alertMessage ? (
      <Alert bsStyle="danger">{this.state.alertMessage}</Alert>
    ) : "";

    const form = (
      <Form horizontal action="/api/login" method="post" onSubmit={this.handleSubmit}>
        <FormGroup controlId="loginFormEmail">
          <Col sm={2}>
            <ControlLabel>Email</ControlLabel>
          </Col>
          <Col sm={10}>
            <FormControl type="input" placeholder="Email" name="username"/>
          </Col>
        </FormGroup>

        <FormGroup controlId="loginFormPassword">
          <Col sm={2}>
            <ControlLabel>Password</ControlLabel>
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Password" name="password"/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <ButtonToolbar>
              <Button type="submit" disabled={this.state.submitDisabled}>
                Sign in
              </Button>
              <Button onClick={this.props.cancelForm}>
                Cancel
              </Button>
            </ButtonToolbar>
          </Col>
        </FormGroup>
      </Form>
    );

    return (
      <div>
        {form}
        {alert}
      </div>
    );
  }
}

export default connect()(EmailForm);
