import React, { Component } from 'react';
import { 
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../redux/actions';
import Logo from '../../components/Logo';

class Login extends Component {
  state = {
    username: '',
    password: '',
    type: '',
  }

  handleChange = (type, val) => {
    this.setState({
      [type]:val}//取type的值用中括号
    );
  }

  login = () => {
    // console.log(this.state);
    this.props.login(this.state);
  }

  toRegister = () => {
    this.props.history.replace('/register');
  }

  render() {
    const { msg, redirectTo } = this.props.user;
    console.log(redirectTo);
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
            <InputItem tlype='text' placeholder='请输入用户名' onChange={val => this.handleChange('username', val)}>用户名:</InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='请输入密码' onChange={val => this.handleChange('password', val)}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.login}>登录</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegister}>没有账户</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.user }),//state是reducers.js中的user对象{user: {}}，state.user就是initUser
  { login }//actions中的register函数
)(Login);