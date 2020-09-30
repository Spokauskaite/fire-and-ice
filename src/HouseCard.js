import React from 'react'

export default ({ house }) => {
  console.log(house)
  const { name } = house

  
  console.log(name)

  return(
    <div className="houseCard box">
      <h1>{name}</h1>
   </div>
 
    
  )
}
