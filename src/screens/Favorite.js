import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { getPokemonsFavorites } from '../api/favorite'
import { getPokemonDetailsApi, getPokemonDetailsByUrlApi } from '../api/pokemon'
import useAuth from '../hooks/useAuth'
import { useFocusEffect } from '@react-navigation/native'
import PokemonList from '../components/PokemonList'

export default function Favorite() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      if (!user) return
      ;(async () => {
        const response = await getPokemonsFavorites(user?.id)
        const pokemonsArray = []
        for await (id of response) {
          const pokemonDetail = await getPokemonDetailsApi(id)
          pokemonsArray.push({
            id: pokemonDetail.id,
            name: pokemonDetail.name,
            order: pokemonDetail.order,
            type: pokemonDetail.types[0].type.name,
            types: pokemonDetail.types,
            image: pokemonDetail.sprites.other['official-artwork'].front_default,
          })
        }
        setFavorites(pokemonsArray)
      })()
    }, [user])
  )

  return (
    <>
      {user ? (
        <View>
          <Text>Favorite</Text>
          <PokemonList pokemons={favorites}/>
          <Text>{JSON.stringify(favorites)}</Text>
        </View>
      ) : (
        <View style={styles.adviseContainer}>
          <Text style={styles.adviseMessage}>
            Para poder agregar tus pokemons a favoritos o verlos en esta vista, por favor ingresa a tu cuenta para poder ver
            tus pokemons favoritos
          </Text>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  adviseMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  adviseContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 100,
    marginHorizontal: 20,
  },
})
