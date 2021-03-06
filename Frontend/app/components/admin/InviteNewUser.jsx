import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox, ButtonToolbar, Button, Col, Alert, Grid, Well, PageHeader } from 'react-bootstrap';
import { handleChange, handleCheck } from '../../helpers/handlers';
import handlePost from '../../helpers/handlePost';
import { browserHistory } from 'react-router';
import { addErrorMsg } from '../../redux/actions';
import { connect } from 'react-redux';

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
    this.handlePost = handlePost.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = handleCheck.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    if(this.state.submitDisabled === false){
      this.setState({ submitDisabled: true });
      this.handlePost(
        '/api/admin/invite',
        e.target
      ).then(
        (res) => {
          if(res.status === 200){
            return browserHistory.goBack();
          }
          if(res.error){
            this.props.dispatch(addErrorMsg(res.error));
          }
          return this.setState({submitDisabled: false});
        }
      );
    }
  }
  render(){
    const form = <Form horizontal action="/api/admin/invite" method="post" onSubmit={this.handleSubmit}>
      <FormGroup>
        <Col sm={12}>
          <ControlLabel>First Name</ControlLabel>
          <FormControl type="input" name="firstName" value={this.state.form.firstName} onChange={this.handleChange}/>
          <ControlLabel>Last Name</ControlLabel>
          <FormControl type="input" name="lastName" value={this.state.form.lastName} onChange={this.handleChange}/>
          <ControlLabel>Email </ControlLabel>
          <FormControl type="email" name="email" placeholder="required field" value={this.state.form.email} onChange={this.handleChange}/>
          <Checkbox name="admin" checked={this.state.form.admin} onChange={this.handleCheck}>Admin</Checkbox>
        </Col>
      </FormGroup>
      <FormGroup>
        <Col sm={12}>
          <ButtonToolbar>
            <Button disabled={this.state.submitDisabled} bsStyle='success' type='submit'>Send Invite</Button>
            <Button onClick={() => browserHistory.push('/')}>Cancel</Button>
          </ButtonToolbar>
        </Col>
      </FormGroup>
    </Form>;

    const alert = this.state.alertMessage ? <Alert bsStyle="danger">{this.state.alertMessage}</Alert> : "";

    return (
      <Grid>
        <Col sm={8} smOffset={2}>
          <PageHeader>Invite User</PageHeader>
          <Well>
            {form}
            {alert}
          </Well>
        </Col>
      </Grid>
    );

  }
}

export default connect()(AddUser);
