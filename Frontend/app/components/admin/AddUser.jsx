import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox, ButtonToolbar, Button, Col } from 'react-bootstrap';
import update from 'immutability-helper';

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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleChange(e){
    this.setState(update(this.state, {
      form: {[e.target.name]: {$set: e.target.value}}
    }));
  }
  handleCheck(e){
    this.setState(update(this.state, {
      form: {[e.target.name]: {$set: e.target.checked}}
    }));
  }
  handleSubmit(e){
    e.preventDefault();
    this.setState({submitDisabled: true});
    e.target.submit();
  }
  render(){
    return (
      <Form horizontal action="/adduser" method="post" onSubmit={this.handleSubmit}>
        <FormGroup>
          <Col sm={12}>
            <ControlLabel>First Name</ControlLabel>
            <FormControl type="input" name="firstName" onChange={this.handleChange}/>
            <ControlLabel>Last Name</ControlLabel>
            <FormControl type="input" name="lastName" onChange={this.handleChange}/>
            <ControlLabel>Email</ControlLabel>
            <FormControl type="email" name="email" onChange={this.handleChange}/>
            <Checkbox name="admin" onChange={this.handleCheck}>Is Admin</Checkbox>
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
      </Form>
    );
  }
}

export default AddUser;
