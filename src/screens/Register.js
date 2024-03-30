import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import RegisterForm from '../components/Auth/RegisterForm'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Register() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <RegisterForm />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
})
