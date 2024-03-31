import { StyleSheet, View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import getColorByPokemonType from '../../utils/getColorByPokemonType'
import TypeIcon from '../TypeIcon'

export default function Header({ id, name, order, type, image }) {
  return (
    <View>
      <LinearGradient
        colors={[getColorByPokemonType(type), 'rgba(255,255,255,1)']}
        start={{ x: 0.7, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.bg}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{name}</Text>
          </View>
          <Text style={styles.number}>#{`${id}`.padStart(4, 0)}</Text>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: 300,
    borderBottomEndRadius: 200,
    borderBottomRightRadius: 200,
    borderBottomLeftRadius: 200,
    transform: [{ scaleX: 2 }],
    marginBottom: 100,
  },
  content: {
    flex: 1,
    padding: 10,
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scaleX: 0.5 }],
  },
  header: {
    marginTop: 110,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#444',
    textTransform: 'capitalize',
  },
  number: {
    color: '#444',
    fontSize: 22,
    marginBottom: -30
  },
  image: {
    width: 280,
    height: 280,
    bottom: -20,
    zIndex: 10,
  },
  svg: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 100,
    height: 100,
  },
})
