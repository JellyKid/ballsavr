import React from 'react';
import handleFetch from '../../helpers/handleFetch';
import { Grid, Col, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import update from 'immutability-helper';

import ConfirmScores from './view/ConfirmScores';
import Rankings from './view/Rankings';
import Scores from './view/Scores';
import Group from './view/Group';
import Manage from './view/Manage';

const socket = require('socket.io-client')('/round',{
  path: '/api/socket.io',
  autoConnect: false
});

class RoundView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      round: this.props.round || {
        event: {
          title: 'Loading...'
        },
        name: "Please wait",
        tables: [],
        players: []
      },
      scores: [],
      totals: []
    };

    this.refreshScores = this.refreshScores.bind(this);
    this.updateRoundProgress = this.updateRoundProgress.bind(this);
  }

  componentDidMount(){
    this.handleSocket();
    let fetches = [
      handleFetch('GET',`/api/score/totals?round=${this.props.params.roundID}`),
      handleFetch('GET',`/api/score/round?id=${this.props.params.roundID}`)
    ];
    if(!this.props.round){
      fetches.push(handleFetch('GET', `/api/round/${this.props.params.roundID}`));
    }
    return Promise.all(fetches)
    .then(
      (res) => {
        this.setState({
          totals: res[0].payload,
          scores: res[1].payload,
          round: this.props.round || res[2].payload
        });
      }
    ).catch((err) => {console.log(err);});
  }

  handleSocket(){
    socket.open();
    socket.on(
      'connect',
      () => socket.emit('join round', this.props.params.roundID)
    );
    socket.on(
      'rankings',
      (payload) => this.setState({
        totals: payload.totals,
        scores: payload.scores
      },this.updateRoundProgress)
    );
    socket.on(
      'connect_error',
      () => setTimeout(socket.open, 1000)
    );
  }

  updateRoundProgress(){
    if(this.props.player.admin){
      let scores = this.state.scores.filter((score) => score.confirmed).length;
      let progress = Math.floor((scores/(this.state.round.tables.length * this.state.round.players.length))*100);
      return this.setState(update(
        this.state,
        {round: {progress : {$set: progress}}}
      ));
    }
  }

  refreshScores(){
    handleFetch('GET',`/api/score/round?id=${this.props.params.roundID}`)
    .then(
      (res) => this.setState({scores: res.payload})
    ).catch((err) => {console.log(err);});
  }

  componentWillUnmount(){
    socket.close();
  }

  render(){
    let player = this.state.round.players.find((p) => p.user._id === this.props.player._id);
    let groupName = (player) ? player.group : "";

    return (
      <Grid>
        <Col md={6} mdOffset={3}>
          <PageHeader>
            {this.state.round.event.title}<br/><small>{this.state.round.name}</small>
          </PageHeader>
          <Rankings
            totals={this.state.totals}
            players={this.state.round.players}
            player={this.props.player}
          />
          <hr />
          <Group
            group={groupName}
            players={this.state.round.players}
          />
          <hr />
          <Scores
            player={this.props.player}
            scores={this.state.scores}
            round={this.state.round}
            group={groupName}
          />
          <hr />
          <ConfirmScores
            scores={this.state.scores}
            player={this.props.player}
          />
          <hr />
          <Manage
            round={this.state.round}
            player={this.props.player}
          />
        </Col>
      </Grid>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    round: state.rounds.find((round) => round._id === ownProps.params.roundID),
    player: state.user
  };
}

export default connect(mapStateToProps)(RoundView);
