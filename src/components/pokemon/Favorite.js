import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
  addPokemonFavoriteApi,
  removePokemonFavoriteApi,
  getPokemonsFavorites,
  isFavoritePokemonApi,
} from '../../api/favorite'

export default function Favorite({ id }) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = async () => {
    if (await isFavoritePokemonApi(id)) {
      await removePokemonFavoriteApi(id)
      setIsFavorite(false)
      return
    }
    await addPokemonFavoriteApi(id)
    setIsFavorite(true)
  }

  useEffect(() => {
    ;(async () => {
      setIsFavorite(await isFavoritePokemonApi(id))
    })()
  }, [id])

  return (
    <>
      <Icon size={30} name='heart' color='#fafafa' solid={isFavorite} onPress={toggleFavorite} style={{ marginRight: 20 }} />
    </>
  )
}
