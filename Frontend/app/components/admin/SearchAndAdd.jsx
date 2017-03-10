import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { AsyncTypeahead, MenuItem } from 'react-bootstrap-typeahead';
import handleGet from '../../helpers/handleGet';
import handlePost from '../../helpers/handlePost';
import { setCurrentTables } from '../../redux/actions';

class SearchAndAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables : []
    };

    this.handleGet = handleGet.bind(this);
    this.handlePost = handlePost.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleQuery(query){
    this.handleGet(
      `/api/table/search/${query}`
    ).then(
      (tables) => {
        this.setState({tables: tables});
      }
    );
  }

  handleClick(id){
    console.log(id);
    this.handlePost(
      '/api/table/admin/enable',
      id,
      setCurrentTables
    ).then(
      // () => this.refs.searchAndUpdate.getInstance().clear()
      () => this.searchAndUpdate.getInstance().clear()
    );
  }

  renderChildren(table, props, index){
    return (
      <div onClick={() => this.handleClick([table._id])}>
        <h4>{table.name} <br/><small>{table.manufacturer} - {table.manufactureDate}</small></h4>
      </div>
    );
  }



  render(){
    return <AsyncTypeahead
      ref={(comp) => this.searchAndUpdate = comp}
      filterBy={(table) => !table.enabled}
      bsSize="large"
      labelKey="name"
      onSearch={this.handleQuery}
      options={this.state.tables}
      placeholder="search for pins to add..."
      maxHeight={500}
      maxResults={10}
      minLength={2}
      onChange={this.handleSelect}
      renderMenuItemChildren={this.renderChildren}
      emptyLabel='No matching tables found, try updating first'
           />;
  }
}

export default connect()(SearchAndAddForm);
