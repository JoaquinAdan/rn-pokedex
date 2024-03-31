import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AccountNavigation from './AccountNavigation'
import PokedexNavigation from './PokedexNavigation'
import FavoriteNavigation from './FavoriteNavigation'

const Tab = createBottomTabNavigator()

export default function Navigation() {
  return (
    <Tab.Navigator initialRouteName='PokedexBottom'>
      <Tab.Screen
        name='FavoriteBottom'
        component={FavoriteNavigation}
        options={{
          headerShown: false,
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => <Icon name='heart' color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name='PokedexBottom'
        component={PokedexNavigation}
        options={{ tabBarLabel: '', tabBarIcon: () => renderPokeball(), headerShown: false }}
      />
      <Tab.Screen
        name='AccountBottom'
        component={AccountNavigation}
        options={{
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
