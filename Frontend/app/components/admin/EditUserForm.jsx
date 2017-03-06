import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox, ButtonToolbar, Button, Col, Well } from 'react-bootstrap';
import { handleChange, handleCheck } from '../../helpers/handlers';
import handleSubmit from '../../helpers/handleSubmit';
import update from 'immutability-helper';
import { connect } from 'react-redux';

class EditUserForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      form :{
        firstName : this.props.user.firstName,
        lastName : this.props.user.lastName,
        email : this.props.user.email,
        initials : this.props.user.initials,
        score: this.props.user.score,
        admin : this.props.user.meta.admin,
        enabled: this.props.user.meta.enabled
      },
      lastModified: this.props.user.updatedAt,
      submitDisabled : false
    };
    this.handleSubmit = handleSubmit.bind(this);
    this.handleChange = handleChange.bind(this);
    this.handleCheck = handleCheck.bind(this);
    this.handleInitialsChange = this.handleInitialsChange.bind(this);
  }

  handleInitialsChange(e){
    if(e.target.value.length < 4){
      this.setState(update(
        this.state,
        {
          $set: {
            form: {initials : e.target.value.toUpperCase()}
          }
        }
      ));
    }
  }
  render(){
    const adminCheck = <Checkbox
      name="admin"
      checked={this.state.form.admin}
      validationState={this.state.form.admin ? "error" : null}
      onChange={this.handleCheck}>Admin</Checkbox>;
    const form = (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup>
          <Col sm={3} lg={2}>
            <ControlLabel>First Name</ControlLabel>
          </Col>
          <Col sm={3} lg={4}>
            <FormControl type="text" name="firstName" value={this.state.form.firstName} onChange={this.handleChange}/>
          </Col>
          <Col sm={3} lg={2}>
            <ControlLabel>Last Name</ControlLabel>
          </Col>
          <Col sm={3} lg={4}>
            <FormControl type="text" name="lastName" value={this.state.form.lastName} onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={3} lg={2}>
            <ControlLabel>Email</ControlLabel>
          </Col>
          <Col sm={9} lg={10}>
            <FormControl type="email" name="email" value={this.state.form.email} onChange={this.handleChange}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col xs={2} sm={3} lg={2}>
            <ControlLabel>Initials</ControlLabel>
          </Col>
          <Col xs={4} sm={3} lg={4}>
            <FormControl type="text" name="initials" value={this.state.form.initials} onChange={this.handleInitialsChange} />
          </Col>
          <Col xs={2} sm={3} lg={2}>
            <ControlLabel>Total Points</ControlLabel>
          </Col>
          <Col xs={4} sm={3} lg={4}>
            <FormControl type="text" name="initials" value={this.state.form.score} onChange={this.handleInitialsChange} disabled={true}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={12}>
            <Checkbox name="admin" checked={this.state.form.admin} onChange={this.handleCheck}>Admin</Checkbox>
            <Checkbox name="enabled" checked={this.state.form.enabled} onChange={this.handleCheck}>Enabled</Checkbox>
            <h4>Last Modified : {this.state.lastModified}</h4>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={12}>
            <ButtonToolbar>
              <Button disabled={this.state.submitDisabled} bsStyle='success' type='submit'>Save</Button>
              <Button onClick={this.props.cancelEdit}>Cancel</Button>
            </ButtonToolbar>
          </Col>
        </FormGroup>
      </Form>
    );

    return form;
  }
}

export default connect()(EditUserForm);
