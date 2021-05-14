import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../Screens/Dashboard.js'
import Settings from '../Screens/Settings.js'

const Tab = createBottomTabNavigator()

export default function SignInStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
            <Tab.Screen name="Map" component={Dashboard} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    </NavigationContainer>
  )
}