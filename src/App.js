import React, { useState, useEffect, useCallback } from 'react'
import CharacterCard from './CharacterCard'
import HouseCard from './HouseCard'
import './App.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import smiley from "./smiley_emoji.jpg"

const CHARACTER_API = 'https://anapioficeandfire.com/api/characters/'

const fetchCharacter = async (id) => {
  const response = await fetch(`${CHARACTER_API}${id}`)

  return await response.json()
}

const fetchHouse = async (api) => {
  const response = await fetch(api)

  return await response.json()
}

const mixHouses = (houses) => {
  let mixedItems = []
  const maxHouses = houses.length

  for (let i = 0; i < maxHouses; i++){
    const nItems = houses.length
    const houseId = Math.floor(Math.random() * nItems)
    mixedItems.push(houses[houseId])
    houses.splice(houseId, 1)
  }

  return mixedItems
}

const App = () => {
  const maxChars = 2138
  const nChars = 5
  const [characters, setCharacters] = useState([])
  const [houses, setHouses] = useState([])
  const [droppedCharacters, setDroppedCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      let fetchedCharacters = []
      let fetchedHouses = []
      let mainAllegiances = null
      let i = 0

      while (i < nChars) {
        const id = Math.floor(Math.random() * maxChars) + 1
        const fetchedCharacter = await fetchCharacter(id)

        mainAllegiances = fetchedCharacter.allegiances
        if (mainAllegiances.length === 0){
          continue
        } else {
          mainAllegiances = mainAllegiances[0]
        }
        const fetchedHouse = await fetchHouse(mainAllegiances)
        const houseName = fetchedHouse.name
        fetchedCharacter.allegiances = houseName
        fetchedCharacters.push(fetchedCharacter)
        fetchedHouses.push(houseName)
        i++
      }

      let mixedHouses = mixHouses(fetchedHouses)
      let updatedHouses = []
      for (let index = 0; index < mixedHouses.length; index++) {
        const houseName = mixedHouses[index]
        const updatedHouse = {
          accepts:houseName
        }
        updatedHouses.push(updatedHouse)
      }

      let updatedCharacters = []
      for (let index = 0; index < fetchedCharacters.length; index++) {
        const character = fetchedCharacters[index]
        const {name} = character
        const {allegiances} = character
        const updatedCharacter = {
          name:name,
          type: allegiances
        }
        updatedCharacters.push(updatedCharacter)
      }

      setCharacters(updatedCharacters)
      setHouses(updatedHouses)
    }

    fetchCharacters()

  }, [])

  const isDropped = (name) => {
    return droppedCharacters.indexOf(name) > -1;
  }

  const handleDrop = useCallback((index, item) => {
    const { id } = item
    setDroppedCharacters(update(droppedCharacters, id ? { $push: [id] } : { $push: [] }))
    setHouses(update(houses, {
      [index]: {
        lastDroppedItem: {
          $set: item.id
        }
      }
    }));
  }, [droppedCharacters, houses]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="row">
          <div className="column">
            {characters === null ? 
              <div style={{ margin: '20px' }}>Please wait, fetching characters...</div> :
               droppedCharacters.length === nChars ?
                <div>
                  <div className = "text">
                    <img src={smiley} height = "200" ></img>
                  </div>
               </div>
               :
               characters.map(({name,type}, index) => <CharacterCard 
                                                        key={`char-card-${index}`} 
                                                        name = {name} 
                                                        type = {type}
                                                        isDropped={isDropped(name)}
                                                      />)
            
            }
          </div>
          <div className="column right">
            {houses === null ?
              <div style={{ margin: '20px' }}>Please wait, fetching houses...</div> :
              houses.map(({accepts, lastDroppedItem}, index) => <HouseCard 
                                                                  accept={accepts} 
                                                                  lastDroppedItem={lastDroppedItem}
                                                                  onDrop={(item) => handleDrop(index, item)}
                                                                  key={`house-card-${index}`} 
                                                                />)
            }
          </div>
        </div>
			</DndProvider>
    </>
  )  
}

export default App



