import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserList from '../../components/UserList';
import { getUserList } from '../../redux/actions';

class Laoban extends Component {
  componentDidMount(){
    this.props.getUserList('dashen');
  }

  render() {
    const { userList } = this.props;
    return (
      <UserList userList={ userList }></UserList>
    );
  }
}

export default connect(
  state => ({ userList: state.userList }),
  { getUserList }
)(Laoban);