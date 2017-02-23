import React from 'react';
import { Col, Form, FormGroup, FormControl, Checkbox, Button, ButtonToolbar, ControlLabel} from 'react-bootstrap';
import { handleSubmit } from '../../helpers/handlers';

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = handleSubmit.bind(this);
  }
  render(){
    return (
      <Form horizontal action="/api/login" method="post" onSubmit={this.handleSubmit}>
        <FormGroup controlId="loginFormEmail">
          <Col sm={2}>
            <ControlLabel>Emails</ControlLabel>
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
            <Checkbox>Remember me</Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <ButtonToolbar>
              <Button type="submit">
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
  }
}

export default EmailForm;
