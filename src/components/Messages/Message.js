import React from 'react'
import moment from 'moment'
import { Comment, Image, Icon, Reveal } from 'semantic-ui-react'

const isOwnMessage = (message, user) => {
  return message.name.user.id === user.uid ? 'message__self' : 'message__other'
}

const isImage = (message) => {
  return (
    message.name.hasOwnProperty('image') &&
    !message.name.hasOwnProperty('content')
  )
}

const timeFromNow = (timestamp) => moment(timestamp).fromNow()

const myMessage = (user, message, channel) => {
  if (user.uid === message.name.user.id) return true
}

const Message = ({ message, user, delMess, channel }) => (
  <Comment>
    <Comment.Avatar src={message.name.user.avatar} />
    <Comment.Content className={isOwnMessage(message, user)}>
      <Comment.Author as="a">{message.name.user.name}</Comment.Author>
      <Comment.Metadata>{timeFromNow(message.name.timestamp)}</Comment.Metadata>
      {isImage(message) ? (
        <Comment.Group>
          <Image src={message.name.image} className="message__image" />
          {myMessage(user, message, channel) ? (
            <Reveal animated="small fade" className="divSet">
              <Reveal.Content visible>
                <Icon
                  name="trash"
                  inverted
                  className="message__icon"
                  link
                  color="grey"
                  onClick={() =>
                    delMess(
                      channel ? channel.id : '',
                      message ? message.id : ''
                    )
                  }
                />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Icon
                  name="trash"
                  inverted
                  className="message__icon"
                  link
                  color="black"
                  onClick={() =>
                    delMess(
                      channel ? channel.id : '',
                      message ? message.id : ''
                    )
                  }
                />
              </Reveal.Content>
            </Reveal>
          ) : (
            ''
          )}
        </Comment.Group>
      ) : (
        <div>
          <Comment.Text>{message.name.content}</Comment.Text>
          {myMessage(user, message) ? (
            <Reveal animated="small fade" className="divSet">
              <Reveal.Content visible>
                <Icon
                  name="trash"
                  inverted
                  className="message__icon2"
                  link
                  color="grey"
                  onClick={() =>
                    delMess(
                      channel ? channel.id : '',
                      message ? message.id : ''
                    )
                  }
                />
              </Reveal.Content>
              <Reveal.Content>
                <Icon
                  name="trash"
                  inverted
                  className="message__icon2"
                  link
                  color="black"
                  onClick={() =>
                    delMess(
                      channel ? channel.id : '',
                      message ? message.id : ''
                    )
                  }
                />
              </Reveal.Content>
            </Reveal>
          ) : (
            ''
          )}
        </div>
      )}
    </Comment.Content>
  </Comment>
)

export default Message
