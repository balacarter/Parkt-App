import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from "firebase";
import AuthNavigator from './Navigation/AuthNavigator';

import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import parkingReducer from './store/reducers/parkingReducer';

const rootReducer = combineReducers({
  parking: parkingReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

var firebaseConfig = {
  apiKey: "AIzaSyBNksQNvDSAkzhCkl_7RJDHIGm0gC0fay8",
  authDomain: "parkt-ba251.firebaseapp.com",
  databaseURL: "https://parkt-ba251-default-rtdb.firebaseio.com",
  projectId: "parkt-ba251",
  storageBucket: "parkt-ba251.appspot.com",
  messagingSenderId: "971583400741",
  appId: "1:971583400741:web:098f338a498eb8076f08cc"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

export default function App() {
  return (
    <Provider store={store} >
      <AuthNavigator />
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
