import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import todoReducer from './TodoReducer';

/**
 * Configuration for redux-persist, using AsyncStorage as the persistence backend.
 * The `key` identifies the root of the persisted state in storage.
 */
const config = {
  key: 'root',
  storage: AsyncStorage,
};

/**
 * The root reducer, combining all slice reducers and wrapping them with
 * redux-persist so that state is automatically saved to and rehydrated from
 * AsyncStorage across app restarts.
 */
const reducer = persistReducer(
  config,
  combineReducers({
    todos: todoReducer,
  })
);
export default reducer;
