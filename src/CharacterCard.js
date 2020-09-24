import React from 'react'

export default ({ character }) => {
  const { name } = character

  console.log(name)

  return(
    <div className="charCard">
      <h1>{name}</h1>
    </div>
  )
}
