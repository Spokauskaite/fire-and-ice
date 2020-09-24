import React , {useState ,useEffect} from 'react';
import CharacterCard from './CharacterCard'
import './App.css';

function App() {
  
  const maxChars = 2138;
  const maxHouses = 444;
  const nCards = 5;
  const characterAPI = "https://anapioficeandfire.com/api/characters/"
  const bookAPI = "https://anapioficeandfire.com/api/books/"

  const [character1, setCharacter1] = useState([]);
  const [character2, setCharacter2] = useState([]);
  const [character3, setCharacter3] = useState([]);
  const [character4, setCharacter4] = useState([]);
  const [character5, setCharacter5] = useState([]);

  useEffect(() => {
    
    var randInt =  Math.floor(Math.random() * maxChars) + 1 ;
    var CharAPI = characterAPI+randInt

    fetch(CharAPI)
      .then(res => res.json())
      .then(
        (result) => {
          setCharacter1(result);
        }
      )

     randInt =  Math.floor(Math.random() * maxChars) + 1 ;
     CharAPI = characterAPI+randInt

      fetch(CharAPI)
      .then(res => res.json())
      .then(
        (result) => {
          setCharacter2(result);
        }
      )
    randInt =  Math.floor(Math.random() * maxChars) + 1 ;
    CharAPI = characterAPI+randInt
      fetch(CharAPI)
      .then(res => res.json())
      .then(
        (result) => {
          setCharacter3(result);
        }
      )
      randInt =  Math.floor(Math.random() * maxChars) + 1 ;
      CharAPI = characterAPI+randInt
      fetch(CharAPI)
      .then(res => res.json())
      .then(
        (result) => {
          setCharacter4(result);
        }
      )
      randInt =  Math.floor(Math.random() * maxChars) + 1 ;
      CharAPI = characterAPI+randInt
      fetch(CharAPI)
      .then(res => res.json())
      .then(
        (result) => {
          setCharacter5(result);
        }
      )
  }, [])



  return (
    <div>
        <CharacterCard character={character1}/>
        <CharacterCard character={character2}/>
        <CharacterCard character={character3}/>
        <CharacterCard character={character4}/>
        <CharacterCard character={character5}/>
    </div>
  );

}

export default App;

