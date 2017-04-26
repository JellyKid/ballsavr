import React from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Form, FormGroup, FormControl, ControlLabel, Button, Well, PageHeader, Clearfix } from 'react-bootstrap';
import update from 'immutability-helper';
import handleFetch from '../../helpers/handleFetch';
import { browserHistory } from 'react-router';
import { setUser } from '../../redux/actions';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      submitDisabled: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleInitialsChange = this.handleInitialsChange.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.state.submitDisabled){return;}
    this.setState({submitDisabled: true});
    handleFetch('POST','/api/user/profile', this.state.user)
    .then(
      () => this.setState(
        {submitDisabled: false},
        () => {
          handleFetch('GET','/api/currentuser')
          .then((res) => this.props.dispatch(setUser(res.user)));
          browserHistory.goBack();
        }
      )
    );
  }

  handleNameChange(e){
    this.setState(update(
      this.state,
      {
        user: {[e.target.name]: {$set: e.target.value}}
      }
    ));
  }

  handleInitialsChange(e){
    if(e.target.value.length < 4){
      this.setState(update(
        this.state,
        {
          user: {
            initials: {$set : e.target.value.toUpperCase()}
          }
        }
      ));
    }
  }

  render(){
    if(!this.state.user){return null;}

    const form = (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup>
          <Col xs={3} componentClass={ControlLabel}>First Name</Col>
          <Col xs={9}>
            <FormControl type="text" name="firstName" onChange={this.handleNameChange} value={this.state.user.firstName}/>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col xs={3} componentClass={ControlLabel}>Last Name</Col>
          <Col xs={9}>
            <FormControl type="text" name="lastName" onChange={this.handleNameChange} value={this.state.user.lastName}/>
          </Col>
        </FormGroup>
        <FormGroup bsSize="lg">
          <Col xs={3} componentClass={ControlLabel}>Initials</Col>
          <Col xs={4}>
            <FormControl type="text" onChange={this.handleInitialsChange} value={this.state.user.initials}/>
          </Col>
        </FormGroup>
      </Form>
    );

    const buttons = (
      <Col sm={12}>
        <Button bsStyle="success" bsSize="large" onClick={this.handleSubmit} block>Save</Button>
        <Button block bsSize="large" onClick={browserHistory.goBack}>Cancel</Button>
      </Col>
    );

    return (
      <Grid>
        <Col sm={8} smOffset={2}>
          <PageHeader>Your Profile</PageHeader>
          <Well >
            {form}
            <hr/>
            {buttons}
            <Clearfix />
          </Well>
        </Col>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(EditProfile);
