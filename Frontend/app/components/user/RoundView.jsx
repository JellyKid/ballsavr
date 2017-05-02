import React from 'react';
import handleFetch from '../../helpers/handleFetch';
import { Grid, Col, PageHeader, Table, ListGroup, ListGroupItem, Button, Glyphicon, Clearfix, ProgressBar, Row, Label } from 'react-bootstrap';
import browserHistory from 'react-router';
import { connect } from 'react-redux';
import SubmitScoreModal from './SubmitScoreModal';
import NumberFormat from 'react-number-format';
import ConfirmScores from '../admin/ConfirmScores';
import update from 'immutability-helper';
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
      totals: [],
      submitData: null,
      submitModal: {
        data: null,
        show: false
      }
    };

    this.refreshScores = this.refreshScores.bind(this);
    this.updateRoundProgress = this.updateRoundProgress.bind(this);
    this.hideSubmitModal = this.hideSubmitModal.bind(this);
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

  hideSubmitModal(){
    this.setState({
      submitModal: {
        data: null,
        show: false
      }
    });
  }

  componentWillUnmount(){
    socket.close();
  }

  render(){
    let player = this.state.round.players.find((p) => p.user._id === this.props.player._id);
    let groupName = (player) ? player.group : "";

    let rank = 0;
    let lastValue = 0;
    const statRows = this.state.totals
    .sort((a,b) => b.value - a.value)
    .map(
      (total) => {
        if(total.value != lastValue){rank++;}
        let row = (
          <tr key={total._id} className='flipitrealgood'>
            <td>{rank}</td>
            <td>{`${total.player.firstName} ${total.player.lastName.charAt(0)}`}</td>
            <td>{total.player.initials}</td>
            <td>{total.value}</td>
          </tr>
        );
        lastValue = total.value;
        return row;
      }
    );

    const stats = (
      <Table striped style={{background: '#fff'}}>
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Initials</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>{statRows}</tbody>
      </Table>
    );

    const tables = this.state.round.tables.map(
      (table) => {
        let match = this.state.scores.find(
          (score) => score.table._id == table._id && score.player._id == this.props.player._id
        );

        let buttonContent = match ?
          <NumberFormat
            value={match.value}
            displayType={"text"}
            thousandSeparator={true}
          /> :
          <div><Glyphicon glyph="camera" /> submit</div>;



        let buttonStyle = !match ? 'default' : match.confirmed ? 'success' : 'danger';

        const submitButton = (
          <Button
            onClick={() => this.setState({
              submitModal: {
                data: {
                  table: table,
                  player: player,
                  round: this.state.round,
                  score: match ? match.value : 0
                },
                show: true
              }
            })}
            bsStyle={buttonStyle}
            bsSize="small">
            {buttonContent}
          </Button>
        );

        let points = match ? match.points : 0;

        return (
          <tr key={table._id} >
            <td>{table.name}</td>
            <td>{points}</td>
            <td>{submitButton}</td>
          </tr>
        );}
    );


    const group = this.state.round.players.reduce((p, c) => {
      if(c.group === groupName){
        p.push(
          <div key={c._id} className="group-player-token">{`${c.user.firstName} ${c.user.lastName.charAt(0)}`}</div>
        );
      }
      return p;
    }, []);

    const confirm = this.props.player.admin || this.props.player.scoreKeeper ?
    <ConfirmScores scores={this.state.scores} player={this.props.player}/> : null;

    const scoresLegend = (
      <div>
        <Col xs={1}><div className='red-block'></div></Col>
        <Col xs={4}> Unconfirmed</Col>
        <Col xs={1}><div className='green-block'></div></Col>
        <Col xs={4}> Confirmed</Col>
      </div>
    );

    var manage = null;
    if(this.props.player.admin){
      let roundProgress = (
        <div>
          <h3>Round <Label>{this.state.round.progress}%</Label> Complete</h3>
          <ProgressBar striped bsStyle="info" now={this.state.round.progress}/>
        </div>
      );

      manage = (
        <div>
          <h2>Manage</h2>
          <hr />
          {roundProgress}
        </div>
      );
    }



    return (
      <Grid>
        <SubmitScoreModal
          visible={this.state.submitModal.show}
          data={this.state.submitModal.data}
          hideMe={this.hideSubmitModal}
        />
        <Col md={6} mdOffset={3}>
          <PageHeader>{this.state.round.event.title}<br/><small>{this.state.round.name}</small></PageHeader>
          <h2>Rankings</h2>
          {stats}
          <hr/>
          <h2>{`Your Group - ${groupName}`}</h2>
          <div>{group}</div>
          <hr/>
          <h2>{this.props.player.initials} Scores</h2>
          <Table striped style={{background: '#fff'}}>
            <thead>
              <tr>
                <th>Table</th>
                <th>Points</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>{tables}</tbody>
          </Table>
          {scoresLegend}
          <Clearfix/>
          <hr />
          {confirm}
          {manage}
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
