import React, { useState, useContext } from 'react'
import { Card, Input, Icon } from 'semantic-ui-react'
import storeApi from '.././utils/storeApi'

export default function CardHeader({ title, listId }) {
  const [open, setOpen] = useState(false)
  const [newTitle, setNewTitle] = useState(title)
  const { updateListTitle } = useContext(storeApi)

  const handleOnChange = (e) => {
    setNewTitle(e.target.value)
  }

  const handleOnBlur = () => {
    updateListTitle(newTitle, listId)
    setOpen(false)
  }

  return (
    <div className="todo-header">
      {open ? (
        <div className="editable-title">
          <Card.Header>
            <Input
              onChange={handleOnChange}
              autoFocus
              placeholder="Search..."
              value={newTitle}
              onBlur={handleOnBlur}
            />
          </Card.Header>
        </div>
      ) : (
        <div className="editable-title">
          <Card.Header onClick={() => setOpen(!open)} className="card-title">
            {title}
          </Card.Header>
          <Icon name="ellipsis horizontal" />
        </div>
      )}
    </div>
  )
}
