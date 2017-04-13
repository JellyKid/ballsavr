import React from 'react';
import { Grid, Col, ListGroup, ListGroupItem, PageHeader, Alert, Button } from 'react-bootstrap';
import handleGet from '../helpers/handleGet';
import { setCurrentTables } from '../redux/actions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            alertMessage : ""
    };
    this.handleGet = handleGet.bind(this);
  }

  componentDidMount(){
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
          <ListGroupItem header={table.name} key={table._id}>
            {table.manufacturer} - {table.manufactureDate}
          </ListGroupItem>
        );
      }
    );

    const editButton = this.props.admin ? (
      <Button
        bsSize="large"
        bsStyle="primary"
        onClick={() => browserHistory.push('/tables/edit')}
        block>
        Edit
      </Button>
    ) : "";

    return(
      <Grid>
        <Col sm={8} smOffset={2}>
          <PageHeader>Tables</PageHeader>
          <ListGroup>
            {currentTables}
          </ListGroup>
          {editButton}
          {alert}
        </Col>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentTables: state.currentTables,
    admin: state.user.admin
  };
}

export default connect(mapStateToProps)(Tables);
