import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Account from '../screens/Account'
import Register from '../screens/Register'

const Stack = createNativeStackNavigator()

export default function AccountNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Account' component={Account} options={{ headerTransparent: true, headerTitle: '' }} />
      <Stack.Screen
        name='Register'
        component={Register}
        options={{ headerTitleAlign: 'center', headerTransparent: true, headerTitle: '' }}
      />
    </Stack.Navigator>
  )
}
