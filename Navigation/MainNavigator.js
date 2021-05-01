import React, { useState, useEffect, createContext } from 'react'

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Loading from '../auth/Loading';
import Login from '../auth/Login';
import SignUp from '../auth/SignUp';

import Map from '../Screens/Map';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "Loading" component={Loading}/>
            <Stack.Screen name = "Login" component={Login}/>
            <Stack.Screen name = "SignUp" component={SignUp}/>
        </Stack.Navigator>
    );
};

function BottomTabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Map" component={Map} />
        </Tab.Navigator>
    )
}

export { AuthStack, BottomTabNavigator };