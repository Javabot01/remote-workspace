import React from 'react'
import { Card } from 'semantic-ui-react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import CardHeader from './CardHeader'
import CardInput from './CardInput'
import OneCard from './OneCard'

export default function Cards({ list, index }) {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Card color="grey" className="card" {...provided.dragHandleProps}>
            <Card.Content>
              <CardHeader title={list.title} listId={list.id} />
            </Card.Content>

            <Droppable droppableId={list.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="card-out"
                >
                  {list.cards.map((card) => (
                    <OneCard key={card.id} card={card} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Card.Content extra className="input-div">
              <CardInput listId={list.id} type="card" />
            </Card.Content>
          </Card>
        </div>
      )}
    </Draggable>
  )
}
