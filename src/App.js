import React, { useState, useEffect } from 'react'
import CharacterCard from './CharacterCard'
import HouseCard from './HouseCard'
import './App.css'

const CHARACTER_API = 'https://anapioficeandfire.com/api/characters/'
// const HOUSE_API = "https://anapioficeandfire.com/api/houses/"

const fetchCharacter = async (id) => {
  const response = await fetch(`${CHARACTER_API}${id}`)

  return await response.json()
}

const fetchHouse = async (api) => {
  const response = await fetch(`${api}`)

  return await response.json()
}

const mixHouses = (houses) => {
  let mixedItems = []
  const maxHouses = houses.length

  for (let i = 0; i < maxHouses; i++){
    const nItems = houses.length
    const houseId = Math.floor(Math.random() * nItems)

    mixedItems.push(houses[houseId])
    houses.pop(houseId)
  }

  return mixedItems
}

const App = () => {
  // const maxHouses = 444
  // const nCards = 5
  const maxChars = 2138
  const [characters, setCharacters] = useState([])
  const [houses, setHouses] = useState([])

  useEffect(() => {
    const fetchCharacters = async () => {
      let fetchedCharacters = []
      let fetchedHouses = []
      let mainAllegiances = null
      let i = 0

      while (i < 5) {
        const id = Math.floor(Math.random() * maxChars) + 1
        const fetchedCharacter = await fetchCharacter(id)

        mainAllegiances = fetchedCharacter.allegiances

        if (mainAllegiances.length ===0){
          continue
        } else {
          mainAllegiances = mainAllegiances[0]
        }
        const fetchedHouse = await fetchHouse(mainAllegiances)

        fetchedCharacters.push( fetchedCharacter)
        fetchedHouses.push(fetchedHouse)

        i++
      }

      let mixedHouses = mixHouses(fetchedHouses)

      setCharacters(fetchedCharacters)
      setHouses(mixedHouses)
    }

    fetchCharacters()
  }, [])

  return (
    <>
    <div className="row">
      <div className="column">
        {characters.length === 0 && (
          <div style={{ margin: '20px' }}>Please wait, fetching characters...</div>
        )}
      {characters.map((character, index) => <CharacterCard key={`char-card-${index}`} character={character} />)}
      </div>
      <div className="column right">
        {houses.length === 0 && (
          <div style={{ margin: '20px' }}>Please wait, fetching houses...</div>
        )}
        {houses.map((house, index) => <HouseCard key={`house-card-${index}`} house={house} />)}
      </div>
    </div>
    </>
  )
}

export default App
