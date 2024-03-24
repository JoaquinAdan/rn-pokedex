import { View, Text, StyleSheet } from 'react-native'
import getColorByPokemonType from '../../utils/getColorByPokemonType'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import getStatColor from '../../utils/getStatColor'

export default function Stats({ stats, type }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Base Stats</Text>
      {stats.map((stat) => {
        const color = getStatColor(stat.base_stat)
        return (
          <View key={stat.stat.name} style={styles.block}>
            <Text style={styles.name}>{stat.stat.name}:</Text>
            <View style={styles.blockInfo}>
              <Text style={styles.number}>{stat.base_stat}</Text>
              <View style={styles.bgBar}>
                <LinearGradient
                  colors={[color, `${color}40`]}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 2 }}
                  style={{ ...styles.bar, width: `${stat.base_stat}%` }}
                />
              </View>
            </View>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    paddingBottom: 5,
  },
  block: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  name: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: '#444',
    width: '35%',
  },
  blockInfo: {
    width: '65%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    width: '12%',
    color: '#444',
    fontWeight: 'bold',
  },
  bgBar: {
    width: '88%',
    height: 6,
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  bar: {
    height: 6,
    borderRadius: 10,
  },
})
