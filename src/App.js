import React , {useState ,useEffect} from 'react';
import CharacterCard from './CharacterCard'
import './App.css';

const CHARACTER_API = 'https://anapioficeandfire.com/api/characters/'
// const BOOK_API = 'https://anapioficeandfire.com/api/books/'

const fetchCharacter = async (id) => {
  const response = await fetch(`${CHARACTER_API}${id}`)

  return await response.json()
}

const App = () => {
  // const maxHouses = 444
  const maxChars = 2138
  const nCards = 5
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    const fetchCharacters = async () => {
      let fetchedCharacters = []

      for (let i = 0; i < nCards; i++) {
        const id = Math.floor(Math.random() * maxChars) + 1
        fetchedCharacters.push(await fetchCharacter(id))
      }

      setCharacters(fetchedCharacters)
    }

    fetchCharacters()
  }, [])

  return (
    <>
      {characters.length === 0 && (
        <div style={{ margin: '20px' }}>Please wait, fetching characters...</div>
      )}

      {characters.map((character, index) => <CharacterCard key={`char-card-${index}`} character={character} />)}
    </>
  )
}

export default App
