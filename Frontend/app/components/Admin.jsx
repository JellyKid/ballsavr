import React from 'react';
import { Col, Grid, Well } from 'react-bootstrap';
import InviteNewUser from './admin/InviteNewUser';

class AdminTasks extends React.Component {
  constructor(props) {
    super(props);    
  }
  render(){
    return (
      <Grid>
        <Col sm={8} smOffset={2}>
          <Well>
            <InviteNewUser />
          </Well>
        </Col>
      </Grid>
    );
  }
}

export default AdminTasks;
