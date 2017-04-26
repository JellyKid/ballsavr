import React from 'react';
import { Panel, PageHeader, Grid, Col, Label } from 'react-bootstrap';
import moment from 'moment';
import handleFetch from '../../helpers/handleFetch';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';
import { setCurrentRounds } from '../../redux/actions';

class UpcomingEvents extends React.Component {
  constructor(props) {
    super(props);  
  }

  componentDidMount(){
    handleFetch('GET','/api/rounds/current')
      .then(
        (res) => this.props.dispatch(setCurrentRounds(res.payload))
      ).catch(
        (err) => console.log(err)
      );
  }

  render(){
    let rounds = this.props.rounds
    .sort((a,b) => a.start <= b.start ? -1 : 1) //sort by date
    .map(
      (round) => <Panel
        onClick={() => browserHistory.push(`/round/${round._id}`)}
        key={round._id}>
        <h3>{round.event.title} <Label>{round.name}</Label></h3>
        <h4>{moment(round.start).format("MMM Do 'YY, h:mm a")}</h4>
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

function mapStateToProps(state) {
  return {
    rounds: state.rounds
  };
}

export default connect(mapStateToProps)(UpcomingEvents);
