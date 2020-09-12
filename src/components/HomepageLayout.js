import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'animate.css'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container
    text
    className="transparent animate__animated animate__bounce"
    style={{
      margin: `30px`,
      backgroundColor: `rgba(0, 0, 0, 0.75)`,
      opacity: 0.95,
      zIndex: `-1`,
      paddingBottom: `1rem`,
    }}
  >
    <Header
      as="h1"
      content="Remote Collaboration"
      className="animate__animated animate__fadeIn delay-5s animate__slower	3s animate__repeat-2"
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
        color: '#976ef7',
      }}
    />
    <Header
      as="h2"
      content="Do whatever you want when you want to."
      className="animate__animated animate__fadeIn delay-5s animate__slower	3s  animate__repeat-2"
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
        color: '#976ef7',
        fontStyle: 'oblique',
      }}
    />
    <Button
      size="huge"
      style={{
        backgroundColor: '#bea6f7',
      }}
      className="animate__animated animate__fadeIn delay-5s animate__slower	3s  animate__infinite	infinite"
    >
      <Link to="/register">Get Started</Link>
      <Icon name="right arrow" />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Media greaterThan="mobile">
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
          className="head-segment"
        >
          <Segment
            className="head-segment"
            inverted
            textAlign="center"
            style={{
              minHeight: 700,
              padding: '0em 0em',
              backgroundImage: `url(
                './bg.jpg'
              )`,
              backgroundRepeat: `no-repeat`,
              backgroundSize: `100%`,
              opacity: `1`,
            }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
              style={{
                paddingBottom: `10px`,
                paddingTop: `5px`,
                backgroundColor: `rgba(146, 108, 238, 0.8)`,
              }}
            >
              <Container>
                <Menu.Item as="a" active>
                  <span className="head-segment">Home</span>
                </Menu.Item>
                <Menu.Item as="a">
                  <span className="head-segment">Work</span>
                </Menu.Item>
                <Menu.Item as="a">
                  <span className="head-segment">Company</span>
                </Menu.Item>
                <Menu.Item as="a">
                  <span className="head-segment">Careers</span>
                </Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted={!fixed}>
                    <Link
                      to="/login"
                      style={{
                        color: '#2b2f77',
                      }}
                    >
                      Log in
                    </Link>
                  </Button>
                  <Button
                    as="a"
                    inverted={!fixed}
                    primary={fixed}
                    style={{ marginLeft: '0.5em' }}
                  >
                    <Link
                      to="/register"
                      style={{
                        color: '#2b2f77',
                      }}
                    >
                      Sign Up
                    </Link>
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Media as={Sidebar.Pushable} at="mobile">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as="a" active>
              Home
            </Menu.Item>
            <Menu.Item as="a">Work</Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            <Menu.Item as="a">Careers</Menu.Item>
            <Menu.Item as="a">Log in</Menu.Item>
            <Menu.Item as="a">Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Item position="right">
                    <Button as="a" inverted>
                      <Link
                        to="/login"
                        style={{
                          color: 'white',
                        }}
                      >
                        Log in
                      </Link>
                    </Button>
                    <Button as="a" inverted style={{ marginLeft: '0.5em' }}>
                      <Link
                        to="/register"
                        style={{
                          color: 'white',
                        }}
                      >
                        Sign Up
                      </Link>
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer className="animate__animated animate__slideInLeft">
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: '2em' }} className="body-text">
              We Help Companies and Companions
            </Header>
            <p style={{ fontSize: '1.33em' }} className="body-text">
              We can give your company superpowers to do things that they never
              thought possible. Let us delight your customers and empower your
              needs... through pure data analytics.
            </p>
            <Header as="h3" style={{ fontSize: '2em' }} className="body-text">
              We Provide Rooms and Services
            </Header>
            <p style={{ fontSize: '1.33em' }} className="body-text">
              Yes that's right, you thought it was the stuff of dreams, but even
              better to work anywhere.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              // bordered
              // rounded
              // size="large"
              src="https://images.pexels.com/photos/3206168/pexels-photo-3206168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button size="huge" inverted color="pink">
              Check Them Out
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as="h3" style={{ fontSize: '2em' }} className="body-text">
              "What a Company"
            </Header>
            <p style={{ fontSize: '1.33em' }} className="body-text">
              That is what they all say about us
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as="h3" style={{ fontSize: '2em' }} className="body-text">
              "I shouldn't have gone with their competitor."
            </Header>
            <p style={{ fontSize: '1.33em' }} className="body-text">
              <Image
                avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRgepcQm5dnMZDKmGydLUFZY71nNSCjHFhLnQ&usqp=CAU"
              />
              <b>Nan</b> Chief Fun Officer Acme Toys
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: '2em' }} className="body-text">
          Breaking The Grid, Grabs Your Attention
        </Header>
        <p style={{ fontSize: '1.33em' }} className="body-text">
          Instead of focusing on content creation and hard work, we have learned
          how to master the art of doing nothing by providing massive amounts of
          whitespace and generic content that can seem massive, monolithic and
          worth your attention.
        </p>
        <Button as="a" size="large" inverted color="pink">
          Read More
        </Button>

        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href="/">Case Studies</a>
        </Divider>

        <Header as="h3" style={{ fontSize: '2em' }} className="body-text">
          Did We Tell You About Our Industry tools?
        </Header>
        <p style={{ fontSize: '1.33em' }} className="body-text">
          Yes I know you probably disregarded the earlier boasts as non-sequitur
          filler content, but it's really true. It took years of gene splicing
          and combinatory DNA research, but our workspace has industry specified
          tools.
        </p>
        <Button as="a" size="large" inverted color="pink">
          I'm Still Quite Interested
        </Button>
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Industry Tools</List.Item>
                <List.Item as="a">Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">Customer Support</List.Item>
                <List.Item as="a">Human Resources</List.Item>
                <List.Item as="a">How To Access</List.Item>
                <List.Item as="a">Project Management</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could
                help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default HomepageLayout
