import React from 'react';
import { Modal, ButtonToolbar, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import handleFetch from '../../helpers/handleFetch';
import NumberFormat from 'react-number-format';

class SubmitScoreModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitDisabled: true,
      score: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, value){
    let submitDisabled = value.length === 0 ? true : false;
    this.setState(
      {
        score: value,
        submitDisabled: submitDisabled
      }
    );
  }

  handleSubmit(e){
    e.preventDefault();

    let submitData = {
      group: this.props.data.player.group,
      player: this.props.data.player.user._id,
      round: this.props.data.round._id,
      table: this.props.data.table._id,
      value: this.state.score
    };
    this.setState({submitDisabled: true});
    handleFetch('POST','/api/score', submitData)
    .then(
      () => {
        this.setState({score: "", submitDisabled: false});
        this.props.finishSubmit();
      }
    )
    .catch(
      (err) => {
        console.log(err);
        this.setState({score: "", submitDisabled: false});
        this.props.finishSubmit();
      }
    );
  }
  render(){
    let header = this.props.data ? `${this.props.data.table.name} - ${this.props.data.round.name}` : "";
    let initials = this.props.data ? this.props.data.player.user.initials : "";

    const form = (
      <form onSubmit={this.handleSubmit}>
        <FormGroup>

          <NumberFormat
            className="score-input"
            value={this.state.score}
            displayType={"input"}
            thousandSeparator={true}
            onChange={this.handleChange}
            pattern="[0-9]*"
          />
        </FormGroup>
      </form>
    );

    const popup = (
      <Modal
        show={this.props.visible}
        backdrop={false}
      >
        <Modal.Header><h3>{header}</h3></Modal.Header>
        <Modal.Body className="d-flex score-modal-body">
          <div>
            <h3>{initials} <small>enter your score</small></h3>
            {form}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ButtonToolbar>
            <Button
              disabled={this.state.submitDisabled}
              bsStyle="success"
              onClick={this.handleSubmit}>
              Submit
            </Button>
            <Button onClick={() => {
              this.setState({score: ""});
              return this.props.hideMe();
            }}>Cancel</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );

    return popup;
  }
}

export default SubmitScoreModal;
