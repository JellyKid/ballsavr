import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox, ButtonToolbar, Button, Col, Alert, Grid, Well } from 'react-bootstrap';
import { handleChange, handleCheck, handleSubmit } from '../../helpers/handlers';

class AddUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      form :{
        firstName : '',
        lastName : '',
        email : '',
        admin : false
      },
      submitDisabled : false
    };
    this.handleChange = handleChange.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
    this.handleCheck = handleCheck.bind(this);
  }
  render(){
    const form = <Form horizontal action="/api/adduser" method="post" onSubmit={this.handleSubmit}>
      <FormGroup>
        <Col sm={12}>
          <ControlLabel>First Name</ControlLabel>
          <FormControl type="input" name="firstName" value={this.state.form.firstName} onChange={this.handleChange}/>
          <ControlLabel>Last Name</ControlLabel>
          <FormControl type="input" name="lastName" value={this.state.form.lastName} onChange={this.handleChange}/>
          <ControlLabel>Email </ControlLabel>
          <FormControl type="email" name="email" placeholder="required field" value={this.state.form.email} onChange={this.handleChange}/>
          <Checkbox name="admin" checked={this.state.form.admin} onChange={this.handleCheck}>Is Admin</Checkbox>
        </Col>
      </FormGroup>
      <FormGroup>
        <Col sm={12}>
          <ButtonToolbar>
            <Button disabled={this.state.submitDisabled} bsStyle='success' type='submit'>Send Invite</Button>
            <Button disabled={this.state.submitDisabled}>Cancel</Button>
          </ButtonToolbar>
        </Col>
      </FormGroup>
    </Form>;

    const alert = this.state.alertMessage ? <Alert bsStyle="danger">{this.state.alertMessage}</Alert> : "";

    return (
      <Grid>
        <Col sm={8} smOffset={2}>
          <Well>
            {form}
            {alert}
          </Well>
        </Col>
      </Grid>
    );

  }
}

export default AddUser;
