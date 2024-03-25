import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AccountScreen from '../screens/Account'
import FavoriteScreen from '../screens/Favorite'
import Icon from 'react-native-vector-icons/FontAwesome5'
import PokedexNavigation from './PokedexNavigation'

const Tab = createBottomTabNavigator()

export default function Navigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Favorite'
        component={FavoriteScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Favoritos',
          headerTitle: 'Favoritos',
          tabBarIcon: ({ color, size }) => <Icon name='heart' color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name='PokedexBottom'
        component={PokedexNavigation}
        options={{ tabBarLabel: '', tabBarIcon: () => renderPokeball(), headerShown: false }}
      />
      <Tab.Screen
        name='Account'
        component={AccountScreen}
        options={{
          // headerTitleAlign: 'center',
          // headerTitle: 'Mi cuenta',
          headerShown: false,
          tabBarLabel: 'Mi cuenta',
          tabBarIcon: ({ color, size }) => <Icon name='user' color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  )
}

function renderPokeball() {
  return <Image source={require('../assets/pokeball.png')} style={{ width: 75, height: 75, top: -15 }} />
}
