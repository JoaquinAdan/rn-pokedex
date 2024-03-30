import AsyncStorage from '@react-native-async-storage/async-storage'
import { USERS_STORAGE } from '../utils/constants'
import uuid from 'react-native-uuid'

export async function getUsers() {
  try {
    const users = await AsyncStorage.getItem(USERS_STORAGE)
    return users ? JSON.parse(users) : []
  } catch (error) {
    console.log(error)
  }
}

export async function removeAllUsers() {
  try {
    await AsyncStorage.removeItem(USERS_STORAGE)
  } catch (error) {
    console.log(error)
  }
}

export async function loginUser({ username, password }) {
  try {
    const users = await getUsers()
    const user = users.find((user) => user.username === username && user.password === password)
    if (!user) return 'Usuario o contraseña incorrecta'
    return user
  } catch (error) {
    console.log(error)
  }
}

export async function createUser({ username, password, firstname, lastname, email }) {
  try {
    const users = await getUsers()
    if (users.find((user) => user.username === username)) return 'El usuario ya existe'
    const user = {
      id: uuid.v4(),
      username,
      password,
      firstname,
      lastname,
      email,
    }
    users.push(user)
    await AsyncStorage.setItem(USERS_STORAGE, JSON.stringify(users))
  } catch (error) {
    console.log(error)
  }
}
