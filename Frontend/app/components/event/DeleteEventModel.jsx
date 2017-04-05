import React from 'react';
import { Modal, ButtonToolbar, Button, ControlLabel } from 'react-bootstrap';
import handleFetch from '../../helpers/handleFetch';

class DeleteEventModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteDisabled: false
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(){
    this.setState({deleteDisabled: true});
    handleFetch('DELETE', `/api/event/${this.props.event_id}`)
      .then(() => this.props.done(true))
      .catch((err) => {
        this.props.done(true);
        console.log(err);
      });
  }


  render(){

    const popup = (
      <Modal show={this.props.visible} backdrop={false}>
        <Modal.Body>
          Are you sure you want to delete this event?
        </Modal.Body>
        <Modal.Footer>
          <ButtonToolbar>
            <Button
              bsStyle="danger"
              disabled={this.state.deleteDisabled}
              onClick={this.handleDelete}>
              Confirm Delete
            </Button>
            <Button onClick={this.props.hideMe}>Cancel</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );

    return popup;
  }
}

export default DeleteEventModel;
