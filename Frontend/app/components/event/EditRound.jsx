import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox, ButtonToolbar, Button, Col, Well, Grid, Modal } from 'react-bootstrap';
import update from 'immutability-helper';
import { browserHistory } from 'react-router';
import { setUsers } from '../../redux/actions';
import moment from 'moment';
import DateTimeEditor from './DateTimeEditor';
import handleFetch from '../../helpers/handleFetch';
import EventTableTypeahead from './EventTableTypeahead';

class EditRound extends React.Component {
  constructor(props){
    super(props);
    let round = this.props.title ?
      {...this.props.round, title: this.props.title}
      : this.props.round;

    this.state = {
      round : round,
      availableTables: [],
      availableUsers: [],
      selectedTables: [],
      users: [],
      submitDisabled : false,
      showDateTime: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    handleFetch('GET', '/api/table/current')
      .then((res) => res.payload)
      .then((tables) => handleFetch('GET', '/api/admin/users')
        .then((res) => this.setState({
          availableTables: tables,
          availableUsers: res.payload
        }))
      );
  }

  handleChange(e){
    return this.setState(update(
      this.state,
      {
        round: { [e.target.name] : {$set:e.target.value} }
      }
    ));
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.handleSave(this.state.round);
  }


  render(){

    const formattedDateTime = moment(this.state.round.start).format("MMM Do YYYY, h:mmA");

    const form = (
      <Form horizontal onSubmit={this.handleSubmit}>

        <FormGroup>
          <Col md={2}>
            <ControlLabel>Title</ControlLabel>
          </Col>
          <Col md={10}>
            <FormControl type="text" name="title" value={this.state.round.title} onChange={this.handleChange}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col md={2}>
            <ControlLabel>Tables</ControlLabel>
          </Col>
          <Col sm={12}>
            <EventTableTypeahead
              tables={this.state.availableTables}
              selected={this.state.selectedTables}
              handleChange={(tables) => this.setState({selectedTables: tables})}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col md={2}>
            <ControlLabel>Groups</ControlLabel>
          </Col>
          <Col sm={12}>
            <FormControl name="description" componentClass="textarea" onChange={this.handleChange} placeholder="Place a short description here..." />
          </Col>
        </FormGroup>

        <FormGroup>
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
            <ButtonToolbar>
              <Button
                bsStyle="success"
                type="submit"
                disabled={this.state.submitDisabled}>Add</Button>
              <Button
                onClick={() => this.props.handleCancel()}
              >Cancel</Button>
            </ButtonToolbar>

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
            round : {start : {$set:date}}
          }
        ))}/>
    );

    return (
      <div>
        <Grid>
          <Col sm={8} smOffset={2}>
            <Well>
              <h2>Edit Round</h2>
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

export default EditRound;
