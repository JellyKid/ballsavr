import React from 'react';
import { Col, Row, Grid, Well, Panel, Label, Image, PageHeader, Badge, Button, Clearfix, ButtonToolbar } from 'react-bootstrap';
const userImgUrl = require('../assets/user.png');


class User extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (

        <Grid>
          <Col sm={8} smOffset={2}>
            <Panel>
              <Image src={userImgUrl} className="center-block" circle />
              <PageHeader className="text-center">Jake S</PageHeader>
              <Col sm={6}>
                <Button bsStyle='success large' block>Select Event</Button>
              </Col>
              <Col sm={12}>
                <h3><b>Leagues Season 3</b> <small>Week 4</small></h3>
              </Col>
              <Clearfix />
              <Col sm={12}>
                <p><Badge>12th</Badge> place</p>
                <p><Label>20</Label> points</p>
              </Col>
              <Col sm={6}>
                <ButtonToolbar>
                  <Button bsStyle='success large' >Select Game</Button>
                  <Button bsStyle='info large' >Event Stats</Button>
                </ButtonToolbar>

              </Col>
              <Col sm={12}>
                <h3><b>The Walking Dead</b></h3>
                <p>Jake S <Label>-</Label></p>
                <p>Joshua D <Label>188,658,950</Label></p>
                <p>Philip S <Label>33,423,890</Label></p>
                <p>Bryan F <Label>-</Label></p>
              </Col>
              <Col sm={6}>
                <Button bsStyle='success large' block>Add Score</Button>
              </Col>

            </Panel>
          </Col>
        </Grid>

    );
  }
}

export default User;
