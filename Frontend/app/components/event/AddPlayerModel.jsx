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
    if(this.state.selectedPlayer.length === 0 || this.state.selectedGroup.length === 0){
      return this.props.hideMe();
    }
    return this.props.addPlayer(this.state.selectedPlayer[0], this.state.selectedGroup[0].label.toUpperCase());
  }

  handlePlayerChange(player) {
    this.setState({
      selectedPlayer: player,
      addDisabled: this.state.selectedGroup.length === 0
    });
  }

  handleGroupChange(group) {
    this.setState({
      selectedGroup: group,
      addDisabled: this.state.selectedPlayer.length === 0
    });
  }

  render(){

    const playerInput = (
      <Typeahead
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
