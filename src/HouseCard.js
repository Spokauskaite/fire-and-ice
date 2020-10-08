import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


export default ({ house }) => {
  const { name } = house

  return(
    <div className="houseCard box">
      <DragDropContext >
          <Droppable droppableId={name} >
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h1>{name}</h1>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      
   </div>
  )
}
