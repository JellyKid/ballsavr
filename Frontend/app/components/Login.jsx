import React from 'react';
import { Grid, Col, PageHeader, Button, Well} from 'react-bootstrap';

import EmailForm from './login/EmailForm';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: false
    };
  }
  render(){
    const loginChoice = (
          <div>
            <Button bsStyle="primary" bsSize="large" block disabled={true}>Facebook</Button>
            <Button bsSize="large" block onClick={() => {this.setState({email: true});}}>
              E-Mail
            </Button>
          </div>
    );

    const main = (
      <Grid>
        <Col sm={6} smOffset={3}>
          <PageHeader>Welcome to TCP<br /><small>please login below</small></PageHeader>
          <Well>
            {this.state.email ? <EmailForm cancelForm={() => {this.setState({email: false});}}/> : loginChoice}
          </Well>
        </Col>
      </Grid>
    );

    return (main);
  }
}

export default Login;
