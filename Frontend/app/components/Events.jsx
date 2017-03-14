import React from 'react';
import { Grid, Col, ButtonToolbar, Button, PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import handleFetch from '../helpers/handleFetch';
import { setEvents } from '../redux/actions';
import moment from 'moment';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null
    };
    this.handleFetch = handleFetch.bind(this);
  }

  componentWillMount(){
    this.handleFetch('GET', '/api/events',null, setEvents);
  }

  render(){

    const events = this.props.events.map(
      (event) => (
        <ListGroupItem
          className="mBottom"
          onClick={() => this.setState({event: event})}
          key={event._id}>
          <h4>{event.title} <small>{event.subtitle}</small></h4>
          <p>{moment(event.start).format('MMM Do YYYY, h:mm a')}</p>
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
        onClick={() => browserHistory.push('/events/add')}
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
