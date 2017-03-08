import React from 'react';
import { Grid, Col, ButtonToolbar, Button, PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import handleFetch from '../helpers/handleFetch';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  render(){

    const events = this.state.events.map(
      (event) => (
        <ListGroupItem key={event._id}>
          <h4>{event.title} <small>{event.subtitle}</small></h4>
          <p>{event.round} - {new Date(event.start)}</p>
        </ListGroupItem>
      )
    );

    const eventGroup = events.length > 0 ? (
      <ListGroup>{events}</ListGroup>
    ) : null;

    const addEventButton = (
      <Button
        bsSize="large"
        bsStyle="primary"
        onClick={() => browserHistory.push('/events/add')}
        block>Add Event</Button>
    );

    return (
      <Grid>
        <Col sm={8} smOffset={2}>
          <PageHeader>Events</PageHeader>
          <Col sm={12}>
            <ButtonToolbar>
              {addEventButton}
            </ButtonToolbar>
          </Col>
          {eventGroup}
        </Col>
      </Grid>
    );

  }

}

export default connect()(Events);
