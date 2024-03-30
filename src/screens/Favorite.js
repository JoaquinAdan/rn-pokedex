import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { getPokemonsFavorites } from '../api/favorite'
import useAuth from '../hooks/useAuth'
import { useFocusEffect } from '@react-navigation/native'

export default function Favorite() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      ;(async () => {
        const response = await getPokemonsFavorites(user?.id)
        setFavorites(response)
      })()
    }, [user])
  )

  return (
    <>
      {user ? (
        <View>
          <Text>Favorite</Text>
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
