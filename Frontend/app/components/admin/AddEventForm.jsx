import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox, ButtonToolbar, Button, Col, Well, Grid, Modal } from 'react-bootstrap';
import handleFetch from '../../helpers/handleFetch';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { setUsers } from '../../redux/actions';
import moment from 'moment';
import DateTimeEditor from './event/DateTimeEditor';


class AddEventForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      event :{
        title: this.props.title,
        subtitle: this.props.subtitle,
        type: "tournament",
        description: "",
        localimg: "",
        extlink: "",
        start: new Date(),
        rounds: []
      },
      players: [],
      submitDisabled : false,
      showDateTime: false
    };

    this.handleFetch = handleFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(e){
    return this.setState(update(
      this.state,
      {
        event: { [e.target.name] : {$set:e.target.value} }
      }
    ));
  }


  handleSave(e){
    e.preventDefault();
    this.setState({submitDisabled: true});
    this.handleFetch('POST','/api/admin/event', {event: this.state.event}).
      then(
        (res) => {
          if(res.status === 200){
            return browserHistory.push('/events');
          }
          return this.setState({submitDisabled: false});
        }
      );
  }


  render(){

    const formattedDateTime = moment(this.state.event.start).format("MMM Do YYYY, h:mmA");

    const form = (
      <Form horizontal onSubmit={this.handleSave}>
        <FormGroup>
          <Col md={2}>
            <ControlLabel>Title</ControlLabel>
          </Col>
          <Col md={10}>
            <FormControl type="text" name="title" value={this.state.event.title} onChange={this.handleChange}/>
          </Col>
          <Col md={2}>
            <ControlLabel>Subtitle</ControlLabel>
          </Col>
          <Col md={10}>
            <FormControl type="text" name="subtitle" value={this.state.event.subtitle} onChange={this.handleChange}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col md={2}>
            <ControlLabel>Description</ControlLabel>
          </Col>
          <Col sm={12}>
            <FormControl name="description" componentClass="textarea" onChange={this.handleChange} placeholder="Place a short description here..." />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col md={1}>
            <ControlLabel>Type</ControlLabel>
          </Col>
          <Col md={4}>
            <FormControl componentClass="select" name="type" value={this.state.event.type} onChange={this.handleChange}>
              <option value="tournament">Tournament</option>
              <option value="leagues">Leagues</option>
            </FormControl>
          </Col>
          <Col md={2}>
            <ControlLabel>Start Time</ControlLabel>
          </Col>
          <Col md={4}>

            <Button
              ref={(node) => {this.startTimeButton = node;}}
              onClick={() => {this.setState({showDateTime: true});}}>{formattedDateTime}
            </Button>

          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={12}>
            <Button
              bsStyle="success"
              block
              bsSize='large'
              type="submit"
              disabled={this.state.submitDisabled}>Create Event!</Button>
          </Col>
        </FormGroup>
      </Form>
    );

    const dateTimeEditor = (
      <DateTimeEditor
        show={this.state.showDateTime}
        hide={() => this.setState({showDateTime: false})}
        save={(date) => this.setState(update(
          this.state,
          {
            showDateTime: {$set: false},
            event : {start : {$set:date}}
          }
        ))}/>
    );

    return (
      <div>
        <Grid>
          <Col sm={8} smOffset={2}>
            <Well>
              <h2>Create New Event</h2>
              <hr />
              {dateTimeEditor}
              {form}
            </Well>
          </Col>
        </Grid>
      </div>
    );
  }
}

export default connect()(AddEventForm);
