import React, { Component } from 'react';
import {
  List,
  Grid
} from 'antd-mobile';

export default class HeaderSelector extends Component {
  constructor(props){
    super(props);
    this.headerList = [];
    for (let i = 0; i < 20; i++){
      //const image = require('../path/image.jpg').default;
      // import image from '../path/image.jpg';
      const img = require('../../assets/images/头像' + (i + 1) + '.png').default;
      this.headerList.push({
        icon: img,
        text: `头像${i+1}`
      })
    }
  }

  state = {
    icon: null
  }

  handleClick = ({icon, text}) => {//el中包含{icon,text}
    this.setState({icon});
    this.props.setHeader(text);
  }

  render() {
    const { icon } = this.state;
    const listHeader = icon? (<div>您选择的头像:<img src={ icon } alt='加载中'></img></div>) : '请选择头像';
    return (
      <List renderHeader={() => listHeader}>
        <Grid data={ this.headerList } columnNum={5} onClick={ el => this.handleClick(el) }></Grid>
      </List>
    );
  }
}
