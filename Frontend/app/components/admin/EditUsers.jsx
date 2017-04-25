import React from 'react';
import { Grid, Col, ListGroup, ListGroupItem, PageHeader, Alert, Button, Well, Pager } from 'react-bootstrap';
import handleGet from '../../helpers/handleGet';
import { setUsers } from '../../redux/actions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import EditUserForm from './EditUserForm';
import FindUserTypeahead from './FindUserTypeahead';
import UserFilterButtons from './UserFilterButtons';
import objectPath from 'object-path';

class EditUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : null,
      maxUsersShown : 5,
      currentPage : 0,
      filter: {
        name: 'All',
        path: '',
        bool: true
      }
    };
    this.handleGet = handleGet.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.filterUsers = this.filterUsers.bind(this);
  }

  componentDidMount(){
    this.handleGet(
      '/api/admin/users',
      setUsers
    );
  }

  setFilter(name, path, bool){
    this.setState({
      filter: {
        name: name,
        path: path,
        bool: bool
      }
    });
  }

  filterUsers(user){
    if(this.state.filter.name === 'All'){
      return user;
    }    
    if(objectPath.get(user, this.state.filter.path) === this.state.filter.bool){
      return user;
    }
  }

  handlePrevious(){
    if(this.state.currentPage > 0){
      this.setState({currentPage: this.state.currentPage - 1});
    }
  }

  handleNext(){
    if(this.state.currentPage < Math.floor((this.props.users.length - 1) / this.state.maxUsersShown)){
      this.setState({currentPage: this.state.currentPage + 1});
    }
  }

  getStyle(user){
    if(!user.meta.activated){
      return "danger";
    }
    if(!user.enabled){
      return "warning";
    }
    if(user.admin){
      return "success";
    }
    return null;
  }


  render(){
    const users = this.props.users
      .filter(this.filterUsers)
      .slice(
        this.state.currentPage * this.state.maxUsersShown,
        this.state.currentPage * this.state.maxUsersShown + this.state.maxUsersShown
      )
      .map(
      (user) => {
        return (
          <ListGroupItem
            header={`${user.lastName}, ${user.firstName}`}
            key={user._id}
            bsStyle={this.getStyle(user)}
            onClick={() => this.setState({user: user})}>
            {user.initials} - {user.email}
          </ListGroupItem>
        );
      }
    );

    const pagerItems = [];
    if(this.state.currentPage != 0){
      pagerItems.push(<Pager.Item key="edituserspreviouspager" previous onSelect={this.handlePrevious}>&larr; Previous</Pager.Item>);
    }
    if(this.state.currentPage != Math.floor((this.props.users.length - 1) / this.state.maxUsersShown)){
      pagerItems.push(<Pager.Item key="editusersnextpager" next onSelect={this.handleNext}>Next &rarr;</Pager.Item>);
    }


    const userList = (
      <div>
        <ListGroup className="mBottom">
          {users}
        </ListGroup>
        <Pager>{pagerItems}</Pager>
      </div>
    );

    const inviteUserButton = (
        <Button
          onClick={() => browserHistory.push('/invite')}
          className="mBottom"
          block
          bsSize='large'
          bsStyle="primary">Invite New User</Button>
    );

    const finduser = (
      <FindUserTypeahead
        users={this.props.users}
        setUser={(user) => this.setState({user: user})}
      />
    );

    const edit = (
      <div className="mBottom">
        {inviteUserButton}
        <hr />
        <div className="mBottom">{finduser}</div>
        <UserFilterButtons currentFilter={this.state.filter.name} setFilter={this.setFilter} />
        {userList}
      </div>
    );

    const view = this.state.user ? ( //if user is selected show user edit page else show user list
      <Well>
        <EditUserForm user={this.state.user} closeEditor={() => this.setState({ user: null })}/>
      </Well>
    ) : edit;

    return(
      <Grid>
        <Col sm={8} smOffset={2}>
          <PageHeader>Edit Users</PageHeader>
          {view}
        </Col>
      </Grid>
    );
  }
}

function byName(a, b) {
  let nameA = a.lastName.toUpperCase() + a.firstName.toUpperCase();
  let nameB = b.lastName.toUpperCase() + b.firstName.toUpperCase();

  if (nameA < nameB){return -1;}
  if (nameA > nameB){return 1;}

  return 0;
}

function mapStateToProps(state) {
  return {
    users: state.users.sort(byName),
    admin: state.user.admin
  };
}

export default connect(mapStateToProps)(EditUsers);
