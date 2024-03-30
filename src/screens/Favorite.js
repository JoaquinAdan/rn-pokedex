import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { getPokemonsFavorites } from '../api/favorite'
import { getPokemonDetailsApi } from '../api/pokemon'
import PokemonList from '../components/PokemonList'
import useAuth from '../hooks/useAuth'

export default function Favorite() {
  const [favorites, setFavorites] = useState([])
  const navigation = useNavigation()
  const { user } = useAuth()

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
      {Boolean(favorites.length === 0 && user) ? (
        <View style={styles.adviseContainer}>
          <Text style={styles.adviseMessage}>Aún no tienes ningún pokemon guardado 😋</Text>
        </View>
      ) : user ? (
        <PokemonList pokemons={favorites} isNext={null} />
      ) : (
        <View style={styles.adviseContainer}>
          <Text style={styles.adviseMessage}>
            Para poder agregar tus pokemons a favoritos o verlos en esta vista, por favor ingresa a mi cuenta para poder ver
            tus pokemons favoritos
          </Text>
          <View style={styles.button}>
            <Button color='#ef4035' title='Ir a mi cuenta' onPress={() => navigation.navigate('AccountBottom')} />
          </View>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  adviseMessage: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
  },
  adviseContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 100,
    marginHorizontal: 20,
  },
})
