import React from 'react'

export default ({ house }) => {
  const { name } = house

  return(
    <div className="houseCard box">
      <h1>{name}</h1>
   </div>
  )
}
