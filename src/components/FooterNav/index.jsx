import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
const TabBarItem = TabBar.Item;

class FooterNav extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired
  }

  render() {
    const navList = this.props.navList.filter(nav => !nav.hide);
    const path = this.props.location.pathname;
    return (
      <TabBar>
        {
          navList.map((nav, index) => 
            ( 
              <TabBarItem key={ nav.path } 
                  badge={ nav.path === '/message' ? this.props.unReadCount : 0 }
                  title={ nav.text } 
                  icon={ { uri: require(`./images/${nav.icon}.png`).default } } 
                  selectedIcon={ { uri: require(`./images/${nav.icon}-selected.png`).default } } 
                  selected={ path === nav.path } 
                  onPress={ () => { this.props.history.replace(nav.path) } } 
              /> 
            )
          )
        }
      </TabBar>
    );
  }
}

export default withRouter(FooterNav);//使一般组件拥有路由组件的属性(history, location, match)