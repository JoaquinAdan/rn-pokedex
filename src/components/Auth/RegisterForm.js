import { View, Text, StyleSheet, TextInput, Button, Keyboard, ToastAndroid, TouchableOpacity } from 'react-native'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import { createUser } from '../../api/register'

export default function RegisterForm() {
  const navigation = useNavigation()
  const goAccount = () => navigation.navigate('Account')
  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: Yup.object({
      username: Yup.string().required('El usuario es obligatorio'),
      email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
      firstname: Yup.string().required('El nombre es obligatorio'),
      lastname: Yup.string().required('El apellido es obligatorio'),
      password: Yup.string().required('La contraseña es obligatoria'),
    }),
    onSubmit: async (values) => {
      const response = await createUser(values)
      if (response === 'El usuario ya existe') {
        formik.setFieldError('username', response)
        ToastAndroid.show('El usuario ya existe', ToastAndroid.SHORT)
        return
      }
      ToastAndroid.show('El usuario se ha creado correctamente', ToastAndroid.SHORT)
      goAccount()
    },
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrate</Text>
      <View style={styles.linkContainer}>
        <Text>Si ya tienes una cuenta</Text>
        <TouchableOpacity onPress={goAccount}>
          <Text style={styles.link}> ingresa</Text>
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
        placeholder='Email'
        autoCapitalize='none'
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Nombre'
        autoCapitalize='none'
        value={formik.values.firstname}
        onChangeText={(text) => formik.setFieldValue('firstname', text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Apellido'
        autoCapitalize='none'
        value={formik.values.lastname}
        onChangeText={(text) => formik.setFieldValue('lastname', text)}
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
          title='Registrar'
          onPress={() => {
            Keyboard.dismiss()
            formik.handleSubmit()
          }}
        />
      </View>
      <View style={styles.errorContainer}>
        {formik.errors.username && <Text style={styles.error}>{formik.errors.username}</Text>}
        {formik.errors.email && <Text style={styles.error}>{formik.errors.email}</Text>}
        {formik.errors.firstname && <Text style={styles.error}>{formik.errors.firstname}</Text>}
        {formik.errors.lastname && <Text style={styles.error}>{formik.errors.lastname}</Text>}
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
    width: '100%',
  },
  title: {
    marginTop: 40,
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
    height: 120,
  },
  error: {
    textAlign: 'center',
    color: '#f00',
    marginTop: 10,
  },
})
