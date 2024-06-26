import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getPokemonDetailsApi } from '../api/pokemon'
import Header from '../components/pokemon/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import TypeIcon from '../components/TypeIcon'
import Stats from '../components/pokemon/Stats'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Favorite from '../components/pokemon/Favorite'
import useAuth from '../hooks/useAuth'

export default function Pokemon({ route: { params }, navigation }) {
  const [pokemon, setPokemon] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useAuth()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => user && <Favorite id={pokemon?.id} />,
      headerLeft: () => <Icon name='arrow-left' color='#444' size={20} onPress={() => navigation.goBack()} />,
    })
  }, [navigation, params, user, pokemon])

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const response = await getPokemonDetailsApi(params.id)
        setPokemon(response)
      } catch (error) {
        navigation.goBack()
      } finally {
        setIsLoading(false)
      }
    })()
  }, [params])

  return (
    <View>
      <ScrollView>
        {!pokemon || isLoading ? (
          <ActivityIndicator size='large' color='#aeaeae' style={styles.spinner} />
        ) : (
          <>
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
          </>
        )}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  iconsContainer: {
    position: 'absolute',
    top: 300,
    left: 20,
  },
  spinner: {
    marginTop: 20,
  },
})
