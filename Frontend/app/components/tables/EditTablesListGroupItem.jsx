import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class EditTablesListGroupItem extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

  render(){
    const listgroupitem = (
      <ListGroupItem
        id={this.props.table._id}
        header={`${this.props.table.name} - ${this.props.table.manufactureDate}`}
        // onClick={() => this.toggleTable(table._id)}
        onClick={()=> this.setState({selected: !this.state.selected})}
        bsStyle={this.state.selected ? "info" : null}
        key={this.props.table._id}
      />

    );

    return listgroupitem;
  }
}

export default EditTablesListGroupItem;
