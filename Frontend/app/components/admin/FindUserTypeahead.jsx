import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Typeahead, MenuItem } from 'react-bootstrap-typeahead';


class FindUserTypeahead extends React.Component {
  constructor(props) {
    super(props);

    this.renderChildren = this.renderChildren.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(user){
    this.FindUserTypeahead.getInstance().clear();
    this.props.setUser(user);
  }

  renderChildren(user, props, index){
    return (
      <div onClick={() => this.handleClick(user)}>
        <h4>{user.lastName}, {user.firstName} <br/><small>{user.email}</small></h4>
      </div>
    );
  }



  render(){
    return <Typeahead
      ref={(component) => this.FindUserTypeahead = component}
      bsSize="large"
      labelKey={(user) => `${user.firstName} ${user.lastName} ${user.email}`}
      options={this.props.users}
      placeholder="search for user..."
      maxHeight={500}
      maxResults={10}
      minLength={1}
      renderMenuItemChildren={this.renderChildren}
      emptyLabel='No matching users found'
           />;
  }
}

export default FindUserTypeahead;
