import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox,
        ButtonToolbar, Button, Col, Well, Grid, Modal, Glyphicon,
        ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
import handleFetch from '../../helpers/handleFetch';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import { setUsers } from '../../redux/actions';
import moment from 'moment';

import EditRound from './EditRound';
import { blankEvent, blankRound } from './templates';
import DeleteEventModel from './DeleteEventModel';


class EditEvent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      event : this.props.event || blankEvent,
      rounds : [],
      currentRound : this.props.currentRound || null,
      currentRoundIndex : null,
      submitDisabled : false,
      addDisabled: false,
      showDateTime: false,
      showDeleteConfirm: false
    };

    this.handleFetch = handleFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount(){
    if(this.state.event._id){    
      this.setState({rounds: this.state.event.rounds});
    }
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
    this.handleFetch('POST','/api/admin/event',
      {
        event: this.state.event,
        rounds: this.state.rounds
      }
      ).then(
        (res) => {
          if(res.status === 200){
            return this.props.done(true);
          }
          return this.setState({submitDisabled: false});
        }
      );
  }


  render(){

    const deletebutton = this.state.event._id ? (
      <Button
        onClick={() => this.setState({showDeleteConfirm: true})}
        bsStyle="danger"
        disabled={this.state.submitDisabled}>
        Delete
      </Button>
    ) : null;



    const roundIndex = this.state.currentRoundIndex === 0 ? 0
        : this.state.currentRoundIndex || this.state.rounds.length;

    const rounds = this.state.rounds.map((round, i) => {
      return (
        <ListGroupItem
          key={i}
          onClick={()=>this.setState({
            currentRound: round,
            currentRoundIndex: i
          })}>
          <h4>{round.name} <small>{moment(round.start).format('MMM Do YY, h:mm a')}</small></h4>
          <p><Badge>{round.players.length}</Badge> players  <Badge>{round.tables.length}</Badge> tables</p>
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
            <FormControl name="description"
              componentClass="textarea" value={this.state.event.description} onChange={this.handleChange}
              placeholder="Place a short description here..."
            />
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
        </FormGroup>
        <hr />
        <FormGroup>
          <Col sm={8} smOffset={2}>
            <ControlLabel>Rounds</ControlLabel>
          </Col>
          <Col sm={12}>
            {roundList}
            <Button block bsSize="lg"
              disabled={this.state.addDisabled}
              onClick={() => this.setState(
                {
                  currentRound: Object.assign({}, blankRound, {start: new Date(), name: `Round ${roundIndex + 1}`})
                }
              )}>
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
                disabled={this.state.submitDisabled}>
                Save
              </Button>
              {deletebutton}
              <Button
                onClick={this.props.done}>
                Cancel
              </Button>
            </ButtonToolbar>
          </Col>
        </FormGroup>
      </Form>
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

      view = (
        <EditRound
          round={this.state.currentRound}
          // title={this.state.currentRound.title || `Round ${roundIndex + 1}`}
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
          <DeleteEventModel
            event_id={this.state.event._id}
            visible={this.state.showDeleteConfirm}
            hideMe={() => this.setState({showDeleteConfirm: false})}
            done={this.props.done}/>
          <Col sm={8} smOffset={2}>
            <Well>
              <h2>Edit Event</h2>
              <hr />
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
