import React from 'react';
import { Grid, Col, ListGroup, ListGroupItem, PageHeader, Alert, Button } from 'react-bootstrap';
import handleGet from '../../helpers/handleGet';
import { setCurrentTables } from '../../redux/actions';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import SearchAndAdd from './SearchAndAdd';

class EditCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            alertMessage : "",
            selected: []
    };
    this.handleGet = handleGet.bind(this);
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
          >
            {table.manufacturer} - {table.manufactureDate}
          </ListGroupItem>
        );
      }
    );

    return(
      <Grid>
        <Col sm={8} smOffset={2}>
          {alert}
          <PageHeader>Active Collection</PageHeader>

          <SearchAndAdd />

          <br />

          <ListGroup>
            {currentTables}
          </ListGroup>
          <Col sm={12}>
            <Button
              bsStyle="danger"
              bsSize="large"
              block
              disabled={(this.state.selected.length === 0)}
            >Remove selected</Button>
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
