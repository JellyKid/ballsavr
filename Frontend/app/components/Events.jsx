import React from 'react';
import { Grid, Col, ButtonToolbar, Button, PageHeader, ListGroup, ListGroupItem, Label, Badge, ProgressBar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import handleFetch from '../helpers/handleFetch';
import { setEvents } from '../redux/actions';
import moment from 'moment';
import EditEvent from './event/EditEvent';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null
    };
    this.handleFetch = handleFetch.bind(this);
    this.done = this.done.bind(this);
  }

  componentWillMount(){
    this.handleFetch('GET', '/api/events',null, setEvents);
  }


  done(refresh){
    if(refresh === true){
      this.handleFetch('GET', '/api/events',null, setEvents);
    }
    this.setState(
      {event: null},
      () => {
        browserHistory.push('/events');
      }
    );
  }

  render(){

    if(this.props.params.eventid){
      return (
        <EditEvent
          event={this.state.event}
          done={this.done}
        />
      );
    }

    const events = this.props.events.map(
      (event) => (
        <ListGroupItem
          className="mBottom"
          onClick={() => this.setState(
            {event: event},
            () => browserHistory.push(`/events/edit`)
          )}
          key={event._id}>
          <h3>{event.title} <small>{event.subtitle}</small> <Label>{event.rounds.length} Rounds</Label></h3>
          <Badge>{`${event.progress}%`}</Badge><ProgressBar striped bsStyle="success" now={event.progress} />
        </ListGroupItem>
      )
    );

    const eventGroup = events.length > 0 ? (
      <ListGroup>{events}</ListGroup>
    ) : null;

    const addEventButton = (
      <Button
        className="mBottom"
        bsSize="large"
        bsStyle="primary"
        onClick={() => browserHistory.push('/events/new')}
        block>Add Event</Button>
    );

    return (
      <Grid>
        <Col sm={8} smOffset={2}>
          <PageHeader>Events</PageHeader>
          {addEventButton}
          {eventGroup}
        </Col>
      </Grid>
    );
  }
}

function mapStateToProps(state){
  return {
    events: state.events
  };
}

export default connect(mapStateToProps)(Events);
