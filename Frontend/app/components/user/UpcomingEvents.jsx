import React from 'react';
import { Panel, PageHeader, Grid, Col } from 'react-bootstrap';
import moment from 'moment';
import handleFetch from '../../helpers/handleFetch';

class UpcomingEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rounds: []
    };
  }

  componentWillMount(){
    handleFetch('GET','/api/rounds/current')
      .then(
        (res) => this.setState({rounds: res.payload || []})
      ).catch(
        (err) => console.log(err)
      );
  }

  render(){
    let rounds = this.state.rounds.map(
      (round) => <Panel
        key={round._id}>
        <h3>{round.event.title} - {round.name}</h3>
        <h4>{moment(round.event.start).format('MMM Do YY, h:mm a')}</h4>
      </Panel>
    );

    if(rounds.length < 1){
      rounds = <p>No upcoming events found!</p>;
    }

    return (
      <Grid>
        <Col sm={12}>
          <PageHeader><small>Current Events</small></PageHeader>
          {rounds}
        </Col>
      </Grid>
    );
  }
}

export default UpcomingEvents;
