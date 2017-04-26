import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox, ButtonToolbar, Button, Col, Well, Modal } from 'react-bootstrap';
import { handleChange, handleCheck } from '../../helpers/handlers';
import handleFetch from '../../helpers/handleFetch';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { setUsers } from '../../redux/actions';

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
        admin : this.props.user.admin,
        enabled: this.props.user.enabled,
        scoreKeeper: this.props.user.scoreKeeper
      },
      lastModified: this.props.user.meta.updatedAt,
      submitDisabled : false,
      showWarn: false
    };
    this.handleFetch = handleFetch.bind(this);
    this.handleChange = handleChange.bind(this);
    this.handleCheck = handleCheck.bind(this);
    this.handleInitialsChange = this.handleInitialsChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(){
    this.setState({submitDisabled: true, showWarn: false});
    this.handleFetch('DELETE',`/api/admin/user/${this.props.user._id}`)
      .then(
        (res) => {
          if(res.status === 200){
            this.handleFetch('GET','/api/admin/users',null,setUsers);
            this.props.closeEditor();
          }
        }
      );
  }

  handleSave(e){
    e.preventDefault();
    this.setState({submitDisabled: true});
    this.handleFetch('POST','/api/admin/user', e.target)
      .then(
        (res) => {
          if(res.status === 200){
            this.handleFetch('GET','/api/admin/users',null,setUsers);
            this.props.closeEditor();
          }
        }
      );
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
    const deleteWarning = (
      <Modal
        show={this.state.showWarn}
        onHide={() => this.setState({showWarn: false})}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure you want to delete {this.props.user.firstName} {this.props.user.lastName}?</h4>
          <p>This change cannot be reversed. All scores associated with this user will be removed as well.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={this.state.submitDisabled} onClick={this.handleDelete} bsStyle="danger" >Delete</Button>
          <Button onClick={() => this.setState({showWarn: false})}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );

    const adminCheck = (
      <Checkbox
        name="admin"
        checked={this.state.form.admin}
        validationState={this.state.form.admin ? "error" : null}
        onChange={this.handleCheck}>
        Admin
      </Checkbox>
    );

    const activated = !this.props.user.meta.activated ? (
      <div style={{color: "red"}}>
        <h4>Not Activated</h4>
      </div>
    ) : "";

    const form = (
      <Form horizontal onSubmit={this.handleSave}>
        <FormControl type="hidden" name="_id" value={this.props.user._id}/>
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
            <Checkbox name="scoreKeeper" checked={this.state.form.scoreKeeper} onChange={this.handleCheck}>Score Keeper</Checkbox>
            <h4>
              Updated : {
                new Date(this.state.lastModified).toLocaleString(
                  'en-us',
                  {

                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric"
                  }
                )
              }
            </h4>
            {activated}
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={12}>
            <ButtonToolbar>
              <Button disabled={this.state.submitDisabled} bsStyle='success' type="submit" >Save</Button>
              <Button disabled={this.state.submitDisabled} onClick={() => this.setState({showWarn: true})} bsStyle='danger'>Delete</Button>
              <Button onClick={this.props.closeEditor}>Cancel</Button>
            </ButtonToolbar>
          </Col>
        </FormGroup>
      </Form>
    );

    return (
      <div>
        {deleteWarning}
        {form}
      </div>
    );
  }
}

export default connect()(EditUserForm);
