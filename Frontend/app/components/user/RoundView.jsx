import React from 'react';
import handleFetch from '../../helpers/handleFetch';
import { Grid, Col, PageHeader, Table } from 'react-bootstrap';
import browserHistory from 'react-router';

class RoundView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totals: [],
      round: this.props.round || {
        event: {
          title: 'Loading...'
        },
        name: "Please wait"
      }
    };
    this.getRoundInfo = this.getRoundInfo.bind(this);
  }

  componentDidMount(){
    if(!this.props.round){
      handleFetch('GET', `/api/round/${this.props.params.roundID}`)
      .then((results) => this.setState(
        {round: results.payload},
        this.getRoundInfo
      ));
    } else {
      this.getRoundInfo();
    }
  }

  getRoundInfo(){
    handleFetch('GET',`/api/totals?round=${this.props.params.roundID}`)
    .then( (results) => this.setState({totals: results.payload}) )
    .catch((err) => console.log(err));
  }

  render(){
    let rank = 1;
    let lastValue = 0;
    const statRows = this.state.totals.map(
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

export default RoundView;
