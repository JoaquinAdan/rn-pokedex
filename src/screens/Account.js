import { View, StyleSheet } from 'react-native'
import React from 'react'
import LoginForm from '../components/Auth/LoginForm'
import UserData from '../components/Auth/UserData'
import useAuth from '../hooks/useAuth'

export default function Account() {
  const { user } = useAuth()

  return (
    <View style={[{ justifyContent: user ? 'flex-start' : 'center' }, styles.container]}>
      {user ? <UserData /> : <LoginForm />}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})
