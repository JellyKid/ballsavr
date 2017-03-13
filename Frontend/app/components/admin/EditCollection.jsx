import React from 'react';
import { Grid, Col, ListGroup, ListGroupItem, PageHeader, Alert, Button, ButtonToolbar, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import handleGet from '../../helpers/handleGet';
import handlePost from '../../helpers/handlePost';
import { setCurrentTables } from '../../redux/actions';

import update from 'immutability-helper';
import SearchAndAdd from './SearchAndAdd';
import UpdateIPDBModal from './UpdateIPDBModal';

class EditCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            alertMessage : "",
            selected: [],
            showModal: false
    };
    this.handleGet = handleGet.bind(this);
    this.handlePost = handlePost.bind(this);
    this.toggleTable = this.toggleTable.bind(this);
    this.getStyle = this.getStyle.bind(this);

    this.selectStyle = "info";
  }

  componentWillMount(){
    this.handleGet(
      '/api/table/current',
      setCurrentTables
    );
  }

  toggleTable(id){
    // this.setState({[index]: !(this.state[index])});
    let index = this.state.selected.indexOf(id);
    if(index > -1){
      return this.setState(update(
        this.state,
        {
          selected: {
            $splice: [[index, 1]]
          }
        }
      ));
    }
    return this.setState(update(
      this.state,
      {
        selected : {
          $push : [id]
        }
      }
    ));
  }

  getStyle(id){
    return (this.state.selected.indexOf(id) > -1) ? this.selectStyle : null;
  }

  render(){
    const alert = this.state.alertmessage ? (
      <Alert bsStyle="error">{this.state.alertMessage}</Alert>
    ) : "";

    const deleteButton = this.state.selected.length > 0 ? (
      <Button bsStyle="danger">Remove</Button>
    ) : "";

    const currentTables = this.props.currentTables.map(
      (table, index) => {
        return (
          <ListGroupItem
            header={table.name}
            onClick={() => this.toggleTable(table._id)}
            bsStyle={this.getStyle(table._id)}
            key={table._id}
          >
            {table.manufacturer} - {table.manufactureDate}
          </ListGroupItem>
        );
      }
    );

    const removeButton = (
      <Button
        bsStyle="danger"
        bsSize="large"
        block
        disabled={(this.state.selected.length === 0)}
        onClick={
          () => this.handlePost(
            '/api/table/admin/disable',
            this.state.selected,
            setCurrentTables
          ).then(
            () => this.setState({selected: []})
          )
        }>Remove selected</Button>
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
          <SearchAndAdd />
          <hr />
          <ListGroup>
            {currentTables}
          </ListGroup>
          <Col sm={12}>

            {removeButton}
            {backButton}
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

export default connect(mapStateToProps)(EditCollection);
