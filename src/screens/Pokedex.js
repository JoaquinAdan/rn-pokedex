import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getPokemonDetailsByUrlApi, getPokemonsApi } from '../api/pokemon'
import PokemonList from '../components/PokemonList'

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([])
  const [nextUrl, setNextUrl] = useState(null)

  useEffect(() => {
    ;(async () => {
      await loadPokemons()
    })()
  }, [])

  const loadPokemons = async () => {
    try {
      const response = await getPokemonsApi(nextUrl)
      const pokemonsArray = []
      for await (const pokemon of response.results) {
        const pokemonDetail = await getPokemonDetailsByUrlApi(pokemon.url)
        pokemonsArray.push({
          id: pokemonDetail.id,
          name: pokemonDetail.name,
          order: pokemonDetail.order,
          type: pokemonDetail.types[0].type.name,
          types: pokemonDetail.types,
          image: pokemonDetail.sprites.other['official-artwork'].front_default,
        })
      }
      setPokemons([...pokemons, ...pokemonsArray])
      setNextUrl(response.next)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView>
      <PokemonList pokemons={pokemons} loadPokemons={loadPokemons} isNext={Boolean(pokemons) && nextUrl} />
    </SafeAreaView>
  )
}
