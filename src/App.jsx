import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from './containers/Register';
import Login from './containers/Login';
import Main from './containers/Main';

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/register' component={Register}></Route>
          <Route path='/login' component={Login}></Route>
          <Route component={Main}></Route>
        </Switch>
      </div>
    );
  }
}
