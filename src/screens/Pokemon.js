import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getPokemonDetailsApi } from '../api/pokemon'
import Header from '../components/pokemon/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import TypeIcon from '../components/TypeIcon'
import Stats from '../components/pokemon/Stats'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function Pokemon({ route: { params }, navigation }) {
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => null,
      headerLeft: () => <Icon name='arrow-left' color='#444' size={20} onPress={() => navigation.goBack()} />,
    })
  }, [navigation, params])

  useEffect(() => {
    ;(async () => {
      try {
        const response = await getPokemonDetailsApi(params.id)
        setPokemon(response)
      } catch (error) {
        navigation.goBack()
      }
    })()
  }, [params])

  if (!pokemon) return null
  return (
    <SafeAreaView>
      <ScrollView>
        <Header
          id={pokemon.id}
          name={pokemon.name}
          order={pokemon.order}
          type={pokemon.types[0].type.name}
          image={pokemon.sprites.other['official-artwork'].front_default}
        />
        <View style={styles.iconsContainer}>
          <TypeIcon types={pokemon.types} size='medium' />
        </View>
        <Stats stats={pokemon.stats} />
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  iconsContainer: {
    position: 'absolute',
    top: 280,
    left: 20,
  },
})
