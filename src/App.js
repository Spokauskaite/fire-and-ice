import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
//import CharacterCard from './CharacterCard'
//import HouseCard from './HouseCard'
import './App.css'

const CHARACTER_API = 'https://anapioficeandfire.com/api/characters/'
// const HOUSE_API = "https://anapioficeandfire.com/api/houses/"

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

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const App = () => {
  // const maxHouses = 444
  // const nCards = 5
  const maxChars = 2138
  const [characters, setCharacters] = useState([])
  const [houses, setHouses] = useState([])

  const onDragEnd = result => {
    console.log(result)
    const { source, destination } = result;

    console.log('atejo')
    console.log(source.droppableId)
    console.log(destination.droppableId)

    // dropped outside the list
    if (!destination) {
      return
    }
  
    if (source.droppableId === destination.droppableId){
      const reorderedCharacters = reorder(
        characters,
        source.index,
        destination.index
      )
      setCharacters(reorderedCharacters)
    } else{
      // do something else
    }

  }

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

        if (mainAllegiances.length === 0){
          continue
        } else {
          mainAllegiances = mainAllegiances[0]
        }

        const fetchedHouse = await fetchHouse(mainAllegiances)

        fetchedCharacters.push(fetchedCharacter)
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
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row">
          <div className="column">
            {characters.length === 0 && (
              <div style={{ margin: '20px' }}>Please wait, fetching characters...</div>
            )}
            <Droppable droppableId="charactersDroppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {characters.map((character, index) => (
                    <Draggable 
                      key={`char-card-${index}`}
                      draggableId={`char-card-${index}`} 
                      index={index} 
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="charCard box">
                            <h1>{character.name}</h1>
                          </div>
                        </div>
                      )}
                    </Draggable> 
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="column right">
            {houses.length === 0 && (
              <div style={{ margin: '20px' }}>Please wait, fetching houses...</div>
            )}
            {houses.map((house, index) => (
              <Droppable droppableId={`house-card-${index}`} key={`house-card-${index}`} index={index}  >
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className="houseCard box">
                      <h1>{house.name}</h1>
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </DragDropContext>
    </>
  )
  
}

export default App



