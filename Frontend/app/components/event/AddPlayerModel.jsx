import React from 'react';
import { Modal, ButtonToolbar, Button, ControlLabel } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

class AddPlayerModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlayer: [],
      selectedGroup: [],
      addDisabled: true
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
  }

  handleAdd() {
    this.playerRef.getInstance().clear();
    this.groupRef.getInstance().clear();
    if(this.state.selectedPlayer.length === 0 || this.state.selectedGroup.length === 0){
      return this.props.hideMe();
    }

    return this.props.addPlayer(this.state.selectedPlayer[0], this.state.selectedGroup[0]);
  }

  handlePlayerChange(player) {
    let disabled = player.length === 0 ? true
      : this.state.selectedGroup.length === 0 ? true
      : false;
    this.setState({
      selectedPlayer: player,
      addDisabled: disabled
    });
  }

  handleGroupChange(group) {
    //have to do this goofy stuff because a new group returns an array of objects
    //I'm converting the array of objects to the array of strings
    let selectedGroup = group.length > 0 && group[0].label ? [group[0].label.toUpperCase()] : group;
    let disabled = group.length === 0 ? true
      : this.state.selectedPlayer.length === 0 ? true
      : false;
    this.setState({
      selectedGroup: selectedGroup,
      addDisabled: disabled
    });
  }

  render(){

    const playerInput = (
      <Typeahead
        ref={(component) => this.playerRef = component}
        autoFocus
        clearButton
        labelKey={(player) => `${player.firstName} ${player.lastName}`}
        options={this.props.playerOptions}
        placeholder="Search players..."
        maxHeight={500}
        maxResults={5}
        selected={this.state.selectedPlayer}
        onChange={this.handlePlayerChange}
        emptyLabel='Player not found...'
      />
    );

    const groupInput = (
      <Typeahead
        ref={(component) => this.groupRef = component}
        allowNew
        newSelectionPrefix="New Group:"
        clearButton
        options={this.props.groupOptions || []}
        placeholder="Add player to group..."
        maxHeight={500}
        maxResults={5}
        selected={this.state.selectedGroup}
        onChange={this.handleGroupChange}
        emptyLabel='Type to create new group...'
      />
    );

    const popup = (
      <Modal show={this.props.visible} onHide={this.props.hideMe}>
        <Modal.Body>
          <ControlLabel>Player</ControlLabel>
          {playerInput}
          <ControlLabel>Group</ControlLabel>
          {groupInput}
        </Modal.Body>
        <Modal.Footer>
          <ButtonToolbar>
            <Button
              disabled={this.state.addDisabled}
              onClick={this.handleAdd}>
              Add
            </Button>
            <Button onClick={this.props.hideMe}>Cancel</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );

    return popup;
  }
}

export default AddPlayerModel;
