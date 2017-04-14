import React from 'react';
import handleFetch from '../../helpers/handleFetch';
import { Grid, Col, PageHeader, Table, ListGroup, ListGroupItem, Button, Glyphicon } from 'react-bootstrap';
import browserHistory from 'react-router';
import { connect } from 'react-redux';

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
  }

  componentDidMount(){
    let fetches = [
      handleFetch('GET',`/api/score/totals?round=${this.props.params.roundID}`),
      handleFetch('GET',`/api/score/round?id=${this.props.params.roundID}&quick`)
    ];
    if(!this.props.round){
      fetches.push(handleFetch('GET', `/api/round/${this.props.params.roundID}`));
    }
    return Promise.all(fetches)
    .then(
      (res) => this.setState({
        totals: res[0].payload,
        scores: res[1].payload,
        round: this.props.round || res[2].payload
      })
    );
  }

  render(){
    let rank = 1;
    let lastValue = 0;
    const statRows = this.state.totals
    .sort((a,b) => a.value < b.value)
    .map(
      (total) => {
        let row = (
          <tr key={total._id} >
            <td>{rank}</td>
            <td>{`${total.player.firstName} ${total.player.lastName.charAt(0)}`}</td>
            <td>{total.player.initials}</td>
            <td>{total.value}</td>
          </tr>
        );
        if(total.value != lastValue){rank++;}
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
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{statRows}</tbody>
      </Table>
    );

    const tables = this.state.round.tables.map(
      (table) => (
        <ListGroupItem key={table._id}>
          <div className="justify-content-between d-flex">
            <h4>{table.name}</h4>
            <Button><Glyphicon glyph="plus" /></Button>
          </div>
        </ListGroupItem>
      )
    );
    
    let player = this.state.round.players.find((p) => p.user._id === this.props.player._id);
    let groupName = player ? player.group : "";
    const group = this.state.round.players.reduce((p, c) => {
      if(c.group === player.group){
        p.push(
          <div key={c._id} className="token">{`${c.user.firstName} ${c.user.lastName.charAt(0)}`}</div>
        );
      }
      return p;
    }, []);

    return (
      <Grid>
        <Col md={6} mdOffset={3}>
          <PageHeader>{this.state.round.event.title}<br/><small>{this.state.round.name}</small></PageHeader>
          <h2>Standings</h2>
          {stats}
          <hr/>
          <h2>{`Group ${groupName}`}</h2>
          <div>{group}</div>
          <hr/>
          <h2>{this.props.player.initials} Tables</h2>
          <ListGroup>{tables}</ListGroup>
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
