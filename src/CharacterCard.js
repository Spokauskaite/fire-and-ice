import React from 'react'

const CharacterCard = ({character}) => {
    console.log(character.name)
    const characterName = character.name
    return(
        <div className='charCard'>
            <h1>{characterName}</h1>
        </div>
    )
}

export default CharacterCard