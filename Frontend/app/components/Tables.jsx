import React from 'react';
import { Grid, Col, ListGroup, ListGroupItem, PageHeader, Alert } from 'react-bootstrap';
import handleGet from '../helpers/handleGet';
import { setCurrentTables } from '../redux/actions';
import { connect } from 'react-redux';

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMessage : ""
    };
    this.handleGet = handleGet.bind(this);
  }

  componentWillMount(){
    this.handleGet(
      '/api/table/current',
      setCurrentTables
    );
  }

  render(){
    const alert = this.state.alertmessage ? (
      <Alert bsStyle="error">{this.state.alertMessage}</Alert>
    ) : "";

    const currentTables = this.props.currentTables.map(
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

function mapStateToProps(state) {
  return {
    currentTables: state.currentTables
  };
}

export default connect(mapStateToProps)(Tables);
