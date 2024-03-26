import { View, Text, StyleSheet, Button } from 'react-native'
import useAuth from '../../hooks/useAuth'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function UserData() {
  const { user, logout } = useAuth()
  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Bienvenido, {user.firstName} {user.lastName}</Text>
      </View>
      <View style={styles.button}>
        <Button color='#ef4035' title='Logout' onPress={logout} />
      </View>
      <Text>UserData</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  titleBlock: {
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
  },
})
