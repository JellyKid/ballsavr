import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox, ButtonToolbar, Button, Col, Well, Grid } from 'react-bootstrap';
import handleFetch from '../../helpers/handleFetch';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { setUsers } from '../../redux/actions';


class AddEventForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      event :{
        title: "",
        subtitle: "",
        type: "Tournament - 4,2,0",
        description: "",
        localimg: "",
        extlink: "",
        start: new Date(),
        end: new Date(),
        rounds: []
      },
      submitDisabled : false
    };
    this.handleFetch = handleFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(e){
    return this.setState(update(
      this.state,
      {
        event: { [e.target.name] : {$set:e.target.value} }
      }
    ));
  }


  handleSave(e){
    e.preventDefault();
    this.setState({submitDisabled: true});
    this.handleFetch('POST','/api/admin/user', e.target).
      then(
        (res) => {
          if(res.status === 200){
            this.handleFetch('GET','/api/admin/users',null,setUsers);
            this.props.closeEditor();
          }
        }
      );
  }


  render(){


    const form = (
      <Form horizontal onSubmit={this.handleSave}>
        <FormGroup>
          <Col sm={2}>
            <ControlLabel>Title</ControlLabel>
          </Col>
          <Col sm={10}>
            <FormControl type="text" name="title" value={this.state.event.title} onChange={this.handleChange}/>
          </Col>
          <Col sm={2}>
            <ControlLabel>Subtitle</ControlLabel>
          </Col>
          <Col sm={10}>
            <FormControl type="text" name="subtitle" value={this.state.event.subtitle} onChange={this.handleChange}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={3} lg={2}>
            <ControlLabel>Title</ControlLabel>
          </Col>
          <Col sm={3} lg={4}>
            <FormControl type="text" name="title" value={this.state.event.title} onChange={this.handleChange}/>
          </Col>
          <Col sm={3} lg={2}>
            <ControlLabel>Subtitle</ControlLabel>
          </Col>
          <Col sm={3} lg={4}>
            <FormControl type="text" name="subtitle" value={this.state.event.subtitle} onChange={this.handleChange}/>
          </Col>
        </FormGroup>

      </Form>
    );

    return (
      <Grid>
        <Col sm={8} smOffset={2}>
          <Well>
            <h2>Create New Event</h2>
            <hr />
            {form}
          </Well>
        </Col>
      </Grid>
    );
  }
}

export default connect()(AddEventForm);
