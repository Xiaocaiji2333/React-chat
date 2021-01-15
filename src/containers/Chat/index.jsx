import React, { Component } from 'react'; 
import { NavBar, List, InputItem, Icon, Grid } from 'antd-mobile'; 
import { connect } from 'react-redux';
// import QueueAnim from 'rc-queue-anim';
import { sendMsg, readMsg } from '../../redux/actions';
const Item = List.Item; 

class Chat extends Component { 
  state = { 
    content: '',
    isShow: false
  }

  componentWillMount () { 
    this.emojis = [
      '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', 
      '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩',
      '😘' ,'😗', '😚', '😋', '😛', '😜', '🤪', '🤑', 
      '🤗', '🤫', '🤨', '😐', '😶', '😏', '😬', '🤒', 
      '🤕', '🤢', '🥳', '😎', '🤓', '🧐', '😕', '😟', 
      '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', 
      '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', 
      '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', 
      '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', 
      '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', 
      '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🤞']
    this.emojis = this.emojis.map(emoji => ({ text: emoji }));
    //console.log(this.emojis) 
    // window.addEventListener('touchmove', function (event) {
    //   event.preventDefault();
    // }, { passive: false });
  }

  componentDidMount() {
    // 初始显示列表 
    console.log(document.body.scrollHeight);
    window.scrollTo(0, document.body.scrollHeight); 
  }

  componentDidUpdate () {
    // window.addEventListener('touchmove', function (event) {
    //   event.preventDefault();
    // }, { passive: false });
    // this.divNode.addEventListener('touchmove', function (event) {
    //   event.preventDefault();
    // }, false);
    // 更新显示列表 
    console.log(document.body.scrollHeight);
    window.scrollTo(0, document.body.scrollHeight); 
  }

  componentWillUnmount () { // 在退出之前
    // 发请求更新消息的未读状态
    const from = this.props.match.params.userid;
    const to = this.props.user._id;
    this.props.readMsg(from, to);
  }

  handleSend = () => { 
    const from = this.props.user._id; 
    const to = this.props.match.params.userid; 
    const content = this.state.content.trim(); 
    if (content){
      this.props.sendMsg({ from, to, content }); 
    }
    this.setState({ content: '' });
  }

  // 切换表情列表的显示 
  toggleShow = () => { 
    const isShow = !this.state.isShow; 
    this.setState({ isShow }); 
    if(isShow) { 
      // 异步手动派发 resize 事件,解决表情列表显示的 bug
      setTimeout(() => { 
        window.dispatchEvent(new Event('resize')); 
      }, 0) 
    } 
  }

  render() {
    const { user, chat } = this.props; 
    const { chatMsgs, users } = chat; 
    const targetId = this.props.match.params.userid; 
    if(!users[targetId]) { return null }
    const meId = user._id;
    const chatId = [targetId, meId].sort().join('_'); 
    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId); 
    const targetIcon = users[targetId].header ? 
      require(`../../assets/images/${ users[targetId].header }.png`).default : 
      require(`../../assets/images/头像1.png`).default;            
    return ( 
    <div id='chat-page'> 
      <NavBar className='stick-top' 
        icon={ <Icon type='left'/> } 
        onLeftClick={ 
          () => this.props.history.goBack()
        }> 
        { users[targetId].username } 
      </NavBar> 
      <List style={ { marginBottom:50, marginTop:50 } }> 
        {/* <QueueAnim type='alpha' delay={ 300 }> */}
          { 
            msgs.map(msg => {
              if(msg.from === targetId) { 
                return ( <Item key={ msg._id } thumb={ targetIcon } > { msg.content } </Item> ) 
              }else { 
                return ( <Item key={ msg._id } className='chat-me' extra='我' > { msg.content } </Item> ) 
              } 
            }) 
          } 
        {/* </QueueAnim> */}
      </List> 
      <div className='am-tab-bar' ref={c => this.divNode = c}> 
        <InputItem placeholder="请输入" 
          value={ this.state.content } 
          onChange={ val => this.setState({ content: val }) } 
          onFocus={ () => this.setState({ isShow: false }) }
          extra={ 
            <span>
              <span onClick={ this.toggleShow }>😂</span>
              <span onClick={ this.handleSend }>发送</span>
            </span>
          } /> 
        { 
          this.state.isShow ? ( 
            <Grid 
            ref={c => this.gridNode = c}
            data={ this.emojis } 
            columnNum={ 8 } 
            carouselMaxRow={ 4 } 
            isCarousel={ true } 
            needActive={ false }
            onClick={ (emoji) => { this.setState({ content: this.state.content + emoji.text }) } }
            style={ { touchAction: false } } 
            /> 
          ) : null 
        }
      </div> 
    </div> ) 
  }
}

  export default connect( 
  state => ({ user: state.user, chat: state.chat }), 
  { sendMsg, readMsg }
  )(Chat);