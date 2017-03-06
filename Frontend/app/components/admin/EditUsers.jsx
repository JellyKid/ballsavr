import React from 'react';
import { Grid, Col, ListGroup, ListGroupItem, PageHeader, Alert, Button } from 'react-bootstrap';
import handleGet from '../../helpers/handleGet';
import { setUsers } from '../../redux/actions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class EditUsers extends React.Component {
  constructor(props) {
    super(props);
    this.handleGet = handleGet.bind(this);
  }

  componentWillMount(){
    this.handleGet(
      '/api/admin/users',
      setUsers
    );
  }

  render(){


    const users = this.props.users.map(
      (user) => {
        return (
          <ListGroupItem header={user.firstName}>
            {user.lastName} - {user.initials}
          </ListGroupItem>
        );
      }
    );


    return(
      <Grid>
        <Col sm={8} smOffset={2}>
          <PageHeader>Tables</PageHeader>
          <ListGroup>
            {users}
          </ListGroup>
        </Col>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    admin: state.user.meta.admin
  };
}

export default connect(mapStateToProps)(EditUsers);
