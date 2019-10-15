/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {loginReducer, nameReducer, emailReducer, avatarReducer} from './store/reducers/auth';
import messageReducer from './store/reducers/chat';
import locationReducer from './store/reducers/location';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const reducer = combineReducers({loginReducer, messageReducer, nameReducer, emailReducer, avatarReducer, locationReducer})
const store = createStoreWithMiddleware(reducer);
import MainNavigator from './navigator/mainNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
