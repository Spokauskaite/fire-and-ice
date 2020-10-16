import React from 'react'
import { useDrag } from 'react-dnd';

export default ({ name, type, isDropped }) => {

  const [collectedProps, drag] = useDrag({
    item: { 
      id: name, 
      type : type
    }
});

  return(
    <div ref={drag}>
      {isDropped ? 
        <div className="NOcharCard box">
          <h1>{name}</h1>
        </div> :
        <div className="charCard box">
          <h1>{name}</h1>
        </div>
      }
    </div>
  )
}
