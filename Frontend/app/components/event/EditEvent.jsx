import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox,
        ButtonToolbar, Button, Col, Well, Grid, Modal, Glyphicon,
        ListGroup, ListGroupItem } from 'react-bootstrap';
import handleFetch from '../../helpers/handleFetch';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { setUsers } from '../../redux/actions';
import moment from 'moment';
import DateTimeEditor from './DateTimeEditor';
import EditRound from './EditRound';
import { blankEvent, blankRound } from './templates';


class EditEvent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      event : this.props.event || blankEvent,
      rounds : this.props.rounds || [],
      currentRound : this.props.currentRound || null,
      currentRoundIndex : null,
      players: this.props.players || [],
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
            return browserHistory.goBack();
          }
          return this.setState({submitDisabled: false});
        }
      );
  }


  render(){

    const formattedDateTime = moment(this.state.event.start).format("MMM Do YYYY, h:mmA");

    const rounds = this.state.rounds.map((round, i) => {
      return (
        <ListGroupItem
          key={i}
          onClick={()=>this.setState({
            currentRound: round,
            currentRoundIndex: i
          })}>
          {round.title}
        </ListGroupItem>
      );
    });

    const roundList = rounds ? <ListGroup>{rounds}</ListGroup> : null;

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
        <hr />
        <FormGroup>
          <Col sm={8} smOffset={2}>
            <ControlLabel>Rounds</ControlLabel>
          </Col>
          <Col sm={12}>
            {roundList}
            <Button block bsSize="lg" onClick={() => this.setState({currentRound: blankRound})}>
              <Glyphicon glyph="plus" /> Add Round
            </Button>
          </Col>
        </FormGroup>
        <hr />
        <FormGroup>
          <Col sm={12}>
            <ButtonToolbar>
              <Button
                bsStyle="success"
                type="submit"
                disabled={this.state.submitDisabled}>Save</Button>
              <Button
                onClick={() => browserHistory.goBack()}
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
            event : {start : {$set:date}}
          }
        ))}/>
    );

    function roundSave(round, index) {
      if(index){
        this.setState(update(
          this.state,
          {
            rounds: {$splice: [round]},
            currentRound: {$set: null}
          }
        ));
      } else {
        this.setState(update(
          this.state,
          {
            rounds: {$push: [round]},
            currentRound: {$set: null}
          }
        ));
      }
    }



    var view;
    if(this.state.currentRound){
      let roundIndex = this.state.currentRoundIndex || this.state.rounds.length;
      view = (
        <EditRound
          round={this.state.currentRound}
          title={this.state.currentRound.title || `Round ${roundIndex + 1}`}
          handleSave={(round) => {
            this.setState(update(
              this.state,
              {
                rounds: {$splice: [[roundIndex, 1, round]]},
                currentRoundIndex: {$set: null},
                currentRound: {$set: null}
              }
            ));
          }}
          handleCancel={() => this.setState({currentRound: null, currentRoundIndex: null})}
        />
      );
    } else {
      view = (
        <Grid>
          <Col sm={8} smOffset={2}>
            <Well>
              <h2>Edit Event</h2>
              <hr />
              {dateTimeEditor}
              {form}
            </Well>
          </Col>
        </Grid>
      );
    }

    return view;
  }
}

export default connect()(EditEvent);
