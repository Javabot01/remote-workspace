import React from 'react'
import {
  Segment,
  Accordion,
  Header,
  Icon,
  Image,
  List,
  Button,
  Modal,
} from 'semantic-ui-react'
import Main from './Main'

class MetaPanel extends React.Component {
  state = {
    channel: this.props.currentChannel,
    privateChannel: this.props.isPrivateChannel,
    activeIndex: 0,
    open: false,
  }

  setActiveIndex = (event, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }
  setOpen = (val) => {
    return this.setState({
      open: !this.state.open,
    })
  }

  formatCount = (num) => (num > 1 || num === 0 ? `${num} posts` : `${num} post`)

  displayTopPosters = (posts) =>
    Object.entries(posts)
      .sort((a, b) => b[1] - a[1])
      .map(([key, val], i) => (
        <List.Item key={i}>
          <Image avatar src={val.avatar} />
          <List.Content>
            <List.Header as="a">{key}</List.Header>
            <List.Description>{this.formatCount(val.count)}</List.Description>
          </List.Content>
        </List.Item>
      ))
      .slice(0, 5)

  render() {
    const { activeIndex, privateChannel, channel, open } = this.state
    const { userPosts } = this.props

    if (privateChannel) return null

    return (
      <Segment loading={!channel}>
        <Header as="h3" attached="top">
          About # {channel && channel.name}
        </Header>
        <Accordion styled attached="true">
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.setActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="info" />
            Channel Details
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            {channel && channel.details}
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.setActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="user circle" />
            Top Posters
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <List>{userPosts && this.displayTopPosters(userPosts)}</List>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={this.setActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="pencil alternate" />
            Created By
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <Header as="h3">
              <Image circular src={channel && channel.createdBy.avatar} />
              {channel && channel.createdBy.name}
            </Header>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 3}
            index={3}
            onClick={this.setActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="folder open" />
            Projects
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 3}>
            <Modal
              // size="fullscreen"
              className="modal"
              dimmer="blurring"
              open={open}
              onClose={() => this.setOpen(open)}
              onOpen={() => this.setOpen(open)}
              trigger={<Button>All Projects</Button>}
            >
              <Modal.Header>Project Management</Modal.Header>
              <Modal.Content scrolling>
                {/* <Image
                    size="medium"
                    src="https://react.semantic-ui.com/images/wireframe/image.png"
                    wrapped
                  /> */}
                <Main />
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={() => this.setOpen(open)} primary>
                  Proceed <Icon name="chevron right" />
                </Button>
              </Modal.Actions>
            </Modal>
          </Accordion.Content>
        </Accordion>
      </Segment>
    )
  }
}

export default MetaPanel
