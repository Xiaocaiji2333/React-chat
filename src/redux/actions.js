import io from 'socket.io-client';

import { 
  reqRegister, 
  reqLogin, 
  reqUpdateUser, 
  reqUser, 
  reqUserList,
  reqChatMsgList,
  reqMsg 
} from '../api';
import { 
  AUTH_SUCCESS, 
  ERROR_MSG, 
  RECEIVE_USER, 
  RECEIVE_USER_LIST, 
  RESET_USER ,
  RECEIVE_MSG,
  RECEIVE_MSG_LIST,
  MSG_READ
} from './action-types';

export const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user });
export const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg });
export const receiveUser = (user) => ({ type: RECEIVE_USER, data: user });
export const resetUser = (msg) => ({ type: RESET_USER, data: msg });
export const receiveUserList = (userlist) => ({ type: RECEIVE_USER_LIST, data: userlist });
export const receiveMsgList = ({ users, chatMsgs, userid }) => ({ type: RECEIVE_MSG_LIST, data: { users, chatMsgs, userid } });
export const receiveMsg = ({ chatMsg, userid }) => ({ type: RECEIVE_MSG, data: { chatMsg, userid } });
export const msgRead = ({ from, to, count }) => ({type: MSG_READ, data: { from, to, count }})

export const register = (user) => {
  const { username, password, password2, type } = user;
  if (!username){
    return errorMsg('用户名不能为空！');
  }else if (password !== password2){
    return errorMsg('密码不一致！');
  }
  return async (dispatch, getState) => {
    const response = await reqRegister({ username, password, type });
    const result = response.data;
    if (result.code === 0){
      getMsgList(dispatch, result.data._id);
      dispatch(authSuccess(result.data));
    }else{
      dispatch(errorMsg(result.msg));
    }
  }
}

export const login = (user) => {
  const { username, password } = user;
  if (!username){
    return errorMsg('用户名不能为空！');
  }else if (!password){
    return errorMsg('密码不能为空！');
  }
  return async (dispatch, getState) => {
    const response = await reqLogin({ username, password });
    const result = response.data;
    if (result.code === 0){
      getMsgList(dispatch, result.data._id);
      dispatch(authSuccess(result.data));
    }else{
      dispatch(errorMsg(result.msg));
    }
  }
}

export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user);
    const result = response.data;
    if (result.code === 0){
      dispatch(receiveUser(result.data));
    }else {
      dispatch(resetUser(result.msg));
    }
  }
}

export const getUser = () => {
  return async dispatch => {
    const response = await reqUser();
    const result = response.data;
    if (result.code === 0){
      getMsgList(dispatch, result.data._id);
      dispatch(receiveUser(result.data));
    }else {
      dispatch(resetUser(result.msg));
    }
  }
}

export const getUserList = (type) => {
  return async dispatch => {
    const response = await reqUserList(type);
    const result = response.data;
    if (result.code === 0){
      dispatch(receiveUserList(result.data));
    }
  }
}

export const sendMsg = ({ from, to, content }) => {
  return dispatch => {
    console.log({ from, to, content });
    io.socket.emit('sendMsg', { from, to, content });
  }
}

export const readMsg = (from, to) => {
  return async dispatch => {
    const response = await reqMsg(from);
    const result = response.data;
    if(result.code === 0) {
      const count = result.data;
      dispatch(msgRead({ from, to, count }))
    }
  }
}

function initIO(dispatch, userid){
  // console.log(userid);
  if (!io.socket){
    io.socket = io('ws://localhost:3000');
  }
  io.socket.on('receiveMsg', function (chatMsg) { 
    console.log('浏览器端接收到消息:', chatMsg); 
    if (userid === chatMsg.from || userid === chatMsg.to){
      dispatch(receiveMsg({ chatMsg, userid }));
    }
  })
}

async function getMsgList(dispatch, userid){
  initIO(dispatch, userid);
  const response = await reqChatMsgList();
  const result = response.data;
  if (result.code === 0){
    const { users, chatMsgs } = result.data;
    dispatch(receiveMsgList({ users, chatMsgs, userid }));
  }
}