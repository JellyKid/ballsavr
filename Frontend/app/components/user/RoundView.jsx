import React from 'react';
import handleFetch from '../../helpers/handleFetch';
import { Grid, Col, PageHeader, Table } from 'react-bootstrap';
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
        name: "Please wait"
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
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{statRows}</tbody>
      </Table>
    );

    return (
      <Grid>
        <Col md={6} mdOffset={3}>
          <PageHeader>{this.state.round.event.title}<br/><small>{this.state.round.name}</small></PageHeader>
          <h2>Standings</h2>
          <hr/>
          {stats}
        </Col>
      </Grid>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    round: state.rounds.find((round) => round._id === ownProps.params.roundID)
  };
}

export default connect(mapStateToProps)(RoundView);
