import getColorByPokemonType from '../utils/getColorByPokemonType'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import TypeIcon from './TypeIcon'

export default function PokemonCard({ pokemon }) {
  const navigation = useNavigation()

  const goToPokemon = () => navigation.navigate('Pokemon', { id: pokemon.id })

  return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <LinearGradient
            colors={[getColorByPokemonType(pokemon.type), 'rgba(255,255,255,1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.bgStyles}
          >
            <Text style={styles.number}>#{`${pokemon.id}`.padStart(4, 0)}</Text>
            <Text style={styles.name}>{pokemon.name}</Text>
            <Image source={{ uri: pokemon.image }} style={styles.image} />
            <View style={styles.iconsContainer}>
              <TypeIcon types={pokemon.types} size='small' />
            </View>
          </LinearGradient>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 130,
  },
  spacing: {
    flex: 1,
    padding: 5,
  },
  bgStyles: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
  },
  number: {
    position: 'absolute',
    right: 10,
    top: 5,
    color: '#444',
    fontSize: 11,
  },
  name: {
    fontWeight: 'bold',
    paddingTop: 10,
    fontSize: 15,
    color: '#fff',
    textTransform: 'capitalize',
  },
  image: {
    position: 'absolute',
    bottom: -15,
    right: -10,
    width: 110,
    height: 110,
    zIndex: 10,
  },
  iconsContainer: {
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
})
