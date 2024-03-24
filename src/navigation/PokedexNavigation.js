import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PokedexScreen from '../screens/Pokedex'
import PokemonScreen from '../screens/Pokemon'

const Stack = createNativeStackNavigator()

export default function PokedexNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Pokedex' component={PokedexScreen} options={{ headerTransparent: true, headerTitle: '' }} />
      <Stack.Screen
        name='Pokemon'
        component={PokemonScreen}
        options={{ headerTitleAlign: 'center', headerTransparent: true, headerTitle: '' }}
      />
    </Stack.Navigator>
  )
}
