import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import getColorByPokemonType from '../utils/getColorByPokemonType'
import { POKEMON_TYPE_SVG } from '../utils/constants'

export default function TypeIcon({ types, size }) {
  const isSmall = size === 'small'
  const wh = isSmall ? 20 : 40
  if (!types) return null
  return (
    <View
      style={{
        ...styles.container,
        justifyContent: isSmall ? 'flex-start' : 'space-between',
      }}
    >
      {types.map((type, index) => {
        const Icon = POKEMON_TYPE_SVG[type.type.name]
        return (
          <View key={index} style={styles.typeContainer}>
            <View style={{ backgroundColor: getColorByPokemonType(type.type.name), ...styles.iconContainer }}>
              <Icon style={styles.logo} width={wh} height={wh} />
            </View>
            {!isSmall && (
              <Text style={{ ...styles.name, color: getColorByPokemonType(type.type.name) }}>{type.type.name}</Text>
            )}
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  typeContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  name: {
    textTransform: 'capitalize',
  },
})
