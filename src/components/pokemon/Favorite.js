import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { addPokemonFavoriteApi, removePokemonFavoriteApi, isFavoritePokemonApi } from '../../api/favorite'
import useAuth from '../../hooks/useAuth'

export default function Favorite({ id }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { user } = useAuth()
  const toggleFavorite = async () => {
    if (await isFavoritePokemonApi(id, user.id)) {
      await removePokemonFavoriteApi(id, user.id)
      setIsFavorite(false)
      return
    }
    await addPokemonFavoriteApi(id, user.id)
    setIsFavorite(true)
  }

  useEffect(() => {
    ;(async () => {
      try {
        setIsFavorite(await isFavoritePokemonApi(id, user.id))
      } catch (error) {
        setIsFavorite(false)
      }
    })()
  }, [id])

  return (
    <>
      <Icon size={30} name='heart' color='#fafafa' solid={isFavorite} onPress={toggleFavorite} style={{ marginRight: 20 }} />
    </>
  )
}
