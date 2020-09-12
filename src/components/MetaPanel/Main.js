import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

import Cards from './Cards'
import store from '../utils/store'
import storeApi from '../utils/storeApi'
import CardInput from './CardInput'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

export default function Main() {
  const [data, setData] = useState(store)

  // const [backgroundUrl, setBackgroundUrl] = useState('')
  const addMoreCard = (title, listId) => {
    console.log(title, listId)

    const newCardId = uuid()
    const newCard = {
      id: newCardId,
      title,
    }

    const list = data.lists[listId]
    list.cards = [...list.cards, newCard]

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    }
    setData(newState)
  }

  const addMoreList = (title) => {
    const newListId = uuid()
    const newList = {
      id: newListId,
      title,
      cards: [],
    }
    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
    }
    setData(newState)
  }

  const updateListTitle = (title, listId) => {
    const list = data.lists[listId]
    list.title = title

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    }
    setData(newState)
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result
    console.log('destination', destination, 'source', source, draggableId)

    if (!destination) {
      return
    }
    if (type === 'list') {
      const newListIds = data.listIds
      newListIds.splice(source.index, 1)
      newListIds.splice(destination.index, 0, draggableId)
      return
    }

    const sourceList = data.lists[source.droppableId]
    const destinationList = data.lists[destination.droppableId]
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0]

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1)
      destinationList.cards.splice(destination.index, 0, draggingCard)
      const newSate = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList,
        },
      }
      setData(newSate)
    } else {
      sourceList.cards.splice(source.index, 1)
      destinationList.cards.splice(destination.index, 0, draggingCard)

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList,
        },
      }
      setData(newState)
    }
  }

  return (
    <storeApi.Provider value={{ addMoreCard, addMoreList, updateListTitle }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="app" type="list" direction="horizontal">
          {(provided) => (
            <div
              className="modal-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {data.listIds.map((listId, index) => {
                const list = data.lists[listId]
                return (
                  <Cards
                    list={list}
                    key={listId}
                    index={index}
                    className="main-card"
                  />
                )
              })}
              <CardInput />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </storeApi.Provider>
  )
}
