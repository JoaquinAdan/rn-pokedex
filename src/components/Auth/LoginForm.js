import { View, Text, StyleSheet, TextInput, Button, Keyboard, ToastAndroid, TouchableOpacity } from 'react-native'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../../hooks/useAuth'
import { getUsers, removeAllUsers } from '../../api/register'

export default function LoginForm() {
  const navigation = useNavigation()
  const { login } = useAuth()
  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: Yup.object({
      username: Yup.string().required('El usuario es obligatorio'),
      password: Yup.string().required('La contraseña es obligatoria'),
    }),
    onSubmit: async (values) => {
      const response = await login(values)
      if (response === 'Usuario o contraseña incorrecta') {
        formik.setFieldError('username', response)
        ToastAndroid.show(response, ToastAndroid.SHORT)
        return
      }
    },
  })

  const handlePress = () => navigation.navigate('Register')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <View style={styles.linkContainer}>
        <Text>Si aun no tiene una cuenta</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.link}> registrate</Text>
        </TouchableOpacity>
      </View>
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
        {formik.errors.username && <Text style={styles.error}>{formik.errors.username}</Text>}
        {formik.errors.password && <Text style={styles.error}>{formik.errors.password}</Text>}
      </View>
    </View>
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
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  link: {
    color: '#ef4035',
    textDecorationLine: 'underline',
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
