import { View, Text, StyleSheet, Button } from 'react-native'
import useAuth from '../../hooks/useAuth'
import React from 'react'

export default function UserData() {
  const { user, logout } = useAuth()
  return (
    <View style={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>
          Bienvenido, {user.firstName} {user.lastName}
        </Text>
      </View>
      <View style={styles.dataContent}>
        <ItemMenu title='Nombre' text={`${user.firstName} ${user.lastName}`} />
        <ItemMenu title='Username' text={user.username} />
        <ItemMenu title='Email' text={user.email} />
        <ItemMenu title='Total Favoritos' text={`0 Pokemons`} />
      </View>
      <View style={styles.button}>
        <Button color='#ef4035' title='Desconectarse' onPress={logout} />
      </View>
    </View>
  )
}

function ItemMenu({ title, text }) {
  return (
    <View style={styles.itemMenu}>
      <Text style={styles.itemTitle}>{title}: </Text>
      <Text>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    width: '90%',
  },
  titleBlock: {
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  dataContent: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  itemMenu: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#cfcfcf',
  },
  itemTitle: {
    fontWeight: 'bold',
    paddingRight: 10,
    width: 120,
  },
})
