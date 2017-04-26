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
        <DropdownButton id='user-filter-dropdown' title={this.props.currentFilter}>
          <MenuItem
            eventKey='all'
            id='user-filter-by-all'
            onSelect={(key,e) => this.handleSelect('All', key, true, e)}
            disabled={this.props.currentFilter === 'All'}>
            All
          </MenuItem>
          <MenuItem
            eventKey='admin'
            id='user-filter-by-admin'
            onSelect={(key,e) => this.handleSelect('Admin', key, true, e)}
            disabled={this.props.currentFilter === 'Admin'}>
            Admin
          </MenuItem>
          <MenuItem
            eventKey='disabled'
            id='user-filter-by-disabled'
            onSelect={(key,e) => this.handleSelect('Disabled', 'enabled', false, e)}
            disabled={this.props.currentFilter === 'Disabled'}>
            Disabled / Unapproved
          </MenuItem>
          <MenuItem
            eventKey='not.activated'
            id='user-filter-by-not-activated'
            onSelect={(key,e) => this.handleSelect('Not Activated', 'meta.activated', false, e)}
            disabled={this.props.currentFilter === 'Not Activated'}>
            Not Activated
          </MenuItem>
          <MenuItem
            eventKey='scoreKeeper'
            id='user-filter-by-scoreKeeper'
            onSelect={(key,e) => this.handleSelect('Score Keeper', 'scoreKeeper', true, e)}
            disabled={this.props.currentFilter === 'Score Keeper'}>
            Score Keeper
          </MenuItem>
        </DropdownButton>
      </ButtonGroup>
    );
  }
}
