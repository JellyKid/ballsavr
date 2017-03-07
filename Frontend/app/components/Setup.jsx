import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox, ButtonToolbar, Button, Col, Alert, PageHeader, Grid, Well } from 'react-bootstrap';
import { handleChange, handleCheck } from '../helpers/handlers';
import handlePost from '../helpers/handlePost';
import handleGet from '../helpers/handleGet';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      form :{
        firstName : '',
        lastName : '',
        email : '',
        initials : 'AAA',
        password: "",
        passconf: ""
      },
      submitDisabled : false,
      passwordValid : null,
      passwordMatch: null,
      alertMessage: ""
    };
    this.handlePost = handlePost.bind(this);

    this.handleChange = handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleGet = handleGet.bind(this);
    this.passwordMatch = this.passwordMatch.bind(this);
    this.passwordComplexCheck = this.passwordComplexCheck.bind(this);
    this.handleInitialsChange = this.handleInitialsChange.bind(this);
  }
  // componentDidMount(){
  //   this.handleGet(
  //     `/api/setup`
  //   ).then(
  //     (user) => {
  //       this.setState(update(
  //         this.state,
  //         {
  //           form: {
  //             $merge: user
  //           }
  //         }
  //       ));
  //     }
  //   );
  // }

  handleSubmit(e){
    e.preventDefault();
    this.setState({submitDisabled: true});
    this.handlePost(
      '/api/setup',
      this.state.form
    ).then(
      (res) => {
        if (res.error) {
          return this.setState({
            alertMessage: res.error,
            submitDisabled: false
          });
        }
        // this.props.dispatch(setAuth(true));
        browserHistory.push('/');
      }
    );
  }

  passwordComplexCheck(e){
    let p = e.target.value;
    let special = /[!@#\$%\^\*]/;
    if(p.length > 7 && /[A-Z]/.test(p) && /[a-z]/.test(p) && (special.test(p) || /[0-9]/.test(p))){
      this.setState({
        passwordValid: "success",
        alertMessage: ""
      });
    } else {
      this.setState({
        passwordValid: "error",
        alertMessage: <div>
          <p>
            Password must meet the following requirements:
          </p>
          <ul>
            <li>one lowercase character</li>
            <li>one uppercase character</li>
            <li>one number</li>
            <li>one symbol of !@#$%^*</li>
          </ul>
        </div>
      });
    }
  }
  passwordMatch(){
    if(!this.state.form.passconf || this.state.form.passconf === ""){
      return this.setState({
        submitDisabled: true,
        passwordMatch: null
      });
    }
    if(this.state.passwordValid === "success" && this.state.form.password === this.state.form.passconf){
      return this.setState({
        submitDisabled: false,
        passwordMatch: "success"
      });
    }
    return this.setState({
      submitDisabled: true,
      passwordMatch: "warning"
    });
  }
  handlePassChange(e){
    this.setState(update(
      this.state,
      {
        form: {[e.target.name]: {$set: e.target.value}}

      }
    ), this.passwordMatch);
  }
  handleInitialsChange(e){
    if(e.target.value.length < 4){
      this.setState(update(
        this.state,
        {
          form: {initials : {$set: e.target.value.toUpperCase()}}
        }
      ));
    }
  }
  render(){
    const form = (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup>
          <Col sm={2}>
            <ControlLabel>First Name</ControlLabel>
          </Col>
          <Col sm={4}>
            <FormControl type="text" name="firstName" value={this.state.form.firstName} onChange={this.handleChange}/>
          </Col>
          <Col sm={2}>
            <ControlLabel>Last Name</ControlLabel>
          </Col>
          <Col sm={4}>
            <FormControl type="text" name="lastName" value={this.state.form.lastName} onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={2}>
            <ControlLabel>Initials</ControlLabel>
          </Col>
          <Col sm={4}>
            <FormControl type="text" name="initials" value={this.state.form.initials} onChange={this.handleInitialsChange} />
          </Col>
          <Col sm={2}>
            <ControlLabel>Email</ControlLabel>
          </Col>
          <Col sm={4}>
            <FormControl type="email" name="email" value={this.state.form.email} onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <Col sm={12}>
          <FormGroup validationState={this.state.passwordValid}>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              name="password"
              value={this.state.form.password}
              placeholder="password"
              onBlur={this.passwordComplexCheck}
              onChange={this.handlePassChange}/>
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup validationState={this.state.passwordMatch}>
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              type="password"
              name="passconf"
              value={this.state.form.passconf}
              placeholder="password"
              onChange={this.handlePassChange}/>
            <FormControl.Feedback />
          </FormGroup>
        </Col>
        <FormGroup>
          <Col sm={12}>
            <ButtonToolbar>
              <Button disabled={this.state.submitDisabled} bsStyle='success' type='submit'>Register</Button>
            </ButtonToolbar>
          </Col>
        </FormGroup>
      </Form>
    );

    const alert = this.state.alertMessage ? <Alert bsStyle="danger">{this.state.alertMessage}</Alert> : "";

    const main = (
      <Grid>
        <Col sm={8} smOffset={2}>
          <PageHeader>First Time Setup<br/><small>Create a new administrative user</small></PageHeader>
          <Well>
            {form}
            {alert}
          </Well>
        </Col>
      </Grid>
    );

    return (main);
  }
}

export default connect()(Register);
