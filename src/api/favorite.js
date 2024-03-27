import AsyncStorage from '@react-native-async-storage/async-storage'
// import { includes, pull } from 'lodash'
import { FAVORITE_STORAGE } from '../utils/constants'

export async function getPokemonsFavorites() {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITE_STORAGE)
    if (!favorites) return []
    return JSON.parse(favorites)
  } catch (error) {
    throw error
  }
}

export async function addPokemonFavoriteApi(id) {
  try {
    const favorites = await getPokemonsFavorites()
    favorites.push(id)
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorites))
  } catch (error) {
    throw error
  }
}

export async function removePokemonFavoriteApi(id) {
  const favorites = await getPokemonsFavorites()
  // const newFavorites = pull(favorites, id)

  const newFavorites = favorites.filter((favorite) => favorite !== id)
  await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorites))
  // await AsyncStorage.removeItem(FAVORITE_STORAGE, JSON.stringify(newFavorites))
}

export async function isFavoritePokemonApi(id) {
  const favorites = await getPokemonsFavorites()
  // return includes(favorites, id)
  return favorites.includes(id)
}
