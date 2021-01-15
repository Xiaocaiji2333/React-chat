import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import Cookies from 'js-cookie';
import LaobanInfo from '../LaobanInfo';
import DashenInfo from '../DashenInfo';
import Dashen from '../Dashen';
import Laoban from '../Laoban';
import Message from '../Message';
import Personal from '../Personal';
import NotFound from '../../components/NotFound';
import Chat from '../Chat';
import { getRedirectTo } from '../../utils';
import { getUser } from '../../redux/actions';
import FooterNav from '../../components/FooterNav';

class Main extends Component {

  navList = [ 
    { 
      path: '/laoban', // 路由路径 
      component: Laoban, 
      title: '大神列表', 
      icon: 'dashen', 
      text: '大神', 
    },{ 
      path: '/dashen', // 路由路径 
      component: Dashen, 
      title: '老板列表', 
      icon: 'laoban', 
      text: '老板', 
    },{ 
      path: '/message', // 路由路径 
      component: Message, 
      title: '消息列表', 
      icon: 'message', 
      text: '消息',
    },{ path: '/personal', // 路由路径 
    component: Personal, 
    title: '用户中心', 
    icon: 'personal', 
    text: '个人', 
  }
]

  componentDidMount() {
    const userid = Cookies.get('userid');
    const { user: { _id } } = this.props;
    if (userid && !_id) {
      // console.log('发送ajax请求获取user');
      this.props.getUser();
    }
  }

  render() {
    const userid = Cookies.get('userid');
    if (!userid) {
      return <Redirect to='/login'></Redirect>
    }
    const { user } = this.props;
    if (!user._id){
      return null;
    }else {
      let path = this.props.location.pathname;
      if (path === '/'){
        path = getRedirectTo(user.type, user.header);
        return <Redirect to={path}></Redirect>
      }
    }

    const { navList } = this;
    const path = this.props.location.pathname;
    const currentNav = navList.find(nav => nav.path === path);
    
    if (user.type === 'laoban') { 
      this.navList[1].hide = true; 
    } else { 
      this.navList[0].hide = true; 
    }

    return (
      <div>
        { currentNav? <NavBar>{ currentNav.title }</NavBar> : null }
        <Switch>
          {
            navList.map(nav => <Route key={ nav.path } path={ nav.path } component={ nav.component }></Route>)
          }
          <Route path='/laobaninfo' component={ LaobanInfo }></Route>
          <Route path='/dasheninfo' component={ DashenInfo }></Route>
          <Route path='/chat/:userid' component={ Chat }></Route>
          <Route component={ NotFound }></Route>
        </Switch>
        { currentNav? <FooterNav navList={ navList } unReadCount={ this.props.unReadCount }></FooterNav> : null }
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.user, unReadCount: state.chat.unReadCount }),
  { getUser }
)(Main);