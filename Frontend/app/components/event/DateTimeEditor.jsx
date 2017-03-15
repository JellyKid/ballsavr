import React from 'react';
import moment from 'moment';
import InputMoment from 'input-moment';
import "../../style/input-moment.css";
import { Modal } from 'react-bootstrap';

class DateTimeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time : moment(this.props.time)
    };
  }

  render(){
    const formatted = this.state.time.format("MMM Do YYYY, h:mmA");
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>{formatted}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputMoment
            moment={this.state.time}
            onChange={(m) => this.setState({time: m})}
            onSave={() => this.props.save(this.state.time.toDate())}/>
        </Modal.Body>
      </Modal>
    );
  }
}

export default DateTimeEditor;
