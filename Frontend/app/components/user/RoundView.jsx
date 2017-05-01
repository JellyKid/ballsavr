import React from 'react';
import handleFetch from '../../helpers/handleFetch';
import { Grid, Col, PageHeader, Table, ListGroup, ListGroupItem, Button, Glyphicon, Clearfix } from 'react-bootstrap';
import browserHistory from 'react-router';
import { connect } from 'react-redux';
import SubmitScoreModal from './SubmitScoreModal';
import NumberFormat from 'react-number-format';
import ConfirmScores from '../admin/ConfirmScores';
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
      submitData: null
    };

    this.refreshScores = this.refreshScores.bind(this);
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
      })
    );
    socket.on(
      'connect_error',
      () => setTimeout(socket.open, 1000)
    );
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

    let rank = 0;
    let lastValue = 0;
    const statRows = this.state.totals
    .sort((a,b) => b.value - a.value)
    .map(
      (total) => {
        if(total.value != lastValue){rank++;}
        let row = (
          <tr key={total._id} >
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

        let disableButton = !this.props.player.admin && match && match.confirmed;

        let buttonStyle = !match ? 'default' : match.confirmed ? 'success' : 'danger';

        const submitButton = (
          <Button
            onClick={() => this.setState({submitData:{
              table: table,
              player: player,
              round: this.state.round
            }})}
            disabled={disableButton}
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

    const confirm = this.props.player.admin ?
    <ConfirmScores scores={this.state.scores} player={this.props.player}/> : null;

    const scoresLegend = (
      <div>
        <Col xs={1}><div className='red-block'></div></Col>
        <Col xs={3}> Unconfirmed</Col>
        <Col xs={1}><div className='green-block'></div></Col>
        <Col xs={3}> Confirmed</Col>
      </div>
    );

    return (
      <Grid>
        <SubmitScoreModal
          visible={this.state.submitData ? true : false}
          data={this.state.submitData}
          hideMe={() => this.setState({submitData:null})}
          finishSubmit={() => this.setState({submitData: null})}
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
        </Col>
        <Clearfix/>
        {confirm}
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
