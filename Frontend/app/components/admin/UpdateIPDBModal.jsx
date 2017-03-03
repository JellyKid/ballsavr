import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import handleGet from '../../helpers/handleGet';

class UpdateIPDBModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateText: "Update",
      buttonsDisable: false
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleGet = handleGet.bind(this);
  }

  handleUpdate(){
    this.setState({
      updateText: "Updating...",
      buttonsDisable: true
    });
    this.handleGet(
      '/api/admin/syncIPDB'
    ).then(
      () => {
        this.setState({
          updateText: "Update",
          buttonsDisable: false
        });
        this.props.closeAction();
      }
    );
  }


  render(){
    console.log(this.props);
    const modal = (
      <Modal show={this.props.show} onHide={this.props.closeAction}>
        <Modal.Header closeButton>
          <Modal.Title>Update from IPDB.org</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>What does this do?</h4>
          <p>This will sync the internal database with the one from IPDB.org. You should do this the first time that you launch the app or if new pins have come out. You can check out the list at</p>
          <p><a href="http://www.ipdb.org/lists.cgi?anonymously=true&list=games&submit=No+Thanks+-+Let+me+access+anonymously">www.ipdb.org</a></p>

          <hr />

          <h4>Abuse</h4>
          <p>Please do not abuse this feature by updating constantly as IPDB may take it away.</p>
          <h4>Legal</h4>
          <p>Not a lawyer but may want to put some legal mumbo jumbo in here.</p>

        </Modal.Body>
        <Modal.Footer>
          <ButtonToolbar>
            <Button onClick={this.handleUpdate} bsStyle="primary" disabled={this.state.buttonsDisable}>{this.state.updateText}</Button>
            <Button onClick={this.props.closeAction}>Cancel</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
    return (modal);
  }
}

export default connect()(UpdateIPDBModal);
