import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox, ButtonToolbar, Button, Col, Alert, PageHeader, Grid, Well } from 'react-bootstrap';
import { handleChange, handleCheck } from '../helpers/handlers';
import handlePost from '../helpers/handlePost';
import handleGet from '../helpers/handleGet';
import handleFetch from '../helpers/handleFetch';
import { setSiteInfo } from '../redux/actions';
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
        admin : false
      },
      password: "",
      passconf: "",
      submitDisabled : true,
      passwordValid : null,
      passwordMatch: null,
      alertMessage: ""
    };
    this.handlePost = handlePost.bind(this);
    this.handleChange = handleChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleGet = handleGet.bind(this);
    this.handleFetch = handleFetch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.passwordMatch = this.passwordMatch.bind(this);
    this.passwordComplexCheck = this.passwordComplexCheck.bind(this);
    this.handleInitialsChange = this.handleInitialsChange.bind(this);
  }
  componentDidMount(){
    this.handleFetch('GET',`/api/token?token=${this.props.params.token}`)
    .then(
      (user) => {
        this.setState(update(
          this.state,
          {
            form: {
              $merge: user
            }
          }
        ));
      }
    );
    this.handleFetch('GET', '/api/info', null, setSiteInfo);
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState({submitDisabled:true});
    this.handlePost('/api/register', e.target).
      then(
        (res) => {
          if(res.status === 200){
            return browserHistory.push('/');
          }
          this.setState({submitDisabled: false, alertMessage: res.error});
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
    if(!this.state.passconf || this.state.passconf === ""){
      return this.setState({
        submitDisabled: true,
        passwordMatch: null
      });
    }
    if(this.state.passwordValid === "success" && this.state.password === this.state.passconf){
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
    this.setState({[e.target.name]: e.target.value}, this.passwordMatch);
  }
  handleInitialsChange(e){
    if(e.target.value.length < 4){
      this.setState(update(
        this.state,
        {
          form: {
            initials: {$set : e.target.value.toUpperCase()}
          }
        }
      ));
    }
  }
  render(){
    const form = (
      <Form horizontal action="/api/register" method="post" onSubmit={this.handleSubmit}>
        <FormControl type="hidden" name="token" value={this.props.params.token} />
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
            <FormControl type="email" name="email" value={this.state.form.email} disabled={true}/>
          </Col>
        </FormGroup>
        <Col sm={12}>
          <FormGroup validationState={this.state.passwordValid}>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              name="password"
              value={this.state.password}
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
              value={this.state.passconf}
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
          <PageHeader>Welcome to {this.props.orgName}<br/><small>Please register below</small></PageHeader>
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

function mapStateToProps(state){
  return {
    orgName: state.site.org_name
  };
}

export default connect(mapStateToProps)(Register);
