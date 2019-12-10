import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as StyleUtils from './src/utils/style-utils';

import Reducers from './src/data/reducers/index';
import Routes from './routes';

export default class App extends Component {
    render() {
        return (
          <Provider store={ createStore(Reducers, {}, applyMiddleware(thunk)) }>
            <StatusBar backgroundColor={ StyleUtils.primary_color }/>
            <Routes/>
          </Provider>
        );
    }
}
