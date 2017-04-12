import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox, ButtonToolbar, Button, Col, Well, Grid, Modal, Glyphicon } from 'react-bootstrap';
import update from 'immutability-helper';
import { browserHistory } from 'react-router';
import { setUsers } from '../../redux/actions';
import moment from 'moment';
import DateTimeEditor from './DateTimeEditor';
import handleFetch from '../../helpers/handleFetch';
import EventTableTypeahead from './EventTableTypeahead';
import PlayerList from './PlayerList';
import AddPlayerModel from './AddPlayerModel';


class EditRound extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      round : this.props.round,
      availableTables: [],
      availableUsers: [],
      submitDisabled : false,
      showDateTime: false,
      showAddPlayer: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
  }

  componentWillMount(){
    handleFetch('GET', '/api/table/current')
      .then((res) => res.payload)
      .then((tables) => handleFetch('GET', '/api/admin/users')
        .then((res) => this.setState({
          availableTables: tables,
          availableUsers: res.payload
        }))
      ).catch((err) => console.error(err));
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

  removePlayer(id) {

    let players = this.state.round.players.filter(
      (player) => player.user._id !== id
    );
    this.setState(update(
      this.state,
      {
        round:{
          players : {$set: players}
        }
      }
    ));
  }


  render(){

    const groupNames = this.state.round.players.reduce( //extract current groups
      (groups, player) => {
        if(groups.indexOf(player.group) === -1){
          groups.push(player.group);
        }
        return groups;
      }, []
    );

    const formattedDateTime = moment(this.state.round.start).format("MMM Do YYYY, h:mmA");

    const form = (
      <Form horizontal onSubmit={this.handleSubmit}>

        <FormGroup>
          <Col md={2}>
            <ControlLabel>Name</ControlLabel>
          </Col>
          <Col md={10}>
            <FormControl type="text" name="name" value={this.state.round.name} onChange={this.handleChange}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col md={2}>
            <ControlLabel>Tables</ControlLabel>
          </Col>
          <Col sm={12}>
            <EventTableTypeahead
              tables={this.state.availableTables}
              selected={this.state.round.tables}
              handleChange={(tables) => this.setState(update(
                this.state,
                {round: {tables: {$set: tables}}}
              ))}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col md={2}>
            <ControlLabel>Players</ControlLabel>
          </Col>
          <Col sm={12}>
            <PlayerList players={this.state.round.players} groupNames={groupNames} removePlayer={this.removePlayer}/>
            <Button block bsSize="lg" onClick={() => this.setState({showAddPlayer: true})}>
              <Glyphicon glyph="plus" /> Add Player
            </Button>
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
                type="submit"
                bsStyle="primary"
                block
                bsSize="large"
                disabled={this.state.submitDisabled}>OK</Button>
              <Button
                onClick={() => this.props.handleCancel()}
                block
                bsSize="large"
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
        time={this.state.round.start}
        save={(date) => this.setState(update(
          this.state,
          {
            showDateTime: {$set: false},
            round : {start : {$set:date}}
          }
        ))}/>
    );

    const filterById = (user) => { //filter users already selected in round so there are no duplicates
      return !this.state.round.players.find(
        (player) => player.user._id === user._id
      );
    };

    const playeroptions = this.state.availableUsers.filter(filterById);

    const addplayer = (
      <AddPlayerModel
        visible={this.state.showAddPlayer}
        hideMe={() => this.setState({showAddPlayer: false})}
        playerOptions={playeroptions}
        groupOptions={groupNames.length > 0 ? groupNames : null}
        addPlayer={(player, group) => this.setState(update(
          this.state,
          {
            round: {
              players: {
                $push: [{
                  user: player,
                  group: group
                }]
              }
            },
            showAddPlayer: {$set: false}
          }
        ))}
      />
    );

    return (
      <div>
        {addplayer}
        <Grid>
          <Col sm={8} smOffset={2}>
            <Well>
              <h2>Edit {this.state.round.name}</h2>
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
