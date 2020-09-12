import React, { useState, useContext } from 'react'
import { Card, Input, Icon, Button } from 'semantic-ui-react'

import storeApi from '.././utils/storeApi'

export default function CardInput({ listId, type }) {
  const { addMoreCard, addMoreList } = useContext(storeApi)
  const [title, setTitle] = useState('')
  const [open, setOpen] = useState(false)

  const handleOnChange = (e) => {
    setTitle(e.target.value)
  }
  const handleBtnConfirm = () => {
    if (type === 'card') {
      addMoreCard(title, listId)
      setTitle('')
      setOpen(false)
    } else {
      addMoreList(title)
      setTitle('')
      setOpen(false)
    }
  }

  // const handleBlur = () => {
  //   setTitle('')
  //   setOpen(false)
  // }

  return (
    <div>
      {open ? (
        <div className="editable-input">
          <Card.Header>
            <div className="input-box">
              <Input
                autoFocus
                placeholder={
                  type === 'card'
                    ? 'Enter a title of this card..'
                    : 'Enter list title...'
                }
                onChange={handleOnChange}
                value={title}
                // onBlur={() => setOpen(!open)}
              />
            </div>
            <div>
              <Button.Group>
                <Button negative onClick={() => setOpen(!open)}>
                  Cancel
                </Button>
                <Button.Or />
                <Button positive onClick={handleBtnConfirm}>
                  {type === 'card' ? 'Add Card' : 'Add List'}
                </Button>
              </Button.Group>
            </div>
          </Card.Header>
        </div>
      ) : (
        <div className="editable-input new-list">
          <Card.Header onClick={() => setOpen(!open)} className="card-edit">
            {type === 'card' ? (
              <div>
                {' '}
                <Icon name="add" />
                Add a Card
              </div>
            ) : (
              <Button inverted color="brown">
                Add another List
              </Button>
            )}
          </Card.Header>
        </div>
      )}
    </div>
  )
}
