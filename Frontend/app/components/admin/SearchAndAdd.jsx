import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import handleGet from '../../helpers/handleGet';

class SearchAndAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables : []
    };
    this.handleGet = handleGet.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery(query){
    this.handleGet(
      `/api/table/search/${query}`
    ).then(
      (tables) => {
        console.log(tables.length);
        this.setState({tables: tables});
      }
    );
  }

  renderChildren(table, props, index){
    return (
      <div>
        <h4>{table.name} <br/><small>{table.manufacturer} - {table.manufactureDate}</small></h4>
      </div>
    );
  }

  render(){
    return <AsyncTypeahead
      filterBy={(table) => !table.enabled}
      bsSize="large"
      labelKey="name"
      onSearch={this.handleQuery}
      options={this.state.tables}
      placeholder="search for tables to add..."
      renderMenuItemChildren={this.renderChildren}
           />;
  }
}

export default connect()(SearchAndAddForm);
