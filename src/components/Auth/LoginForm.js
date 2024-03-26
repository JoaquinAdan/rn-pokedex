import { View, Text, StyleSheet, TextInput, Button, Keyboard, ToastAndroid } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { user, userDetails } from '../../utils/userDB'
import useAuth from '../../hooks/useAuth'

export default function LoginForm() {
  const { login } = useAuth()
  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: Yup.object({
      username: Yup.string().required('El usuario es obligatorio'),
      password: Yup.string().required('La contraseña es obligatoria'),
    }),
    onSubmit: (values) => {
      const { username, password } = values
      if (username !== user.username || password !== user.password) {
        formik.setFieldError('username', 'Usuario o contraseña incorrectos')
        ToastAndroid.show('El usuario o contraseña son incorrectos', ToastAndroid.SHORT)
        return
      }
      login(userDetails)
    },
  })
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder='Usuario'
        autoCapitalize='none'
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue('username', text)}
      />
      <TextInput
        style={styles.input}
        autoCapitalize='none'
        secureTextEntry={true}
        placeholder='Contraseña'
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue('password', text)}
      />
      <View style={styles.button}>
        <Button
          color='#ef4035'
          title='Entrar'
          onPress={() => {
            Keyboard.dismiss()
            formik.handleSubmit()
          }}
        />
      </View>
      <View style={styles.errorContainer}>
        {/* {formik.errors.username && <Text style={styles.error}>{formik.errors.username}</Text>} */}
        {formik.errors.username && <Text style={styles.error}>{formik.errors.username}</Text>}
        {formik.errors.password && <Text style={styles.error}>{formik.errors.password}</Text>}
      </View>
    </SafeAreaView>
  )
}

function initialValues() {
  return {
    username: '',
    password: '',
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingBottom: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
  },
  errorContainer: {
    height: 50,
  },
  error: {
    textAlign: 'center',
    color: '#f00',
    marginTop: 10,
  },
})
