import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import IndexComponent from './home/IndexComponent'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <IndexComponent />
      </Provider>
    );
  }
}

export default App;
