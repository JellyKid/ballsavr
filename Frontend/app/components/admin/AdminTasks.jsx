import React from 'react';
import { Col, Grid, Well } from 'react-bootstrap';
import AddUser from './AddUser';

class AdminTasks extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <Grid>
        <Col sm={8} smOffset={2}>
          <Well>
            <AddUser />
          </Well>
        </Col>
      </Grid>
    );
  }
}

export default AdminTasks;
