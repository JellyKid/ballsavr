import React from 'react';
import { Jumbotron, Grid, Col } from 'react-bootstrap';

export default class Disabled extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (

      <Grid>
        <Col sm={6} smOffset={3}>
          <Jumbotron>
            <h1>Welcome!</h1>
            <p>Thank you for signing up. Your account has not been approved yet.</p>
            <p>Once your account is approved, please refresh this page to start playing.</p>
          </Jumbotron>
        </Col>
      </Grid>
    );
  }
}
