import React from 'react';
import { Grid, Col, ListGroup, ListGroupItem, PageHeader, Alert, Button, ButtonToolbar, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import handleFetch from '../../helpers/handleFetch';
import { setCurrentTables } from '../../redux/actions';

import update from 'immutability-helper';
import AddTableTypeahead from './AddTableTypeahead';
import UpdateIPDBModal from './UpdateIPDBModal';
import EditTablesListGroupItem from './EditTablesListGroupItem';

class EditTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            alertMessage : "",
            showModal: false,
            deleteDisabled: false
    };

    this.handleFetch = handleFetch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    this.handleFetch('GET','/api/table/current',null, setCurrentTables);
  }

  handleDelete(){
    const selected = this.props.currentTables.reduce(
      (p, c) => {
        if(this[c._id].state.selected){
          p.push(c._id);
        }
        return p;
      }, []
    );
    if(selected.length > 0){
      this.handleFetch('POST', '/api/table/admin/disable', selected, setCurrentTables);
    }
  }

  render(){
    const alert = this.state.alertmessage ? (
      <Alert bsStyle="error">{this.state.alertMessage}</Alert>
    ) : "";

    const tables = this.props.currentTables.map(
      (table) => (
        <EditTablesListGroupItem
          table={table}
          ref={(component) => this[table._id] = component}
          key={table._id}
        />
      )
    );


    const removeButton = (
      <Button
        bsStyle="danger"
        bsSize="large"
        block
        onClick={this.handleDelete}
      >Remove selected</Button>
    );

    const backButton = (
      <Button
        bsSize="large"
        onClick={() => browserHistory.push('/tables')}
        block>
        <Glyphicon glyph="arrow-left"/> Back
      </Button>
    );

    const updateButton = (
      <Button
        bsSize="large"
        bsStyle="success"
        block
        onClick={
          () => this.setState({showModal: true})
        }>
        Update pins from IPDB
      </Button>
    );

    return(
      <Grid>
        <UpdateIPDBModal show={this.state.showModal} closeAction={() => this.setState({showModal: false})}/>
        <Col sm={8} smOffset={2}>
          {alert}
          <PageHeader>Tables</PageHeader>
          <AddTableTypeahead />
          <hr />
          <ListGroup>
            {tables}
          </ListGroup>
          <Col lg={6}>
            {removeButton}
          </Col>
          <Col lg={6}>
            {backButton}
          </Col>
          <Col sm={12}>
            <hr />
            {updateButton}
          </Col>
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

export default connect(mapStateToProps)(EditTables);
