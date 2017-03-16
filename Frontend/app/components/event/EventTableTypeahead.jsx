import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Typeahead, MenuItem } from 'react-bootstrap-typeahead';
import '../../style/typeahead/Token.css';
import '../../style/typeahead/ClearButton.css';
import '../../style/typeahead/Loader.css';
import '../../style/typeahead/Typeahead.css';

class EventTableTypeahead extends React.Component {
  constructor(props) {
    super(props);
  }


  renderChildren(table){
    return (
      <h4>{table.name} - {table.manufactureDate} </h4>
    );
  }


  render(){
    return <Typeahead
      ref={(component) => this.EventTableTypeahead = component}
      bsSize="large"
      labelKey='name'
      options={this.props.tables}
      placeholder="Add a table..."
      maxHeight={500}
      maxResults={5}
      minLength={1}
      multiple
      renderMenuItemChildren={this.renderChildren}
      selected={this.props.selected}
      onChange={this.props.handleChange}
      emptyLabel='No tables found. Try adding tables to your collection first.'
           />;
  }
}

export default EventTableTypeahead;
