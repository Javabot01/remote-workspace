import React, { Component } from 'react'
import firebase from '../../firebase'
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false,
  }
  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}> {error.message} </p>)
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  isFormValid = ({ email, password }) => email && password
  handleSubmit = (event) => {
    event.preventDefault()
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true })
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((signedInUser) => {
          console.log(signedInUser)
        })
        .catch((err) => {
          console.error(err)
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          })
        })
    }
  }

  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? 'error'
      : ''
  }

  render() {
    const { email, password, errors, loading } = this.state
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          {errors.length > 0 && (
            <Message error>
              {/* <h3>Error</h3> */}
              {this.displayErrors(errors)}
            </Message>
          )}
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="sign-in" color="violet" />
            Login to Ultimate-Workspace
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                type="email"
                value={email}
                className={this.handleInputError(errors, 'email')}
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
                value={password}
                className={this.handleInputError(errors, 'password')}
              />
              <Button
                disabled={loading}
                className={loading ? 'loading' : ''}
                fluid
                size="large"
                color="violet"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          <Message>
            Don't have an account yet? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}
