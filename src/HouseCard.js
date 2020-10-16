import React from 'react'
import { useDrop } from 'react-dnd';

export default ({ accept , lastDroppedItem, onDrop}) => {

  const name = accept
  const [collectedProps, drop] = useDrop({
    accept: accept ,
    drop: onDrop
  });

  return(
    <div ref={drop} className="houseCard box">
      {lastDroppedItem ? 
        <div>
          <div>
            <h2>{name}</h2>
          </div>
         <div className = "row-col">
           <h3>{lastDroppedItem}</h3>
         </div>
        </div> :
        <h1>{name}</h1> 
      }
    </div>
  )
}


