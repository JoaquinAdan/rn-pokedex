import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getPokemonsFavorites(userId) {
  if (!userId) return
  try {
    const favorites = await AsyncStorage.getItem(userId)
    return JSON.parse(favorites) || []
  } catch (error) {
    throw error
  }
}

export async function addPokemonFavoriteApi(id, userId) {
  if (!userId) return
  try {
    const favorites = await getPokemonsFavorites(userId)
    favorites.push(id)
    await AsyncStorage.setItem(userId, JSON.stringify(favorites))
  } catch (error) {
    throw error
  }
}

export async function removeAllPokemonFavoritesApi(userId) {
  if (!userId) return
  try {
    await AsyncStorage.removeItem(userId)
  } catch (error) {
    throw error
  }
}

export async function removePokemonFavoriteApi(id, userId) {
  if (!userId) return
  try {
    const favorites = await getPokemonsFavorites(userId)
    const newFavorites = favorites.filter((favorite) => favorite !== id)
    await AsyncStorage.setItem(userId, JSON.stringify(newFavorites))
  } catch (error) {
    throw error
  }
}

export async function isFavoritePokemonApi(id, userId) {
  if (!userId) return
  try {
    const favorites = await getPokemonsFavorites(userId)
    return favorites.includes(id)
  } catch (error) {
    throw error
  }
}
