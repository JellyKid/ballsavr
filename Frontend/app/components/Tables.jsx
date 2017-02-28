import React from 'react';
import { Grid, Col, ListGroup, ListGroupItem, PageHeader, Alert } from 'react-bootstrap';
import getCurrentTables from '../helpers/getCurrentTables';

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMessage : "",
      tables : []
    };
  }

  componentWillMount(){
    return getCurrentTables()
    .then(
      (res) => this.setState(res)
    );
  }

  render(){
    const alert = this.state.alertmessage ? (
      <Alert bsStyle="error">{this.state.alertMessage}</Alert>
    ) : "";

    const currentTables = this.state.tables.map(
      (table) => {
        return (
          <ListGroupItem header={table.name}>
            {table.manufacturer} - {table.manufactureDate}
          </ListGroupItem>
        );
      }
    );

    return(
      <Grid>
        <Col sm={8} smOffset={2}>
          <PageHeader>Current Tables</PageHeader>
          <ListGroup>
            {currentTables}
          </ListGroup>
          {alert}
        </Col>
      </Grid>
    );
  }
}

export default Tables;
