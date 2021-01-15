import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button
} from 'antd-mobile';
import HeaderSelector from '../../components/HeaderSelector';
import { updateUser } from '../../redux/actions';

class DashenInfo extends Component {
  state = {
    header: '',
    post: '',
    info: ''
  }

  setHeader = (header) => {
    this.setState({header});
  }

  handleChange = (type, value) => {
    this.setState({
      [type]: value
    });
  }

  save = () => {
    this.props.updateUser(this.state);
  }

  render() {
    const { header } = this.props.user;
    if (header){
      return <Redirect to='/dashen'></Redirect>
    }else {
      // console.log(this.props.user);
    }
    return (
      <div>
        <NavBar>大神信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}></HeaderSelector>
        <InputItem type='text' placeholder='请输入求职岗位' onChange={ val => this.handleChange('post', val)}>求职岗位:</InputItem>
        <TextareaItem title='个人介绍:' rows={3} onChange={ val => this.handleChange('info', val) }/>
        <Button type='primary' onClick={ this.save }>保&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  { updateUser }
)(DashenInfo);