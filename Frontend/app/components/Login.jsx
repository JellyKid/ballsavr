import React from 'react';
import { Grid, Col, PageHeader, Button, Well} from 'react-bootstrap';
import { Link } from 'react-router';

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
            <Link to="/admin"><Button bsStyle="primary" bsSize="large" block>Facebook</Button></Link>
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

    if(this.props.location.pathname !== '/'){
      return (this.props.children);
    }
    return (main);
  }
}

export default Login;
