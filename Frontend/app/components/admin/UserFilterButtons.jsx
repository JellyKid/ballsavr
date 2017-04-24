import React from 'react';
import { ButtonGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap';

export default class UserFilterButtons extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(name, path, bool, e){
    e.preventDefault();
    this.props.setFilter(name, path ,bool);
  }
  render(){
    return (
      <ButtonGroup>
        <Button>Show </Button>
        <DropdownButton title={this.props.currentFilter}>
          <MenuItem
            eventKey='all'
            onSelect={(key,e) => this.handleSelect('All', key, true, e)}
            disabled={this.props.currentFilter === 'All'}>
            All
          </MenuItem>
          <MenuItem
            eventKey='admin'
            onSelect={(key,e) => this.handleSelect('Admin', key, true, e)}
            disabled={this.props.currentFilter === 'Admin'}>
            Admin
          </MenuItem>
          <MenuItem
            eventKey='disabled'
            onSelect={(key,e) => this.handleSelect('Disabled', 'enabled', false, e)}
            disabled={this.props.currentFilter === 'Disabled'}>
            Disabled
          </MenuItem>
          <MenuItem
            eventKey='not.activated'
            onSelect={(key,e) => this.handleSelect('Not-activated', 'meta.activate', false, e)}
            disabled={this.props.currentFilter === 'Not-activated'}>
            Not-activated
          </MenuItem>
        </DropdownButton>
      </ButtonGroup>
    );
  }
}
