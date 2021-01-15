import React, { Component } from 'react';
import { 
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Logo from '../../components/Logo';
import { register } from '../../redux/actions';
const ListItem = List.Item;

class Register extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
    type: '',
  }

  register = () => {
    // console.log(this.state);
    this.props.register(this.state);
  }

  handleChange = (type, val) => {
    this.setState({
      [type]:val}//取type的值用中括号
    );
  }

  toLogin = () => {
    this.props.history.replace('/login');
  }

  render() {
    const { type } = this.state;
    const { msg, redirectTo } = this.props.user;
    // console.log(this.props.user);
    if (redirectTo){
      return (<Redirect to={ redirectTo }/>)
    }
    return (
      <div> 
        <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
        <Logo />
        {/* 左右留白 */}
        <WingBlank>
          <List>
            { msg? <div className='error-msg'>{msg}</div> : null}
            {/* 上下留白 */}
            <WhiteSpace/>
            <InputItem tlype='text' onChange={val => this.handleChange('username', val)} placeholder='请输入用户名'>用户名:</InputItem>
            <WhiteSpace/>
            <InputItem type='password' onChange={val => this.handleChange('password', val)} placeholder='请输入密码'>密&nbsp;&nbsp;&nbsp;码:</InputItem>
            <WhiteSpace/>
            <InputItem type='password' onChange={val => this.handleChange('password2', val)} placeholder='请再次输入密码'>确认密码:</InputItem>
            <ListItem>
              <span>用户类型:</span>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={type === 'dashen'} onChange={() => this.handleChange('type', 'dashen')}>大神</Radio>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={type === 'laoban'} onChange={() => this.handleChange('type', 'laoban')}>老板</Radio>
            </ListItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.register}>注册</Button>
            <WhiteSpace/>
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),//state是reducers.js中的user对象{user: {}}，state.user就是initUser
  {register}//actions中的register函数
)(Register);