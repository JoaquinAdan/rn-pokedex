import { View, Text, StyleSheet, TextInput, Button, Keyboard } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginForm() {
  return (
    <SafeAreaView>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput style={styles.input} placeholder='Usuario' autoCapitalize='none' />
      <TextInput style={styles.input} placeholder='Contraseña' autoCapitalize='none' secureTextEntry={true} />
      <Button
        style={styles.button}
        title='Entrar'
        onPress={() => {
          Keyboard.dismiss()
          console.log('Enrando...')
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    width: '50%',
  },
})
