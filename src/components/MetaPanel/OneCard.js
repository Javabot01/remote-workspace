import React from 'react'
import { Card } from 'semantic-ui-react'
import { Draggable } from 'react-beautiful-dnd'

export default function OneCard({ card, index }) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Card
            color="red"
            description={card.title}
            className="card-content"
            index={index}
          />
        </div>
      )}
    </Draggable>
  )
}
